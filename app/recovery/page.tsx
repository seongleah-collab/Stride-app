"use client";
import { useState, useEffect } from "react";
import AppSidebar from "@/app/components/AppSidebar";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Method {
  id: string;
  category: string;
  name: string;
  emoji: string;
  tagline: string;
  duration: string;
  intensity: "Easy" | "Moderate" | "Intense";
  bg: string;
  accent: string;
  benefits: string[];
  howTo: string[];
  bestFor: string[];
}

interface UserProfile {
  goals: string[];
  activities: string[];
  days: number;
  duration: string;
  level: string;
}

// ── Recovery data ─────────────────────────────────────────────────────────────

const methods: Method[] = [
  {
    id: "walking",
    category: "Active",
    name: "Recovery Walk",
    emoji: "🚶",
    tagline: "The most underrated recovery tool",
    duration: "15–30 min",
    intensity: "Easy",
    bg: "#f0fdf4",
    accent: "#16a34a",
    benefits: ["Increases blood flow to sore muscles", "Clears lactic acid without adding fatigue", "Improves mood through light movement", "Supports joint health"],
    howTo: ["Keep the pace easy — you should hold a conversation comfortably", "Stick to flat terrain after leg-heavy sessions", "Get outside if you can — natural light helps regulate cortisol", "15–20 minutes is plenty, no need to push further"],
    bestFor: ["Post leg day", "After intense HIIT", "Rest days", "Morning after late training"],
  },
  {
    id: "cycling",
    category: "Active",
    name: "Easy Cycling",
    emoji: "🚴",
    tagline: "Spin out the stiffness",
    duration: "20–30 min",
    intensity: "Easy",
    bg: "#eff6ff",
    accent: "#2563eb",
    benefits: ["Low-impact movement for sore legs", "Maintains cardiovascular conditioning on rest days", "Gentle on joints", "Helps flush metabolic waste"],
    howTo: ["Keep resistance very low — this is not a workout", "Target 60–70 RPM cadence", "Heart rate should stay under 120 BPM", "Stationary bike or easy outdoor spin both work"],
    bestFor: ["After long runs", "Post strength training", "Active rest days"],
  },
  {
    id: "foam-rolling",
    category: "Flexibility",
    name: "Foam Rolling",
    emoji: "🔵",
    tagline: "Your DIY sports massage",
    duration: "10–15 min",
    intensity: "Moderate",
    bg: "#fff7ed",
    accent: "#ea580c",
    benefits: ["Breaks up tightness in muscle fascia", "Reduces DOMS (delayed onset soreness)", "Improves flexibility and range of motion", "Increases blood flow to targeted areas"],
    howTo: ["Roll slowly — about 1 inch per second", "Pause on tender spots for 20–30 seconds and breathe through it", "Avoid rolling directly on joints or the lower spine", "Best areas: quads, IT band, lats, calves, thoracic spine"],
    bestFor: ["Before stretching", "Post-workout", "Morning stiffness", "Before yoga"],
  },
  {
    id: "stretching",
    category: "Flexibility",
    name: "Static Stretching",
    emoji: "🤸",
    tagline: "Hold it, breathe, release",
    duration: "10–20 min",
    intensity: "Easy",
    bg: "#f5f3ff",
    accent: "#7c3aed",
    benefits: ["Increases long-term flexibility", "Reduces muscle tension and tightness", "Calms the nervous system after hard efforts", "Improves posture over time"],
    howTo: ["Only stretch after warming up or post-workout — never cold muscles", "Hold each stretch for 30–45 seconds", "Never bounce — ease in slowly", "Focus on your breath to deepen into the stretch", "Target the muscle groups you just trained"],
    bestFor: ["Post-workout cooldown", "Evening wind-down", "Before bed", "Desk workers"],
  },
  {
    id: "yoga",
    category: "Flexibility",
    name: "Yin Yoga",
    emoji: "🧘",
    tagline: "Slow down to recover faster",
    duration: "30–60 min",
    intensity: "Easy",
    bg: "#fdf4ff",
    accent: "#a21caf",
    benefits: ["Targets deep connective tissue and fascia", "Activates the parasympathetic nervous system", "Improves joint mobility over time", "Deeply calming for the mind and body"],
    howTo: ["Use props (blocks, blankets) generously — they help you relax in", "Hold poses for 3–5 minutes each", "Find your edge: mild discomfort is okay, pain is not", "Common poses: pigeon, butterfly, dragon, supported bridge"],
    bestFor: ["Rest days", "After heavy training weeks", "Before sleep", "When feeling burnt out"],
  },
  {
    id: "sauna",
    category: "Heat & Cold",
    name: "Sauna",
    emoji: "🔥",
    tagline: "Heat stress that heals",
    duration: "15–20 min",
    intensity: "Easy",
    bg: "#fef9c3",
    accent: "#ca8a04",
    benefits: ["Stimulates growth hormone production", "Reduces systemic inflammation markers", "Enhances sleep quality that night", "Activates heat shock proteins for muscle repair"],
    howTo: ["Wait at least 1 hour after intense training before entering", "Drink 16–24oz of water beforehand", "Start with 10–15 minutes if new, work up to 20", "Exit if you feel dizzy or overly uncomfortable", "Let yourself cool down naturally afterward"],
    bestFor: ["After strength training", "Rest days", "Evening recovery", "During deload weeks"],
  },
  {
    id: "cold-plunge",
    category: "Heat & Cold",
    name: "Cold Plunge",
    emoji: "🧊",
    tagline: "Embrace the discomfort",
    duration: "3–10 min",
    intensity: "Intense",
    bg: "#ecfeff",
    accent: "#0891b2",
    benefits: ["Reduces acute inflammation and swelling", "Spikes dopamine and norepinephrine for hours", "Builds mental resilience and discipline", "Improves mood significantly after"],
    howTo: ["Target water temperature: 50–59°F (10–15°C)", "Start with just 1–2 minutes and build up gradually over weeks", "Control your breathing — slow, steady exhales calm the nervous system", "Avoid cold plunges right before strength training — it blunts adaptation", "Morning use gives the biggest energy and focus boost"],
    bestFor: ["After endurance training", "Post-game recovery", "When inflammation is high", "Mental resilience building"],
  },
  {
    id: "epsom-bath",
    category: "Heat & Cold",
    name: "Epsom Salt Bath",
    emoji: "🛁",
    tagline: "Soak away the soreness",
    duration: "20–30 min",
    intensity: "Easy",
    bg: "#fff1f2",
    accent: "#e11d48",
    benefits: ["Magnesium absorbs through skin to relax muscles", "Eases joint and muscle soreness", "Promotes deep relaxation", "Helps transition your body into restful sleep"],
    howTo: ["Add 2 cups of Epsom salt to warm (not scorching) water", "Soak for at least 20 minutes", "Add lavender essential oil for enhanced relaxation", "Best done 1–2 hours before bed", "Avoid very hot water — it raises core temp and disrupts sleep"],
    bestFor: ["Evening recovery", "High soreness days", "Before sleep", "After long races or events"],
  },
  {
    id: "meditation",
    category: "Mindfulness",
    name: "Meditation",
    emoji: "🧠",
    tagline: "Rest your nervous system",
    duration: "10–20 min",
    intensity: "Easy",
    bg: "#f0f9ff",
    accent: "#0369a1",
    benefits: ["Lowers cortisol (the primary stress hormone)", "Improves sleep quality", "Reduces mental fatigue from training", "Supports nervous system recovery between sessions"],
    howTo: ["Find a quiet, comfortable position — seated or lying down", "Focus on your breath: 4-count inhale, 6-count exhale", "When your mind wanders, gently return without judgment", "Start with 5 minutes and build to 15–20 over time", "Apps like Headspace, Calm, or Insight Timer are great to start"],
    bestFor: ["Rest days", "After competition stress", "During heavy training blocks", "Improving sleep quality"],
  },
  {
    id: "breathwork",
    category: "Mindfulness",
    name: "Breathwork",
    emoji: "💨",
    tagline: "Your breath is a powerful tool",
    duration: "5–15 min",
    intensity: "Easy",
    bg: "#f8fafc",
    accent: "#475569",
    benefits: ["Activates the parasympathetic nervous system rapidly", "Reduces stress and anxiety in minutes", "Improves oxygen efficiency for training", "Can energize or calm depending on the technique"],
    howTo: ["Box breathing: in 4, hold 4, out 4, hold 4 — repeat 4–6 cycles", "4-7-8 for sleep: inhale 4, hold 7, exhale 8", "Physiological sigh: double inhale through nose, long exhale through mouth", "5–10 minutes is plenty — consistency matters more than length"],
    bestFor: ["Pre-sleep wind-down", "Post cold plunge", "Mid-day reset", "Before stressful events"],
  },
  {
    id: "hydration",
    category: "Nutrition",
    name: "Hydration",
    emoji: "💧",
    tagline: "Recovery starts with water",
    duration: "Throughout the day",
    intensity: "Easy",
    bg: "#eff6ff",
    accent: "#3b82f6",
    benefits: ["Flushes metabolic waste from muscles", "Maintains joint lubrication and tissue health", "Regulates core body temperature", "Supports nutrient transport to recovering muscles"],
    howTo: ["Aim for ~half your body weight (lbs) in ounces of water per day", "Add electrolytes after intense or long sessions", "Pale yellow urine = well hydrated", "Drink 16–20oz immediately after training", "Limit alcohol — it severely impairs muscle repair and sleep"],
    bestFor: ["Every single day", "Especially post-workout", "Hot weather training", "Long endurance sessions"],
  },
  {
    id: "protein",
    category: "Nutrition",
    name: "Post-Workout Nutrition",
    emoji: "🥩",
    tagline: "Eat to rebuild",
    duration: "Within 2 hours",
    intensity: "Easy",
    bg: "#fff7ed",
    accent: "#c2410c",
    benefits: ["Provides amino acids essential for muscle repair", "Reduces muscle protein breakdown", "Replenishes glycogen stores with carbohydrates", "Supports your adaptation to training"],
    howTo: ["Target 20–40g of quality protein within 2 hours of training", "Pair with carbohydrates for best glycogen replenishment", "Great sources: eggs, chicken, Greek yogurt, salmon, beef, cottage cheese", "Anti-inflammatory additions: berries, turmeric, ginger, leafy greens"],
    bestFor: ["After all workouts", "Heavy training days", "Post-competition", "Muscle gain phases"],
  },
];

