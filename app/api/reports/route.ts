import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    module: "Yousun Agri360 Reports",
    message: "Platform report summary generated successfully.",
    data: {
      platformName: "Yousun Agri360",
      tagline: "One platform. Every farmer’s digital partner.",
      farmer: {
        name: "Bappy",
        location: "Rajshahi, Bangladesh",
        currentCrop: "Boro Rice",
      },
      completion: {
        status: "MVP Completed",
        percentage: 92,
        totalModules: 10,
        backendApiRoutes: 6,
      },
      before: [
        "Only rough farmer problem notes existed.",
        "No professional dashboard was available.",
        "No independent module workflow was implemented.",
        "No backend/API layer existed.",
        "No clear contest completion story was ready.",
      ],
      after: [
        "Professional landing page and dashboard completed.",
        "10 independent smart farming modules created.",
        "Functional workflows added for disease, weather, ledger, calendar, market, credit, marketplace, machinery, chatbot, and voice.",
        "Lightweight backend API routes added using Next.js.",
        "Before/after story added for GitHub Finish-Up-A-Thon submission.",
      ],
      completedModules: [
        "AgriDoctor AI",
        "FarmWeather Guard",
        "AgriMarket Link",
        "Farm2Market",
        "KrishiBot AI",
        "AgriCredit AI",
        "KrishiVoice",
        "FarmLedger AI",
        "CropTime Planner",
        "MachineryShare Agri",
      ],
      techStack: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Next.js API Routes",
        "Mock AI logic",
        "Rule-based decision engine",
        "Reusable dashboard components",
      ],
      futureRoadmap: [
        "Real crop disease ML model",
        "Live weather API",
        "PostgreSQL database",
        "SMS and WhatsApp alerts",
        "Real speech-to-text and text-to-speech",
        "Payment and order tracking",
        "Bank/MFI dashboard",
      ],
    },
  });
}


