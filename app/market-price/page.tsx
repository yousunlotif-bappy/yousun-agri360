"use client";

import DashboardLayout from "@/components/DashboardLayout";
import PageHeader from "@/components/PageHeader";
import { marketPrices } from "@/data/marketPrices";
import {
  calculateMarketDecision,
  formatBDT,
  MarketDecisionResult,
} from "@/lib/calculations";
import {
  BarChart3,
  CheckCircle2,
  MapPin,
  ShoppingBasket,
  Store,
  TrendingUp,
  Truck,
  WalletCards,
} from "lucide-react";
import { useMemo, useState } from "react";

export default function MarketPricePage() {
  const [crop, setCrop] = useState("Tomato");
  const [quantityKg, setQuantityKg] = useState(500);
  const [transportCostPerKm, setTransportCostPerKm] = useState(80);
  const [result, setResult] = useState<MarketDecisionResult | null>(null);

  const availableCrops = useMemo(() => {
    return Array.from(new Set(marketPrices.map((item) => item.crop)));
  }, []);

  function handleAnalyzeMarket() {
    const decision = calculateMarketDecision(
      crop,
      quantityKg,
      transportCostPerKm,
      marketPrices
    );

    setResult(decision);
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="AgriMarket Link"
        description="Compare crop prices across nearby markets, calculate transport cost, and identify the best selling option for maximum farmer income."
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_420px]">
        <section className="space-y-6">
          <div className="relative overflow-hidden rounded-[2rem] border border-green-100 bg-gradient-to-r from-green-100 via-lime-50 to-amber-50 p-7 shadow-xl shadow-green-100">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-lime-300/25 blur-3xl" />
            <div className="absolute -bottom-24 left-20 h-64 w-64 rounded-full bg-green-300/25 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-black text-green-800 shadow">
                  <Store size={16} />
                  Market Price Intelligence
                </div>

                <h2 className="text-3xl font-black text-slate-900">
                  Sell at the right market, not the nearest one
                </h2>
                <p className="mt-3 max-w-2xl text-sm font-semibold leading-relaxed text-slate-600">
                  Farmers often sell crops at lower prices because they do not
                  know market differences. AgriMarket Link compares prices,
                  demand, distance, and transport cost.
                </p>
              </div>

              <div className="rounded-3xl bg-white/80 p-5 text-center shadow-lg backdrop-blur">
                <TrendingUp size={52} className="mx-auto text-green-600" />
                <p className="mt-2 text-sm font-black text-slate-500">
                  Market Mode
                </p>
                <p className="text-4xl font-black text-slate-900">Live</p>
              </div>
            </div>
          </div>

          <div className="agri-card rounded-3xl p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                <ShoppingBasket size={26} />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Market Selling Decision
                </h2>
                <p className="text-sm font-semibold text-slate-500">
                  Enter crop, quantity, and transport cost to find the best
                  market.
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">
                  Crop
                </label>
                <select
                  value={crop}
                  onChange={(event) => setCrop(event.target.value)}
                  className="h-12 w-full rounded-2xl border border-green-100 bg-white px-4 text-sm font-bold text-slate-700 outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100"
                >
                  {availableCrops.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>

              <NumberInput
                label="Quantity"
                suffix="kg"
                value={quantityKg}
                onChange={(value) => setQuantityKg(Number(value))}
              />

              <NumberInput
                label="Transport Cost"
                suffix="৳/km"
                value={transportCostPerKm}
                onChange={(value) => setTransportCostPerKm(Number(value))}
              />
            </div>

            <button
              onClick={handleAnalyzeMarket}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-600 to-lime-500 py-4 text-sm font-black text-white shadow-lg shadow-green-200 transition hover:scale-[1.01]"
            >
              <BarChart3 size={20} />
              Analyze Best Market
            </button>
          </div>

          {result && (
            <div className="agri-card rounded-3xl p-6">
              <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black uppercase tracking-wide text-green-700">
                    Market Decision Result
                  </p>
                  <h2 className="mt-1 text-3xl font-black text-slate-900">
                    Best Option: {result.bestOption.market}
                  </h2>
                </div>

                <span className="rounded-full bg-green-50 px-4 py-2 text-sm font-black text-green-700">
                  Highest Net Income
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                <ResultCard
                  label="Crop"
                  value={result.crop}
                  icon={ShoppingBasket}
                  tone="green"
                />
                <ResultCard
                  label="Quantity"
                  value={`${result.quantityKg} kg`}
                  icon={Store}
                  tone="blue"
                />
                <ResultCard
                  label="Best Price"
                  value={`৳${result.bestOption.pricePerKg}/kg`}
                  icon={TrendingUp}
                  tone="green"
                />
                <ResultCard
                  label="Net Income"
                  value={formatBDT(result.bestOption.netIncome)}
                  icon={WalletCards}
                  tone="orange"
                />
              </div>

              <div className="mt-6 rounded-2xl bg-green-50 p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 text-green-700" size={22} />
                  <div>
                    <h3 className="font-black text-green-900">
                      AI Recommendation
                    </h3>
                    <p className="mt-2 text-sm font-semibold leading-relaxed text-green-800">
                      {result.recommendation}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-black text-slate-900">
                  Market Comparison
                </h3>

                <div className="mt-4 overflow-hidden rounded-3xl border border-green-100 bg-white">
                  <div className="grid grid-cols-7 bg-green-50 px-4 py-3 text-xs font-black uppercase text-green-800">
                    <span>Market</span>
                    <span>Type</span>
                    <span>Demand</span>
                    <span>Distance</span>
                    <span>Price</span>
                    <span>Transport</span>
                    <span>Net Income</span>
                  </div>

                  {result.options.map((option) => {
                    const isBest = option.market === result.bestOption.market;

                    return (
                      <div
                        key={option.market}
                        className={`grid grid-cols-7 items-center border-t border-green-50 px-4 py-4 text-sm font-bold ${
                          isBest ? "bg-green-50/60" : "bg-white"
                        }`}
                      >
                        <span className="text-slate-900">{option.market}</span>
                        <span className="text-slate-600">
                          {option.buyerType}
                        </span>
                        <span
                          className={`w-fit rounded-full px-3 py-1 text-xs font-black ${
                            option.demand === "High"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {option.demand}
                        </span>
                        <span className="text-slate-600">
                          {option.distanceKm} km
                        </span>
                        <span className="text-slate-900">
                          ৳{option.pricePerKg}/kg
                        </span>
                        <span className="text-slate-600">
                          {formatBDT(option.transportCost)}
                        </span>
                        <span
                          className={`font-black ${
                            isBest ? "text-green-700" : "text-slate-900"
                          }`}
                        >
                          {formatBDT(option.netIncome)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </section>

        <aside className="space-y-5">
          <div className="agri-card rounded-3xl p-6">
            <h3 className="text-xl font-black text-slate-900">
              How AgriMarket Link Works
            </h3>

            <div className="mt-5 space-y-4">
              {[
                "Farmer selects crop and quantity.",
                "System shows prices from multiple markets.",
                "Transport cost is calculated by distance.",
                "System compares net income from each option.",
                "Farmer chooses the market with highest profit.",
              ].map((step, index) => (
                <div key={step} className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-600 text-sm font-black text-white">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-sm font-bold leading-relaxed text-slate-600">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-green-700 to-lime-500 p-6 text-white shadow-xl shadow-green-200">
            <h3 className="text-xl font-black">Why This Matters</h3>
            <p className="mt-3 text-sm font-semibold leading-relaxed text-green-50">
              Farmers often depend on middlemen because they do not know market
              prices. This module helps them compare options and make better
              selling decisions.
            </p>
          </div>

          <div className="agri-card rounded-3xl p-6">
            <h3 className="text-xl font-black text-slate-900">
              Best Market Preview
            </h3>

            <div className="mt-4 space-y-3">
              {marketPrices
                .filter((item) => item.crop === crop)
                .map((item) => (
                  <div
                    key={item.market}
                    className="rounded-2xl bg-green-50 p-4"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="text-green-700" size={18} />
                      <p className="font-black text-green-900">
                        {item.market}
                      </p>
                    </div>
                    <div className="mt-2 flex justify-between text-sm font-bold text-slate-600">
                      <span>{item.location}</span>
                      <span>৳{item.pricePerKg}/kg</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="agri-card rounded-3xl p-6">
            <h3 className="text-xl font-black text-slate-900">
              Future Upgrade
            </h3>
            <div className="mt-4 space-y-3">
              {[
                "Live market API",
                "Buyer demand prediction",
                "SMS price alerts",
                "Direct buyer connection",
                "Transport partner integration",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3"
                >
                  <Truck className="text-green-700" size={18} />
                  <p className="text-sm font-black text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </DashboardLayout>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (value: string) => void;
  suffix: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-black text-slate-700">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-12 w-full rounded-2xl border border-green-100 bg-white px-4 pr-16 text-sm font-bold text-slate-700 outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400">
          {suffix}
        </span>
      </div>
    </div>
  );
}

function ResultCard({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  tone: "green" | "orange" | "blue";
}) {
  const toneClass = {
    green: "bg-green-50 text-green-700",
    orange: "bg-orange-50 text-orange-700",
    blue: "bg-blue-50 text-blue-700",
  };

  return (
    <div className="rounded-2xl border border-green-100 bg-white p-5">
      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${toneClass[tone]}`}
      >
        <Icon size={25} />
      </div>
      <p className="text-xs font-black uppercase text-slate-500">{label}</p>
      <p className="mt-2 text-xl font-black text-slate-900">{value}</p>
    </div>
  );
}


