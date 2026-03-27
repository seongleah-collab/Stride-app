"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const activities = [
  { id: "running",     emoji: "🏃", label: "Running" },
  { id: "cycling",     emoji: "🚴", label: "Cycling" },
  { id: "swimming",    emoji: "🏊", label: "Swimming" },
  { id: "weights",     emoji: "🏋️", label: "Weight Training" },
  { id: "hiit",        emoji: "⚡", label: "HIIT" },
  { id: "yoga",        emoji: "🧘", label: "Yoga" },
  { id: "boxing",      emoji: "🥊", label: "Boxing" },
  { id: "hiking",      emoji: "🥾", label: "Hiking" },
  { id: "dance",       emoji: "💃", label: "Dance" },
  { id: "basketball",  emoji: "🏀", label: "Basketball" },
  { id: "soccer",      emoji: "⚽", label: "Soccer" },
  { id: "tennis",      emoji: "🎾", label: "Tennis" },
  { id: "crossfit",    emoji: "🔗", label: "CrossFit" },
  { id: "climbing",    emoji: "🧗", label: "Rock Climbing" },
  { id: "pilates",     emoji: "🤸", label: "Pilates" },
  { id: "rowing",      emoji: "🚣", label: "Rowing" },
  { id: "golf",        emoji: "⛳", label: "Golf" },
  { id: "skiing",      emoji: "🎿", label: "Skiing" },
];

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex gap-1.5 mb-8">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-1 flex-1 rounded-full"
          style={i < step ? { background: "#7c3aed" } : { background: "#e2e8f0" }}
        />
      ))}
    </div>
  );
}

export default function ActivitiesPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <main className="min-h-screen bg-[#f8f7f4] flex flex-col px-6 py-8 pb-32 max-w-sm mx-auto w-full">
      <Link href="/onboarding/goals" className="text-slate-400 hover:text-slate-600 transition-colors mb-6 self-start">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </Link>

      <ProgressBar step={4} />

      <p className="text-sm font-semibold text-violet-600 mb-2">Step 4 of 5</p>
      <h1 className="text-2xl font-bold text-slate-800 mb-1">What workouts are you into?</h1>
      <p className="text-slate-400 text-sm mb-6">Pick your favorites — you can always add more later.</p>

      <div className="grid grid-cols-3 gap-2.5">
        {activities.map((a) => {
          const on = selected.includes(a.id);
          return (
            <button
              key={a.id}
              onClick={() => toggle(a.id)}
              className={`flex flex-col items-center gap-2 py-4 px-2 rounded-xl border transition-all active:scale-95 bg-white ${
                on ? "border-violet-600 bg-violet-600" : "border-stone-200 hover:border-stone-300"
              }`}
            >
              <span className="text-2xl">{a.emoji}</span>
              <span className={`text-xs font-medium text-center leading-tight ${on ? "text-white" : "text-slate-600"}`}>
                {a.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm px-6 pb-8 pt-4 bg-[#f8f7f4]/90 backdrop-blur-sm">
        <button
          onClick={() => {
            localStorage.setItem("stride_activities", JSON.stringify(selected));
            router.push("/onboarding/schedule");
          }}
          disabled={selected.length === 0}
          className={`w-full font-bold text-base py-4 rounded-xl text-white transition-opacity bg-slate-900 hover:bg-slate-700 ${selected.length === 0 ? "opacity-40" : ""}`}
        >
          {selected.length > 0 ? `Continue · ${selected.length} selected` : "Select at least one"}
        </button>
      </div>
    </main>
  );
}
