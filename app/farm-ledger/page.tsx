"use client";

import DashboardLayout from "@/components/DashboardLayout";
import PageHeader from "@/components/PageHeader";
import type { FarmLedgerInput, FarmLedgerResult } from "@/lib/calculations";
import { formatBDT } from "@/lib/calculations";
import {
  BarChart3,
  Calculator,
  CheckCircle2,
  Coins,
  FileText,
  Leaf,
  TrendingDown,
  TrendingUp,
  WalletCards,
} from "lucide-react";
import { useMemo, useState } from "react";

export default function FarmLedgerPage() {
  const [form, setForm] = useState<FarmLedgerInput>({
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
  });

  const [result, setResult] = useState<FarmLedgerResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");

  const costBreakdown = useMemo(
    () => [
      { label: "Seed", value: form.seedCost },
      { label: "Fertilizer", value: form.fertilizerCost },
      { label: "Labor", value: form.laborCost },
      { label: "Pesticide", value: form.pesticideCost },
      { label: "Irrigation", value: form.irrigationCost },
      { label: "Transport", value: form.transportCost },
      { label: "Other", value: form.otherCost },
    ],
    [form]
  );

  const maxCost = Math.max(...costBreakdown.map((item) => item.value), 1);

  function updateField(field: keyof FarmLedgerInput, value: string) {
    setForm((previous) => ({
      ...previous,
      [field]:
        field === "cropName"
          ? value
          : Number.isNaN(Number(value))
          ? 0
          : Number(value),
    }));
  }

  async function handleCalculate() {
    setLoading(true);
    setApiMessage("");

    try {
      const response = await fetch("/api/farm-ledger", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.message || "Failed to calculate farm ledger.");
      }

      setResult(json.data);
      setApiMessage(json.message || "FarmLedger report generated.");
    } catch (error) {
      setApiMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while calculating farm ledger."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="FarmLedger AI"
        description="Track farm expenses, selling income, profit/loss, ROI, and cost per acre using the Yousun Agri360 backend API route."
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_420px]">
        <section className="space-y-6">
          <div className="relative overflow-hidden rounded-[2rem] border border-green-100 bg-gradient-to-r from-green-100 via-lime-50 to-amber-50 p-7 shadow-xl shadow-green-100">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-lime-300/25 blur-3xl" />
            <div className="absolute -bottom-24 left-20 h-64 w-64 rounded-full bg-green-300/25 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-black text-green-800 shadow">
                  <WalletCards size={16} />
                  Backend Connected Farm Finance
                </div>

                <h2 className="text-3xl font-black text-slate-900">
                  Know your real farming profit
                </h2>
                <p className="mt-3 max-w-2xl text-sm font-semibold leading-relaxed text-slate-600">
                  This module sends farm cost and income data to the backend API
                  route, then returns total cost, profit/loss, ROI, and cost per
                  acre.
                </p>
              </div>

              <div className="rounded-3xl bg-white/80 p-5 text-center shadow-lg backdrop-blur">
                <Coins size={52} className="mx-auto text-green-600" />
                <p className="mt-2 text-sm font-black text-slate-500">
                  API Route
                </p>
                <p className="text-2xl font-black text-slate-900">
                  /farm-ledger
                </p>
              </div>
            </div>
          </div>

          <div className="agri-card rounded-3xl p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                <Calculator size={26} />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Farm Accounting Input
                </h2>
                <p className="text-sm font-semibold text-slate-500">
                  Enter crop, land size, costs, and selling income.
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">
                  Crop Name
                </label>
                <select
                  value={form.cropName}
                  onChange={(event) =>
                    updateField("cropName", event.target.value)
                  }
                  className="h-12 w-full rounded-2xl border border-green-100 bg-white px-4 text-sm font-bold text-slate-700 outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100"
                >
                  <option>Boro Rice</option>
                  <option>Tomato</option>
                  <option>Potato</option>
                  <option>Onion</option>
                  <option>Maize</option>
                  <option>Mango</option>
                </select>
              </div>

              <NumberInput
                label="Land Size"
                suffix="acre"
                value={form.landSize}
                onChange={(value) => updateField("landSize", value)}
              />

              <NumberInput
                label="Seed Cost"
                value={form.seedCost}
                onChange={(value) => updateField("seedCost", value)}
              />

              <NumberInput
                label="Fertilizer Cost"
                value={form.fertilizerCost}
                onChange={(value) => updateField("fertilizerCost", value)}
              />

              <NumberInput
                label="Labor Cost"
                value={form.laborCost}
                onChange={(value) => updateField("laborCost", value)}
              />

              <NumberInput
                label="Pesticide Cost"
                value={form.pesticideCost}
                onChange={(value) => updateField("pesticideCost", value)}
              />

              <NumberInput
                label="Irrigation Cost"
                value={form.irrigationCost}
                onChange={(value) => updateField("irrigationCost", value)}
              />

              <NumberInput
                label="Transport Cost"
                value={form.transportCost}
                onChange={(value) => updateField("transportCost", value)}
              />

              <NumberInput
                label="Other Cost"
                value={form.otherCost}
                onChange={(value) => updateField("otherCost", value)}
              />

              <NumberInput
                label="Selling Income"
                value={form.sellingIncome}
                onChange={(value) => updateField("sellingIncome", value)}
              />
            </div>

            {apiMessage && (
              <div
                className={`mt-5 rounded-2xl p-4 text-sm font-bold ${
                  result
                    ? "bg-green-50 text-green-800"
                    : "bg-orange-50 text-orange-800"
                }`}
              >
                {apiMessage}
              </div>
            )}

            <button
              onClick={handleCalculate}
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-600 to-lime-500 py-4 text-sm font-black text-white shadow-lg shadow-green-200 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Calculator size={20} />
              {loading ? "Calling FarmLedger API..." : "Calculate Profit / Loss"}
            </button>
          </div>

          {result && (
            <div className="agri-card rounded-3xl p-6">
              <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black uppercase tracking-wide text-green-700">
                    API FarmLedger Result
                  </p>
                  <h2 className="mt-1 text-3xl font-black text-slate-900">
                    {result.cropName} Season Report
                  </h2>
                </div>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-black ${
                    result.status === "Profit"
                      ? "bg-green-50 text-green-700"
                      : result.status === "Loss"
                      ? "bg-red-50 text-red-700"
                      : "bg-orange-50 text-orange-700"
                  }`}
                >
                  {result.status}
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                <ResultCard
                  label="Total Cost"
                  value={formatBDT(result.totalCost)}
                  icon={WalletCards}
                  tone="orange"
                />
                <ResultCard
                  label="Total Income"
                  value={formatBDT(result.totalIncome)}
                  icon={Coins}
                  tone="green"
                />
                <ResultCard
                  label={result.profit >= 0 ? "Profit" : "Loss"}
                  value={formatBDT(Math.abs(result.profit))}
                  icon={result.profit >= 0 ? TrendingUp : TrendingDown}
                  tone={result.profit >= 0 ? "green" : "red"}
                />
                <ResultCard
                  label="ROI"
                  value={`${result.roi.toFixed(2)}%`}
                  icon={BarChart3}
                  tone="blue"
                />
              </div>

              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="font-black text-slate-900">
                    Cost Breakdown
                  </h3>

                  <div className="mt-5 space-y-4">
                    {costBreakdown.map((item) => (
                      <div key={item.label}>
                        <div className="mb-1 flex justify-between text-sm font-bold">
                          <span className="text-slate-600">{item.label}</span>
                          <span className="text-slate-900">
                            {formatBDT(item.value)}
                          </span>
                        </div>

                        <div className="h-3 overflow-hidden rounded-full bg-white">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-green-600 to-lime-400"
                            style={{
                              width: `${(item.value / maxCost) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-green-50 p-5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="text-green-700" size={22} />
                    <h3 className="font-black text-green-900">
                      AI Recommendation
                    </h3>
                  </div>

                  <p className="mt-3 text-sm font-semibold leading-relaxed text-green-800">
                    {result.recommendation}
                  </p>

                  <div className="mt-5 rounded-2xl bg-white p-4">
                    <p className="text-xs font-black uppercase text-slate-500">
                      Cost Per Acre
                    </p>
                    <p className="mt-1 text-2xl font-black text-slate-900">
                      {formatBDT(result.costPerAcre)}
                    </p>
                  </div>

                  <div className="mt-4 rounded-2xl bg-white p-4">
                    <p className="text-xs font-black uppercase text-slate-500">
                      Land Size
                    </p>
                    <p className="mt-1 text-2xl font-black text-slate-900">
                      {result.landSize} acre
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-blue-50 p-5">
                <div className="flex items-start gap-3">
                  <FileText className="mt-1 text-blue-700" size={22} />
                  <div>
                    <h3 className="font-black text-blue-900">
                      Report Summary
                    </h3>
                    <p className="mt-2 text-sm font-semibold leading-relaxed text-blue-800">
                      For {result.cropName}, your total farming cost is{" "}
                      {formatBDT(result.totalCost)} and your total selling
                      income is {formatBDT(result.totalIncome)}. Your final{" "}
                      {result.profit >= 0 ? "profit" : "loss"} is{" "}
                      {formatBDT(Math.abs(result.profit))}, with ROI of{" "}
                      {result.roi.toFixed(2)}%.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        <aside className="space-y-5">
          <div className="agri-card rounded-3xl p-6">
            <h3 className="text-xl font-black text-slate-900">API Workflow</h3>

            <div className="mt-5 space-y-4">
              {[
                "Farmer enters all farm cost and income data.",
                "Frontend sends request to /api/farm-ledger.",
                "Backend calculates total cost, profit/loss, ROI.",
                "API returns structured finance report.",
                "Farmer uses report for planning and loan support.",
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
            <h3 className="text-xl font-black">Backend Connected</h3>
            <p className="mt-3 text-sm font-semibold leading-relaxed text-green-50">
              This module now uses the Next.js API route{" "}
              <span className="font-black">/api/farm-ledger</span>. It
              calculates farm business results from a backend layer.
            </p>
          </div>

          <div className="agri-card rounded-3xl p-6">
            <h3 className="text-xl font-black text-slate-900">
              Smart Use Cases
            </h3>

            <div className="mt-4 space-y-3">
              {[
                "Season-wise profit/loss report",
                "Loan application support",
                "Cost comparison with previous season",
                "Future crop planning",
                "Market price decision making",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl bg-green-50 p-3"
                >
                  <Leaf className="text-green-700" size={18} />
                  <p className="text-sm font-black text-green-900">{item}</p>
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
  suffix = "BDT",
}: {
  label: string;
  value: number;
  onChange: (value: string) => void;
  suffix?: string;
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
  tone: "green" | "orange" | "blue" | "red";
}) {
  const toneClass = {
    green: "bg-green-50 text-green-700",
    orange: "bg-orange-50 text-orange-700",
    blue: "bg-blue-50 text-blue-700",
    red: "bg-red-50 text-red-700",
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



