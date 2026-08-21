import { NextResponse } from "next/server";
import { getMarketSignals } from "@/lib/intelligenceService";

export async function GET() {
  try {
    const data = await getMarketSignals();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch market signals", details: error.message },
      { status: 500 }
    );
  }
}
