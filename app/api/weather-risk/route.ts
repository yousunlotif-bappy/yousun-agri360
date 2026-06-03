import { generateWeatherRisk } from "@/lib/cropRules";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const crop = body.crop || "Boro Rice";
    const location = body.location || "Rajshahi, Bangladesh";
    const condition = body.condition || "Heavy Rain";

    const result = generateWeatherRisk(crop, location, condition);

    return NextResponse.json({
      success: true,
      module: "FarmWeather Guard",
      message: "Weather risk report generated successfully.",
      data: result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        module: "FarmWeather Guard",
        message: "Failed to generate weather risk report.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    module: "FarmWeather Guard",
    description:
      "POST crop, location, and weather condition to receive crop-specific risk advice.",
    sampleBody: {
      crop: "Boro Rice",
      location: "Rajshahi, Bangladesh",
      condition: "Heavy Rain",
    },
  });
}