// ── Personalization logic ─────────────────────────────────────────────────────

const activityRecs: Record<string, string[]> = {
  running:     ["foam-rolling", "stretching", "cold-plunge", "hydration", "epsom-bath"],
  cycling:     ["foam-rolling", "stretching", "epsom-bath", "hydration"],
  swimming:    ["stretching", "sauna", "meditation", "hydration"],
  weights:     ["protein", "sauna", "foam-rolling", "epsom-bath", "hydration"],
  hiit:        ["cold-plunge", "walking", "protein", "meditation", "breathwork"],
  yoga:        ["meditation", "breathwork", "hydration", "stretching"],
  boxing:      ["cold-plunge", "foam-rolling", "protein", "breathwork"],
  hiking:      ["stretching", "epsom-bath", "hydration", "foam-rolling"],
  dance:       ["stretching", "foam-rolling", "hydration"],
  basketball:  ["cold-plunge", "foam-rolling", "protein", "stretching"],
  soccer:      ["cold-plunge", "foam-rolling", "stretching", "protein"],
  tennis:      ["stretching", "foam-rolling", "hydration", "epsom-bath"],
  crossfit:    ["cold-plunge", "protein", "sauna", "foam-rolling"],
  climbing:    ["stretching", "foam-rolling", "protein", "meditation"],
  pilates:     ["stretching", "meditation", "breathwork", "hydration"],
  rowing:      ["foam-rolling", "stretching", "sauna", "protein"],
  golf:        ["stretching", "walking", "meditation"],
  skiing:      ["stretching", "epsom-bath", "sauna", "foam-rolling"],
};

