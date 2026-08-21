import { NextResponse } from "next/server";
import { getAllSignals } from "@/lib/intelligenceService";

export async function GET() {
  try {
    const data = await getAllSignals();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to aggregate intelligence signals", details: error.message },
      { status: 500 }
    );
  }
}
