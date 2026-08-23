import { NextResponse } from "next/server";
import { 
  getReserveCoverAnalysis, 
  OFFICIAL_SPR_SITES, 
  OFFICIAL_COMMERCIAL_STORAGE,
  getISPRLOfficialRecords,
  getISPRLStructuredInventory,
  getISPRLReconciliationReport
} from "@/lib/providers/reserveProvider";

export async function GET() {
  try {
    const analysis = getReserveCoverAnalysis();
    const isprlRecords = getISPRLOfficialRecords();
    const structuredInventory = getISPRLStructuredInventory();
    const reconciliationFlags = getISPRLReconciliationReport();

    return NextResponse.json({
      ok: true,
      data: {
        analysis,
        sprSites: OFFICIAL_SPR_SITES,
        commercialStorage: OFFICIAL_COMMERCIAL_STORAGE,
        isprlOfficialRecords: isprlRecords,
        isprlStructuredInventory: structuredInventory,
        reconciliationFlags,
        defenseClassificationNote: "Real-time sub-hourly underground rock cavern fill telemetry is sovereign strategic classified data. Statutory Phase-1 capacity (5.33 MMT / 39.18M bbl) and Annual Report 2024-25 disclosures are legally verified."
      },
      meta: {
        dataStatus: "OFFICIAL_STATUTORY_DATASET",
        totalRecords: isprlRecords.length,
        generatedAt: new Date().toISOString(),
        source: "Indian Strategic Petroleum Reserves Limited (ISPRL) Annual Report 2024-25 & Statutory Disclosures",
        version: "2.5.0"
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "SERVER_ERROR",
          message: "Failed to retrieve reserve cover data."
        }
      },
      { status: 500 }
    );
  }
}
