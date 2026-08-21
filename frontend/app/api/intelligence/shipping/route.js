import { NextResponse } from "next/server";
import { getShippingSignals } from "@/lib/intelligenceService";

export async function GET() {
  try {
    const data = await getShippingSignals();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch shipping signals", details: error.message },
      { status: 500 }
    );
  }
}
