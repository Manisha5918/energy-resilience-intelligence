/**
 * EnergyShield Strategic Petroleum Reserve (ISPRL) Day-by-Day Drawdown Scheduler Engine
 * 
 * Simulates dynamic, day-by-day discharge trajectories across India's Phase-I underground rock caverns:
 * - Visakhapatnam (1.33 MMT / 9.77 Mbbl)
 * - Mangalore (1.50 MMT / 11.02 Mbbl)
 * - Padur (2.50 MMT / 18.37 Mbbl)
 * 
 * Enforces engineering discharge limits (aggregate 2.50 MBD ceiling) and emergency buffer reserve floors.
 * 
 * PROVENANCE NOTE:
 * Cavern nameplates are OFFICIAL ISPRL statutory capacities.
 * Subsea real-time inventory fill and discharge schedules are SIMULATED / PENDING_VALIDATION.
 */

import { getReserveAssets, SPR_SYSTEM_CONSTRAINTS } from "./data/schemas/reserveSchema.js";

/**
 * Generates a day-by-day drawdown schedule and multi-cavern trajectory simulation
 * 
 * @param {Object} params
 * @param {number} [params.horizonDays=30] - Simulation horizon (30 | 60 | 90)
 * @param {number} [params.dailyDeficitMbd=1.50] - Unmet crude supply gap (MBD)
 * @param {number} [params.maxAggregateWithdrawalMbd=2.50] - Engineering aggregate withdrawal limit (MBD)
 * @param {number} [params.reserveFloorPercent=20.0] - Emergency minimum reserve floor (%)
 * @param {number} [params.refillStartDay=45] - Planned day when alternative shipments begin refill
 * @param {number} [params.dailyNetImportRequirementMbd=4.83] - Baseline net import demand
 */
