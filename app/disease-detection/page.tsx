"use client";

import DashboardLayout from "@/components/DashboardLayout";
import PageHeader from "@/components/PageHeader";
import type { DiseaseResult } from "@/lib/mockAI";
import {
  AlertTriangle,
  CheckCircle2,
  ImageUp,
  Leaf,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { useMemo, useState } from "react";

export default function DiseaseDetectionPage() {
  const [crop, setCrop] = useState("Tomato");
  const [imageName, setImageName] = useState("");
  const [preview, setPreview] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<DiseaseResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");

  const riskClass = useMemo(() => {
    if (!result) return "bg-slate-100 text-slate-700";

    if (result.riskLevel === "High") return "bg-red-50 text-red-700";
    if (result.riskLevel === "Medium") return "bg-orange-50 text-orange-700";
    return "bg-green-50 text-green-700";
  }, [result]);

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
    setImageName(file.name);
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setApiMessage("");
  }

  async function handleAnalyze() {
    if (!selectedFile) return;

    setLoading(true);
    setApiMessage("");

    try {
      const formData = new FormData();
      formData.append("crop", crop);
      formData.append("image", selectedFile);

      const response = await fetch("/api/agri-doctor", {
        method: "POST",
        body: formData,
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.message || "Failed to analyze crop image.");
      }

      setResult(json.data);
      setApiMessage(json.message || "Analysis completed successfully.");
    } catch (error) {
      setApiMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong during analysis."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="AgriDoctor AI"
        description="Upload a crop image and get an AI-style disease diagnosis, risk level, treatment advice, organic solution, and expert recommendation."
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_420px]">
        <section className="space-y-6">
          <div className="agri-card rounded-3xl p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                <Stethoscope size={26} />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Crop Disease Detection
                </h2>
                <p className="text-sm font-semibold text-slate-500">
                  Select crop, upload affected leaf/photo, then run backend API
                  analysis.
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">
                  Select Crop
                </label>
                <select
                  value={crop}
                  onChange={(event) => setCrop(event.target.value)}
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

              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">
                  Farmer Location
                </label>
                <input
                  value="Rajshahi, Bangladesh"
                  readOnly
                  className="h-12 w-full rounded-2xl border border-green-100 bg-green-50 px-4 text-sm font-bold text-green-800 outline-none"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-black text-slate-700">
                Upload Crop Image
              </label>

              <label className="flex min-h-[260px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-green-200 bg-green-50/50 p-6 text-center transition hover:border-green-500 hover:bg-green-50">
                {preview ? (
                  <div className="space-y-4">
                    <img
                      src={preview}
                      alt="Crop preview"
                      className="mx-auto max-h-52 rounded-2xl object-cover shadow-lg"
                    />
                    <p className="text-sm font-black text-green-700">
                      {imageName}
                    </p>
                  </div>
                ) : (
                  <>
                    <ImageUp size={54} className="text-green-700" />
                    <h3 className="mt-4 text-xl font-black text-slate-900">
                      Upload affected crop image
                    </h3>
                    <p className="mt-2 max-w-md text-sm font-semibold leading-relaxed text-slate-500">
                      Use a clear photo of the leaf, fruit, stem, or affected
                      plant area for better analysis.
                    </p>
                  </>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {apiMessage && (
              <div
                className={`mt-5 rounded-2xl p-4 text-sm font-bold ${
                  result
                    ? "bg-green-50 text-green-800"
                    : "bg-orange-50 text-orange-800"
                }`}
              >
                {apiMessage}
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={!selectedFile || loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-600 to-lime-500 py-4 text-sm font-black text-white shadow-lg shadow-green-200 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Sparkles size={20} />
              {loading
                ? "Calling AgriDoctor API..."
                : "Analyze with AgriDoctor API"}
            </button>
          </div>

          {result && (
            <div className="agri-card rounded-3xl p-6">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-black uppercase tracking-wide text-green-700">
                    API Diagnosis Result
                  </p>
                  <h2 className="mt-1 text-3xl font-black text-slate-900">
                    {result.disease}
                  </h2>
                </div>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-black ${riskClass}`}
                >
                  {result.riskLevel} Risk
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-green-50 p-5">
                  <p className="text-xs font-black uppercase text-green-700">
                    Crop
                  </p>
                  <p className="mt-2 text-2xl font-black text-slate-900">
                    {result.crop}
                  </p>
                </div>

                <div className="rounded-2xl bg-blue-50 p-5">
                  <p className="text-xs font-black uppercase text-blue-700">
                    Confidence
                  </p>
                  <p className="mt-2 text-2xl font-black text-slate-900">
                    {result.confidence}%
                  </p>
                </div>

                <div className="rounded-2xl bg-orange-50 p-5">
                  <p className="text-xs font-black uppercase text-orange-700">
                    Action Priority
                  </p>
                  <p className="mt-2 text-2xl font-black text-slate-900">
                    {result.riskLevel === "High" ? "Urgent" : "Monitor"}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-1 text-orange-600" size={22} />
                  <div>
                    <h3 className="font-black text-slate-900">
                      Possible Cause
                    </h3>
                    <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">
                      {result.cause}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-black text-slate-900">
                  Recommended Treatment Steps
                </h3>

                <div className="mt-4 space-y-3">
                  {result.treatment.map((step) => (
                    <div
                      key={step}
                      className="flex items-start gap-3 rounded-2xl border border-green-100 bg-white p-4"
                    >
                      <CheckCircle2
                        className="mt-0.5 text-green-600"
                        size={20}
                      />
                      <p className="text-sm font-semibold leading-relaxed text-slate-600">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-green-50 p-5">
                  <div className="flex items-center gap-2">
                    <Leaf className="text-green-700" size={22} />
                    <h3 className="font-black text-green-900">
                      Organic Solution
                    </h3>
                  </div>
                  <p className="mt-3 text-sm font-semibold leading-relaxed text-green-800">
                    {result.organicSolution}
                  </p>
                </div>

                <div className="rounded-2xl bg-blue-50 p-5">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="text-blue-700" size={22} />
                    <h3 className="font-black text-blue-900">
                      Expert Advice
                    </h3>
                  </div>
                  <p className="mt-3 text-sm font-semibold leading-relaxed text-blue-800">
                    {result.expertAdvice}
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        <aside className="space-y-5">
          <div className="agri-card rounded-3xl p-6">
            <h3 className="text-xl font-black text-slate-900">
              API Workflow
            </h3>

            <div className="mt-5 space-y-4">
              {[
                "Farmer selects crop type.",
                "Farmer uploads crop image.",
                "Frontend sends data to /api/agri-doctor.",
                "Backend runs mock AI disease logic.",
                "Frontend displays diagnosis result.",
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
            <h3 className="text-xl font-black">Backend Connected</h3>
            <p className="mt-3 text-sm font-semibold leading-relaxed text-green-50">
              This page now uses the Next.js API route{" "}
              <span className="font-black">/api/agri-doctor</span>. This makes
              the module more professional than a static frontend-only demo.
            </p>
          </div>

          <div className="agri-card rounded-3xl p-6">
            <h3 className="text-xl font-black text-slate-900">
              Supported Crops
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Tomato", "Boro Rice", "Potato", "Onion", "Maize", "Mango"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full bg-green-50 px-4 py-2 text-xs font-black text-green-700"
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </div>
        </aside>
      </div>
    </DashboardLayout>
  );
}


