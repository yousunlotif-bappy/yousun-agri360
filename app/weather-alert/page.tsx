"use client";

import DashboardLayout from "@/components/DashboardLayout";
import PageHeader from "@/components/PageHeader";
import type { WeatherRiskResult } from "@/lib/cropRules";
import {
  AlertTriangle,
  CheckCircle2,
  CloudLightning,
  CloudRain,
  Droplets,
  MapPin,
  ShieldAlert,
  Sun,
  Wind,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";

export default function WeatherAlertPage() {
  const [crop, setCrop] = useState("Boro Rice");
  const [location, setLocation] = useState("Rajshahi, Bangladesh");
  const [condition, setCondition] = useState("Heavy Rain");
  const [result, setResult] = useState<WeatherRiskResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");

  const riskStyle = useMemo(() => {
    if (!result) return "bg-slate-100 text-slate-700";

    if (result.riskLevel === "High") return "bg-red-50 text-red-700";
    if (result.riskLevel === "Medium") return "bg-orange-50 text-orange-700";
    return "bg-green-50 text-green-700";
  }, [result]);

  async function handleGenerateReport() {
    setLoading(true);
    setApiMessage("");

    try {
      const response = await fetch("/api/weather-risk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          crop,
          location,
          condition,
        }),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.message || "Failed to generate weather risk.");
      }

      setResult(json.data);
      setApiMessage(json.message || "Weather risk report generated.");
    } catch (error) {
      setApiMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while generating weather risk."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="FarmWeather Guard"
        description="Generate crop-specific weather risk alerts and action plans using the Yousun Agri360 backend API route."
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_420px]">
        <section className="space-y-6">
          <div className="relative overflow-hidden rounded-[2rem] border border-sky-100 bg-gradient-to-r from-sky-50 via-green-50 to-lime-50 p-7 shadow-xl shadow-green-100">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sky-300/20 blur-3xl" />
            <div className="absolute -bottom-24 left-20 h-64 w-64 rounded-full bg-green-300/20 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-black text-sky-700 shadow">
                  <CloudLightning size={16} />
                  Backend Connected Weather Intelligence
                </div>

                <h2 className="text-3xl font-black text-slate-900">
                  Weather warning before crop damage happens
                </h2>
                <p className="mt-3 max-w-2xl text-sm font-semibold leading-relaxed text-slate-600">
                  This module sends crop, location, and weather condition to the
                  backend API route, then returns crop-specific risk and action
                  advice.
                </p>
              </div>

              <div className="rounded-3xl bg-white/80 p-5 text-center shadow-lg backdrop-blur">
                <CloudRain size={52} className="mx-auto text-sky-500" />
                <p className="mt-2 text-sm font-black text-slate-500">
                  API Route
                </p>
                <p className="text-2xl font-black text-slate-900">
                  /weather-risk
                </p>
              </div>
            </div>
          </div>

          <div className="agri-card rounded-3xl p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                <CloudLightning size={26} />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Generate Weather Risk Report
                </h2>
                <p className="text-sm font-semibold text-slate-500">
                  Select crop, location, and expected weather condition.
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
                  <option>Boro Rice</option>
                  <option>Tomato</option>
                  <option>Potato</option>
                  <option>Onion</option>
                  <option>Maize</option>
                  <option>Mango</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">
                  Location
                </label>
                <select
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  className="h-12 w-full rounded-2xl border border-green-100 bg-white px-4 text-sm font-bold text-slate-700 outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100"
                >
                  <option>Rajshahi, Bangladesh</option>
                  <option>Dhaka, Bangladesh</option>
                  <option>Rangpur, Bangladesh</option>
                  <option>Khulna, Bangladesh</option>
                  <option>Barisal, Bangladesh</option>
                  <option>Sylhet, Bangladesh</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">
                  Weather Condition
                </label>
                <select
                  value={condition}
                  onChange={(event) => setCondition(event.target.value)}
                  className="h-12 w-full rounded-2xl border border-green-100 bg-white px-4 text-sm font-bold text-slate-700 outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100"
                >
                  <option>Heavy Rain</option>
                  <option>Heatwave / High Temperature</option>
                  <option>Storm / Strong Wind</option>
                  <option>Cold / Fog</option>
                  <option>Normal Weather</option>
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
              onClick={handleGenerateReport}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-600 to-green-500 py-4 text-sm font-black text-white shadow-lg shadow-sky-100 transition hover:scale-[1.01]"
            >
              <ShieldAlert size={20} />
              {loading
                ? "Calling Weather API..."
                : "Generate Weather Risk Report"}
            </button>
          </div>

          {result && (
            <div className="agri-card rounded-3xl p-6">
              <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black uppercase tracking-wide text-sky-700">
                    API Weather Risk Result
                  </p>
                  <h2 className="mt-1 text-3xl font-black text-slate-900">
                    {result.mainWarning}
                  </h2>
                </div>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-black ${riskStyle}`}
                >
                  {result.riskLevel} Risk
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                <div className="rounded-2xl bg-green-50 p-5">
                  <p className="text-xs font-black uppercase text-green-700">
                    Crop
                  </p>
                  <p className="mt-2 text-xl font-black text-slate-900">
                    {result.crop}
                  </p>
                </div>

                <div className="rounded-2xl bg-sky-50 p-5">
                  <p className="text-xs font-black uppercase text-sky-700">
                    Location
                  </p>
                  <p className="mt-2 text-xl font-black text-slate-900">
                    {result.location}
                  </p>
                </div>

                <div className="rounded-2xl bg-orange-50 p-5">
                  <p className="text-xs font-black uppercase text-orange-700">
                    Condition
                  </p>
                  <p className="mt-2 text-xl font-black text-slate-900">
                    {result.condition}
                  </p>
                </div>

                <div className="rounded-2xl bg-red-50 p-5">
                  <p className="text-xs font-black uppercase text-red-700">
                    Risk Score
                  </p>
                  <p className="mt-2 text-xl font-black text-slate-900">
                    {result.riskScore}/100
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-1 text-orange-600" size={22} />
                  <div>
                    <h3 className="font-black text-slate-900">
                      Main Warning
                    </h3>
                    <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">
                      {result.mainWarning}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                <div>
                  <h3 className="font-black text-slate-900">
                    Recommended Actions
                  </h3>

                  <div className="mt-4 space-y-3">
                    {result.advice.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-2xl border border-green-100 bg-white p-4"
                      >
                        <CheckCircle2
                          className="mt-0.5 text-green-600"
                          size={20}
                        />
                        <p className="text-sm font-semibold leading-relaxed text-slate-600">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-black text-slate-900">
                    Avoid These Actions
                  </h3>

                  <div className="mt-4 space-y-3">
                    {result.avoid.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-2xl border border-red-100 bg-white p-4"
                      >
                        <XCircle className="mt-0.5 text-red-500" size={20} />
                        <p className="text-sm font-semibold leading-relaxed text-slate-600">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-green-50 p-5">
                <h3 className="font-black text-green-900">
                  Next Best Action
                </h3>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-green-800">
                  {result.nextAction}
                </p>
              </div>
            </div>
          )}
        </section>

        <aside className="space-y-5">
          <div className="agri-card rounded-3xl p-6">
            <h3 className="text-xl font-black text-slate-900">
              Weather Snapshot
            </h3>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-sky-50 p-4">
                <Sun size={26} className="text-orange-500" />
                <p className="mt-3 text-xs font-black text-slate-500">
                  Temperature
                </p>
                <p className="text-2xl font-black text-slate-900">30°C</p>
              </div>

              <div className="rounded-2xl bg-green-50 p-4">
                <Droplets size={26} className="text-sky-500" />
                <p className="mt-3 text-xs font-black text-slate-500">
                  Humidity
                </p>
                <p className="text-2xl font-black text-slate-900">74%</p>
              </div>

              <div className="rounded-2xl bg-orange-50 p-4">
                <Wind size={26} className="text-orange-500" />
                <p className="mt-3 text-xs font-black text-slate-500">Wind</p>
                <p className="text-2xl font-black text-slate-900">12 km/h</p>
              </div>

              <div className="rounded-2xl bg-blue-50 p-4">
                <CloudRain size={26} className="text-blue-500" />
                <p className="mt-3 text-xs font-black text-slate-500">Rain</p>
                <p className="text-2xl font-black text-slate-900">35%</p>
              </div>
            </div>
          </div>

          <div className="agri-card rounded-3xl p-6">
            <h3 className="text-xl font-black text-slate-900">API Workflow</h3>

            <div className="mt-5 space-y-4">
              {[
                "Farmer selects crop and location.",
                "Frontend sends request to /api/weather-risk.",
                "Backend checks crop and weather rule engine.",
                "API returns risk score and warning.",
                "Farmer receives action plan and avoid list.",
              ].map((step, index) => (
                <div key={step} className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-600 text-sm font-black text-white">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-sm font-bold leading-relaxed text-slate-600">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-sky-700 to-green-500 p-6 text-white shadow-xl shadow-sky-100">
            <h3 className="text-xl font-black">Backend Connected</h3>
            <p className="mt-3 text-sm font-semibold leading-relaxed text-sky-50">
              This module now uses the Next.js API route{" "}
              <span className="font-black">/api/weather-risk</span>. This makes
              the weather module more professional and contest-ready.
            </p>
          </div>

          <div className="agri-card rounded-3xl p-6">
            <h3 className="text-xl font-black text-slate-900">
              Farmer Location
            </h3>
            <div className="mt-4 flex items-center gap-3 rounded-2xl bg-green-50 p-4">
              <MapPin className="text-green-700" size={24} />
              <div>
                <p className="font-black text-slate-900">{location}</p>
                <p className="text-xs font-bold text-slate-500">
                  Weather risk generated for this area
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </DashboardLayout>
  );
}


