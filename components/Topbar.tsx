import { Bell, ChevronDown, MapPin, Search } from "lucide-react";

const LOGO_SRC = "/logo%20(6).png";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-green-100 bg-white/80 px-5 backdrop-blur-xl lg:px-8">
      <div className="flex w-full items-center gap-5">
        {/* Mobile Logo */}
        <div className="flex items-center gap-3 lg:hidden">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-green-100">
            <img
              src={LOGO_SRC}
              alt="Yousun Agri360 Logo"
              className="h-10 w-10 object-contain"
            />
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-black leading-tight text-green-800">
              Yousun Agri360
            </p>
            <p className="text-[11px] font-bold text-slate-500">
              Smart Farming
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full max-w-md">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />
          <input
            className="h-12 w-full rounded-2xl border border-green-100 bg-white px-12 text-sm font-semibold outline-none transition focus:border-green-400 focus:ring-4 focus:ring-green-100"
            placeholder="Search anything..."
          />
        </div>
      </div>

      <div className="ml-4 flex shrink-0 items-center gap-5">
        <div className="hidden items-center gap-2 text-sm font-bold text-slate-700 md:flex">
          <MapPin size={20} className="text-green-700" />
          Rajshahi, Bangladesh
          <ChevronDown size={16} />
        </div>

        <div className="relative">
          <Bell size={22} className="text-slate-600" />
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs font-black text-white">
            3
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-green-700 to-lime-500 text-sm font-black text-white shadow-md">
            B
          </div>

          <div className="hidden md:block">
            <p className="text-sm font-black text-slate-800">Bappy</p>
            <p className="text-xs font-semibold text-slate-500">Farmer</p>
          </div>

          <ChevronDown size={16} className="text-slate-500" />
        </div>
      </div>
    </header>
  );
}

