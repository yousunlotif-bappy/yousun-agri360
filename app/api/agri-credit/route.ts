import { calculateAgriCredit } from "@/lib/calculations";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = calculateAgriCredit({
      farmerName: body.farmerName || "Bappy",
      cropName: body.cropName || "Boro Rice",
      landSize: Number(body.landSize || 1),
      seasonsCompleted: Number(body.seasonsCompleted || 1),
      yearlyIncome: Number(body.yearlyIncome || 0),
      yearlyExpense: Number(body.yearlyExpense || 0),
      requestedLoan: Number(body.requestedLoan || 0),
      previousRepayment: body.previousRepayment || "Average",
      hasMarketRecord: body.hasMarketRecord || "No",
    });

    return NextResponse.json({
      success: true,
      module: "AgriCredit AI",
      message: "Farmer credit profile generated successfully.",
      data: result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        module: "AgriCredit AI",
        message: "Failed to generate credit profile.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    module: "AgriCredit AI",
    description:
      "POST farmer profile, income, expense, repayment, and loan data to generate credit readiness score.",
    sampleBody: {
      farmerName: "Bappy",
      cropName: "Boro Rice",
      landSize: 1.5,
      seasonsCompleted: 4,
      yearlyIncome: 360000,
      yearlyExpense: 185000,
      requestedLoan: 75000,
      previousRepayment: "Good",
      hasMarketRecord: "Yes",
    },
  });
}


