import { NextResponse } from "next/server";
import { buildNetworkState } from "@/lib/digitalTwinEngine";

const VALID_SEVERITY_LEVELS = ["Low", "Moderate", "Severe"];

function validateDigitalTwinParams(params) {
  const result = {};

  if (params.scenarioId !== undefined && params.scenarioId !== null) {
    result.scenarioId = String(params.scenarioId).trim();
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

  if (params.timelineDay !== undefined && params.timelineDay !== null && params.timelineDay !== "") {
    const day = Number(params.timelineDay);
    if (!Number.isInteger(day) || day < 0 || day > 365) {
      throw new Error("Parameter 'timelineDay' must be an integer between 0 and 365.");
    }
    result.timelineDay = day;
  }

  return result;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const queryParams = {
      scenarioId: searchParams.get("scenarioId") || undefined,
      durationDays: searchParams.get("durationDays") || undefined,
      severity: searchParams.get("severity") || undefined,
      timelineDay: searchParams.get("timelineDay") || undefined
    };

    const validated = validateDigitalTwinParams(queryParams);
    const networkState = buildNetworkState(validated);

    return NextResponse.json({
      ok: true,
      data: networkState,
      meta: {
        dataStatus: "TOPOLOGICAL_SIMULATION_NETWORK",
        generatedAt: new Date().toISOString(),
        source: "EnergyShield Digital Twin Topology Engine",
        version: "2.0.0"
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "INVALID_REQUEST",
          message: error.message || "Failed to construct Digital Twin network state."
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

    const validated = validateDigitalTwinParams(body);
    const networkState = buildNetworkState(validated);

    return NextResponse.json({
      ok: true,
      data: networkState,
      meta: {
        dataStatus: "TOPOLOGICAL_SIMULATION_NETWORK",
        generatedAt: new Date().toISOString(),
        source: "EnergyShield Digital Twin Topology Engine",
        version: "2.0.0"
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "INVALID_REQUEST",
          message: error.message || "Failed to construct Digital Twin network state."
        }
      },
      { status: 400 }
    );
  }
}
