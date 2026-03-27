import AppSidebar from "@/app/components/AppSidebar";

const weekDays     = ["M", "T", "W", "T", "F", "S", "S"];
const weekActivity = [true, true, false, true, true, false, false];

const feed = [
  { id: 1, name: "Jordan K.", action: "Crushed a 45-min HIIT session", time: "2m ago",  avatar: "bg-pink-400"   },
  { id: 2, name: "Alex M.",   action: "Completed a 5 km run",          time: "14m ago", avatar: "bg-sky-400"    },
  { id: 3, name: "Sam R.",    action: "Hit a new squat PR — 120 kg",   time: "1h ago",  avatar: "bg-violet-400" },
];

const gradientBg:  React.CSSProperties = { background: "linear-gradient(135deg, #7c3aed, #f97316)" };
const gradientBar: React.CSSProperties = { background: "linear-gradient(90deg,  #7c3aed, #f97316)" };

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
                <h1 className="text-2xl font-black text-slate-800 mt-0.5">Let's get moving</h1>
              </div>
              <button className="relative w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
                </svg>
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-400" />
              </button>
            </div>

            {/* Quick stats strip */}
            <div className="flex gap-4 mb-8">
              {[
                { value: "285", unit: "kcal", label: "Burned" },
                { value: "42",  unit: "min",  label: "Active"  },
                { value: "7",   unit: "day",  label: "Streak"  },
              ].map((s) => (
                <div key={s.label} className="flex-1 bg-white rounded-2xl py-3 px-2 flex flex-col items-center shadow-sm">
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-lg font-black text-slate-800">{s.value}</span>
                    <span className="text-xs text-slate-400">{s.unit}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Today's Workout — one featured card */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-slate-800">Today's Workout</h2>
                <a href="/workouts" className="text-xs text-violet-600 font-medium">Browse all</a>
              </div>
              <div className="bg-white rounded-3xl p-5 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: "#7c3aed18" }}>
                    💪
                  </div>
                  <div>
                    <p className="font-black text-slate-800 text-base">Upper Body Power</p>
                    <p className="text-sm text-slate-400 mt-0.5">45 min · 8 exercises · Strength</p>
                  </div>
                </div>
                <div className="flex gap-2 mb-4">
                  {["Chest", "Shoulders", "Triceps"].map((t) => (
                    <span key={t} className="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 text-slate-500">{t}</span>
                  ))}
                </div>
                <button className="w-full py-3.5 rounded-xl text-white font-bold text-sm bg-slate-900 hover:bg-slate-700 transition-colors">
                  Start workout →
                </button>
              </div>
            </div>

            {/* Friend Activity — trimmed to 3 items */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-slate-800">Friend Activity</h2>
                <a href="/social" className="text-xs text-violet-600 font-medium">See all</a>
              </div>
              <div className="flex flex-col gap-2">
                {feed.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl px-4 py-3 shadow-sm flex items-center gap-3">
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

        {/* Right panel — desktop only, kept minimal */}
        <aside className="hidden lg:flex flex-col w-[260px] flex-shrink-0 px-6 py-10 gap-8 border-l border-stone-100 sticky top-0 h-screen bg-white">

          {/* This week */}
          <div>
            <h3 className="font-bold text-slate-800 text-sm mb-4">This week</h3>
            <div className="flex items-end gap-1.5 h-12">
              {weekDays.map((day, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
                  <div
                    className="w-full rounded-md flex-1 min-h-[6px]"
                    style={weekActivity[i] ? gradientBg : { background: "#e2e8f0" }}
                  />
                  <span className="text-[10px] text-slate-400 font-medium">{day}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-3">4 of 5 days this week</p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-bold text-slate-800 text-sm mb-3">Explore</h3>
            <div className="flex flex-col gap-2">
              {[
                { label: "My workouts",  href: "/workouts",   emoji: "⚡" },
                { label: "Challenges",   href: "/challenges", emoji: "🏆" },
                { label: "Events",       href: "/events",     emoji: "📅" },
                { label: "Stride AI",    href: "/chat",       emoji: "✨" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <span className="text-base w-6 text-center">{l.emoji}</span>
                  <span className="text-sm font-medium text-slate-600">{l.label}</span>
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
