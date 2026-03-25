"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const goals = [
  { id: "lose_weight",  emoji: "🔥", label: "Lose weight",            desc: "Burn fat and reach a healthier body weight" },
  { id: "build_muscle", emoji: "💪", label: "Build muscle",            desc: "Gain strength and increase muscle mass" },
  { id: "endurance",    emoji: "🏃", label: "Boost endurance",         desc: "Go harder and farther for longer" },
  { id: "performance",  emoji: "⚡", label: "Improve performance",     desc: "Level up your sport or training output" },
  { id: "flexibility",  emoji: "🧘", label: "Flexibility & mobility",  desc: "Move better, reduce stiffness and pain" },
  { id: "event",        emoji: "🏆", label: "Train for an event",      desc: "Prep for a race, competition, or challenge" },
  { id: "mental",       emoji: "🧠", label: "Mental wellness",         desc: "Reduce stress, improve mood and focus" },
  { id: "heart",        emoji: "❤️", label: "Heart health",            desc: "Strengthen your cardiovascular system" },
  { id: "consistency",  emoji: "🎯", label: "Stay consistent",         desc: "Build a sustainable, long-term habit" },
  { id: "rehab",        emoji: "🩹", label: "Recover & rehab",         desc: "Safely rebuild strength after injury" },
  { id: "tone",         emoji: "✨", label: "Tone up",                  desc: "Define your body and build lean muscle" },
  { id: "energy",       emoji: "🔋", label: "More energy",             desc: "Feel energized and less fatigued daily" },
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

export default function GoalsPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <main className="min-h-screen bg-white flex flex-col px-6 py-8 pb-32 max-w-sm mx-auto w-full">
      <Link href="/onboarding/gender" className="text-slate-400 hover:text-slate-600 transition-colors mb-6 self-start">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </Link>

      <ProgressBar step={3} />

      <p className="text-sm font-semibold text-violet-600 mb-2">Step 3 of 5</p>
      <h1 className="text-2xl font-bold text-slate-800 mb-1">What are your goals?</h1>
      <p className="text-slate-400 text-sm mb-6">Select all that apply — we'll build your plan around them.</p>

      <div className="flex flex-col gap-2.5">
        {goals.map((g) => {
          const on = selected.includes(g.id);
          return (
            <button
              key={g.id}
              onClick={() => toggle(g.id)}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 text-left transition-all active:scale-[0.98] ${
                on ? "border-transparent" : "border-slate-200"
              }`}
              style={on ? { background: "linear-gradient(135deg, #7c3aed, #f97316)" } : {}}
            >
              <span className="text-xl w-7 flex-shrink-0">{g.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className={`font-semibold text-sm ${on ? "text-white" : "text-slate-800"}`}>{g.label}</p>
                <p className={`text-xs mt-0.5 ${on ? "text-white/75" : "text-slate-400"}`}>{g.desc}</p>
              </div>
              {on && (
                <div className="w-5 h-5 rounded-full bg-white/30 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm px-6 pb-8 pt-4 bg-white/90 backdrop-blur-sm">
        <button
          onClick={() => {
            localStorage.setItem("stride_goals", JSON.stringify(selected));
            router.push("/onboarding/activities");
          }}
          disabled={selected.length === 0}
          className={`w-full font-bold text-base py-4 rounded-2xl text-white transition-opacity ${selected.length === 0 ? "opacity-40" : ""}`}
          style={{ background: "linear-gradient(90deg, #7c3aed, #f97316)" }}
        >
          {selected.length > 0 ? `Continue · ${selected.length} selected` : "Select at least one goal"}
        </button>
      </div>
    </main>
  );
}
