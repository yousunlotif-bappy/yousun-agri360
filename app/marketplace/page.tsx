"use client";

import DashboardLayout from "@/components/DashboardLayout";
import PageHeader from "@/components/PageHeader";
import {
  initialProductListings,
  ProductListing,
} from "@/data/mockResults";
import {
  CheckCircle2,
  MapPin,
  PackagePlus,
  ShoppingCart,
  Star,
  Store,
  Truck,
  UserCheck,
  WalletCards,
} from "lucide-react";
import { useMemo, useState } from "react";

export default function MarketplacePage() {
  const [listings, setListings] = useState<ProductListing[]>(
    initialProductListings
  );

  const [form, setForm] = useState({
    cropName: "Tomato",
    quantityKg: 500,
    pricePerKg: 32,
    harvestDate: "2026-06-05",
    location: "Rajshahi, Bangladesh",
    deliveryOption: "Farmer Delivery" as ProductListing["deliveryOption"],
  });

  const totalAvailableValue = useMemo(() => {
    return listings
      .filter((item) => item.status === "Available")
      .reduce((sum, item) => sum + item.quantityKg * item.pricePerKg, 0);
  }, [listings]);

  function updateField(field: string, value: string) {
    setForm((previous) => ({
      ...previous,
      [field]:
        field === "quantityKg" || field === "pricePerKg"
          ? Number(value)
          : value,
    }));
  }

  function handleAddListing() {
    const newListing: ProductListing = {
      id: Date.now(),
      cropName: form.cropName,
      farmerName: "Bappy",
      location: form.location,
      quantityKg: form.quantityKg,
      pricePerKg: form.pricePerKg,
      harvestDate: form.harvestDate,
      deliveryOption: form.deliveryOption,
      status: "Available",
      rating: 4.9,
    };

    setListings((previous) => [newListing, ...previous]);
  }

  function handleOrder(id: number) {
    setListings((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, status: "Ordered" } : item
      )
    );
  }

  function handleDelivered(id: number) {
    setListings((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, status: "Delivered" } : item
      )
    );
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="Farm2Market"
        description="A farmer-to-buyer marketplace where farmers can list crops, connect with buyers, track orders, and reduce dependency on middlemen."
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_420px]">
        <section className="space-y-6">
          <div className="relative overflow-hidden rounded-[2rem] border border-green-100 bg-gradient-to-r from-green-100 via-lime-50 to-amber-50 p-7 shadow-xl shadow-green-100">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-lime-300/25 blur-3xl" />
            <div className="absolute -bottom-24 left-20 h-64 w-64 rounded-full bg-green-300/25 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-black text-green-800 shadow">
                  <Store size={16} />
                  Direct Farmer Marketplace
                </div>

                <h2 className="text-3xl font-black text-slate-900">
                  Sell crops directly to buyers
                </h2>

                <p className="mt-3 max-w-2xl text-sm font-semibold leading-relaxed text-slate-600">
                  Farmers often produce good crops but cannot reach shops,
                  wholesalers, restaurants, or consumers directly. Farm2Market
                  creates a simple digital selling workflow.
                </p>
              </div>

              <div className="rounded-3xl bg-white/80 p-5 text-center shadow-lg backdrop-blur">
                <WalletCards size={52} className="mx-auto text-green-600" />
                <p className="mt-2 text-sm font-black text-slate-500">
                  Available Value
                </p>
                <p className="text-3xl font-black text-slate-900">
                  ৳{totalAvailableValue.toLocaleString("en-BD")}
                </p>
              </div>
            </div>
          </div>

          <div className="agri-card rounded-3xl p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                <PackagePlus size={26} />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Add Product Listing
                </h2>
                <p className="text-sm font-semibold text-slate-500">
                  Farmer can list crops with quantity, price, harvest date, and
                  delivery option.
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">
                  Crop Name
                </label>
                <select
                  value={form.cropName}
                  onChange={(event) =>
                    updateField("cropName", event.target.value)
                  }
                  className="h-12 w-full rounded-2xl border border-green-100 bg-white px-4 text-sm font-bold text-slate-700 outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100"
                >
                  <option>Tomato</option>
                  <option>Boro Rice</option>
                  <option>Potato</option>
                  <option>Onion</option>
                  <option>Maize</option>
                  <option>Mango</option>
                </select>
              </div>

              <NumberInput
                label="Quantity"
                suffix="kg"
                value={form.quantityKg}
                onChange={(value) => updateField("quantityKg", value)}
              />

              <NumberInput
                label="Price"
                suffix="৳/kg"
                value={form.pricePerKg}
                onChange={(value) => updateField("pricePerKg", value)}
              />

              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">
                  Harvest Date
                </label>
                <input
                  type="date"
                  value={form.harvestDate}
                  onChange={(event) =>
                    updateField("harvestDate", event.target.value)
                  }
                  className="h-12 w-full rounded-2xl border border-green-100 bg-white px-4 text-sm font-bold text-slate-700 outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">
                  Location
                </label>
                <select
                  value={form.location}
                  onChange={(event) =>
                    updateField("location", event.target.value)
                  }
                  className="h-12 w-full rounded-2xl border border-green-100 bg-white px-4 text-sm font-bold text-slate-700 outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100"
                >
                  <option>Rajshahi, Bangladesh</option>
                  <option>Naogaon, Bangladesh</option>
                  <option>Bogura, Bangladesh</option>
                  <option>Dhaka, Bangladesh</option>
                  <option>Khulna, Bangladesh</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">
                  Delivery Option
                </label>
                <select
                  value={form.deliveryOption}
                  onChange={(event) =>
                    updateField("deliveryOption", event.target.value)
                  }
                  className="h-12 w-full rounded-2xl border border-green-100 bg-white px-4 text-sm font-bold text-slate-700 outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100"
                >
                  <option>Pickup</option>
                  <option>Farmer Delivery</option>
                  <option>Transport Partner</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleAddListing}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-600 to-lime-500 py-4 text-sm font-black text-white shadow-lg shadow-green-200 transition hover:scale-[1.01]"
            >
              <PackagePlus size={20} />
              Add Product to Marketplace
            </button>
          </div>

          <div className="agri-card rounded-3xl p-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-black uppercase tracking-wide text-green-700">
                  Marketplace Listings
                </p>
                <h2 className="mt-1 text-3xl font-black text-slate-900">
                  Available Farm Products
                </h2>
              </div>

              <span className="rounded-full bg-green-50 px-4 py-2 text-sm font-black text-green-700">
                {listings.length} Listings
              </span>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {listings.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  onOrder={() => handleOrder(item.id)}
                  onDelivered={() => handleDelivered(item.id)}
                />
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-5">
          <div className="agri-card rounded-3xl p-6">
            <h3 className="text-xl font-black text-slate-900">
              How Farm2Market Works
            </h3>

            <div className="mt-5 space-y-4">
              {[
                "Farmer adds crop product listing.",
                "Buyer searches available products.",
                "Buyer places order from farmer.",
                "Farmer accepts and delivers product.",
                "Payment, status, and rating build trust.",
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
              This module helps farmers sell directly instead of depending only
              on middlemen. It can improve profit, transparency, and buyer
              access.
            </p>
          </div>

          <div className="agri-card rounded-3xl p-6">
            <h3 className="text-xl font-black text-slate-900">
              Marketplace Stats
            </h3>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <StatBox label="Orders" value="18" icon={ShoppingCart} />
              <StatBox label="Buyers" value="42" icon={UserCheck} />
              <StatBox label="Delivery" value="92%" icon={Truck} />
              <StatBox label="Rating" value="4.8" icon={Star} />
            </div>
          </div>

          <div className="agri-card rounded-3xl p-6">
            <h3 className="text-xl font-black text-slate-900">
              Future Upgrade
            </h3>

            <div className="mt-4 space-y-3">
              {[
                "Buyer verification",
                "Mobile banking payment",
                "Transport partner integration",
                "Product quality grading",
                "Live order tracking",
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

function ProductCard({
  item,
  onOrder,
  onDelivered,
}: {
  item: ProductListing;
  onOrder: () => void;
  onDelivered: () => void;
}) {
  const totalValue = item.quantityKg * item.pricePerKg;

  const statusClass = {
    Available: "bg-green-50 text-green-700",
    Ordered: "bg-orange-50 text-orange-700",
    Delivered: "bg-blue-50 text-blue-700",
  };

  return (
    <div className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-black text-green-700">
            <Store size={14} />
            {item.cropName}
          </div>

          <h3 className="text-2xl font-black text-slate-900">
            {item.quantityKg} kg Available
          </h3>

          <p className="mt-2 flex items-center gap-2 text-sm font-bold text-slate-500">
            <MapPin size={16} className="text-green-700" />
            {item.location}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-black ${
            statusClass[item.status]
          }`}
        >
          {item.status}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-black uppercase text-slate-500">
            Price
          </p>
          <p className="mt-1 text-xl font-black text-slate-900">
            ৳{item.pricePerKg}/kg
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-black uppercase text-slate-500">
            Total Value
          </p>
          <p className="mt-1 text-xl font-black text-slate-900">
            ৳{totalValue.toLocaleString("en-BD")}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-black uppercase text-slate-500">
            Harvest
          </p>
          <p className="mt-1 text-sm font-black text-slate-900">
            {item.harvestDate}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-black uppercase text-slate-500">
            Delivery
          </p>
          <p className="mt-1 text-sm font-black text-slate-900">
            {item.deliveryOption}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500">Farmer</p>
          <p className="font-black text-slate-900">{item.farmerName}</p>
        </div>

        <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm font-black text-amber-700">
          <Star size={15} fill="currentColor" />
          {item.rating}
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        {item.status === "Available" && (
          <button
            onClick={onOrder}
            className="flex-1 rounded-2xl bg-green-600 py-3 text-sm font-black text-white transition hover:bg-green-700"
          >
            Simulate Buyer Order
          </button>
        )}

        {item.status === "Ordered" && (
          <button
            onClick={onDelivered}
            className="flex-1 rounded-2xl bg-blue-600 py-3 text-sm font-black text-white transition hover:bg-blue-700"
          >
            Mark Delivered
          </button>
        )}

        {item.status === "Delivered" && (
          <button
            disabled
            className="flex-1 rounded-2xl bg-slate-100 py-3 text-sm font-black text-slate-500"
          >
            Order Completed
          </button>
        )}
      </div>
    </div>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (value: string) => void;
  suffix: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-black text-slate-700">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-12 w-full rounded-2xl border border-green-100 bg-white px-4 pr-16 text-sm font-bold text-slate-700 outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400">
          {suffix}
        </span>
      </div>
    </div>
  );
}

function StatBox({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-2xl bg-green-50 p-4">
      <Icon size={24} className="text-green-700" />
      <p className="mt-3 text-xs font-black uppercase text-green-700">
        {label}
      </p>
      <p className="mt-1 text-2xl font-black text-slate-900">{value}</p>
    </div>
  );
}


