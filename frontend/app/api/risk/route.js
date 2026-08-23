import { NextResponse } from "next/server";
import { calculateResilienceScore, generateRiskExplanation, RISK_WEIGHTS } from "@/lib/riskScoringEngine";

function validateFactor(val, name) {
  if (val === undefined || val === null || val === "") return undefined;
  const num = Number(val);
  if (Number.isNaN(num) || !Number.isFinite(num)) {
    throw new Error(`Parameter '${name}' must be a finite number.`);
  }
  if (num < 0 || num > 100) {
    throw new Error(`Parameter '${name}' must be between 0 and 100.`);
  }
  return num;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const geopolitical = validateFactor(searchParams.get("geopolitical"), "geopolitical");
    const logistics = validateFactor(searchParams.get("logistics"), "logistics");
    const concentration = validateFactor(searchParams.get("concentration"), "concentration");
    const volatility = validateFactor(searchParams.get("volatility"), "volatility");
    const supplyGap = validateFactor(searchParams.get("supplyGap"), "supplyGap");
    const includeExplanation = searchParams.get("explain") !== "false";

    const inputs = {};
    if (geopolitical !== undefined) inputs.geopolitical = geopolitical;
    if (logistics !== undefined) inputs.logistics = logistics;
    if (concentration !== undefined) inputs.concentration = concentration;
    if (volatility !== undefined) inputs.volatility = volatility;
    if (supplyGap !== undefined) inputs.supplyGap = supplyGap;

    const resilience = calculateResilienceScore(inputs);
    const explanation = includeExplanation ? generateRiskExplanation(resilience) : null;

    return NextResponse.json({
      ok: true,
      data: {
        ...resilience,
        weights: RISK_WEIGHTS,
        explanation
      },
      meta: {
        dataStatus: "SIMULATED_MODEL_OUTPUT",
        generatedAt: new Date().toISOString(),
        source: "EnergyShield Risk Engine (5-Factor Linear Model)",
        version: "2.0.0"
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "INVALID_REQUEST",
          message: error.message || "Invalid risk factor parameters."
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

    const geopolitical = validateFactor(body.geopolitical, "geopolitical");
    const logistics = validateFactor(body.logistics, "logistics");
    const concentration = validateFactor(body.concentration, "concentration");
    const volatility = validateFactor(body.volatility, "volatility");
    const supplyGap = validateFactor(body.supplyGap, "supplyGap");
    const includeExplanation = body.explain !== false;

    const inputs = {};
    if (geopolitical !== undefined) inputs.geopolitical = geopolitical;
    if (logistics !== undefined) inputs.logistics = logistics;
    if (concentration !== undefined) inputs.concentration = concentration;
    if (volatility !== undefined) inputs.volatility = volatility;
    if (supplyGap !== undefined) inputs.supplyGap = supplyGap;

    const resilience = calculateResilienceScore(inputs);
    const explanation = includeExplanation ? generateRiskExplanation(resilience) : null;

    return NextResponse.json({
      ok: true,
      data: {
        ...resilience,
        weights: RISK_WEIGHTS,
        explanation
      },
      meta: {
        dataStatus: "SIMULATED_MODEL_OUTPUT",
        generatedAt: new Date().toISOString(),
        source: "EnergyShield Risk Engine (5-Factor Linear Model)",
        version: "2.0.0"
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "INVALID_REQUEST",
          message: error.message || "Failed to compute risk score."
        }
      },
      { status: 400 }
    );
  }
}
