"use client";

import DashboardLayout from "@/components/DashboardLayout";
import PageHeader from "@/components/PageHeader";
import { generateKrishiBotAnswer, KrishiBotResult } from "@/lib/mockAI";
import {
  AlertTriangle,
  Bot,
  CheckCircle2,
  Leaf,
  MessageCircle,
  Send,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useState } from "react";

const sampleQuestions = [
  "Tomato leaves are turning yellow. What should I do?",
  "Rain is coming tomorrow, should I spray pesticide today?",
  "When should I apply urea fertilizer for rice?",
  "How can I get better market price for tomato?",
  "How can I prepare my farm records for loan?",
];

export default function KrishiBotPage() {
  const [question, setQuestion] = useState(
    "Tomato leaves are turning yellow. What should I do?"
  );
  const [result, setResult] = useState<KrishiBotResult | null>(null);
  const [loading, setLoading] = useState(false);

  function handleAsk() {
    setLoading(true);

    setTimeout(() => {
      setResult(generateKrishiBotAnswer(question));
      setLoading(false);
    }, 650);
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="KrishiBot AI"
        description="A farming chatbot assistant that gives simple crop advice, detects problem type, suggests next steps, and recommends the right Yousun Agri360 module."
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_420px]">
        <section className="space-y-6">
          <div className="relative overflow-hidden rounded-[2rem] border border-green-100 bg-gradient-to-r from-green-100 via-lime-50 to-emerald-50 p-7 shadow-xl shadow-green-100">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-300/25 blur-3xl" />
            <div className="absolute -bottom-24 left-20 h-64 w-64 rounded-full bg-lime-300/25 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-black text-green-800 shadow">
                  <Bot size={16} />
                  AI Farming Assistant
                </div>

                <h2 className="text-3xl font-black text-slate-900">
                  Ask farming questions in simple language
                </h2>

                <p className="mt-3 max-w-2xl text-sm font-semibold leading-relaxed text-slate-600">
                  Many farmers cannot visit agriculture offices easily.
                  KrishiBot AI gives quick guidance and connects the farmer to
                  the right module like AgriDoctor, Weather Guard, Market Link,
                  FarmLedger, or AgriCredit.
                </p>
              </div>

              <div className="rounded-3xl bg-white/80 p-5 text-center shadow-lg backdrop-blur">
                <MessageCircle size={52} className="mx-auto text-green-600" />
                <p className="mt-2 text-sm font-black text-slate-500">
                  Assistant Mode
                </p>
                <p className="text-4xl font-black text-slate-900">Chat</p>
              </div>
            </div>
          </div>

          <div className="agri-card rounded-3xl p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                <Bot size={26} />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Ask KrishiBot
                </h2>
                <p className="text-sm font-semibold text-slate-500">
                  Type a farming question and get AI-style guidance.
                </p>
              </div>
            </div>

            <textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              rows={5}
              className="w-full rounded-3xl border border-green-100 bg-white p-5 text-sm font-bold leading-relaxed text-slate-700 outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100"
              placeholder="Example: Tomato leaves are turning yellow. What should I do?"
            />

            <button
              onClick={handleAsk}
              disabled={!question.trim() || loading}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-600 to-lime-500 py-4 text-sm font-black text-white shadow-lg shadow-green-200 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send size={20} />
              {loading ? "KrishiBot is thinking..." : "Ask KrishiBot AI"}
            </button>
          </div>

          {result && (
            <div className="agri-card rounded-3xl p-6">
              <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black uppercase tracking-wide text-green-700">
                    KrishiBot Response
                  </p>
                  <h2 className="mt-1 text-3xl font-black text-slate-900">
                    {result.detectedProblem}
                  </h2>
                </div>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-black ${
                    result.urgency === "High"
                      ? "bg-red-50 text-red-700"
                      : result.urgency === "Medium"
                      ? "bg-orange-50 text-orange-700"
                      : "bg-green-50 text-green-700"
                  }`}
                >
                  {result.urgency} Urgency
                </span>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <div className="flex items-start gap-3">
                  <UserRound className="mt-1 text-slate-500" size={22} />
                  <div>
                    <h3 className="font-black text-slate-900">
                      Farmer Question
                    </h3>
                    <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">
                      {result.question}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-green-50 p-5">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-1 text-green-700" size={22} />
                  <div>
                    <h3 className="font-black text-green-900">AI Advice</h3>
                    <p className="mt-2 text-sm font-semibold leading-relaxed text-green-800">
                      {result.answer}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-black text-slate-900">
                  Recommended Next Steps
                </h3>

                <div className="mt-4 space-y-3">
                  {result.nextSteps.map((step) => (
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

              <div className="mt-6 rounded-2xl bg-blue-50 p-5">
                <div className="flex items-center gap-2">
                  <Leaf className="text-blue-700" size={22} />
                  <h3 className="font-black text-blue-900">
                    Recommended Module
                  </h3>
                </div>
                <p className="mt-2 text-2xl font-black text-slate-900">
                  {result.recommendedModule}
                </p>
              </div>
            </div>
          )}
        </section>

        <aside className="space-y-5">
          <div className="agri-card rounded-3xl p-6">
            <h3 className="text-xl font-black text-slate-900">
              Try Sample Questions
            </h3>

            <div className="mt-4 space-y-3">
              {sampleQuestions.map((item) => (
                <button
                  key={item}
                  onClick={() => setQuestion(item)}
                  className="w-full rounded-2xl bg-green-50 p-4 text-left text-sm font-bold leading-relaxed text-green-900 transition hover:bg-green-100"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="agri-card rounded-3xl p-6">
            <h3 className="text-xl font-black text-slate-900">
              How KrishiBot Works
            </h3>

            <div className="mt-5 space-y-4">
              {[
                "Farmer asks a question.",
                "AI detects crop problem type.",
                "System gives simple farming advice.",
                "System recommends the best module.",
                "Farmer follows next steps or contacts expert.",
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
            <h3 className="text-xl font-black">MVP Note</h3>
            <p className="mt-3 text-sm font-semibold leading-relaxed text-green-50">
              This chatbot uses rule-based AI-style responses for the MVP.
              Future upgrade can connect with a verified agriculture knowledge
              base and LLM.
            </p>
          </div>

          <div className="agri-card rounded-3xl p-6">
            <h3 className="text-xl font-black text-slate-900">
              Safety Notice
            </h3>
            <div className="mt-4 flex items-start gap-3 rounded-2xl bg-orange-50 p-4">
              <AlertTriangle className="mt-1 text-orange-600" size={22} />
              <p className="text-sm font-bold leading-relaxed text-orange-800">
                KrishiBot gives advisory guidance. For serious crop disease,
                pesticide use, or livestock health issue, local expert
                confirmation is recommended.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </DashboardLayout>
  );
}


