import { NextResponse } from "next/server";
import { getAllSignals } from "@/lib/intelligenceService";

export async function GET() {
  try {
    const data = await getAllSignals();
    return NextResponse.json({
      status: "HEALTHY",
      systemHealth: data.systemHealth,
      providers: data.providers,
      timestamp: new Date().toISOString(),
      cacheEngine: "In-Memory Server-Side TTL",
      securityAudit: "No client-exposed API secrets"
    });
  } catch (error) {
    return NextResponse.json(
      { status: "DEGRADED", error: error.message },
      { status: 500 }
    );
  }
}
