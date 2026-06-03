import Link from "next/link";
import {
  BadgeCheck,
  BarChart3,
  Bot,
  CalendarDays,
  ChevronRight,
  CloudSun,
  Mic,
  Settings,
  Stethoscope,
  Store,
  Tractor,
  Truck,
  WalletCards,
} from "lucide-react";
import type { ModuleItem } from "@/data/modules";

const iconMap = {
  stethoscope: Stethoscope,
  cloud: CloudSun,
  store: Store,
  truck: Truck,
  bot: Bot,
  badge: BadgeCheck,
  mic: Mic,
  wallet: WalletCards,
  calendar: CalendarDays,
  tractor: Tractor,
  chart: BarChart3,
  settings: Settings,
};

export default function ModuleCard({ module }: { module: ModuleItem }) {
  const Icon = iconMap[module.icon as keyof typeof iconMap];

  return (
    <Link
      href={module.href}
      className="group agri-soft-card flex items-center justify-between rounded-2xl p-4 transition hover:-translate-y-1 hover:border-green-300 hover:shadow-xl"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700 transition group-hover:bg-green-600 group-hover:text-white">
          <Icon size={28} />
        </div>

        <div>
          <h3 className="font-black text-slate-900">{module.title}</h3>
          <p className="mt-1 max-w-[210px] text-xs font-semibold leading-relaxed text-slate-500">
            {module.subtitle}
          </p>
        </div>
      </div>

      <ChevronRight
        size={20}
        className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-green-700"
      />
    </Link>
  );
}


