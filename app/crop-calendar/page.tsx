"use client";

import DashboardLayout from "@/components/DashboardLayout";
import PageHeader from "@/components/PageHeader";
import type { CropCalendarResult } from "@/lib/cropRules";
import {
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  Clock,
  Droplets,
  Leaf,
  Scissors,
  ShieldCheck,
  Sprout,
  TestTube2,
} from "lucide-react";
import { useMemo, useState } from "react";

const categoryStyle = {
  Preparation: "bg-green-50 text-green-700 border-green-100",
  Irrigation: "bg-sky-50 text-sky-700 border-sky-100",
  Fertilizer: "bg-orange-50 text-orange-700 border-orange-100",
  "Disease Check": "bg-red-50 text-red-700 border-red-100",
  "Pest Check": "bg-purple-50 text-purple-700 border-purple-100",
  Harvest: "bg-amber-50 text-amber-700 border-amber-100",
};

const categoryIcon = {
  Preparation: Sprout,
  Irrigation: Droplets,
  Fertilizer: TestTube2,
  "Disease Check": ShieldCheck,
  "Pest Check": Leaf,
  Harvest: Scissors,
};

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

export default function CropCalendarPage() {
  const [crop, setCrop] = useState("Boro Rice");
  const [plantingDate, setPlantingDate] = useState(getTodayDate());
  const [result, setResult] = useState<CropCalendarResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");

  const progressValue = useMemo(() => {
    if (!result) return 0;

    return Math.min(100, Math.round((30 / result.durationDays) * 100));
  }, [result]);

  async function handleGenerateCalendar() {
    setLoading(true);
    setApiMessage("");

    try {
      const response = await fetch("/api/crop-calendar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          crop,
          plantingDate,
        }),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.message || "Failed to generate crop calendar.");
      }

      setResult(json.data);
      setApiMessage(json.message || "Crop calendar generated successfully.");
    } catch (error) {
      setApiMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while generating crop calendar."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="CropTime Planner"
        description="Create a crop-wise farming calendar using the Yousun Agri360 backend API route. The system generates irrigation, fertilizer, disease, pest, and harvesting tasks."
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_420px]">
        <section className="space-y-6">
          <div className="relative overflow-hidden rounded-[2rem] border border-green-100 bg-gradient-to-r from-green-100 via-lime-50 to-amber-50 p-7 shadow-xl shadow-green-100">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-300/25 blur-3xl" />
            <div className="absolute -bottom-24 left-20 h-64 w-64 rounded-full bg-amber-300/25 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-black text-green-800 shadow">
                  <CalendarDays size={16} />
                  Backend Connected Crop Calendar
                </div>

                <h2 className="text-3xl font-black text-slate-900">
                  Plan every farming task on time
                </h2>

                <p className="mt-3 max-w-2xl text-sm font-semibold leading-relaxed text-slate-600">
                  This module sends crop type and planting date to the backend
                  API route, then returns a complete crop-wise farming schedule.
                </p>
              </div>

              <div className="rounded-3xl bg-white/80 p-5 text-center shadow-lg backdrop-blur">
                <CalendarCheck size={52} className="mx-auto text-green-600" />
                <p className="mt-2 text-sm font-black text-slate-500">
                  API Route
                </p>
                <p className="text-2xl font-black text-slate-900">
                  /crop-calendar
                </p>
              </div>
            </div>
          </div>

          <div className="agri-card rounded-3xl p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                <CalendarDays size={26} />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Generate Crop Calendar
                </h2>
                <p className="text-sm font-semibold text-slate-500">
                  Select crop and planting date to create a backend-generated
                  task schedule.
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">
                  Select Crop
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
                  Planting Date
                </label>
                <input
                  type="date"
                  value={plantingDate}
                  onChange={(event) => setPlantingDate(event.target.value)}
                  className="h-12 w-full rounded-2xl border border-green-100 bg-white px-4 text-sm font-bold text-slate-700 outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100"
                />
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
              onClick={handleGenerateCalendar}
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-600 to-lime-500 py-4 text-sm font-black text-white shadow-lg shadow-green-200 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CalendarCheck size={20} />
              {loading ? "Calling Crop Calendar API..." : "Generate Crop Calendar"}
            </button>
          </div>

          {result && (
            <div className="agri-card rounded-3xl p-6">
              <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black uppercase tracking-wide text-green-700">
                    API Crop Calendar Result
                  </p>
                  <h2 className="mt-1 text-3xl font-black text-slate-900">
                    {result.crop} Farming Schedule
                  </h2>
                </div>

                <span className="rounded-full bg-green-50 px-4 py-2 text-sm font-black text-green-700">
                  {result.durationDays} Days Plan
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
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
                    Planting Date
                  </p>
                  <p className="mt-2 text-xl font-black text-slate-900">
                    {result.plantingDate}
                  </p>
                </div>

                <div className="rounded-2xl bg-amber-50 p-5">
                  <p className="text-xs font-black uppercase text-amber-700">
                    Estimated Harvest
                  </p>
                  <p className="mt-2 text-xl font-black text-slate-900">
                    {result.estimatedHarvestDate}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-green-50 p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 text-green-700" size={22} />
                  <div>
                    <h3 className="font-black text-green-900">
                      Calendar Summary
                    </h3>
                    <p className="mt-2 text-sm font-semibold leading-relaxed text-green-800">
                      {result.summary}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-black text-slate-900">
                  Farming Task Timeline
                </h3>

                <div className="mt-5 space-y-4">
                  {result.tasks.map((task) => {
                    const Icon = categoryIcon[task.category];

                    return (
                      <div
                        key={`${task.day}-${task.title}`}
                        className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm"
                      >
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                          <div className="flex gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                              <Icon size={27} />
                            </div>

                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">
                                  Day {task.day}
                                </span>
                                <span
                                  className={`rounded-full border px-3 py-1 text-xs font-black ${
                                    categoryStyle[task.category]
                                  }`}
                                >
                                  {task.category}
                                </span>
                              </div>

                              <h4 className="mt-3 text-lg font-black text-slate-900">
                                {task.title}
                              </h4>
                              <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">
                                {task.description}
                              </p>
                            </div>
                          </div>

                          <button className="rounded-xl border border-green-200 px-4 py-2 text-xs font-black text-green-700 transition hover:bg-green-600 hover:text-white">
                            Mark Done
                          </button>
                        </div>
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
              Calendar Progress Preview
            </h3>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between text-sm font-black text-slate-600">
                <span>Season Progress</span>
                <span>{progressValue}%</span>
              </div>

              <div className="h-4 overflow-hidden rounded-full bg-green-50">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-green-600 to-lime-400"
                  style={{ width: `${progressValue}%` }}
                />
              </div>

              <p className="mt-3 text-xs font-bold leading-relaxed text-slate-500">
                This preview shows how crop progress can be tracked after the
                farmer starts following the calendar.
              </p>
            </div>
          </div>

          <div className="agri-card rounded-3xl p-6">
            <h3 className="text-xl font-black text-slate-900">API Workflow</h3>

            <div className="mt-5 space-y-4">
              {[
                "Farmer selects crop type.",
                "Farmer enters planting date.",
                "Frontend sends request to /api/crop-calendar.",
                "Backend generates crop-wise task timeline.",
                "Farmer follows irrigation, fertilizer, disease, pest, and harvest tasks.",
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
              <span className="font-black">/api/crop-calendar</span>. It makes
              the farming schedule workflow backend-powered.
            </p>
          </div>

          <div className="agri-card rounded-3xl p-6">
            <h3 className="text-xl font-black text-slate-900">
              Reminder Types
            </h3>

            <div className="mt-4 space-y-3">
              {[
                "Planting reminder",
                "Irrigation reminder",
                "Fertilizer reminder",
                "Disease inspection reminder",
                "Pest monitoring reminder",
                "Harvesting reminder",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl bg-green-50 p-3"
                >
                  <Clock className="text-green-700" size={18} />
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



