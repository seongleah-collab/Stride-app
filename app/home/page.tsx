import AppSidebar from "@/app/components/AppSidebar";

const weekDays     = ["M", "T", "W", "T", "F", "S", "S"];
const weekActivity = [true, true, false, true, true, false, false];

const feed = [
  { id: 1, name: "Jordan K.", action: "Crushed a 45-min HIIT session", time: "2m ago",  avatar: "bg-pink-400",   border: "border-l-pink-300"   },
  { id: 2, name: "Alex M.",   action: "Completed a 5 km run",          time: "14m ago", avatar: "bg-sky-400",    border: "border-l-sky-300"    },
  { id: 3, name: "Sam R.",    action: "Hit a new squat PR — 120 kg",   time: "1h ago",  avatar: "bg-violet-400", border: "border-l-violet-300" },
];

const stats = [
  { value: "285", unit: "kcal", label: "Burned",  bg: "bg-orange-50",  border: "border-orange-100",  value_color: "text-orange-600"  },
  { value: "42",  unit: "min",  label: "Active",   bg: "bg-emerald-50", border: "border-emerald-100", value_color: "text-emerald-600" },
  { value: "7",   unit: "day",  label: "Streak",   bg: "bg-violet-50",  border: "border-violet-100",  value_color: "text-violet-600"  },
];

const muscleTagColors: Record<string, string> = {
  Chest:     "bg-rose-50 text-rose-600 border border-rose-100",
  Shoulders: "bg-sky-50 text-sky-600 border border-sky-100",
  Triceps:   "bg-amber-50 text-amber-600 border border-amber-100",
};

const gradientBg: React.CSSProperties = { background: "linear-gradient(135deg, #7c3aed, #f97316)" };

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f8f7f4] flex">
      <AppSidebar />

      <div className="flex-1 md:ml-[260px] flex min-h-screen bg-[#f8f7f4]">
        <main className="flex-1 pb-24 md:pb-10 min-w-0">
          <div className="max-w-xl mx-auto px-4 md:px-8">

            {/* Header */}
            <div className="flex items-center justify-between pt-10 pb-8">
              <div>
                <p className="text-slate-400 text-sm">Good morning</p>
                <h1 className="text-2xl font-black text-slate-900 mt-0.5">Let's get moving</h1>
              </div>
              <button className="relative w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center text-slate-400 shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
                </svg>
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-400" />
              </button>
            </div>

            {/* Colored stat cards */}
            <div className="flex gap-3 mb-8">
              {stats.map((s) => (
                <div key={s.label} className={`flex-1 ${s.bg} border ${s.border} rounded-2xl py-3.5 px-2 flex flex-col items-center`}>
                  <div className="flex items-baseline gap-0.5">
                    <span className={`text-xl font-black ${s.value_color}`}>{s.value}</span>
                    <span className="text-xs text-slate-400">{s.unit}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium mt-0.5">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Today's Workout */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-slate-900">Today's Workout</h2>
                <a href="/workouts" className="text-xs text-violet-600 font-medium hover:text-violet-700">Browse all</a>
              </div>
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-stone-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 bg-violet-50">
                    💪
                  </div>
                  <div>
                    <p className="font-black text-slate-900 text-base">Upper Body Power</p>
                    <p className="text-sm text-slate-400 mt-0.5">45 min · 8 exercises · Strength</p>
                  </div>
                </div>
                <div className="flex gap-2 mb-4">
                  {["Chest", "Shoulders", "Triceps"].map((t) => (
                    <span key={t} className={`text-xs font-medium px-3 py-1 rounded-full ${muscleTagColors[t] ?? "bg-slate-100 text-slate-500"}`}>
                      {t}
                    </span>
                  ))}
                </div>
                <button className="w-full py-3.5 rounded-xl text-white font-bold text-sm bg-violet-600 hover:bg-violet-700 transition-colors">
                  Start workout →
                </button>
              </div>
            </div>

            {/* Friend Activity */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-slate-900">Friend Activity</h2>
                <a href="/social" className="text-xs text-violet-600 font-medium hover:text-violet-700">See all</a>
              </div>
              <div className="flex flex-col gap-2">
                {feed.map((item) => (
                  <div key={item.id} className={`bg-white rounded-2xl px-4 py-3 shadow-sm border-l-4 ${item.border} flex items-center gap-3`}>
                    <div className={`w-9 h-9 rounded-full flex-shrink-0 ${item.avatar} flex items-center justify-center text-white font-bold text-sm`}>
                      {item.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-700 truncate">
                        <span className="font-semibold">{item.name}</span> {item.action}
                      </p>
                    </div>
                    <span className="text-xs text-slate-300 flex-shrink-0">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>

        {/* Right panel */}
        <aside className="hidden lg:flex flex-col w-[260px] flex-shrink-0 px-6 py-10 gap-8 border-l border-stone-100 sticky top-0 h-screen bg-white">

          {/* This week */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-4">This week</h3>
            <div className="flex items-end gap-1.5 h-12">
              {weekDays.map((day, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
                  <div
                    className="w-full rounded-md flex-1 min-h-[6px]"
                    style={weekActivity[i] ? { background: "#7c3aed" } : { background: "#e2e8f0" }}
                  />
                  <span className="text-[10px] text-slate-400 font-medium">{day}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-3">4 of 5 days this week</p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-3">Explore</h3>
            <div className="flex flex-col gap-1">
              {[
                { label: "My workouts",  href: "/workouts",   color: "text-violet-600 bg-violet-50"  },
                { label: "Challenges",   href: "/challenges", color: "text-orange-600 bg-orange-50"  },
                { label: "Events",       href: "/events",     color: "text-sky-600 bg-sky-50"        },
                { label: "Stride AI",    href: "/chat",       color: "text-emerald-600 bg-emerald-50"},
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-stone-50 transition-colors group"
                >
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black ${l.color}`}>
                    {l.label[0]}
                  </span>
                  <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{l.label}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-slate-300 ml-auto">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Streak card */}
          <div className="rounded-2xl p-4 text-white" style={gradientBg}>
            <p className="text-2xl font-black mb-0.5">7 days 🔥</p>
            <p className="text-sm opacity-80">Current streak</p>
            <p className="text-xs opacity-60 mt-1">Keep it going — you're on a roll!</p>
          </div>

        </aside>
      </div>
    </div>
  );
}
