"use client";
import { useState, useEffect } from "react";
import AppSidebar from "@/app/components/AppSidebar";
import { activityMeta, workoutLibrary, getRecommended, type Workout } from "@/app/data/workouts";

// ── Helpers ──────────────────────────────────────────────────────────────────

const gradientBg:  React.CSSProperties = { background: "linear-gradient(135deg, #7c3aed, #f97316)" };
const gradientBar: React.CSSProperties = { background: "linear-gradient(90deg,  #7c3aed, #f97316)" };

function DifficultyDots({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${i < n ? "bg-violet-400" : "bg-slate-200"}`}
        />
      ))}
    </span>
  );
}

function WorkoutCard({ w, color }: { w: Workout; color?: string }) {
  const cardColor = color ?? activityMeta[w.activityId]?.color ?? "#7c3aed";
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col min-w-[200px] max-w-[220px] flex-shrink-0">
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl"
          style={{ background: `${cardColor}18` }}
        >
          {w.emoji}
        </div>
        <DifficultyDots n={w.difficulty} />
      </div>
      <p className="font-bold text-slate-800 text-sm leading-tight mb-1">{w.name}</p>
      <p className="text-xs text-slate-400 mb-2">⏱ {w.duration} · {w.detail}</p>
      <div className="flex flex-wrap gap-1 mb-3">
        {w.tags.slice(0, 2).map((t) => (
          <span key={t} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">{t}</span>
        ))}
      </div>
      <button
        className="mt-auto w-full text-white text-xs font-bold py-2 rounded-xl bg-violet-600 hover:bg-violet-700 transition-colors"
      >
        Start
      </button>
    </div>
  );
}

function Section({ title, emoji, color, workouts }: {
  title: string;
  emoji: string;
  color: string;
  workouts: Workout[];
}) {
  if (workouts.length === 0) return null;
  return (
    <div className="mb-7">
      <div className="flex items-center gap-2 mb-3">
        <span
          className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
          style={{ background: `${color}20` }}
        >
          {emoji}
        </span>
        <h2 className="font-bold text-slate-800">{title}</h2>
        <span className="text-xs text-slate-400 ml-auto">{workouts.length}</span>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
        {workouts.map((w) => (
          <WorkoutCard key={w.id} w={w} color={color} />
        ))}
      </div>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function WorkoutsPage() {
  const [activities, setActivities] = useState<string[]>([]);
  const [goals, setGoals]           = useState<string[]>([]);
  const [level, setLevel]           = useState<string>("beginner");
  const [search, setSearch]         = useState("");
  const [loaded, setLoaded]         = useState(false);

  useEffect(() => {
    const a = JSON.parse(localStorage.getItem("stride_activities") ?? "[]");
    const g = JSON.parse(localStorage.getItem("stride_goals")      ?? "[]");
    const s = JSON.parse(localStorage.getItem("stride_schedule")   ?? "{}");
    setActivities(a.length ? a : ["running", "weights", "hiit", "yoga"]);
    setGoals(g.length ? g : ["endurance", "build_muscle"]);
    setLevel(s.level ?? "beginner");
    setLoaded(true);
  }, []);

  const recommended = loaded
    ? getRecommended(activities, goals, level, 8)
    : [];

  // per-activity sections (only selected activities)
  const activitySections = loaded
    ? activities.map((actId) => ({
        actId,
        meta: activityMeta[actId],
        workouts: workoutLibrary.filter(
          (w) =>
            w.activityId === actId &&
            (search === "" ||
              w.name.toLowerCase().includes(search.toLowerCase()) ||
              w.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())))
        ),
      })).filter((s) => s.meta && s.workouts.length > 0)
    : [];

  const filteredRecommended = search
    ? recommended.filter(
        (w) =>
          w.name.toLowerCase().includes(search.toLowerCase()) ||
          w.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      )
    : recommended;

  const levelLabel: Record<string, string> = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    active: "Active",
    athlete: "Athlete",
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] flex">
      <AppSidebar />

      <div className="flex-1 md:ml-[260px] flex min-h-screen">
        <main className="flex-1 pb-24 md:pb-10 min-w-0">
          <div className="max-w-2xl mx-auto px-4 md:px-8">

            {/* Header */}
            <div className="flex items-center justify-between pt-10 pb-6">
              <div>
                <h1 className="text-2xl font-black text-slate-800">Workouts</h1>
                <p className="text-slate-400 text-sm mt-0.5">
                  Personalized for you · {loaded ? levelLabel[level] : "Loading…"}
                </p>
              </div>
              <button
                className="flex items-center gap-2 text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-sm bg-violet-600 hover:bg-violet-700 transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Log workout
              </button>
            </div>

            {/* Search bar */}
            <div className="relative mb-6">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search workouts..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-200"
              />
            </div>

            {/* Activity chips */}
            {loaded && !search && (
              <div className="flex gap-2 overflow-x-auto pb-2 mb-6" style={{ scrollbarWidth: "none" }}>
                {activities.map((actId) => {
                  const m = activityMeta[actId];
                  if (!m) return null;
                  return (
                    <span
                      key={actId}
                      className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-sm"
                      style={{ background: `${m.color}12`, borderWidth: 1, borderStyle: "solid", borderColor: `${m.color}40`, color: m.color }}
                    >
                      <span>{m.emoji}</span>
                      {m.label}
                    </span>
                  );
                })}
              </div>
            )}

            {/* Recommended For You */}
            {filteredRecommended.length > 0 && (
              <div className="mb-7">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0" style={gradientBg}>
                    ✨
                  </span>
                  <h2 className="font-bold text-slate-800">Recommended For You</h2>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
                  {filteredRecommended.map((w) => (
                    <WorkoutCard key={w.id} w={w} />
                  ))}
                </div>
              </div>
            )}

            {/* Per-activity sections */}
            {activitySections.map(({ actId, meta, workouts }) => (
              <Section
                key={actId}
                title={meta.sectionTitle}
                emoji={meta.emoji}
                color={meta.color}
                workouts={workouts}
              />
            ))}

            {/* Empty search state */}
            {search && filteredRecommended.length === 0 && activitySections.every((s) => s.workouts.length === 0) && (
              <div className="text-center py-16 text-slate-400">
                <p className="text-4xl mb-3">🔍</p>
                <p className="font-semibold text-slate-600">No workouts found</p>
                <p className="text-sm mt-1">Try a different search term</p>
              </div>
            )}

          </div>
        </main>

        {/* Right panel */}
        <aside className="hidden lg:flex flex-col w-[300px] flex-shrink-0 px-6 py-10 gap-7 border-l border-slate-100 sticky top-0 h-screen overflow-y-auto bg-white">

          {/* Your activities */}
          {loaded && (
            <div>
              <h3 className="font-bold text-slate-800 text-sm mb-3">Your Activities</h3>
              <div className="flex flex-wrap gap-2">
                {activities.map((actId) => {
                  const m = activityMeta[actId];
                  if (!m) return null;
                  return (
                    <span
                      key={actId}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 text-slate-600"
                      style={{ background: `${m.color}10`, borderColor: `${m.color}40` }}
                    >
                      {m.emoji} {m.label}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Up next */}
          {loaded && recommended[0] && (
            <div>
              <h3 className="font-bold text-slate-800 text-sm mb-3">Up next for you</h3>
              <div className="bg-slate-50 rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: `${activityMeta[recommended[0].activityId]?.color ?? "#7c3aed"}20` }}
                  >
                    {recommended[0].emoji}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{recommended[0].name}</p>
                    <p className="text-xs text-slate-400">{recommended[0].duration} · {recommended[0].detail}</p>
                  </div>
                </div>
                <button className="w-full text-white text-sm font-bold py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 transition-colors">
                  Start workout →
                </button>
              </div>
            </div>
          )}

          {/* Your goals */}
          {loaded && goals.length > 0 && (
            <div>
              <h3 className="font-bold text-slate-800 text-sm mb-3">Your Goals</h3>
              <div className="flex flex-col gap-2">
                {goals.slice(0, 4).map((goalId) => {
                  const goalMeta: Record<string, { emoji: string; label: string }> = {
                    lose_weight:  { emoji: "🔥", label: "Lose weight" },
                    build_muscle: { emoji: "💪", label: "Build muscle" },
                    endurance:    { emoji: "🏃", label: "Boost endurance" },
                    performance:  { emoji: "⚡", label: "Improve performance" },
                    flexibility:  { emoji: "🧘", label: "Flexibility & mobility" },
                    event:        { emoji: "🏆", label: "Train for an event" },
                    mental:       { emoji: "🧠", label: "Mental wellness" },
                    heart:        { emoji: "❤️", label: "Heart health" },
                    consistency:  { emoji: "🎯", label: "Stay consistent" },
                    rehab:        { emoji: "🩹", label: "Recover & rehab" },
                    tone:         { emoji: "✨", label: "Tone up" },
                    energy:       { emoji: "🔋", label: "More energy" },
                  };
                  const g = goalMeta[goalId];
                  if (!g) return null;
                  return (
                    <div key={goalId} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-violet-50 border border-violet-100">
                      <span className="text-base">{g.emoji}</span>
                      <span className="text-sm font-medium text-violet-700">{g.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Experience level */}
          {loaded && (
            <div>
              <h3 className="font-bold text-slate-800 text-sm mb-3">Experience Level</h3>
              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-50">
                <span className="text-xl">
                  {{ beginner: "🌱", intermediate: "💪", active: "🔥", athlete: "🏆" }[level] ?? "💪"}
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-800">{levelLabel[level]}</p>
                  <p className="text-xs text-slate-400">
                    {{ beginner: "Just starting out", intermediate: "Some experience", active: "Fairly active", athlete: "Dedicated athlete" }[level]}
                  </p>
                </div>
              </div>
            </div>
          )}

        </aside>
      </div>
    </div>
  );
}
