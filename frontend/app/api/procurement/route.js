import { NextResponse } from "next/server";
import { generateProcurementPlan, OPTIMIZATION_WEIGHTS } from "@/lib/procurementEngine";

const VALID_RISK_TOLERANCES = ["Low", "Medium", "High"];
const VALID_BUDGET_PRIORITIES = ["Cost", "Balanced", "Resilience"];

function validateProcurementParams(params) {
  const result = {};

  if (params.scenarioId !== undefined && params.scenarioId !== null) {
    result.scenarioId = String(params.scenarioId).trim();
  }

  if (params.targetSupplyGapMbd !== undefined && params.targetSupplyGapMbd !== null && params.targetSupplyGapMbd !== "") {
    const gap = Number(params.targetSupplyGapMbd);
    if (Number.isNaN(gap) || !Number.isFinite(gap) || gap < 0 || gap > 10.0) {
      throw new Error("Parameter 'targetSupplyGapMbd' must be a finite number between 0 and 10.0 MBD.");
    }
    result.targetSupplyGapMbd = gap;
  }

  if (params.riskTolerance !== undefined && params.riskTolerance !== null && params.riskTolerance !== "") {
    const tol = String(params.riskTolerance).trim();
    if (!VALID_RISK_TOLERANCES.includes(tol)) {
      throw new Error(`Invalid riskTolerance '${tol}'. Allowed: ${VALID_RISK_TOLERANCES.join(", ")}.`);
    }
    result.riskTolerance = tol;
  }

  if (params.budgetPriority !== undefined && params.budgetPriority !== null && params.budgetPriority !== "") {
    const bp = String(params.budgetPriority).trim();
    if (!VALID_BUDGET_PRIORITIES.includes(bp)) {
      throw new Error(`Invalid budgetPriority '${bp}'. Allowed: ${VALID_BUDGET_PRIORITIES.join(", ")}.`);
    }
    result.budgetPriority = bp;
  }

  if (params.planningHorizonDays !== undefined && params.planningHorizonDays !== null && params.planningHorizonDays !== "") {
    const days = Number(params.planningHorizonDays);
    if (!Number.isInteger(days) || days < 1 || days > 365) {
      throw new Error("Parameter 'planningHorizonDays' must be an integer between 1 and 365.");
    }
    result.planningHorizonDays = days;
  }

  return result;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const queryParams = {
      scenarioId: searchParams.get("scenarioId") || undefined,
      targetSupplyGapMbd: searchParams.get("targetSupplyGapMbd") || undefined,
      riskTolerance: searchParams.get("riskTolerance") || undefined,
      budgetPriority: searchParams.get("budgetPriority") || undefined,
      planningHorizonDays: searchParams.get("planningHorizonDays") || undefined
    };

    const validated = validateProcurementParams(queryParams);
    const plan = generateProcurementPlan(validated);

    return NextResponse.json({
      ok: true,
      data: {
        ...plan,
        optimizationWeights: OPTIMIZATION_WEIGHTS
      },
      meta: {
        dataStatus: "DERIVED_OPTIMIZATION_OUTPUT",
        generatedAt: new Date().toISOString(),
        source: "EnergyShield Adaptive Procurement Engine",
        version: "2.0.0"
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "INVALID_REQUEST",
          message: error.message || "Failed to generate procurement plan."
        }
      },
      { status: 400 }
    );
  }
}

export async function POST(request) {
  try {
    let body = {};
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "INVALID_JSON",
            message: "Malformed JSON payload in request body."
          }
        },
        { status: 400 }
      );
    }

    const validated = validateProcurementParams(body);
    const plan = generateProcurementPlan(validated);

    return NextResponse.json({
      ok: true,
      data: {
        ...plan,
        optimizationWeights: OPTIMIZATION_WEIGHTS
      },
      meta: {
        dataStatus: "DERIVED_OPTIMIZATION_OUTPUT",
        generatedAt: new Date().toISOString(),
        source: "EnergyShield Adaptive Procurement Engine",
        version: "2.0.0"
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "INVALID_REQUEST",
          message: error.message || "Failed to generate procurement plan."
        }
      },
      { status: 400 }
    );
  }
}
