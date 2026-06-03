import DashboardLayout from "@/components/DashboardLayout";
import ModuleCard from "@/components/ModuleCard";
import RightPanel from "@/components/RightPanel";
import StatCard from "@/components/StatCard";
import { modules } from "@/data/modules";
import {
  BarChart3,
  CloudLightning,
  Droplets,
  Leaf,
  ShieldCheck,
  Sprout,
  TrendingUp,
  WalletCards,
} from "lucide-react";

const recentActivities = [
  {
    title: "Urea fertilizer purchased",
    value: "৳ 2,450",
    time: "Today, 8:45 AM",
  },
  {
    title: "Irrigation completed",
    value: "1.2 hours",
    time: "Today, 7:10 AM",
  },
  {
    title: "Paddy field scouted",
    value: "No issues found",
    time: "Yesterday, 5:30 PM",
  },
  {
    title: "Sold 15 maund paddy",
    value: "৳ 31,500",
    time: "Yesterday, 2:15 PM",
  },
];

const calendarStages = [
  "Land Prep",
  "Sowing",
  "Tillering",
  "Panicle Init.",
  "Flowering",
  "Grain Filling",
  "Harvesting",
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_350px]">
        <section className="space-y-6">
          <div className="relative overflow-hidden rounded-[2rem] border border-green-100 bg-gradient-to-r from-green-100 via-lime-50 to-amber-50 p-8 shadow-xl shadow-green-100">
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-lime-300/30 blur-3xl" />
            <div className="absolute -bottom-16 right-10 h-52 w-52 rounded-full bg-green-400/20 blur-3xl" />

            <div className="relative z-10 grid gap-6 lg:grid-cols-[1fr_300px]">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-black text-green-800 shadow">
                  <ShieldCheck size={16} />
                  Smart Farming Platform
                </div>

                <h1 className="text-4xl font-black tracking-tight text-green-900 md:text-5xl">
                  Good Morning, Bappy! 🌱
                </h1>

                <p className="mt-3 max-w-2xl text-lg font-semibold leading-relaxed text-slate-700">
                  Here&apos;s your farm overview for today. Track crop health,
                  weather risk, cost, profit, market, and next farming actions
                  from one dashboard.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <span className="rounded-2xl bg-white/85 px-5 py-3 text-sm font-black text-slate-700 shadow">
                    📅 26 May 2026, Monday
                  </span>
                  <span className="rounded-2xl bg-white/85 px-5 py-3 text-sm font-black text-slate-700 shadow">
                    ☀️ Season: Boro Dry
                  </span>
                  <span className="rounded-2xl bg-white/85 px-5 py-3 text-sm font-black text-slate-700 shadow">
                    📍 Rajshahi, Bangladesh
                  </span>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-white/70 bg-white/70 p-5 shadow-lg backdrop-blur">
                <p className="text-sm font-black uppercase tracking-wide text-green-700">
                  Today&apos;s AI Insight
                </p>
                <h3 className="mt-3 text-2xl font-black text-slate-900">
                  Crop condition looks stable
                </h3>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">
                  Rain risk is moderate. Avoid pesticide spray today and monitor
                  stem borer signs during grain filling stage.
                </p>

                <div className="mt-5 rounded-2xl bg-green-600 p-4 text-white">
                  <p className="text-xs font-bold text-green-100">
                    Platform Readiness
                  </p>
                  <p className="mt-1 text-3xl font-black">82%</p>
                  <p className="mt-1 text-xs font-bold text-green-100">
                    10 modules connected
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <StatCard
              title="Current Crop"
              value="Boro Rice"
              subtitle="Growth stage: Tillering"
              icon={Sprout}
              tone="green"
            />
            <StatCard
              title="Weather Risk"
              value="Moderate"
              subtitle="Risk of rain: 35%"
              icon={CloudLightning}
              tone="orange"
            />
            <StatCard
              title="Total Expense"
              value="৳ 48,750"
              subtitle="↓ 12% vs last season"
              icon={WalletCards}
              tone="emerald"
            />
            <StatCard
              title="Expected Profit"
              value="৳ 1,24,500"
              subtitle="Projected this season"
              icon={TrendingUp}
              tone="green"
            />
            <StatCard
              title="Soil Health"
              value="Good"
              subtitle="Organic matter: 2.35%"
              icon={Leaf}
              tone="green"
            />
            <StatCard
              title="Irrigation"
              value="Optimal"
              subtitle="Soil moisture: 62%"
              icon={Droplets}
              tone="blue"
            />
          </div>

          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Explore Yousun Agri360 Modules
                </h2>
                <p className="mt-1 text-sm font-semibold text-slate-500">
                  Every module can work independently, but together they support
                  the full farmer journey.
                </p>
              </div>

              <span className="rounded-full bg-green-50 px-4 py-2 text-xs font-black text-green-700">
                10-in-1 Platform
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
              {modules.map((module) => (
                <ModuleCard key={module.href} module={module} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[0.8fr_1.2fr]">
            <div className="agri-card rounded-3xl p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-slate-900">Recent Activity</h3>
                <button className="text-xs font-black text-green-700">
                  View All
                </button>
              </div>

              <div className="mt-5 space-y-3">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.title}
                    className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
                  >
                    <div>
                      <p className="text-sm font-black text-slate-800">
                        {activity.title}
                      </p>
                      <p className="mt-1 text-xs font-bold text-slate-400">
                        {activity.time}
                      </p>
                    </div>
                    <p className="text-sm font-black text-green-700">
                      {activity.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="agri-card rounded-3xl p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-slate-900">
                  Crop Calendar: Boro Season
                </h3>
                <button className="text-xs font-black text-green-700">
                  View Full Report
                </button>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
                {calendarStages.map((stage, index) => (
                  <div key={stage} className="text-center">
                    <div
                      className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 text-lg ${
                        index === 5
                          ? "border-green-600 bg-green-100"
                          : "border-green-100 bg-white"
                      }`}
                    >
                      🌾
                    </div>
                    <p className="mt-2 text-xs font-black text-slate-700">
                      {stage}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-green-50 p-4 text-sm font-bold text-green-800">
                Tip for this stage: Maintain proper water level and monitor for
                stem borer.
              </div>
            </div>
          </div>

          <div className="agri-card rounded-3xl p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-slate-900">
                Market Prices Trend: Rice
              </h3>
              <BarChart3 className="text-green-700" />
            </div>

            <div className="mt-6 grid grid-cols-7 items-end gap-3">
              {[50, 62, 55, 68, 80, 73, 60].map((height, index) => (
                <div key={index} className="text-center">
                  <div className="flex h-32 items-end rounded-xl bg-green-50 p-2">
                    <div
                      className="w-full rounded-lg bg-gradient-to-t from-green-600 to-lime-400"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs font-black text-slate-500">
                    {20 + index} May
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <RightPanel />
      </div>
    </DashboardLayout>
  );
}


