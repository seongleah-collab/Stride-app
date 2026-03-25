"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const options = [
  { id: "man", label: "Man", emoji: "👨" },
  { id: "woman", label: "Woman", emoji: "👩" },
  { id: "nonbinary", label: "Non-binary", emoji: "🧑" },
  { id: "prefer_not", label: "Prefer not to say", emoji: "🔒" },
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

export default function GenderPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white flex flex-col px-6 py-8 max-w-sm mx-auto w-full">
      <Link href="/onboarding/age" className="text-slate-400 hover:text-slate-600 transition-colors mb-6 self-start">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </Link>

      <ProgressBar step={2} />

      <p className="text-sm font-semibold text-violet-600 mb-2">Step 2 of 5</p>
      <h1 className="text-2xl font-bold text-slate-800 mb-1">What's your gender?</h1>
      <p className="text-slate-400 text-sm mb-8">Helps us tailor workouts and health guidance for you.</p>

      <div className="flex flex-col gap-3 flex-1">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setSelected(opt.id)}
            className={`flex items-center gap-4 px-5 py-4 rounded-2xl border-2 text-left transition-all active:scale-[0.98] ${
              selected === opt.id ? "border-transparent text-white" : "border-slate-200"
            }`}
            style={selected === opt.id ? { background: "linear-gradient(135deg, #7c3aed, #f97316)" } : {}}
          >
            <span className="text-2xl">{opt.emoji}</span>
            <span className={`font-semibold ${selected === opt.id ? "text-white" : "text-slate-700"}`}>
              {opt.label}
            </span>
            {selected === opt.id && (
              <div className="ml-auto w-5 h-5 rounded-full bg-white/30 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      <button
        onClick={() => router.push("/onboarding/goals")}
        disabled={!selected}
        className={`w-full font-bold text-base py-4 rounded-2xl mt-8 text-white transition-opacity ${!selected ? "opacity-40" : ""}`}
        style={{ background: "linear-gradient(90deg, #7c3aed, #f97316)" }}
      >
        Continue
      </button>
    </main>
  );
}
