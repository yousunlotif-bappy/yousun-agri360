import DashboardLayout from "@/components/DashboardLayout";
import PageHeader from "@/components/PageHeader";
import {
  BadgeCheck,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  CloudSun,
  Download,
  FileText,
  Leaf,
  ShieldCheck,
  Store,
  TrendingUp,
  WalletCards,
} from "lucide-react";

const reportCards = [
  {
    title: "Crop Health Report",
    value: "Stable",
    description: "Latest AgriDoctor AI scan shows medium disease risk control.",
    icon: Leaf,
  },
  {
    title: "Weather Risk Report",
    value: "Moderate",
    description: "Rain risk is 35%. Avoid pesticide spray before rainfall.",
    icon: CloudSun,
  },
  {
    title: "Financial Report",
    value: "৳75,750 Profit",
    description: "FarmLedger AI calculated positive profit this season.",
    icon: WalletCards,
  },
  {
    title: "Market Report",
    value: "Best: District Market",
    description: "AgriMarket Link found higher net income after transport cost.",
    icon: Store,
  },
  {
    title: "Credit Readiness",
    value: "90/100",
    description: "AgriCredit AI shows low-risk loan readiness profile.",
    icon: BadgeCheck,
  },
  {
    title: "Crop Calendar",
    value: "110 Days",
    description: "CropTime Planner generated full Boro Rice season schedule.",
    icon: CalendarDays,
  },
];

const completedModules = [
  "AgriDoctor AI - Crop disease detection",
  "FarmWeather Guard - Crop-specific weather warning",
  "FarmLedger AI - Profit/loss and ROI calculation",
  "CropTime Planner - Farming schedule generation",
  "AgriMarket Link - Best market decision",
  "Farm2Market - Direct farmer-to-buyer marketplace",
  "MachineryShare Agri - Farm machine rental workflow",
  "AgriCredit AI - Digital farmer credit profile",
  "KrishiBot AI - Text-based farming assistant",
  "KrishiVoice - Bangla voice assistant demo",
];

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Yousun Agri360 Reports"
        description="A complete smart farming report center that combines crop health, weather risk, farm finance, market decision, credit readiness, calendar, and platform completion story."
      />

      <div className="space-y-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-green-100 bg-gradient-to-r from-green-100 via-lime-50 to-amber-50 p-7 shadow-xl shadow-green-100">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-lime-300/25 blur-3xl" />
          <div className="absolute -bottom-24 left-20 h-64 w-64 rounded-full bg-green-300/25 blur-3xl" />

          <div className="relative z-10 grid gap-6 lg:grid-cols-[1fr_320px]">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-black text-green-800 shadow">
                <FileText size={16} />
                Smart Farm Report Center
              </div>

              <h2 className="text-4xl font-black text-slate-900">
                One report for the full farmer journey
              </h2>

              <p className="mt-3 max-w-3xl text-sm font-semibold leading-relaxed text-slate-600">
                This report summarizes how Yousun Agri360 supports farmers from
                crop planning to disease detection, weather warning, accounting,
                market selling, loan readiness, machinery rental, and advisory
                support.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-2xl bg-white/85 px-5 py-3 text-sm font-black text-slate-700 shadow">
                  Farmer: Bappy
                </span>
                <span className="rounded-2xl bg-white/85 px-5 py-3 text-sm font-black text-slate-700 shadow">
                  Crop: Boro Rice
                </span>
                <span className="rounded-2xl bg-white/85 px-5 py-3 text-sm font-black text-slate-700 shadow">
                  Location: Rajshahi
                </span>
              </div>
            </div>

            <div className="rounded-3xl bg-white/80 p-5 text-center shadow-lg backdrop-blur">
              <BarChart3 size={56} className="mx-auto text-green-600" />
              <p className="mt-2 text-sm font-black text-slate-500">
                Platform Completion
              </p>
              <p className="text-5xl font-black text-slate-900">92%</p>
              <p className="mt-2 text-xs font-bold text-slate-500">
                10 modules completed as MVP
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {reportCards.map((card) => {
            const Icon = card.icon;

            return (
              <div key={card.title} className="agri-card rounded-3xl p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                  <Icon size={28} />
                </div>

                <p className="mt-5 text-xs font-black uppercase tracking-wide text-slate-500">
                  {card.title}
                </p>
                <h3 className="mt-2 text-2xl font-black text-slate-900">
                  {card.value}
                </h3>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-600">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="agri-card rounded-3xl p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-700">
                <ShieldCheck size={26} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900">
                  Before the Finish-Up-A-Thon
                </h3>
                <p className="text-sm font-semibold text-slate-500">
                  The project was only an unfinished agri-tech idea.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {[
                "Only rough farmer problem notes existed.",
                "No professional dashboard was available.",
                "No independent module workflow was implemented.",
                "No working calculation, market, credit, or weather logic existed.",
                "No clear before/after story for judges.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-orange-50 p-4 text-sm font-bold text-orange-900"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="agri-card rounded-3xl p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                <CheckCircle2 size={26} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900">
                  After Finishing Yousun Agri360
                </h3>
                <p className="text-sm font-semibold text-slate-500">
                  The idea became a working 10-in-1 smart farming MVP.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {[
                "Professional farming dashboard completed.",
                "10 independent modules created with clear workflows.",
                "Functional modules added for disease, weather, finance, market, credit, voice, and more.",
                "Before/after contest story added.",
                "Ready for README, screenshots, demo video, and DEV submission.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-green-50 p-4 text-sm font-bold text-green-900"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="agri-card rounded-3xl p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-green-700">
                MVP Completion Checklist
              </p>
              <h2 className="mt-1 text-3xl font-black text-slate-900">
                Completed Platform Modules
              </h2>
            </div>

            <button className="flex items-center gap-2 rounded-2xl bg-green-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-green-100 transition hover:bg-green-700">
              <Download size={18} />
              Export Report
            </button>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {completedModules.map((module) => (
              <div
                key={module}
                className="flex items-center gap-3 rounded-2xl border border-green-100 bg-white p-4"
              >
                <CheckCircle2 className="text-green-600" size={20} />
                <p className="text-sm font-black text-slate-700">{module}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="agri-card rounded-3xl p-6">
            <h3 className="text-2xl font-black text-slate-900">
              Contest Submission Story
            </h3>

            <p className="mt-4 text-sm font-semibold leading-relaxed text-slate-600">
              Yousun Agri360 started as an unfinished idea about solving farmer
              problems with technology. During the GitHub Finish-Up-A-Thon, the
              idea was revived and completed as a modular 10-in-1 smart farming
              platform. Each module can work independently, but together they
              support the complete farmer journey from crop planning to disease
              detection, weather risk, farm finance, market selling, credit
              readiness, voice support, and machinery access.
            </p>

            <p className="mt-4 text-sm font-semibold leading-relaxed text-slate-600">
              GitHub Copilot helped speed up repeated UI components, TypeScript
              structures, form logic, dashboard sections, reusable workflow
              patterns, README writing, and code refactoring. The final result is
              a polished MVP that clearly shows the transformation from rough
              concept to working product.
            </p>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-green-700 to-lime-500 p-6 text-white shadow-xl shadow-green-200">
            <TrendingUp size={42} />
            <h3 className="mt-4 text-2xl font-black">Winning Angle</h3>
            <p className="mt-3 text-sm font-semibold leading-relaxed text-green-50">
              This is not just one farming tool. It is a farmer operating system:
              advisory, finance, marketplace, voice, machinery, and reports in
              one platform.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}


