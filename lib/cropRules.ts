// lib/cropRules.ts

// ===============================
// FarmWeather Guard Logic
// ===============================

export type WeatherRiskResult = {
  crop: string;
  location: string;
  condition: string;
  riskLevel: "Low" | "Medium" | "High";
  riskScore: number;
  mainWarning: string;
  advice: string[];
  avoid: string[];
  nextAction: string;
};

export function generateWeatherRisk(
  crop: string,
  location: string,
  condition: string
): WeatherRiskResult {
  const cropName = crop.toLowerCase();
  const weather = condition.toLowerCase();

  if (weather.includes("heavy rain") || weather.includes("flood")) {
    return {
      crop,
      location,
      condition,
      riskLevel: "High",
      riskScore: 88,
      mainWarning:
        "High rainfall may cause waterlogging, disease spread, and fertilizer loss.",
      advice: [
        "Check field drainage immediately.",
        "Do not spray pesticide or fertilizer before rainfall.",
        "Protect seedlings and low areas from standing water.",
        "After rain, inspect leaves for fungal or bacterial disease symptoms.",
      ],
      avoid: [
        "Avoid irrigation today.",
        "Avoid pesticide spraying before rain.",
        "Avoid applying urea before heavy rainfall.",
      ],
      nextAction: cropName.includes("rice")
        ? "Maintain controlled water level and open drainage if water rises too much."
        : "Create drainage channels around the crop bed and monitor root-zone moisture.",
    };
  }

  if (weather.includes("heat") || weather.includes("high temperature")) {
    return {
      crop,
      location,
      condition,
      riskLevel: "Medium",
      riskScore: 71,
      mainWarning:
        "High temperature may increase water stress, leaf burn, and pest pressure.",
      advice: [
        "Irrigate early morning or evening.",
        "Use mulch to reduce soil moisture loss.",
        "Monitor leaves for curling, burning, or yellowing.",
        "Check for pest activity because heat can increase pest movement.",
      ],
      avoid: [
        "Avoid irrigation during midday heat.",
        "Avoid over-fertilizing stressed crops.",
        "Avoid transplanting during peak heat hours.",
      ],
      nextAction:
        "Schedule irrigation during cooler hours and check soil moisture before applying water.",
    };
  }

  if (weather.includes("storm") || weather.includes("strong wind")) {
    return {
      crop,
      location,
      condition,
      riskLevel: "High",
      riskScore: 82,
      mainWarning:
        "Strong wind or storm may damage plants, break stems, and affect flowering or fruiting.",
      advice: [
        "Support weak plants with stakes if possible.",
        "Harvest mature fruits or vegetables early if storm risk is high.",
        "Keep machinery and irrigation pipes in a safe place.",
        "After storm, check broken stems and disease entry points.",
      ],
      avoid: [
        "Avoid pesticide spraying during strong wind.",
        "Avoid leaving tools and machines in open fields.",
        "Avoid harvesting during storm conditions.",
      ],
      nextAction:
        "Secure field materials and check crop damage immediately after the storm passes.",
    };
  }

  if (weather.includes("cold") || weather.includes("fog")) {
    return {
      crop,
      location,
      condition,
      riskLevel: "Medium",
      riskScore: 64,
      mainWarning:
        "Cold or foggy weather can slow crop growth and increase fungal disease risk.",
      advice: [
        "Check leaves for fungal spots.",
        "Avoid watering late in the evening.",
        "Keep proper spacing for air movement.",
        "Use protective covering for sensitive seedlings.",
      ],
      avoid: [
        "Avoid extra water at night.",
        "Avoid dense planting.",
        "Avoid late pesticide spraying in foggy conditions.",
      ],
      nextAction:
        "Inspect crop leaves in the morning and maintain proper field ventilation.",
    };
  }

  return {
    crop,
    location,
    condition,
    riskLevel: "Low",
    riskScore: 34,
    mainWarning:
      "Current weather condition is mostly stable for farming activities.",
    advice: [
      "Continue regular crop monitoring.",
      "Follow the crop calendar for irrigation and fertilizer.",
      "Check leaves weekly for pest or disease symptoms.",
      "Record field activity in FarmLedger.",
    ],
    avoid: [
      "Avoid unnecessary pesticide use.",
      "Avoid over-irrigation.",
      "Avoid applying fertilizer without crop need.",
    ],
    nextAction:
      "Continue normal farming schedule and monitor weather updates daily.",
  };
}

