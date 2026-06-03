"use client";

import DashboardLayout from "@/components/DashboardLayout";
import PageHeader from "@/components/PageHeader";
import { generateKrishiVoiceReply, KrishiVoiceResult } from "@/lib/mockAI";
import {
  AudioLines,
  Bot,
  CheckCircle2,
  Languages,
  Mic,
  PlayCircle,
  Radio,
  Send,
  Volume2,
} from "lucide-react";
import { useState } from "react";

const voiceSamples = [
  "Amar dhan gacher pata lal hoye jacche",
  "Kal bristi hole ami pesticide spray korbo naki?",
  "Tomato er market dam kothay beshi?",
  "Amar fasol er jonno ki advice diben?",
];

export default function KrishiVoicePage() {
  const [voiceInput, setVoiceInput] = useState(
    "Amar dhan gacher pata lal hoye jacche"
  );
  const [result, setResult] = useState<KrishiVoiceResult | null>(null);
  const [listening, setListening] = useState(false);

  function handleVoiceDemo() {
    setListening(true);

    setTimeout(() => {
      setResult(generateKrishiVoiceReply(voiceInput));
      setListening(false);
    }, 750);
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="KrishiVoice"
        description="A Bangla voice-based farming assistant concept for farmers who may not be comfortable using complex mobile apps or typing long questions."
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_420px]">
        <section className="space-y-6">
          <div className="relative overflow-hidden rounded-[2rem] border border-green-100 bg-gradient-to-r from-green-100 via-lime-50 to-sky-50 p-7 shadow-xl shadow-green-100">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sky-300/25 blur-3xl" />
            <div className="absolute -bottom-24 left-20 h-64 w-64 rounded-full bg-green-300/25 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-black text-green-800 shadow">
                  <Mic size={16} />
                  Bangla Voice Assistant
                </div>

                <h2 className="text-3xl font-black text-slate-900">
                  Farming support for low-digital-literacy farmers
                </h2>

                <p className="mt-3 max-w-2xl text-sm font-semibold leading-relaxed text-slate-600">
                  Many farmers may not use complex apps. KrishiVoice allows
                  farmers to speak in Bangla or Bangla-English mixed language
                  and receive simple voice-style farming advice.
                </p>
              </div>

              <div className="rounded-3xl bg-white/80 p-5 text-center shadow-lg backdrop-blur">
                <AudioLines size={52} className="mx-auto text-green-600" />
                <p className="mt-2 text-sm font-black text-slate-500">
                  Voice Mode
                </p>
                <p className="text-4xl font-black text-slate-900">BN</p>
              </div>
            </div>
          </div>

          <div className="agri-card rounded-3xl p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                <Mic size={26} />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Voice Input Demo
                </h2>
                <p className="text-sm font-semibold text-slate-500">
                  Type a simulated Bangla voice input and generate voice-style
                  response.
                </p>
              </div>
            </div>

            <textarea
              value={voiceInput}
              onChange={(event) => setVoiceInput(event.target.value)}
              rows={4}
              className="w-full rounded-3xl border border-green-100 bg-white p-5 text-sm font-bold leading-relaxed text-slate-700 outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100"
              placeholder="Example: Amar dhan gacher pata lal hoye jacche"
            />

            <button
              onClick={handleVoiceDemo}
              disabled={!voiceInput.trim() || listening}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-600 to-sky-500 py-4 text-sm font-black text-white shadow-lg shadow-green-200 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Radio size={20} />
              {listening ? "Processing Voice..." : "Run Voice Assistant Demo"}
            </button>
          </div>

          {result && (
            <div className="agri-card rounded-3xl p-6">
              <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black uppercase tracking-wide text-green-700">
                    KrishiVoice Response
                  </p>
                  <h2 className="mt-1 text-3xl font-black text-slate-900">
                    Voice Advice Generated
                  </h2>
                </div>

                <span className="rounded-full bg-green-50 px-4 py-2 text-sm font-black text-green-700">
                  {result.detectedLanguage}
                </span>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <div className="flex items-start gap-3">
                  <Mic className="mt-1 text-slate-500" size={22} />
                  <div>
                    <h3 className="font-black text-slate-900">
                      Simulated Voice Input
                    </h3>
                    <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">
                      {result.voiceInput}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-blue-50 p-5">
                <div className="flex items-start gap-3">
                  <Languages className="mt-1 text-blue-700" size={22} />
                  <div>
                    <h3 className="font-black text-blue-900">Transcript</h3>
                    <p className="mt-2 text-sm font-semibold leading-relaxed text-blue-800">
                      {result.transcript}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-green-50 p-5">
                <div className="flex items-start gap-3">
                  <Volume2 className="mt-1 text-green-700" size={22} />
                  <div>
                    <h3 className="font-black text-green-900">
                      Bangla Voice Reply
                    </h3>
                    <p className="mt-2 text-sm font-semibold leading-relaxed text-green-800">
                      {result.voiceReply}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-orange-50 p-5">
                <div className="flex items-start gap-3">
                  <Send className="mt-1 text-orange-700" size={22} />
                  <div>
                    <h3 className="font-black text-orange-900">
                      Suggested Action
                    </h3>
                    <p className="mt-2 text-sm font-semibold leading-relaxed text-orange-800">
                      {result.action}
                    </p>
                  </div>
                </div>
              </div>

              <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-green-500 py-4 text-sm font-black text-green-700 transition hover:bg-green-600 hover:text-white">
                <PlayCircle size={20} />
                Simulate Audio Playback
              </button>
            </div>
          )}
        </section>

        <aside className="space-y-5">
          <div className="agri-card rounded-3xl p-6">
            <h3 className="text-xl font-black text-slate-900">
              Try Voice Samples
            </h3>

            <div className="mt-4 space-y-3">
              {voiceSamples.map((item) => (
                <button
                  key={item}
                  onClick={() => setVoiceInput(item)}
                  className="w-full rounded-2xl bg-green-50 p-4 text-left text-sm font-bold leading-relaxed text-green-900 transition hover:bg-green-100"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="agri-card rounded-3xl p-6">
            <h3 className="text-xl font-black text-slate-900">
              How KrishiVoice Works
            </h3>

            <div className="mt-5 space-y-4">
              {[
                "Farmer speaks or sends voice message.",
                "System converts voice to transcript.",
                "AI understands crop problem.",
                "System creates simple Bangla reply.",
                "Farmer hears or reads the advice.",
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

          <div className="rounded-3xl bg-gradient-to-br from-green-700 to-sky-500 p-6 text-white shadow-xl shadow-green-200">
            <h3 className="text-xl font-black">MVP Note</h3>
            <p className="mt-3 text-sm font-semibold leading-relaxed text-green-50">
              This is a simulated voice assistant demo. Future upgrade can use
              real speech-to-text, text-to-speech, IVR, WhatsApp voice, and SMS
              support.
            </p>
          </div>

          <div className="agri-card rounded-3xl p-6">
            <h3 className="text-xl font-black text-slate-900">
              Farmer-Friendly Channels
            </h3>

            <div className="mt-4 space-y-3">
              {[
                "Voice call / IVR",
                "WhatsApp voice message",
                "Bangla audio reply",
                "SMS summary",
                "Offline-first support",
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


