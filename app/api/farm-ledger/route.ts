import { calculateFarmLedger } from "@/lib/calculations";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = calculateFarmLedger({
      cropName: body.cropName || "Boro Rice",
      landSize: Number(body.landSize || 1),
      seedCost: Number(body.seedCost || 0),
      fertilizerCost: Number(body.fertilizerCost || 0),
      laborCost: Number(body.laborCost || 0),
      pesticideCost: Number(body.pesticideCost || 0),
      irrigationCost: Number(body.irrigationCost || 0),
      transportCost: Number(body.transportCost || 0),
      otherCost: Number(body.otherCost || 0),
      sellingIncome: Number(body.sellingIncome || 0),
    });

    return NextResponse.json({
      success: true,
      module: "FarmLedger AI",
      message: "Farm profit/loss calculation completed successfully.",
      data: result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        module: "FarmLedger AI",
        message: "Failed to calculate farm ledger.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    module: "FarmLedger AI",
    description:
      "POST farm cost and income data to calculate total cost, profit/loss, ROI, and cost per acre.",
    sampleBody: {
      cropName: "Boro Rice",
      landSize: 1,
      seedCost: 4500,
      fertilizerCost: 12400,
      laborCost: 18500,
      pesticideCost: 5200,
      irrigationCost: 4300,
      transportCost: 3850,
      otherCost: 0,
      sellingIncome: 124500,
    },
  });
}

