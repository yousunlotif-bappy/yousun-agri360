export type DiseaseResult = {
  crop: string;
  disease: string;
  confidence: number;
  riskLevel: "Low" | "Medium" | "High";
  cause: string;
  treatment: string[];
  organicSolution: string;
  expertAdvice: string;
};

export function analyzeCropDisease(crop: string): DiseaseResult {
  const normalizedCrop = crop.toLowerCase();

  if (normalizedCrop.includes("rice") || normalizedCrop.includes("boro")) {
    return {
      crop,
      disease: "Possible Bacterial Leaf Blight",
      confidence: 87,
      riskLevel: "Medium",
      cause:
        "This may happen due to excess humidity, infected seed, standing water, or poor field drainage.",
      treatment: [
        "Remove heavily infected leaves if possible.",
        "Avoid excessive nitrogen fertilizer.",
        "Maintain proper field drainage.",
        "Use recommended bactericide only after expert confirmation.",
      ],
      organicSolution:
        "Use clean seed, improve air circulation, and avoid overcrowded planting.",
      expertAdvice:
        "If the yellowing spreads quickly, contact a local agriculture officer.",
    };
  }

  if (normalizedCrop.includes("tomato")) {
    return {
      crop,
      disease: "Possible Fungal Leaf Spot",
      confidence: 91,
      riskLevel: "Medium",
      cause:
        "This may happen due to fungal infection, high moisture, poor air movement, or overhead watering.",
      treatment: [
        "Remove infected leaves carefully.",
        "Avoid watering directly on leaves.",
        "Apply recommended fungicide if infection spreads.",
        "Keep proper spacing between plants.",
      ],
      organicSolution:
        "Use neem-based spray and improve sunlight and air circulation.",
      expertAdvice:
        "Upload another image after 3 days to compare improvement.",
    };
  }

  if (normalizedCrop.includes("potato")) {
    return {
      crop,
      disease: "Possible Early Blight",
      confidence: 84,
      riskLevel: "High",
      cause:
        "This may happen due to fungal attack, old infected plant residue, or humid weather.",
      treatment: [
        "Remove infected leaves from the field.",
        "Avoid overhead irrigation.",
        "Use crop rotation in the next season.",
        "Apply approved fungicide after expert advice.",
      ],
      organicSolution:
        "Use compost-based soil improvement and remove infected plant waste.",
      expertAdvice:
        "High risk detected. Expert review is recommended.",
    };
  }

  return {
    crop,
    disease: "Possible Nutrient Deficiency or Mild Leaf Stress",
    confidence: 76,
    riskLevel: "Low",
    cause:
      "The symptom may be related to nutrient deficiency, water stress, or early disease development.",
    treatment: [
      "Check soil moisture level.",
      "Avoid overwatering.",
      "Inspect the underside of leaves for insects.",
      "Apply balanced fertilizer if nutrient deficiency is confirmed.",
    ],
    organicSolution:
      "Use compost, maintain proper irrigation, and monitor the crop for 3-5 days.",
    expertAdvice:
      "If symptoms increase, contact an agriculture expert.",
  };
}


export type KrishiBotResult = {
  question: string;
  detectedProblem: string;
  urgency: "Low" | "Medium" | "High";
  answer: string;
  nextSteps: string[];
  recommendedModule: string;
};

