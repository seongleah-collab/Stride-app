"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const durations = [
  { id: "15-30",  label: "15–30 min" },
  { id: "30-45",  label: "30–45 min" },
  { id: "45-60",  label: "45–60 min" },
  { id: "60-90",  label: "60–90 min" },
  { id: "90+",    label: "90+ min" },
];

const times = [
  { id: "early",     emoji: "🌅", label: "Early morning", desc: "5–8 am" },
  { id: "morning",   emoji: "☀️", label: "Morning",        desc: "8–11 am" },
  { id: "afternoon", emoji: "🌤", label: "Afternoon",      desc: "11 am–3 pm" },
  { id: "evening",   emoji: "🌆", label: "Evening",        desc: "3–7 pm" },
  { id: "night",     emoji: "🌙", label: "Night",          desc: "7 pm+" },
  { id: "any",       emoji: "🔄", label: "No preference",  desc: "Anytime works" },
];

const levels = [
  { id: "beginner",     emoji: "🌱", label: "Just starting out",    desc: "Brand new to working out" },
  { id: "intermediate", emoji: "💪", label: "Some experience",       desc: "Work out occasionally" },
  { id: "active",       emoji: "🔥", label: "Fairly active",         desc: "Regular gym-goer" },
  { id: "athlete",      emoji: "🏆", label: "Dedicated athlete",     desc: "High-performance training" },
];

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex gap-1.5 mb-8">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-1 flex-1 rounded-full"
          style={i < step ? { background: "linear-gradient(90deg, #7c3aed, #f97316)" } : { background: "#e2e8f0" }}
        />
      ))}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-semibold text-slate-700 mb-3">{children}</h2>;
}

export default function SchedulePage() {
  const [days, setDays] = useState<number | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [level, setLevel] = useState<string | null>(null);
  const router = useRouter();

  const complete = days && duration && time && level;

  const gradientStyle = { background: "linear-gradient(135deg, #7c3aed, #f97316)" };

  return (
    <main className="min-h-screen bg-white flex flex-col px-6 py-8 pb-32 max-w-sm mx-auto w-full">
      <Link href="/onboarding/activities" className="text-slate-400 hover:text-slate-600 transition-colors mb-6 self-start">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </Link>

      <ProgressBar step={5} />

      <p className="text-sm font-semibold text-violet-600 mb-2">Step 5 of 5</p>
      <h1 className="text-2xl font-bold text-slate-800 mb-1">Build your schedule</h1>
      <p className="text-slate-400 text-sm mb-8">Tell us how you like to train and we'll do the rest.</p>

      {/* Days per week */}
      <div className="mb-8">
        <SectionLabel>How many days per week?</SectionLabel>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5, 6, 7].map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`flex-1 py-3 rounded-xl text-sm font-bold border-2 transition-all ${
                days === d ? "border-transparent text-white" : "border-slate-200 text-slate-600"
              }`}
              style={days === d ? gradientStyle : {}}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="mb-8">
        <SectionLabel>How long per session?</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {durations.map((d) => (
            <button
              key={d.id}
              onClick={() => setDuration(d.id)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
                duration === d.id ? "border-transparent text-white" : "border-slate-200 text-slate-600"
              }`}
              style={duration === d.id ? gradientStyle : {}}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Time preference */}
      <div className="mb-8">
        <SectionLabel>When do you prefer to train?</SectionLabel>
        <div className="grid grid-cols-2 gap-2">
          {times.map((t) => (
            <button
              key={t.id}
              onClick={() => setTime(t.id)}
              className={`flex flex-col px-3 py-3 rounded-xl border-2 text-left transition-all ${
                time === t.id ? "border-transparent" : "border-slate-200"
              }`}
              style={time === t.id ? gradientStyle : {}}
            >
              <span className={`text-xs font-semibold ${time === t.id ? "text-white" : "text-slate-700"}`}>
                {t.emoji} {t.label}
              </span>
              <span className={`text-xs mt-0.5 ${time === t.id ? "text-white/70" : "text-slate-400"}`}>{t.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Experience level */}
      <div className="mb-4">
        <SectionLabel>What's your experience level?</SectionLabel>
        <div className="flex flex-col gap-2">
          {levels.map((l) => (
            <button
              key={l.id}
              onClick={() => setLevel(l.id)}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 text-left transition-all active:scale-[0.98] ${
                level === l.id ? "border-transparent" : "border-slate-200"
              }`}
              style={level === l.id ? gradientStyle : {}}
            >
              <span className="text-xl">{l.emoji}</span>
              <div>
                <p className={`font-semibold text-sm ${level === l.id ? "text-white" : "text-slate-800"}`}>{l.label}</p>
                <p className={`text-xs ${level === l.id ? "text-white/70" : "text-slate-400"}`}>{l.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm px-6 pb-8 pt-4 bg-white/90 backdrop-blur-sm">
        <button
          onClick={() => {
            localStorage.setItem("stride_schedule", JSON.stringify({ days, duration, time, level }));
            router.push("/dashboard");
          }}
          disabled={!complete}
          className={`w-full font-bold text-base py-4 rounded-2xl text-white transition-opacity ${!complete ? "opacity-40" : ""}`}
          style={{ background: "linear-gradient(90deg, #7c3aed, #f97316)" }}
        >
          {complete ? "Let's go! 🎉" : "Complete all sections to continue"}
        </button>
      </div>
    </main>
  );
}