const goalRecs: Record<string, string[]> = {
  build_muscle: ["protein", "sauna", "epsom-bath", "hydration"],
  lose_weight:  ["walking", "cycling", "hydration", "breathwork"],
  endurance:    ["cold-plunge", "hydration", "foam-rolling", "protein"],
  performance:  ["sauna", "cold-plunge", "meditation", "protein"],
  flexibility:  ["yoga", "stretching", "foam-rolling"],
  mental:       ["meditation", "breathwork", "yoga"],
  heart:        ["walking", "cycling", "meditation", "hydration"],
  consistency:  ["stretching", "meditation", "breathwork"],
  rehab:        ["stretching", "epsom-bath", "walking", "foam-rolling"],
  tone:         ["protein", "foam-rolling", "sauna"],
  energy:       ["breathwork", "meditation", "hydration", "cold-plunge"],
  event:        ["cold-plunge", "foam-rolling", "protein", "sauna"],
};

function getSleepRecommendation(level: string, days: number, duration: string): { hours: string; why: string } {
  const intensityScore =
    (duration === "90+" ? 4 : duration === "60-90" ? 3 : duration === "45-60" ? 2 : duration === "30-45" ? 1 : 0) +
    (level === "athlete" ? 3 : level === "active" ? 2 : level === "intermediate" ? 1 : 0) +
    (days >= 6 ? 2 : days >= 4 ? 1 : 0);

  if (intensityScore >= 8) return {
    hours: "9–10",
    why: "Your high training volume and intensity put serious demand on your nervous system. Maximum sleep is non-negotiable for muscle repair and performance.",
  };
  if (intensityScore >= 5) return {
    hours: "8–9",
    why: "Your active training schedule means your body needs extra repair time overnight. Prioritize this above almost any other recovery tool.",
  };
  if (intensityScore >= 3) return {
    hours: "7–8",
    why: "Consistent training means you need quality sleep to recover and keep progressing. Even one poor night affects strength and motivation.",
  };
  return {
    hours: "7–8",
    why: "Building a fitness habit starts with sleep. Good rest will help you stay consistent, avoid burnout, and actually enjoy your training.",
  };
}

