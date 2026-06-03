import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  CalendarDays,
  CheckCircle2,
  CloudSun,
  Leaf,
  Mic,
  ShieldCheck,
  Store,
  Tractor,
  WalletCards,
} from "lucide-react";

const modules = [
  "AgriDoctor AI",
  "FarmWeather Guard",
  "AgriMarket Link",
  "Farm2Market",
  "KrishiBot AI",
  "AgriCredit AI",
  "KrishiVoice",
  "FarmLedger AI",
  "CropTime Planner",
  "MachineryShare Agri",
];

const features = [
  {
    title: "Crop Intelligence",
    description: "Disease detection, crop calendar, and weather risk planning.",
    icon: Leaf,
  },
  {
    title: "Farmer Business",
    description: "Accounting, market price comparison, and direct selling.",
    icon: Store,
  },
  {
    title: "Financial Access",
    description: "Digital credit profile and loan readiness scoring.",
    icon: WalletCards,
  },
  {
    title: "Inclusive Support",
    description: "Bangla voice assistant and simple AI farming chatbot.",
    icon: Mic,
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#f6faf5]">
      <section className="relative overflow-hidden px-6 py-8 lg:px-12">
        <div className="absolute -left-28 -top-28 h-96 w-96 rounded-full bg-green-300/25 blur-3xl" />
        <div className="absolute -right-28 top-36 h-96 w-96 rounded-full bg-lime-300/25 blur-3xl" />

        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between rounded-3xl border border-green-100 bg-white/80 px-6 py-4 shadow-xl shadow-green-100 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-600 to-lime-500 text-white">
              <Leaf size={26} />
            </div>
            <div>
              <h1 className="text-lg font-black text-green-800">
                Yousun Agri360
              </h1>
              <p className="text-xs font-bold text-slate-500">
                10-in-1 Smart Farming Platform
              </p>
            </div>
          </div>

          <Link
            href="/dashboard"
            className="rounded-2xl bg-green-600 px-5 py-3 text-sm font-black text-white transition hover:bg-green-700"
          >
            Open Dashboard
          </Link>
        </nav>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-green-800 shadow">
              <BadgeCheck size={16} />
              Built for GitHub Finish-Up-A-Thon
            </div>

            <h2 className="text-5xl font-black leading-tight tracking-tight text-slate-950 lg:text-7xl">
              Finish farming problems with one smart platform.
            </h2>

            <p className="mt-6 max-w-2xl text-lg font-semibold leading-relaxed text-slate-600">
              Yousun Agri360 is an AI-powered 10-in-1 smart farming platform
              where every module works independently, but together they support
              the complete farmer journey from planning to selling, finance, and
              machinery access.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-green-600 to-lime-500 px-6 py-4 text-sm font-black text-white shadow-xl shadow-green-200 transition hover:scale-[1.02]"
              >
                Explore MVP
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/reports"
                className="flex items-center gap-2 rounded-2xl border border-green-500 bg-white px-6 py-4 text-sm font-black text-green-700 transition hover:bg-green-50"
              >
                View Completion Report
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-green-100 bg-white/90 p-6 shadow-2xl shadow-green-100 backdrop-blur">
            <div className="rounded-[1.5rem] bg-gradient-to-br from-green-100 to-lime-50 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-black uppercase text-green-700">
                    Platform Score
                  </p>
                  <h3 className="mt-1 text-5xl font-black text-slate-900">
                    92%
                  </h3>
                </div>
                <ShieldCheck size={54} className="text-green-700" />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <MiniStat label="Modules" value="10" />
                <MiniStat label="Working Flows" value="10" />
                <MiniStat label="Core MVP" value="Ready" />
                <MiniStat label="Impact" value="High" />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {modules.map((module) => (
                <div
                  key={module}
                  className="rounded-2xl border border-green-100 bg-white p-3 text-xs font-black text-slate-700"
                >
                  {module}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="agri-card rounded-3xl p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-700">
              <CloudSun size={26} />
            </div>
            <h3 className="mt-5 text-3xl font-black text-slate-900">
              Before
            </h3>
            <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-600">
              The project started as a rough and unfinished agri-tech idea. It
              had farmer problem notes, but no professional dashboard, no
              connected module system, no working workflows, and no clear
              completion story.
            </p>

            <div className="mt-5 space-y-3">
              {[
                "Rough problem list only",
                "No complete UI",
                "No working MVP",
                "No before/after journey",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-orange-50 p-4 text-sm font-black text-orange-900"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="agri-card rounded-3xl p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-700">
              <CheckCircle2 size={26} />
            </div>
            <h3 className="mt-5 text-3xl font-black text-slate-900">After</h3>
            <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-600">
              The project was revived into Yousun Agri360: a polished 10-in-1
              farming MVP with dashboard, independent modules, AI-style
              workflows, business logic, marketplace, credit profile, voice
              support, and reporting.
            </p>

            <div className="mt-5 space-y-3">
              {[
                "Professional dashboard",
                "10 independent modules",
                "Functional farming workflows",
                "Contest-ready completion story",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-green-50 p-4 text-sm font-black text-green-900"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-12">
        <div className="mb-6">
          <h3 className="text-3xl font-black text-slate-900">
            Why Yousun Agri360 is different
          </h3>
          <p className="mt-2 max-w-3xl text-sm font-semibold leading-relaxed text-slate-600">
            Most agriculture apps solve one problem. Yousun Agri360 solves the
            farmer journey as a connected but modular system.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div key={feature.title} className="agri-card rounded-3xl p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                  <Icon size={28} />
                </div>
                <h4 className="mt-5 text-xl font-black text-slate-900">
                  {feature.title}
                </h4>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-12">
        <div className="rounded-[2rem] bg-gradient-to-r from-green-700 to-lime-500 p-8 text-white shadow-2xl shadow-green-200">
          <div className="grid gap-6 lg:grid-cols-[1fr_300px] lg:items-center">
            <div>
              <h3 className="text-3xl font-black">
                Ready for the final submission package
              </h3>
              <p className="mt-3 text-sm font-semibold leading-relaxed text-green-50">
                Next steps: README, GitHub screenshots, demo video script,
                Copilot usage story, and DEV submission post.
              </p>
            </div>

            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-black text-green-700 transition hover:bg-green-50"
            >
              Open Dashboard
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/80 p-4">
      <p className="text-xs font-black uppercase text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-black text-slate-900">{value}</p>
    </div>
  );
}


