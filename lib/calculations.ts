export type FarmLedgerInput = {
  cropName: string;
  landSize: number;
  seedCost: number;
  fertilizerCost: number;
  laborCost: number;
  pesticideCost: number;
  irrigationCost: number;
  transportCost: number;
  otherCost: number;
  sellingIncome: number;
};

export type FarmLedgerResult = {
  cropName: string;
  landSize: number;
  totalCost: number;
  totalIncome: number;
  profit: number;
  roi: number;
  costPerAcre: number;
  status: "Profit" | "Loss" | "Break Even";
  recommendation: string;
};

export function calculateFarmLedger(
  input: FarmLedgerInput
): FarmLedgerResult {
  const totalCost =
    input.seedCost +
    input.fertilizerCost +
    input.laborCost +
    input.pesticideCost +
    input.irrigationCost +
    input.transportCost +
    input.otherCost;

  const totalIncome = input.sellingIncome;
  const profit = totalIncome - totalCost;

  const roi = totalCost > 0 ? (profit / totalCost) * 100 : 0;
  const costPerAcre = input.landSize > 0 ? totalCost / input.landSize : 0;

  let status: "Profit" | "Loss" | "Break Even" = "Break Even";
  let recommendation =
    "Your income and cost are almost equal. Try to reduce unnecessary expenses next season.";

  if (profit > 0) {
    status = "Profit";
    recommendation =
      "Your farm is profitable. Keep tracking costs and compare market prices before selling.";
  }

  if (profit < 0) {
    status = "Loss";
    recommendation =
      "Your farm is in loss. Review fertilizer, labor, transport cost, and selling price carefully.";
  }

  return {
    cropName: input.cropName,
    landSize: input.landSize,
    totalCost,
    totalIncome,
    profit,
    roi,
    costPerAcre,
    status,
    recommendation,
  };
}

export function formatBDT(value: number): string {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(value);
}

import { MarketPrice } from "@/data/marketPrices";

export type MarketDecisionResult = {
  crop: string;
  quantityKg: number;
  transportCostPerKm: number;
  options: MarketOption[];
  bestOption: MarketOption;
  recommendation: string;
};

export type MarketOption = {
  market: string;
  location: string;
  buyerType: string;
  pricePerKg: number;
  demand: string;
  distanceKm: number;
  grossIncome: number;
  transportCost: number;
  netIncome: number;
};

export function calculateMarketDecision(
  crop: string,
  quantityKg: number,
  transportCostPerKm: number,
  prices: MarketPrice[]
): MarketDecisionResult {
  const filteredPrices = prices.filter((item) => item.crop === crop);

  const options: MarketOption[] = filteredPrices.map((item) => {
    const grossIncome = item.pricePerKg * quantityKg;
    const transportCost = item.distanceKm * transportCostPerKm;
    const netIncome = grossIncome - transportCost;

    return {
      market: item.market,
      location: item.location,
      buyerType: item.buyerType,
      pricePerKg: item.pricePerKg,
      demand: item.demand,
      distanceKm: item.distanceKm,
      grossIncome,
      transportCost,
      netIncome,
    };
  });

  const bestOption = options.reduce((best, current) =>
    current.netIncome > best.netIncome ? current : best
  );

  return {
    crop,
    quantityKg,
    transportCostPerKm,
    options,
    bestOption,
    recommendation: `${bestOption.market} is the best option because it gives the highest net income after transport cost.`,
  };
}


export type AgriCreditInput = {
  farmerName: string;
  cropName: string;
  landSize: number;
  seasonsCompleted: number;
  yearlyIncome: number;
  yearlyExpense: number;
  requestedLoan: number;
  previousRepayment: "Good" | "Average" | "Poor";
  hasMarketRecord: "Yes" | "No";
};

export type AgriCreditResult = {
  farmerName: string;
  cropName: string;
  netIncome: number;
  creditScore: number;
  riskLevel: "Low" | "Medium" | "High";
  loanStatus: "Recommended" | "Review Needed" | "Not Recommended";
  suggestedLoanType: string;
  repaymentCapacity: number;
  reasons: string[];
  recommendation: string;
};

export function calculateAgriCredit(
  input: AgriCreditInput
): AgriCreditResult {
  const netIncome = input.yearlyIncome - input.yearlyExpense;
  const profitRatio =
    input.yearlyIncome > 0 ? (netIncome / input.yearlyIncome) * 100 : 0;

  let score = 40;
  const reasons: string[] = [];

  if (input.landSize >= 1) {
    score += 10;
    reasons.push("Farmer has usable land size for production.");
  } else {
    score += 4;
    reasons.push("Land size is small, so loan amount should be controlled.");
  }

  if (input.seasonsCompleted >= 3) {
    score += 12;
    reasons.push("Farmer has completed multiple farming seasons.");
  } else {
    score += 5;
    reasons.push("Limited season history available.");
  }

  if (profitRatio >= 30) {
    score += 15;
    reasons.push("Farm income shows strong profit margin.");
  } else if (profitRatio >= 10) {
    score += 8;
    reasons.push("Farm income shows moderate profit margin.");
  } else {
    score -= 5;
    reasons.push("Profit margin is weak or risky.");
  }

  if (input.previousRepayment === "Good") {
    score += 15;
    reasons.push("Previous repayment history is good.");
  } else if (input.previousRepayment === "Average") {
    score += 7;
    reasons.push("Previous repayment history is average.");
  } else {
    score -= 10;
    reasons.push("Previous repayment history is poor.");
  }

  if (input.hasMarketRecord === "Yes") {
    score += 8;
    reasons.push("Market sales record improves financial trust.");
  } else {
    reasons.push("No market record found, so bank verification may be needed.");
  }

  const repaymentCapacity = Math.max(0, netIncome * 0.35);

  if (input.requestedLoan > repaymentCapacity * 2) {
    score -= 10;
    reasons.push("Requested loan is high compared to repayment capacity.");
  } else {
    score += 5;
    reasons.push("Requested loan is within safer repayment range.");
  }

  score = Math.max(0, Math.min(100, Math.round(score)));

  let riskLevel: "Low" | "Medium" | "High" = "Medium";
  let loanStatus: "Recommended" | "Review Needed" | "Not Recommended" =
    "Review Needed";

  if (score >= 75) {
    riskLevel = "Low";
    loanStatus = "Recommended";
  } else if (score >= 55) {
    riskLevel = "Medium";
    loanStatus = "Review Needed";
  } else {
    riskLevel = "High";
    loanStatus = "Not Recommended";
  }

  let suggestedLoanType = "Small seasonal farming loan";

  if (input.requestedLoan >= 100000) {
    suggestedLoanType = "Production and machinery support loan";
  } else if (input.requestedLoan >= 50000) {
    suggestedLoanType = "Seed, fertilizer, and irrigation loan";
  } else {
    suggestedLoanType = "Short-term input support loan";
  }

  const recommendation =
    loanStatus === "Recommended"
      ? "This farmer profile is suitable for loan approval with regular monitoring."
      : loanStatus === "Review Needed"
      ? "This farmer may receive a smaller loan after manual review and document verification."
      : "This farmer needs stronger income record, lower loan request, or better repayment history before approval.";

  return {
    farmerName: input.farmerName,
    cropName: input.cropName,
    netIncome,
    creditScore: score,
    riskLevel,
    loanStatus,
    suggestedLoanType,
    repaymentCapacity,
    reasons,
    recommendation,
  };
}