export function generateKrishiBotAnswer(question: string): KrishiBotResult {
  const text = question.toLowerCase();

  if (
    text.includes("yellow") ||
    text.includes("holud") ||
    text.includes("পাতা") ||
    text.includes("pata")
  ) {
    return {
      question,
      detectedProblem: "Leaf yellowing / possible nutrient deficiency",
      urgency: "Medium",
      answer:
        "Yellow leaves may happen due to nutrient deficiency, overwatering, root stress, or early disease. First check soil moisture and avoid using extra fertilizer without confirming the cause.",
      nextSteps: [
        "Check whether the soil is too wet or too dry.",
        "Inspect leaf underside for insects.",
        "Upload a clear leaf photo in AgriDoctor AI.",
        "Avoid overwatering for the next 24 hours.",
      ],
      recommendedModule: "AgriDoctor AI",
    };
  }

  if (
    text.includes("rain") ||
    text.includes("bristi") ||
    text.includes("বৃষ্টি") ||
    text.includes("weather")
  ) {
    return {
      question,
      detectedProblem: "Weather-related farming risk",
      urgency: "Medium",
      answer:
        "If rain is likely, avoid pesticide or fertilizer spraying because rain can wash it away and waste money. Check drainage before heavy rainfall.",
      nextSteps: [
        "Open FarmWeather Guard.",
        "Check rain risk for your crop.",
        "Do not spray pesticide before rain.",
        "Keep drainage channels open.",
      ],
      recommendedModule: "FarmWeather Guard",
    };
  }

  if (
    text.includes("fertilizer") ||
    text.includes("urea") ||
    text.includes("সার") ||
    text.includes("shar")
  ) {
    return {
      question,
      detectedProblem: "Fertilizer decision support",
      urgency: "Low",
      answer:
        "Fertilizer should be applied based on crop stage, soil condition, and weather. Avoid applying urea before heavy rain because nutrient loss can happen.",
      nextSteps: [
        "Check crop stage first.",
        "Avoid fertilizer before rainfall.",
        "Record fertilizer cost in FarmLedger AI.",
        "Follow CropTime Planner schedule.",
      ],
      recommendedModule: "CropTime Planner",
    };
  }

  if (
    text.includes("price") ||
    text.includes("market") ||
    text.includes("dam") ||
    text.includes("দাম")
  ) {
    return {
      question,
      detectedProblem: "Market price and selling decision",
      urgency: "Low",
      answer:
        "Before selling, compare local market, district market, and wholesale buyer price. Sometimes a farther market gives better net income even after transport cost.",
      nextSteps: [
        "Open AgriMarket Link.",
        "Enter crop and quantity.",
        "Compare net income after transport cost.",
        "Then list product in Farm2Market.",
      ],
      recommendedModule: "AgriMarket Link",
    };
  }

  if (
    text.includes("loan") ||
    text.includes("credit") ||
    text.includes("rin") ||
    text.includes("ঋণ")
  ) {
    return {
      question,
      detectedProblem: "Loan or credit support",
      urgency: "Medium",
      answer:
        "For loan readiness, keep farm expense, income, crop history, and sales records. These records can help banks or MFIs understand repayment ability.",
      nextSteps: [
        "Record costs in FarmLedger AI.",
        "Generate credit profile in AgriCredit AI.",
        "Keep market sales record.",
        "Request a loan amount within repayment capacity.",
      ],
      recommendedModule: "AgriCredit AI",
    };
  }

  return {
    question,
    detectedProblem: "General farming question",
    urgency: "Low",
    answer:
      "Your question is important. For better advice, mention crop name, crop age, location, symptom, and weather condition. You can also use AgriDoctor AI for photo-based crop diagnosis.",
    nextSteps: [
      "Mention crop name clearly.",
      "Add crop age and location.",
      "Describe symptoms properly.",
      "Use AgriDoctor AI or FarmWeather Guard if needed.",
    ],
    recommendedModule: "KrishiBot AI",
  };
}

export type KrishiVoiceResult = {
  voiceInput: string;
  detectedLanguage: "Bangla-English Mixed" | "Bangla" | "English";
  transcript: string;
  voiceReply: string;
  action: string;
};

export function generateKrishiVoiceReply(voiceInput: string): KrishiVoiceResult {
  const text = voiceInput.toLowerCase();

  if (
    text.includes("dhan") ||
    text.includes("ধান") ||
    text.includes("pata lal") ||
    text.includes("পাতা লাল")
  ) {
    return {
      voiceInput,
      detectedLanguage: "Bangla-English Mixed",
      transcript: voiceInput,
      voiceReply:
        "আপনার ধান গাছের পাতায় সমস্যা হতে পারে পুষ্টির ঘাটতি, রোগ, বা পানি ব্যবস্থাপনার কারণে। প্রথমে জমিতে পানি বেশি আছে কিনা দেখুন, তারপর পাতার ছবি AgriDoctor AI-তে আপলোড করুন।",
      action: "Open AgriDoctor AI for photo diagnosis",
    };
  }

  if (
    text.includes("bristi") ||
    text.includes("বৃষ্টি") ||
    text.includes("rain")
  ) {
    return {
      voiceInput,
      detectedLanguage: "Bangla-English Mixed",
      transcript: voiceInput,
      voiceReply:
        "আজ বা আগামীকাল বৃষ্টির সম্ভাবনা থাকলে কীটনাশক বা সার স্প্রে করবেন না। আগে FarmWeather Guard থেকে আবহাওয়ার ঝুঁকি দেখে নিন।",
      action: "Open FarmWeather Guard",
    };
  }

  if (
    text.includes("dam") ||
    text.includes("দাম") ||
    text.includes("market")
  ) {
    return {
      voiceInput,
      detectedLanguage: "Bangla-English Mixed",
      transcript: voiceInput,
      voiceReply:
        "ফসল বিক্রির আগে কাছের বাজার, জেলা বাজার এবং পাইকারি ক্রেতার দাম তুলনা করুন। AgriMarket Link ব্যবহার করলে পরিবহন খরচ বাদ দিয়ে কোন বাজারে বেশি লাভ হবে তা জানা যাবে।",
      action: "Open AgriMarket Link",
    };
  }

  return {
    voiceInput,
    detectedLanguage: "Bangla-English Mixed",
    transcript: voiceInput,
    voiceReply:
      "আপনার প্রশ্নটি বুঝেছি। ভালো পরামর্শের জন্য ফসলের নাম, বয়স, লক্ষণ এবং অবস্থান বলুন। প্রয়োজনে ছবি আপলোড করে AgriDoctor AI ব্যবহার করুন।",
    action: "Ask again with crop name and symptom",
  };
}

