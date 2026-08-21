import { NextResponse } from "next/server";
import { getSanctionsSignals } from "@/lib/intelligenceService";

export async function GET() {
  try {
    const data = await getSanctionsSignals();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch sanctions signals", details: error.message },
      { status: 500 }
    );
  }
}
