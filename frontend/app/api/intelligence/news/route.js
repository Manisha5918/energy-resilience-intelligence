import { NextResponse } from "next/server";
import { getNewsSignals } from "@/lib/intelligenceService";

export async function GET() {
  try {
    const data = await getNewsSignals();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch news signals", details: error.message },
      { status: 500 }
    );
  }
}