// ===============================
// CropTime Planner Logic
// ===============================

export type CropTask = {
  day: number;
  title: string;
  category:
    | "Preparation"
    | "Irrigation"
    | "Fertilizer"
    | "Disease Check"
    | "Pest Check"
    | "Harvest";
  description: string;
  date: string;
};

export type CropCalendarResult = {
  crop: string;
  plantingDate: string;
  estimatedHarvestDate: string;
  durationDays: number;
  tasks: CropTask[];
  summary: string;
};

function addDaysToDate(dateString: string, days: number): string {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Invalid date";
  }

  date.setDate(date.getDate() + days);

  return date.toLocaleDateString("en-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function createTask(
  plantingDate: string,
  day: number,
  title: string,
  category: CropTask["category"],
  description: string
): CropTask {
  return {
    day,
    title,
    category,
    description,
    date: addDaysToDate(plantingDate, day - 1),
  };
}

export function generateCropCalendar(
  crop: string,
  plantingDate: string
): CropCalendarResult {
  const cropName = crop.toLowerCase();

  if (cropName.includes("rice") || cropName.includes("boro")) {
    const durationDays = 110;

    return {
      crop,
      plantingDate,
      estimatedHarvestDate: addDaysToDate(plantingDate, durationDays),
      durationDays,
      summary:
        "Boro rice needs careful irrigation, fertilizer timing, pest monitoring, and water-level control during the growing period.",
      tasks: [
        createTask(
          plantingDate,
          1,
          "Land preparation and transplanting",
          "Preparation",
          "Prepare the field, maintain proper puddling, and transplant healthy seedlings."
        ),
        createTask(
          plantingDate,
          7,
          "First irrigation check",
          "Irrigation",
          "Maintain shallow water level and check if seedlings are properly established."
        ),
        createTask(
          plantingDate,
          15,
          "First fertilizer application",
          "Fertilizer",
          "Apply fertilizer according to local recommendation and avoid overuse of urea."
        ),
        createTask(
          plantingDate,
          25,
          "Pest and disease inspection",
          "Pest Check",
          "Check for stem borer, leaf folder, brown planthopper, and yellowing leaves."
        ),
        createTask(
          plantingDate,
          45,
          "Second fertilizer and water management",
          "Fertilizer",
          "Apply second fertilizer dose if needed and keep controlled field water level."
        ),
        createTask(
          plantingDate,
          70,
          "Flowering stage monitoring",
          "Disease Check",
          "Monitor weather, pests, and disease because crop is sensitive during flowering."
        ),
        createTask(
          plantingDate,
          100,
          "Harvesting preparation",
          "Harvest",
          "Check grain maturity, arrange labor or harvester, and prepare storage space."
        ),
        createTask(
          plantingDate,
          110,
          "Estimated harvesting",
          "Harvest",
          "Harvest when most grains are mature and dry properly before storage."
        ),
      ],
    };
  }

  if (cropName.includes("tomato")) {
    const durationDays = 90;

    return {
      crop,
      plantingDate,
      estimatedHarvestDate: addDaysToDate(plantingDate, durationDays),
      durationDays,
      summary:
        "Tomato requires regular disease monitoring, proper staking, balanced fertilizer, and careful irrigation.",
      tasks: [
        createTask(
          plantingDate,
          1,
          "Seedling transplanting",
          "Preparation",
          "Transplant healthy tomato seedlings with proper spacing and water carefully."
        ),
        createTask(
          plantingDate,
          7,
          "Irrigation and plant establishment check",
          "Irrigation",
          "Check soil moisture and avoid waterlogging around tomato roots."
        ),
        createTask(
          plantingDate,
          15,
          "First fertilizer application",
          "Fertilizer",
          "Apply balanced fertilizer and avoid excessive nitrogen."
        ),
        createTask(
          plantingDate,
          25,
          "Disease inspection",
          "Disease Check",
          "Check leaves for fungal spots, yellowing, curling, and early blight symptoms."
        ),
        createTask(
          plantingDate,
          35,
          "Staking and pest monitoring",
          "Pest Check",
          "Support plants with stakes and monitor fruit borer or whitefly attack."
        ),
        createTask(
          plantingDate,
          55,
          "Flowering and fruiting care",
          "Fertilizer",
          "Maintain regular irrigation and apply fertilizer according to crop condition."
        ),
        createTask(
          plantingDate,
          70,
          "First harvesting period",
          "Harvest",
          "Start harvesting mature tomatoes and sort good-quality fruits."
        ),
        createTask(
          plantingDate,
          90,
          "Peak harvesting period",
          "Harvest",
          "Continue harvesting and check market price before selling."
        ),
      ],
    };
  }

  if (cropName.includes("potato")) {
    const durationDays = 95;

    return {
      crop,
      plantingDate,
      estimatedHarvestDate: addDaysToDate(plantingDate, durationDays),
      durationDays,
      summary:
        "Potato needs good soil preparation, disease prevention, irrigation control, and timely harvesting.",
      tasks: [
        createTask(
          plantingDate,
          1,
          "Seed potato planting",
          "Preparation",
          "Plant healthy seed potatoes in prepared soil with correct spacing."
        ),
        createTask(
          plantingDate,
          10,
          "First irrigation check",
          "Irrigation",
          "Check soil moisture and avoid excessive water."
        ),
        createTask(
          plantingDate,
          20,
          "Fertilizer application",
          "Fertilizer",
          "Apply fertilizer according to land condition and crop growth."
        ),
        createTask(
          plantingDate,
          30,
          "Early blight inspection",
          "Disease Check",
          "Check leaves for brown spots, yellowing, or fungal disease."
        ),
        createTask(
          plantingDate,
          45,
          "Earthing up",
          "Preparation",
          "Cover the base of the plant with soil to support tuber development."
        ),
        createTask(
          plantingDate,
          60,
          "Late blight and pest check",
          "Disease Check",
          "Monitor for late blight, leaf damage, and insect attack."
        ),
        createTask(
          plantingDate,
          85,
          "Harvest preparation",
          "Harvest",
          "Reduce irrigation and prepare labor or tools for harvesting."
        ),
        createTask(
          plantingDate,
          95,
          "Estimated harvesting",
          "Harvest",
          "Harvest potatoes carefully to avoid tuber damage."
        ),
      ],
    };
  }

  const durationDays = 100;

  return {
    crop,
    plantingDate,
    estimatedHarvestDate: addDaysToDate(plantingDate, durationDays),
    durationDays,
    summary:
      "This is a general crop calendar. Add local crop data later for more accurate planning.",
    tasks: [
      createTask(
        plantingDate,
        1,
        "Crop planting",
        "Preparation",
        "Plant crop using proper spacing and healthy seed or seedling."
      ),
      createTask(
        plantingDate,
        7,
        "First irrigation check",
        "Irrigation",
        "Check soil moisture and water the field if needed."
      ),
      createTask(
        plantingDate,
        15,
        "Fertilizer application",
        "Fertilizer",
        "Apply fertilizer based on crop need and soil condition."
      ),
      createTask(
        plantingDate,
        30,
        "Disease and pest inspection",
        "Disease Check",
        "Inspect leaves, stem, and soil for disease or pest symptoms."
      ),
      createTask(
        plantingDate,
        60,
        "Growth monitoring",
        "Pest Check",
        "Check crop growth, water level, and pest activity."
      ),
      createTask(
        plantingDate,
        90,
        "Harvest preparation",
        "Harvest",
        "Prepare storage, labor, transport, and market plan."
      ),
      createTask(
        plantingDate,
        100,
        "Estimated harvesting",
        "Harvest",
        "Harvest crop at proper maturity and store safely."
      ),
    ],
  };
}