function getTopMethods(profile: UserProfile): Method[] {
  const scores: Record<string, number> = {};
  methods.forEach((m) => { scores[m.id] = 0; });

  profile.activities.forEach((act) => {
    (activityRecs[act] ?? []).forEach((id, rank) => {
      scores[id] = (scores[id] ?? 0) + (5 - rank);
    });
  });

  profile.goals.forEach((goal) => {
    (goalRecs[goal] ?? []).forEach((id, rank) => {
      scores[id] = (scores[id] ?? 0) + (3 - rank);
    });
  });

  return methods
    .filter((m) => (scores[m.id] ?? 0) > 0)
    .sort((a, b) => (scores[b.id] ?? 0) - (scores[a.id] ?? 0))
    .slice(0, 4);
}

function getTrainingLoad(days: number, level: string, duration: string): { label: string; color: string } {
  const score =
    (level === "athlete" ? 3 : level === "active" ? 2 : level === "intermediate" ? 1 : 0) +
    (days >= 5 ? 2 : days >= 3 ? 1 : 0) +
    (duration === "90+" ? 2 : duration === "60-90" ? 1 : 0);

  if (score >= 6) return { label: "High load", color: "text-rose-700 bg-rose-50 border-rose-100" };
  if (score >= 3) return { label: "Moderate load", color: "text-amber-700 bg-amber-50 border-amber-100" };
  return { label: "Light load", color: "text-emerald-700 bg-emerald-50 border-emerald-100" };
}

// ── Constants ─────────────────────────────────────────────────────────────────

const categories = ["All", "Active", "Flexibility", "Heat & Cold", "Mindfulness", "Nutrition"];

const intensityStyles: Record<string, string> = {
  Easy:     "text-emerald-700 bg-emerald-50 border-emerald-100",
  Moderate: "text-amber-700 bg-amber-50 border-amber-100",
  Intense:  "text-rose-700 bg-rose-50 border-rose-100",
};

