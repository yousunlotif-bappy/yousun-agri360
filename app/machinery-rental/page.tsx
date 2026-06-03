"use client";

import DashboardLayout from "@/components/DashboardLayout";
import PageHeader from "@/components/PageHeader";
import { MachineItem, machines as machineData } from "@/data/machines";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Filter,
  MapPin,
  ShieldCheck,
  Star,
  Tractor,
  Truck,
  WalletCards,
  Wrench,
} from "lucide-react";
import { useMemo, useState } from "react";

export default function MachineryRentalPage() {
  const [machines, setMachines] = useState<MachineItem[]>(machineData);
  const [machineType, setMachineType] = useState("All");
  const [rentalDate, setRentalDate] = useState("2026-06-07");
  const [durationHour, setDurationHour] = useState(3);
  const [selectedMachine, setSelectedMachine] = useState<MachineItem | null>(
    null
  );

  const filteredMachines = useMemo(() => {
    if (machineType === "All") return machines;
    return machines.filter((item) => item.machineType === machineType);
  }, [machines, machineType]);

  const availableMachines = useMemo(() => {
    return machines.filter((item) => item.status === "Available").length;
  }, [machines]);

  function handleBookMachine(machine: MachineItem) {
    setSelectedMachine(machine);

    setMachines((previous) =>
      previous.map((item) =>
        item.id === machine.id ? { ...item, status: "Booked" } : item
      )
    );
  }

  function handleStartService(id: number) {
    setMachines((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, status: "In Service" } : item
      )
    );
  }

  function handleCompleteService(id: number) {
    setMachines((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, status: "Available" } : item
      )
    );

    setSelectedMachine(null);
  }

  const estimatedCost = selectedMachine
    ? selectedMachine.pricePerHour * durationHour
    : 0;

  return (
    <DashboardLayout>
      <PageHeader
        title="MachineryShare Agri"
        description="A farm equipment rental platform where small farmers can rent tractors, harvesters, irrigation pumps, drones, and threshers without buying expensive machines."
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_420px]">
        <section className="space-y-6">
          <div className="relative overflow-hidden rounded-[2rem] border border-green-100 bg-gradient-to-r from-green-100 via-lime-50 to-amber-50 p-7 shadow-xl shadow-green-100">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-lime-300/25 blur-3xl" />
            <div className="absolute -bottom-24 left-20 h-64 w-64 rounded-full bg-green-300/25 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-black text-green-800 shadow">
                  <Tractor size={16} />
                  Shared Farm Machinery
                </div>

                <h2 className="text-3xl font-black text-slate-900">
                  Rent machines when farmers need them
                </h2>

                <p className="mt-3 max-w-2xl text-sm font-semibold leading-relaxed text-slate-600">
                  Small farmers cannot always buy tractors, harvesters, pumps,
                  drones, or threshers. MachineryShare Agri helps them rent
                  nearby machines by hour or task.
                </p>
              </div>

              <div className="rounded-3xl bg-white/80 p-5 text-center shadow-lg backdrop-blur">
                <Wrench size={52} className="mx-auto text-green-600" />
                <p className="mt-2 text-sm font-black text-slate-500">
                  Available Machines
                </p>
                <p className="text-4xl font-black text-slate-900">
                  {availableMachines}
                </p>
              </div>
            </div>
          </div>

          <div className="agri-card rounded-3xl p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                <Filter size={26} />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Search Farm Machinery
                </h2>
                <p className="text-sm font-semibold text-slate-500">
                  Choose machine type, rental date, and duration.
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">
                  Machine Type
                </label>
                <select
                  value={machineType}
                  onChange={(event) => setMachineType(event.target.value)}
                  className="h-12 w-full rounded-2xl border border-green-100 bg-white px-4 text-sm font-bold text-slate-700 outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100"
                >
                  <option>All</option>
                  <option>Tractor</option>
                  <option>Harvester</option>
                  <option>Irrigation Pump</option>
                  <option>Drone</option>
                  <option>Thresher</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">
                  Rental Date
                </label>
                <input
                  type="date"
                  value={rentalDate}
                  onChange={(event) => setRentalDate(event.target.value)}
                  className="h-12 w-full rounded-2xl border border-green-100 bg-white px-4 text-sm font-bold text-slate-700 outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">
                  Duration
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={durationHour}
                    min={1}
                    onChange={(event) =>
                      setDurationHour(Number(event.target.value))
                    }
                    className="h-12 w-full rounded-2xl border border-green-100 bg-white px-4 pr-20 text-sm font-bold text-slate-700 outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400">
                    hours
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="agri-card rounded-3xl p-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-black uppercase tracking-wide text-green-700">
                  Machinery Listings
                </p>
                <h2 className="mt-1 text-3xl font-black text-slate-900">
                  Nearby Equipment
                </h2>
              </div>

              <span className="rounded-full bg-green-50 px-4 py-2 text-sm font-black text-green-700">
                {filteredMachines.length} Results
              </span>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {filteredMachines.map((machine) => (
                <MachineCard
                  key={machine.id}
                  machine={machine}
                  durationHour={durationHour}
                  onBook={() => handleBookMachine(machine)}
                  onStartService={() => handleStartService(machine.id)}
                  onCompleteService={() => handleCompleteService(machine.id)}
                />
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-5">
          <div className="agri-card rounded-3xl p-6">
            <h3 className="text-xl font-black text-slate-900">
              Booking Summary
            </h3>

            {selectedMachine ? (
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl bg-green-50 p-4">
                  <p className="text-xs font-black uppercase text-green-700">
                    Selected Machine
                  </p>
                  <p className="mt-1 text-xl font-black text-slate-900">
                    {selectedMachine.machineName}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <SummaryBox
                    label="Date"
                    value={rentalDate}
                    icon={CalendarDays}
                  />
                  <SummaryBox
                    label="Duration"
                    value={`${durationHour} hr`}
                    icon={Clock}
                  />
                  <SummaryBox
                    label="Rate"
                    value={`৳${selectedMachine.pricePerHour}/hr`}
                    icon={WalletCards}
                  />
                  <SummaryBox
                    label="Cost"
                    value={`৳${estimatedCost.toLocaleString("en-BD")}`}
                    icon={Tractor}
                  />
                </div>

                <div className="rounded-2xl bg-blue-50 p-4">
                  <p className="text-xs font-black uppercase text-blue-700">
                    Owner
                  </p>
                  <p className="mt-1 font-black text-slate-900">
                    {selectedMachine.ownerName}
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-500">
                    {selectedMachine.location}
                  </p>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-sm font-semibold leading-relaxed text-slate-500">
                No machine selected yet. Book an available machine to see the
                rental summary here.
              </p>
            )}
          </div>

          <div className="agri-card rounded-3xl p-6">
            <h3 className="text-xl font-black text-slate-900">
              How MachineryShare Works
            </h3>

            <div className="mt-5 space-y-4">
              {[
                "Machine owner lists equipment.",
                "Farmer searches by machine type.",
                "Farmer selects date and duration.",
                "Farmer books machine by hour or task.",
                "Service is completed and rating is saved.",
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
            <h3 className="text-xl font-black">Why This Matters</h3>
            <p className="mt-3 text-sm font-semibold leading-relaxed text-green-50">
              Small farmers can access modern machinery without buying expensive
              equipment. This reduces cost, saves labor, and improves production
              speed.
            </p>
          </div>

          <div className="agri-card rounded-3xl p-6">
            <h3 className="text-xl font-black text-slate-900">
              Future Upgrade
            </h3>

            <div className="mt-4 space-y-3">
              {[
                "GPS-based machine search",
                "Machine owner verification",
                "Mobile banking payment",
                "Live service tracking",
                "Farmer and owner rating system",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl bg-green-50 p-3"
                >
                  <CheckCircle2 className="text-green-700" size={18} />
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

function MachineCard({
  machine,
  durationHour,
  onBook,
  onStartService,
  onCompleteService,
}: {
  machine: MachineItem;
  durationHour: number;
  onBook: () => void;
  onStartService: () => void;
  onCompleteService: () => void;
}) {
  const estimatedCost = machine.pricePerHour * durationHour;

  const statusClass = {
    Available: "bg-green-50 text-green-700",
    Booked: "bg-orange-50 text-orange-700",
    "In Service": "bg-blue-50 text-blue-700",
  };

  return (
    <div className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-black text-green-700">
            <Tractor size={14} />
            {machine.machineType}
          </div>

          <h3 className="text-2xl font-black text-slate-900">
            {machine.machineName}
          </h3>

          <p className="mt-2 flex items-center gap-2 text-sm font-bold text-slate-500">
            <MapPin size={16} className="text-green-700" />
            {machine.location} • {machine.distanceKm} km away
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-black ${
            statusClass[machine.status]
          }`}
        >
          {machine.status}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-black uppercase text-slate-500">Rate</p>
          <p className="mt-1 text-xl font-black text-slate-900">
            ৳{machine.pricePerHour}/hr
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-black uppercase text-slate-500">
            Est. Cost
          </p>
          <p className="mt-1 text-xl font-black text-slate-900">
            ৳{estimatedCost.toLocaleString("en-BD")}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-black uppercase text-slate-500">
            Capacity
          </p>
          <p className="mt-1 text-sm font-black text-slate-900">
            {machine.capacity}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-black uppercase text-slate-500">
            Rating
          </p>
          <p className="mt-1 flex items-center gap-1 text-sm font-black text-amber-700">
            <Star size={15} fill="currentColor" />
            {machine.rating}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500">Owner</p>
          <p className="font-black text-slate-900">{machine.ownerName}</p>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-sm font-black text-green-700">
          <ShieldCheck size={16} />
          Verified
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        {machine.status === "Available" && (
          <button
            onClick={onBook}
            className="flex-1 rounded-2xl bg-green-600 py-3 text-sm font-black text-white transition hover:bg-green-700"
          >
            Book Machine
          </button>
        )}

        {machine.status === "Booked" && (
          <button
            onClick={onStartService}
            className="flex-1 rounded-2xl bg-orange-500 py-3 text-sm font-black text-white transition hover:bg-orange-600"
          >
            Start Service
          </button>
        )}

        {machine.status === "In Service" && (
          <button
            onClick={onCompleteService}
            className="flex-1 rounded-2xl bg-blue-600 py-3 text-sm font-black text-white transition hover:bg-blue-700"
          >
            Complete Service
          </button>
        )}
      </div>
    </div>
  );
}

function SummaryBox({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <Icon size={22} className="text-green-700" />
      <p className="mt-3 text-xs font-black uppercase text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-black text-slate-900">{value}</p>
    </div>
  );
}



