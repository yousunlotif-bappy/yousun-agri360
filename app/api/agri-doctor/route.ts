import { analyzeCropDisease } from "@/lib/mockAI";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let crop = "Tomato";
    let hasImage = false;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      crop = String(formData.get("crop") || "Tomato");
      hasImage = Boolean(formData.get("image"));
    } else {
      const body = await request.json();
      crop = body.crop || "Tomato";
      hasImage = Boolean(body.imageUploaded);
    }

    const result = analyzeCropDisease(crop);

    return NextResponse.json({
      success: true,
      module: "AgriDoctor AI",
      message: "Crop disease analysis completed successfully.",
      imageUploaded: hasImage,
      data: result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        module: "AgriDoctor AI",
        message: "Failed to analyze crop disease.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    module: "AgriDoctor AI",
    description:
      "POST crop data to this endpoint to receive AI-style crop disease diagnosis.",
    sampleBody: {
      crop: "Tomato",
      imageUploaded: true,
    },
  });
}

