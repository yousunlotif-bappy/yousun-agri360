import {
  CloudSun,
  Droplets,
  Leaf,
  Mic,
  Plus,
  Stethoscope,
  WalletCards,
} from "lucide-react";

const prices = [
  { crop: "Rice (Miniket)", price: "৳ 28.50 /kg", change: "+2.5%" },
  { crop: "Paddy (Swarna)", price: "৳ 21.00 /kg", change: "+1.8%" },
  { crop: "Potato", price: "৳ 20.00 /kg", change: "-1.2%" },
  { crop: "Onion", price: "৳ 40.00 /kg", change: "+3.1%" },
];

export default function RightPanel() {
  return (
    <aside className="space-y-5">
      <div className="agri-card rounded-3xl p-5">
        <h3 className="font-black text-slate-900">Today&apos;s Weather</h3>
        <div className="mt-5 flex items-center gap-4">
          <CloudSun size={58} className="text-sky-500" />
          <div>
            <h2 className="text-4xl font-black text-slate-900">30°C</h2>
            <p className="text-sm font-semibold text-slate-500">
              Partly Cloudy
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3 text-center text-xs font-bold text-slate-500">
          <div className="rounded-xl bg-slate-50 p-3">
            Humidity
            <p className="mt-1 text-slate-900">74%</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3">
            Wind
            <p className="mt-1 text-slate-900">12 km/h</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3">
            Rain
            <p className="mt-1 text-slate-900">20%</p>
          </div>
        </div>
      </div>

      <div className="agri-card rounded-3xl p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-slate-900">Next Farming Task</h3>
          <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-black text-green-700">
            Due Tomorrow
          </span>
        </div>

        <div className="mt-5 rounded-2xl bg-green-50 p-4">
          <p className="text-lg font-black text-slate-900">Urea Top Dressing</p>
          <p className="mt-1 text-sm font-semibold text-slate-500">
            Apply urea fertilizer for healthy growth.
          </p>
        </div>

        <button className="mt-4 w-full rounded-xl border border-green-500 py-3 text-sm font-black text-green-700 transition hover:bg-green-600 hover:text-white">
          View Task Details
        </button>
      </div>

      <div className="agri-card rounded-3xl p-5">
        <h3 className="font-black text-slate-900">Quick Actions</h3>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {[
            { label: "Add Expense", icon: WalletCards },
            { label: "Log Activity", icon: Leaf },
            { label: "Ask AgriDoctor", icon: Stethoscope },
            { label: "Voice Command", icon: Mic },
          ].map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.label}
                className="flex items-center justify-center gap-2 rounded-2xl border border-green-100 bg-white p-4 text-xs font-black text-slate-700 transition hover:bg-green-50 hover:text-green-700"
              >
                <Icon size={18} />
                {action.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="agri-card rounded-3xl p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-slate-900">Market Highlights</h3>
          <button className="text-xs font-black text-green-700">View All</button>
        </div>

        <div className="mt-4 space-y-3">
          {prices.map((item) => (
            <div
              key={item.crop}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <Plus size={14} className="text-green-600" />
                <span className="font-bold text-slate-700">{item.crop}</span>
              </div>
              <div className="text-right">
                <p className="font-black text-slate-900">{item.price}</p>
                <p
                  className={`text-xs font-black ${
                    item.change.startsWith("+")
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {item.change}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-right text-xs font-bold text-slate-400">
          Source: AgriMarket Link
        </p>
      </div>
    </aside>
  );
}