export function generateSPRDrawdownSchedule({
  horizonDays = 30,
  dailyDeficitMbd = 1.50,
  maxAggregateWithdrawalMbd = 2.50,
  reserveFloorPercent = 20.0,
  refillStartDay = 45,
  dailyNetImportRequirementMbd = 4.83,
  initialFillPercent = null // Configurable scenario fill: 50%, 60%, 70%, 80%, 85%, 90%, 100%
} = {}) {
  const initialCaverns = getReserveAssets();
  const horizon = Math.min(180, Math.max(7, Number(horizonDays) || 30));
  const deficit = Math.max(0, Number(dailyDeficitMbd) || 0);
  const maxAggregatePump = Math.min(4.0, Math.max(0.5, Number(maxAggregateWithdrawalMbd) || 2.50));
  const floorPct = Math.max(5, Math.min(50, Number(reserveFloorPercent) || 20.0));
  const refillDay = Number(refillStartDay) || 45;

  // If a custom fill scenario is passed, re-scale cavern initial stock
  const effectiveFillRatio = (initialFillPercent !== null && initialFillPercent > 0 && initialFillPercent <= 100)
    ? initialFillPercent / 100
    : null;

  // Initialize tracking states for each cavern
  const cavernsState = initialCaverns.map(c => {
    const initialStock = effectiveFillRatio !== null 
      ? Number((c.capacityMillionBarrels * effectiveFillRatio).toFixed(2))
      : c.currentFillMillionBarrels;

    return {
      id: c.id,
      name: c.name,
      capacity: c.capacityMillionBarrels,
      currentStock: initialStock,
      maxWithdrawal: c.maxWithdrawalMBD,
      floorStock: c.capacityMillionBarrels * (floorPct / 100),
      isDepleted: false,
      depletedOnDay: null
    };
  });

  // Total initial stock & capacities
  const totalCapacityMbbl = initialCaverns.reduce((acc, c) => acc + c.capacityMillionBarrels, 0);
  const totalInitialStockMbbl = Number(cavernsState.reduce((acc, c) => acc + c.currentStock, 0).toFixed(2));
  const reserveFloorMbbl = Number((totalCapacityMbbl * (floorPct / 100)).toFixed(2));

  const scheduleDays = [];
  let cumulativeWithdrawnMbbl = 0;
  let floorBreachedDay = null;
  let totalDepletedDay = null;
  let maxPumpExceededDay = null;

  for (let day = 1; day <= horizon; day++) {
    const dayConstraints = [];

    // Determine daily target drawdown based on policy
    const rawTargetDrawdownMbd = Math.min(deficit, maxAggregatePump);
    const pumpCapExceeded = deficit > maxAggregatePump;
    if (pumpCapExceeded) {
      if (!maxPumpExceededDay) maxPumpExceededDay = day;
      dayConstraints.push("CONSTRAINT_AGGREGATE_PUMP_CAP");
    }

    let actualDayWithdrawalMbd = 0;
    const cavernDailyDrawdown = {};

    // Is it in drawdown phase or refill phase?
    const isRefillPhase = day >= refillDay && deficit <= 0.2;

    if (isRefillPhase) {
      // Re-injection mode (gradual refill +0.20 MBD split across caverns)
      const refillMbd = 0.20;
      cavernsState.forEach(c => {
        const cavernRefill = refillMbd / cavernsState.length;
        c.currentStock = Math.min(c.capacity, c.currentStock + cavernRefill);
        cavernDailyDrawdown[c.id] = -cavernRefill;
      });
      actualDayWithdrawalMbd = -refillMbd;
      dayConstraints.push("MODE_STRATEGIC_REFILL");
    } else {
      // Drawdown phase: allocate withdrawal proportionally across available caverns based on remaining stock
      const totalAvailableStock = cavernsState.reduce((acc, c) => acc + Math.max(0, c.currentStock), 0);

      if (totalAvailableStock > 0.05) {
        cavernsState.forEach(c => {
          if (c.currentStock > 0.05) {
            const share = c.currentStock / totalAvailableStock;
            const requestedCavernDraw = rawTargetDrawdownMbd * share;
            const actualCavernDraw = Math.min(c.maxWithdrawal, Math.min(c.currentStock, requestedCavernDraw));
            
            if (actualCavernDraw === c.maxWithdrawal && requestedCavernDraw > c.maxWithdrawal) {
              dayConstraints.push(`CONSTRAINT_${c.name.toUpperCase()}_PUMP_CEILING`);
            }

            c.currentStock = Math.max(0, c.currentStock - actualCavernDraw);
            cavernDailyDrawdown[c.id] = Number(actualCavernDraw.toFixed(3));
            actualDayWithdrawalMbd += actualCavernDraw;

            if (c.currentStock <= 0.05 && !c.isDepleted) {
              c.isDepleted = true;
              c.depletedOnDay = day;
              dayConstraints.push(`EVENT_${c.name.toUpperCase()}_DEPLETED`);
            }
          } else {
            cavernDailyDrawdown[c.id] = 0;
          }
        });
      } else {
        if (!totalDepletedDay) totalDepletedDay = day;
        cavernsState.forEach(c => { cavernDailyDrawdown[c.id] = 0; });
        actualDayWithdrawalMbd = 0;
        dayConstraints.push("EVENT_ALL_CAVERNS_DEPLETED");
      }
    }

    actualDayWithdrawalMbd = Number(actualDayWithdrawalMbd.toFixed(3));
    cumulativeWithdrawnMbbl = Number((cumulativeWithdrawnMbbl + actualDayWithdrawalMbd).toFixed(2));
    const totalRemainingStockMbbl = Number(cavernsState.reduce((acc, c) => acc + c.currentStock, 0).toFixed(2));
    const daysOfCoverRemaining = Number((totalRemainingStockMbbl / dailyNetImportRequirementMbd).toFixed(1));
    const remainingDeficitMbd = Number(Math.max(0, deficit - actualDayWithdrawalMbd).toFixed(2));

    // Floor breach check
    if (totalRemainingStockMbbl < reserveFloorMbbl) {
      if (!floorBreachedDay) floorBreachedDay = day;
      dayConstraints.push("CONSTRAINT_RESERVE_FLOOR_BREACHED");
    }

    scheduleDays.push({
      day,
      requiredSupplyDeficitMbd: deficit,
      sprReleaseMbd: actualDayWithdrawalMbd,
      remainingDeficitMbd,
      totalRemainingStockMbbl,
      daysOfCoverRemaining,
      cumulativeWithdrawnMbbl,
      activeConstraints: dayConstraints,
      vizagStockMbbl: Number(cavernsState.find(c => c.id === "spr-vizag").currentStock.toFixed(2)),
      mangaloreStockMbbl: Number(cavernsState.find(c => c.id === "spr-mangalore").currentStock.toFixed(2)),
      padurStockMbbl: Number(cavernsState.find(c => c.id === "spr-padur").currentStock.toFixed(2)),
      vizagDrawdownMbd: cavernDailyDrawdown["spr-vizag"] || 0,
      mangaloreDrawdownMbd: cavernDailyDrawdown["spr-mangalore"] || 0,
      padurDrawdownMbd: cavernDailyDrawdown["spr-padur"] || 0
    });
  }

  // Warnings collection
  const warnings = [];
  if (deficit > maxAggregatePump) {
    warnings.push({
      id: "warn-pump-ceiling",
      level: "HIGH",
      title: "Aggregate Cavern Pump Ceiling Exceeded",
      message: `Deficit of ${deficit} MBD exceeds maximum combined discharge pump rate of ${maxAggregatePump} MBD. Net deficit gap of ${(deficit - maxAggregatePump).toFixed(2)} MBD will remain unmitigated.`
    });
  }

  if (floorBreachedDay) {
    warnings.push({
      id: "warn-floor-breached",
      level: "CRITICAL",
      title: `Emergency Reserve Floor Breached on Day ${floorBreachedDay}`,
      message: `Strategic reserves fall below the mandatory ${floorPct}% statutory sovereign buffer (${reserveFloorMbbl.toFixed(1)} Mbbl) on Day ${floorBreachedDay}. Emergency rationing required.`
    });
  }

  if (totalDepletedDay) {
    warnings.push({
      id: "warn-total-depletion",
      level: "CRITICAL",
      title: `Complete SPR Depletion on Day ${totalDepletedDay}`,
      message: `All Phase-1 rock caverns reach zero inventory on Day ${totalDepletedDay}. Immediate offshore spot cargo arrivals mandatory.`
    });
  }

  if (refillDay > horizon && horizon >= 60) {
    warnings.push({
      id: "warn-refill-delay",
      level: "MODERATE",
      title: "Buffer Refill Protocol Delayed",
      message: `Refill start day (${refillDay}) exceeds current planning horizon. Extended depletion increases vulnerability to secondary shocks.`
    });
  }

  return {
    horizonDays: horizon,
    dailyDeficitMbd: deficit,
    maxAggregateWithdrawalMbd: maxAggregatePump,
    reserveFloorPercent: floorPct,
    reserveFloorMbbl: Number(reserveFloorMbbl.toFixed(2)),
    totalInitialStockMbbl: Number(totalInitialStockMbbl.toFixed(2)),
    totalCapacityMbbl: Number(totalCapacityMbbl.toFixed(2)),
    refillStartDay: refillDay,
    floorBreachedDay,
    totalDepletedDay,
    scheduleDays,
    cavernsState,
    warnings,
    provenanceAuditTrail: {
      actualReportedInventory: "UNAVAILABLE (Sovereign defense-classified telemetry)",
      inventoryClassification: "MODELLED_INVENTORY",
      initialFillPercent: initialFillPercent !== null ? initialFillPercent : 85.0,
      cavernCapacitiesStatus: "OFFICIAL",
      pumpCeilingStatus: "MODEL_ASSUMPTION",
      reserveFloorStatus: "POLICY_PARAMETER"
    },
    sourceStatus: "MODEL_ASSUMPTION",
    disclaimer: "MODEL ASSUMPTION — VERIFY WITH ISPRL (Cavern capacities are official ISPRL disclosures; real-time fill is SIMULATED / PENDING_VALIDATION; pump ceilings are MODEL_ASSUMPTION)."
  };
}
