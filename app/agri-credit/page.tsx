"use client";

import DashboardLayout from "@/components/DashboardLayout";
import PageHeader from "@/components/PageHeader";
import type { AgriCreditInput, AgriCreditResult } from "@/lib/calculations";
import { formatBDT } from "@/lib/calculations";
import {
  BadgeCheck,
  Banknote,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  LandPlot,
  ShieldAlert,
  TrendingUp,
  UserRound,
  WalletCards,
} from "lucide-react";
import { useState } from "react";

export default function AgriCreditPage() {
  const [form, setForm] = useState<AgriCreditInput>({
    farmerName: "Bappy",
    cropName: "Boro Rice",
    landSize: 1.5,
    seasonsCompleted: 4,
    yearlyIncome: 360000,
    yearlyExpense: 185000,
    requestedLoan: 75000,
    previousRepayment: "Good",
    hasMarketRecord: "Yes",
  });

  const [result, setResult] = useState<AgriCreditResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");

  function updateField(field: keyof AgriCreditInput, value: string) {
    setForm((previous) => ({
      ...previous,
      [field]:
        field === "farmerName" ||
        field === "cropName" ||
        field === "previousRepayment" ||
        field === "hasMarketRecord"
          ? value
          : Number.isNaN(Number(value))
          ? 0
          : Number(value),
    }));
  }

  async function handleGenerateProfile() {
    setLoading(true);
    setApiMessage("");

    try {
      const response = await fetch("/api/agri-credit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.message || "Failed to generate credit profile.");
      }

      setResult(json.data);
      setApiMessage(json.message || "Credit profile generated successfully.");
    } catch (error) {
      setApiMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while generating credit profile."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="AgriCredit AI"
        description="Create a digital farmer credit profile using the Yousun Agri360 backend API route. The system calculates credit score, risk level, repayment capacity, and loan recommendation."
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_420px]">
        <section className="space-y-6">
          <div className="relative overflow-hidden rounded-[2rem] border border-green-100 bg-gradient-to-r from-green-100 via-lime-50 to-amber-50 p-7 shadow-xl shadow-green-100">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-lime-300/25 blur-3xl" />
            <div className="absolute -bottom-24 left-20 h-64 w-64 rounded-full bg-green-300/25 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-black text-green-800 shadow">
                  <BadgeCheck size={16} />
                  Backend Connected Credit Profile
                </div>

                <h2 className="text-3xl font-black text-slate-900">
                  Turn farm records into loan readiness
                </h2>

                <p className="mt-3 max-w-2xl text-sm font-semibold leading-relaxed text-slate-600">
                  This module sends farmer finance, land, crop, repayment, and
                  market record data to the backend API route, then generates a
                  bank/MFI-style credit profile.
                </p>
              </div>

              <div className="rounded-3xl bg-white/80 p-5 text-center shadow-lg backdrop-blur">
                <Banknote size={52} className="mx-auto text-green-600" />
                <p className="mt-2 text-sm font-black text-slate-500">
                  API Route
                </p>
                <p className="text-2xl font-black text-slate-900">
                  /agri-credit
                </p>
              </div>
            </div>
          </div>

          <div className="agri-card rounded-3xl p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                <ClipboardCheck size={26} />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Farmer Credit Input
                </h2>
                <p className="text-sm font-semibold text-slate-500">
                  Enter farmer, farm, income, repayment, and loan information.
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <TextInput
                label="Farmer Name"
                value={form.farmerName}
                onChange={(value) => updateField("farmerName", value)}
              />

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
                label="Completed Seasons"
                suffix="seasons"
                value={form.seasonsCompleted}
                onChange={(value) => updateField("seasonsCompleted", value)}
              />

              <NumberInput
                label="Yearly Farm Income"
                suffix="BDT"
                value={form.yearlyIncome}
                onChange={(value) => updateField("yearlyIncome", value)}
              />

              <NumberInput
                label="Yearly Farm Expense"
                suffix="BDT"
                value={form.yearlyExpense}
                onChange={(value) => updateField("yearlyExpense", value)}
              />

              <NumberInput
                label="Requested Loan"
                suffix="BDT"
                value={form.requestedLoan}
                onChange={(value) => updateField("requestedLoan", value)}
              />

              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">
                  Previous Repayment
                </label>
                <select
                  value={form.previousRepayment}
                  onChange={(event) =>
                    updateField("previousRepayment", event.target.value)
                  }
                  className="h-12 w-full rounded-2xl border border-green-100 bg-white px-4 text-sm font-bold text-slate-700 outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100"
                >
                  <option>Good</option>
                  <option>Average</option>
                  <option>Poor</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">
                  Market Sales Record
                </label>
                <select
                  value={form.hasMarketRecord}
                  onChange={(event) =>
                    updateField("hasMarketRecord", event.target.value)
                  }
                  className="h-12 w-full rounded-2xl border border-green-100 bg-white px-4 text-sm font-bold text-slate-700 outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100"
                >
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
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
              onClick={handleGenerateProfile}
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-600 to-lime-500 py-4 text-sm font-black text-white shadow-lg shadow-green-200 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <BadgeCheck size={20} />
              {loading
                ? "Calling AgriCredit API..."
                : "Generate Credit Profile"}
            </button>
          </div>

          {result && (
            <div className="agri-card rounded-3xl p-6">
              <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black uppercase tracking-wide text-green-700">
                    API AgriCredit Result
                  </p>
                  <h2 className="mt-1 text-3xl font-black text-slate-900">
                    {result.farmerName}&apos;s Credit Profile
                  </h2>
                </div>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-black ${
                    result.loanStatus === "Recommended"
                      ? "bg-green-50 text-green-700"
                      : result.loanStatus === "Review Needed"
                      ? "bg-orange-50 text-orange-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {result.loanStatus}
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                <ResultCard
                  label="Credit Score"
                  value={`${result.creditScore}/100`}
                  icon={TrendingUp}
                  tone="green"
                />
                <ResultCard
                  label="Risk Level"
                  value={result.riskLevel}
                  icon={ShieldAlert}
                  tone={result.riskLevel === "High" ? "red" : "orange"}
                />
                <ResultCard
                  label="Net Income"
                  value={formatBDT(result.netIncome)}
                  icon={WalletCards}
                  tone="blue"
                />
                <ResultCard
                  label="Repay Capacity"
                  value={formatBDT(result.repaymentCapacity)}
                  icon={Banknote}
                  tone="green"
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

              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="font-black text-slate-900">
                    Credit Reasoning
                  </h3>

                  <div className="mt-4 space-y-3">
                    {result.reasons.map((reason) => (
                      <div
                        key={reason}
                        className="flex items-start gap-3 rounded-2xl bg-white p-4"
                      >
                        <CheckCircle2
                          className="mt-0.5 text-green-600"
                          size={20}
                        />
                        <p className="text-sm font-semibold leading-relaxed text-slate-600">
                          {reason}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-blue-50 p-5">
                  <div className="flex items-center gap-2">
                    <FileText className="text-blue-700" size={22} />
                    <h3 className="font-black text-blue-900">
                      Bank/MFI Summary
                    </h3>
                  </div>

                  <p className="mt-3 text-sm font-semibold leading-relaxed text-blue-800">
                    Farmer {result.farmerName} is applying for support for{" "}
                    {result.cropName}. The profile shows a credit score of{" "}
                    {result.creditScore}/100 with {result.riskLevel} risk.
                    Suggested loan category: {result.suggestedLoanType}.
                  </p>

                  <div className="mt-5 rounded-2xl bg-white p-4">
                    <p className="text-xs font-black uppercase text-slate-500">
                      Suggested Loan Type
                    </p>
                    <p className="mt-1 text-lg font-black text-slate-900">
                      {result.suggestedLoanType}
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
                "Farmer enters land, crop, income, and loan data.",
                "Frontend sends request to /api/agri-credit.",
                "Backend calculates score, risk, and repayment capacity.",
                "API returns bank/MFI-style credit profile.",
                "Farmer can use report for loan readiness.",
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
              <span className="font-black">/api/agri-credit</span>. It makes
              farmer credit scoring look more like a real backend-powered
              fintech workflow.
            </p>
          </div>

          <div className="agri-card rounded-3xl p-6">
            <h3 className="text-xl font-black text-slate-900">
              Credit Profile Data
            </h3>

            <div className="mt-4 space-y-3">
              {[
                "Land size",
                "Crop history",
                "Income and expense",
                "Sales record",
                "Repayment behavior",
                "Requested loan amount",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl bg-green-50 p-3"
                >
                  <LandPlot className="text-green-700" size={18} />
                  <p className="text-sm font-black text-green-900">{item}</p>
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
                "Bank dashboard",
                "Loan application tracking",
                "Digital document upload",
                "Crop insurance support",
                "Farmer card integration",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3"
                >
                  <UserRound className="text-green-700" size={18} />
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

function TextInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-black text-slate-700">
        {label}
      </label>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-2xl border border-green-100 bg-white px-4 text-sm font-bold text-slate-700 outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100"
      />
    </div>
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
          className="h-12 w-full rounded-2xl border border-green-100 bg-white px-4 pr-20 text-sm font-bold text-slate-700 outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100"
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



