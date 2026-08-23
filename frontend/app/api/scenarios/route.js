import { NextResponse } from "next/server";
import { runScenario } from "@/lib/scenarioEngine";
import { SIMULATED_SCENARIOS, getScenarioById } from "@/lib/scenarioData";

const VALID_SCENARIO_IDS = [
  "hormuz-closure",
  "redsea-escalation",
  "russia-discount-collapse",
  "malacca-strait-congestion",
  "combined-crisis",
  "current-conditions"
];

const VALID_SEVERITY_LEVELS = ["Low", "Moderate", "Severe"];

function validateScenarioParams(params) {
  const result = {};

  if (params.scenarioId !== undefined && params.scenarioId !== null) {
    const id = String(params.scenarioId).trim();
    if (!VALID_SCENARIO_IDS.includes(id)) {
      throw new Error(`Invalid scenarioId '${id}'. Allowed: ${VALID_SCENARIO_IDS.join(", ")}.`);
    }
    result.scenarioId = id;
  }

  if (params.durationDays !== undefined && params.durationDays !== null && params.durationDays !== "") {
    const days = Number(params.durationDays);
    if (!Number.isInteger(days) || days < 1 || days > 365) {
      throw new Error("Parameter 'durationDays' must be an integer between 1 and 365.");
    }
    result.durationDays = days;
  }

  if (params.severity !== undefined && params.severity !== null && params.severity !== "") {
    const sev = String(params.severity).trim();
    if (!VALID_SEVERITY_LEVELS.includes(sev)) {
      throw new Error(`Invalid severity '${sev}'. Allowed: ${VALID_SEVERITY_LEVELS.join(", ")}.`);
    }
    result.severity = sev;
  }

  if (params.supplyDisruptionPercent !== undefined && params.supplyDisruptionPercent !== null && params.supplyDisruptionPercent !== "") {
    const pct = Number(params.supplyDisruptionPercent);
    if (Number.isNaN(pct) || !Number.isFinite(pct) || pct < 0 || pct > 100) {
      throw new Error("Parameter 'supplyDisruptionPercent' must be a finite number between 0 and 100.");
    }
    result.supplyDisruptionPercent = pct;
  }

  if (params.priceShockPercent !== undefined && params.priceShockPercent !== null && params.priceShockPercent !== "") {
    const pct = Number(params.priceShockPercent);
    if (Number.isNaN(pct) || !Number.isFinite(pct) || pct < -50 || pct > 200) {
      throw new Error("Parameter 'priceShockPercent' must be a finite number between -50 and 200.");
    }
    result.priceShockPercent = pct;
  }

  if (params.freightImpactPercent !== undefined && params.freightImpactPercent !== null && params.freightImpactPercent !== "") {
    const pct = Number(params.freightImpactPercent);
    if (Number.isNaN(pct) || !Number.isFinite(pct) || pct < -50 || pct > 300) {
      throw new Error("Parameter 'freightImpactPercent' must be a finite number between -50 and 300.");
    }
    result.freightImpactPercent = pct;
  }

  return result;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // If explicit list request
    if (searchParams.get("list") === "true") {
      return NextResponse.json({
        ok: true,
        data: {
          scenarios: SIMULATED_SCENARIOS,
          severityLevels: SCENARIO_SEVERITY_LEVELS
        },
        meta: {
          dataStatus: "MODEL_CONFIGURATION",
          generatedAt: new Date().toISOString(),
          source: "EnergyShield Scenario Registry",
          version: "2.0.0"
        }
      });
    }

    const queryParams = {
      scenarioId: searchParams.get("scenarioId") || undefined,
      durationDays: searchParams.get("durationDays") || undefined,
      severity: searchParams.get("severity") || undefined,
      supplyDisruptionPercent: searchParams.get("supplyDisruptionPercent") || undefined,
      priceShockPercent: searchParams.get("priceShockPercent") || undefined,
      freightImpactPercent: searchParams.get("freightImpactPercent") || undefined
    };

    const validated = validateScenarioParams(queryParams);
    const result = runScenario(validated);

    return NextResponse.json({
      ok: true,
      data: {
        simulation: result,
        availableScenarios: SIMULATED_SCENARIOS
      },
      meta: {
        dataStatus: "USER_SCENARIO_ASSUMPTION",
        generatedAt: new Date().toISOString(),
        source: "EnergyShield Scenario Simulation Engine",
        version: "2.0.0"
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "INVALID_REQUEST",
          message: error.message || "Failed to execute scenario simulation."
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

    const validated = validateScenarioParams(body);
    const result = runScenario(validated);

    return NextResponse.json({
      ok: true,
      data: {
        simulation: result
      },
      meta: {
        dataStatus: "USER_SCENARIO_ASSUMPTION",
        generatedAt: new Date().toISOString(),
        source: "EnergyShield Scenario Simulation Engine",
        version: "2.0.0"
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "INVALID_REQUEST",
          message: error.message || "Failed to execute scenario simulation."
        }
      },
      { status: 400 }
    );
  }
}
