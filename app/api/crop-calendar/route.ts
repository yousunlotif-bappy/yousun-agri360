import { generateCropCalendar } from "@/lib/cropRules";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const crop = body.crop || "Boro Rice";
    const plantingDate =
      body.plantingDate || new Date().toISOString().split("T")[0];

    const result = generateCropCalendar(crop, plantingDate);

    return NextResponse.json({
      success: true,
      module: "CropTime Planner",
      message: "Crop calendar generated successfully.",
      data: result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        module: "CropTime Planner",
        message: "Failed to generate crop calendar.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    module: "CropTime Planner",
    description:
      "POST crop and planting date to generate a crop-wise farming schedule.",
    sampleBody: {
      crop: "Boro Rice",
      plantingDate: "2026-06-07",
    },
  });
}


