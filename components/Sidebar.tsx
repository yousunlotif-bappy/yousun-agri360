"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BadgeCheck,
  BarChart3,
  Bot,
  CalendarDays,
  CloudSun,
  Headphones,
  Home,
  Mic,
  Settings,
  Stethoscope,
  Store,
  Tractor,
  Truck,
  WalletCards,
} from "lucide-react";

const LOGO_SRC = "/logo%20(6).png";

const navItems = [
  { title: "Dashboard", href: "/dashboard", icon: Home },
  { title: "AgriDoctor AI", href: "/disease-detection", icon: Stethoscope },
  { title: "FarmWeather Guard", href: "/weather-alert", icon: CloudSun },
  { title: "AgriMarket Link", href: "/market-price", icon: Store },
  { title: "Farm2Market", href: "/marketplace", icon: Truck },
  { title: "KrishiBot AI", href: "/krishibot", icon: Bot },
  { title: "AgriCredit AI", href: "/agri-credit", icon: BadgeCheck },
  { title: "KrishiVoice", href: "/krishi-voice", icon: Mic },
  { title: "FarmLedger AI", href: "/farm-ledger", icon: WalletCards },
  { title: "CropTime Planner", href: "/crop-calendar", icon: CalendarDays },
  { title: "MachineryShare Agri", href: "/machinery-rental", icon: Tractor },
  { title: "Reports", href: "/reports", icon: BarChart3 },
  { title: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-[310px] border-r border-green-100 bg-white/95 shadow-[20px_0_50px_rgba(30,80,40,0.08)] backdrop-blur-xl lg:flex lg:flex-col">
      {/* Logo Area */}
      <Link
        href="/dashboard"
        className="flex shrink-0 items-center gap-4 px-6 pb-6 pt-7"
      >
        <div className="flex h-[82px] w-[82px] shrink-0 items-center justify-center overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-green-100">
          <img
            src={LOGO_SRC}
            alt="Yousun Agri360 Logo"
            className="h-[74px] w-[74px] object-contain"
          />
        </div>

        <div className="min-w-0">
          <h1 className="text-[28px] font-black leading-[1.05] tracking-tight text-green-800">
            Yousun
            <span className="block text-green-600">Agri360</span>
          </h1>
          <p className="mt-2 text-xs font-bold text-slate-500">
            Smart Farming Platform
          </p>
        </div>
      </Link>

      {/* Navigation - Scrollable */}
      <nav className="min-h-0 flex-1 space-y-1.5 overflow-y-auto px-6 pb-4">
        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-black transition ${
                active
                  ? "bg-gradient-to-r from-green-600 to-lime-500 text-white shadow-lg shadow-green-200"
                  : "text-slate-700 hover:bg-green-50 hover:text-green-700"
              }`}
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section - No overlap */}
      <div className="shrink-0 space-y-4 border-t border-green-50 bg-white/95 px-6 pb-6 pt-4">
        <div className="rounded-3xl bg-gradient-to-br from-lime-50 via-green-50 to-emerald-100 p-5 ring-1 ring-green-100">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-green-100">
              <img
                src={LOGO_SRC}
                alt="Yousun Agri360 Mini Logo"
                className="h-10 w-10 object-contain"
              />
            </div>

            <div>
              <p className="text-lg font-black leading-snug text-green-900">
                Grow Better with Nature & Data
              </p>
              <p className="mt-2 text-xs font-bold leading-relaxed text-green-700">
                AI support for every farmer workflow.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-green-100 bg-white p-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
            <Headphones size={22} />
          </div>
          <div>
            <p className="font-black text-slate-800">Need Help?</p>
            <p className="text-sm font-bold text-slate-500">Contact Support</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

