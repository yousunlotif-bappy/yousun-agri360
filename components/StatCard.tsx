import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  tone?: "green" | "blue" | "orange" | "emerald";
};

const toneClasses = {
  green: "from-green-50 to-lime-50 text-green-700",
  blue: "from-sky-50 to-cyan-50 text-sky-700",
  orange: "from-orange-50 to-amber-50 text-orange-600",
  emerald: "from-emerald-50 to-green-50 text-emerald-700",
};

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  tone = "green",
}: StatCardProps) {
  return (
    <div className="agri-soft-card rounded-2xl p-5">
      <div className="flex items-start gap-4">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${toneClasses[tone]}`}
        >
          <Icon size={30} />
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">
            {title}
          </p>
          <h3 className="mt-1 text-2xl font-black text-slate-900">{value}</h3>
          <p className="mt-2 text-xs font-bold text-slate-500">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}