const levelLabels: Record<string, string> = {
  beginner:     "beginner",
  intermediate: "intermediate",
  active:       "regular",
  athlete:      "competitive",
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function RecoveryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected]             = useState<Method | null>(null);
  const [profile, setProfile]               = useState<UserProfile | null>(null);

  useEffect(() => {
    const goals      = JSON.parse(localStorage.getItem("stride_goals")      ?? "[]");
    const activities = JSON.parse(localStorage.getItem("stride_activities")  ?? "[]");
    const schedule   = JSON.parse(localStorage.getItem("stride_schedule")    ?? "{}");
    setProfile({
      goals,
      activities,
      days:     schedule.days     ?? 3,
      duration: schedule.duration ?? "30-45",
      level:    schedule.level    ?? "beginner",
    });
  }, []);

  const visible = activeCategory === "All"
    ? methods
    : methods.filter((m) => m.category === activeCategory);

  const sleep       = profile ? getSleepRecommendation(profile.level, profile.days, profile.duration) : null;
  const load        = profile ? getTrainingLoad(profile.days, profile.level, profile.duration) : null;
  const topMethods  = profile && profile.activities.length > 0 ? getTopMethods(profile) : [];
  const isPersonalized = profile && (profile.activities.length > 0 || profile.goals.length > 0);

  return (
    <div className="min-h-screen bg-[#f8f7f4] flex">
      <AppSidebar />

      <div className="flex-1 md:ml-[260px] flex min-h-screen bg-[#f8f7f4]">
        <main className="flex-1 pb-24 md:pb-10 min-w-0">
          <div className="max-w-2xl mx-auto px-4 md:px-8">

            {/* Header */}
            <div className="pt-10 pb-6">
              <p className="text-slate-400 text-sm mb-0.5">Take care of yourself</p>
              <h1 className="text-2xl font-black text-slate-900">Recovery</h1>
              <p className="text-slate-500 text-sm mt-1.5 max-w-sm">
                How you recover is just as important as how you train.
              </p>
            </div>

            {/* Personalized profile card */}
            {sleep && load && (
              <div className="bg-white rounded-2xl border border-stone-100 shadow-sm mb-8 overflow-hidden">
                {/* Top: training profile */}
                <div className="px-5 pt-4 pb-3 border-b border-stone-100 flex items-center justify-between gap-3 flex-wrap">
                  <p className="text-xs text-slate-500 font-medium">
                    Your profile ·{" "}
                    <span className="text-slate-800 font-semibold capitalize">
                      {levelLabels[profile!.level] ?? profile!.level} athlete
                    </span>
                    {profile!.days > 0 && (
                      <> · <span className="text-slate-800 font-semibold">{profile!.days} day{profile!.days !== 1 ? "s" : ""}/week</span></>
                    )}
                  </p>
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${load.color}`}>
                    {load.label}
                  </span>
                </div>

                {/* Sleep recommendation */}
                <div className="px-5 py-4 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-xl flex-shrink-0">
                    😴
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-2xl font-black text-slate-900">{sleep.hours}</span>
                      <span className="text-sm text-slate-500 font-medium">hours of sleep recommended for you</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{sleep.why}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Personalized "For You" section */}
            {isPersonalized && topMethods.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-bold text-slate-900">Built for you</h2>
                  <span className="text-xs text-slate-400">Based on your activities & goals</span>
                </div>
                <div className="flex flex-col gap-3">
                  {topMethods.map((m, idx) => (
                    <button
                      key={m.id}
                      onClick={() => setSelected(m)}
                      className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all text-left border border-stone-100 active:scale-[0.99] flex items-center gap-4"
                    >
                      {idx === 0 && (
                        <div className="absolute ml-[-8px] mt-[-8px]">
                          <span className="text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded-full font-bold">Top pick</span>
                        </div>
                      )}
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: m.bg }}>
                        {m.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="font-bold text-slate-900 text-sm">{m.name}</p>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${intensityStyles[m.intensity]}`}>
                            {m.intensity}
                          </span>
                        </div>
                        <p className="text-slate-400 text-xs">{m.tagline}</p>
                        <p className="text-slate-500 text-xs mt-1 font-medium">{m.duration}</p>
                      </div>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-300 flex-shrink-0">
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Browse all */}
            <div>
              <h2 className="font-bold text-slate-900 mb-3">
                {isPersonalized ? "Browse everything" : "Recovery methods"}
              </h2>

              {/* Category filter */}
              <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveCategory(c)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                      activeCategory === c
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-500 border-stone-200 hover:border-stone-300 hover:text-slate-700"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                {visible.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelected(m)}
                    className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all text-left border border-stone-100 active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: m.bg }}>
                        {m.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <p className="font-bold text-slate-900 text-sm">{m.name}</p>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${intensityStyles[m.intensity]}`}>
                            {m.intensity}
                          </span>
                        </div>
                        <p className="text-slate-400 text-xs">{m.tagline}</p>
                        <p className="text-slate-500 text-xs mt-1.5 font-medium">{m.duration} · {m.category}</p>
                      </div>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-300 flex-shrink-0">
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                    </div>
                    <div className="flex gap-1.5 mt-3 flex-wrap">
                      {m.benefits.slice(0, 2).map((b, i) => (
                        <span key={i} className="text-[10px] text-slate-500 bg-slate-50 border border-stone-100 px-2 py-0.5 rounded-full">
                          {b}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </main>

        {/* Right panel */}
        <aside className="hidden lg:flex flex-col w-[280px] flex-shrink-0 px-6 py-10 gap-6 border-l border-stone-100 sticky top-0 h-screen bg-white overflow-y-auto">

          {/* Sleep card */}
          {sleep ? (
            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-3">Your sleep target</h3>
              <div className="bg-slate-900 rounded-2xl p-4 text-white">
                <p className="text-3xl font-black mb-0.5">{sleep.hours} <span className="text-base font-medium opacity-70">hrs</span></p>
                <p className="text-xs text-white/60 leading-relaxed mt-1">{sleep.why}</p>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-3">Today's tip</h3>
              <div className="bg-slate-900 rounded-2xl p-4 text-white">
                <p className="font-bold text-sm mb-1.5">Sleep is your #1 recovery tool</p>
                <p className="text-xs text-white/70 leading-relaxed">Complete the onboarding to get a personalized sleep recommendation.</p>
              </div>
            </div>
          )}

          {/* Personalized checklist */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-3">Daily checklist</h3>
            <div className="flex flex-col gap-2">
              <CheckItem label={sleep ? `${sleep.hours} hours of sleep` : "7–8 hours of sleep"} emoji="😴" />
              <CheckItem label="Hydration goal met" emoji="💧" />
              <CheckItem label="10 min light movement" emoji="🚶" />
              {profile?.goals.includes("build_muscle") && (
                <CheckItem label="Post-workout protein" emoji="🥩" />
              )}
              {profile?.goals.includes("mental") || profile?.goals.includes("consistency") ? (
                <CheckItem label="5 min meditation" emoji="🧠" />
              ) : (
                <CheckItem label="5 min breathwork" emoji="💨" />
              )}
              {(profile?.level === "active" || profile?.level === "athlete") && (
                <CheckItem label="Foam roll sore areas" emoji="🔵" />
              )}
            </div>
          </div>

          {/* Top picks for them */}
          {topMethods.length > 0 && (
            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-3">Your top picks</h3>
              <div className="flex flex-col gap-1.5">
                {topMethods.slice(0, 4).map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelected(m)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left"
                  >
                    <span className="text-base">{m.emoji}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-700 truncate">{m.name}</p>
                      <p className="text-xs text-slate-400">{m.duration}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </aside>
      </div>

      {/* Detail modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-end md:items-center justify-center p-0 md:p-6"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white w-full md:max-w-lg rounded-t-3xl md:rounded-3xl max-h-[90dvh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between p-5 pb-4 border-b border-stone-100 sticky top-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: selected.bg }}>
                  {selected.emoji}
                </div>
                <div>
                  <h2 className="font-black text-slate-900 text-base">{selected.name}</h2>
                  <p className="text-slate-400 text-xs mt-0.5">
                    {selected.duration} · <span className={`font-medium ${intensityStyles[selected.intensity].split(" ")[0]}`}>{selected.intensity}</span>
                  </p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600 transition-colors p-1 mt-0.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className="px-5 py-4 flex flex-col gap-5">
              <p className="text-slate-500 text-sm leading-relaxed italic">"{selected.tagline}"</p>

              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-2.5">Why it works</h3>
                <div className="flex flex-col gap-1.5">
                  {selected.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: selected.accent }} />
                      <p className="text-sm text-slate-600">{b}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-2.5">How to do it</h3>
                <div className="flex flex-col gap-2">
                  {selected.howTo.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-xs font-bold text-slate-400 w-5 flex-shrink-0 mt-0.5">{i + 1}.</span>
                      <p className="text-sm text-slate-600 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-2.5">Best for</h3>
                <div className="flex flex-wrap gap-1.5">
                  {selected.bestFor.map((tag, i) => (
                    <span key={i} className="text-xs text-slate-600 bg-slate-50 border border-stone-200 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pb-2">
                <button
                  onClick={() => setSelected(null)}
                  className="w-full bg-slate-900 text-white font-bold text-sm py-3.5 rounded-xl hover:bg-slate-700 transition-colors"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── CheckItem ─────────────────────────────────────────────────────────────────

function CheckItem({ label, emoji }: { label: string; emoji: string }) {
  const [checked, setChecked] = useState(false);
  return (
    <button
      onClick={() => setChecked((v) => !v)}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all text-left ${
        checked ? "bg-emerald-50 border-emerald-100" : "bg-white border-stone-200 hover:border-stone-300"
      }`}
    >
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
        checked ? "bg-emerald-500 border-emerald-500" : "border-stone-300"
      }`}>
        {checked && (
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        )}
      </div>
      <span className="text-sm">{emoji}</span>
      <span className={`text-xs font-medium flex-1 ${checked ? "line-through text-slate-400" : "text-slate-700"}`}>{label}</span>
    </button>
  );
}
