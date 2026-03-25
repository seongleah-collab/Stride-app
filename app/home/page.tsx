import AppSidebar from "@/app/components/AppSidebar";

const todayStats = [
  { emoji: "🔥", value: "285", unit: "kcal",  label: "Burned today" },
  { emoji: "⏱",  value: "42",  unit: "min",   label: "Active today" },
  { emoji: "💪", value: "7",   unit: "days",  label: "Streak" },
];

const todayPlan = [
  { id: 1, emoji: "💪", color: "#7c3aed", type: "Strength", name: "Upper Body Power",    duration: "45 min", exercises: 8, difficulty: 4, tags: ["Chest", "Shoulders", "Triceps"],       recommended: true  },
  { id: 2, emoji: "⚡", color: "#f97316", type: "HIIT",     name: "Express Core Blast",  duration: "20 min", exercises: 6, difficulty: 2, tags: ["Core", "Full body", "No equipment"],   recommended: false },
];

const challenges = [
  { id: 1, emoji: "🔥", title: "30-Day Consistency", desc: "Work out 25 of 30 days",       progress: 0.6, current: 18, total: 30, participants: 128, daysLeft: 12 },
  { id: 2, emoji: "⚡", title: "Power Week",         desc: "5 strength sessions in 7 days", progress: 0.4, current: 2,  total: 5,  participants: 54,  daysLeft: 5  },
];

const feed = [
  { id: 1, name: "Jordan K.", action: "Crushed a 45-min HIIT session",  detail: "450 kcal · 3 PRs broken",    time: "2m ago",  avatar: "bg-pink-400",   emoji: "⚡" },
  { id: 2, name: "Alex M.",   action: "Completed a 5 km run",           detail: "28 min · 5:36/km avg pace",  time: "14m ago", avatar: "bg-sky-400",    emoji: "🏃" },
  { id: 3, name: "Sam R.",    action: "Hit a new squat PR — 120 kg",    detail: "3 reps · Previous best 110", time: "1h ago",  avatar: "bg-violet-400", emoji: "💪" },
  { id: 4, name: "Taylor W.", action: "Finished morning yoga flow",     detail: "30 min · 180 kcal",          time: "2h ago",  avatar: "bg-orange-400", emoji: "🧘" },
];

const leaderboard = [
  { rank: 1, name: "Jordan K.", points: 2840, avatar: "bg-pink-400" },
  { rank: 2, name: "You",       points: 2410, avatar: "bg-violet-400", isYou: true },
  { rank: 3, name: "Alex M.",   points: 2190, avatar: "bg-sky-400" },
  { rank: 4, name: "Sam R.",    points: 1950, avatar: "bg-orange-400" },
];

const personalRecords = [
  { emoji: "🏋️", exercise: "Bench Press", value: "85 kg",  change: "+5 kg",  date: "This week"  },
  { emoji: "🏃",  exercise: "5K Run",      value: "24:32", change: "−1:18", date: "Yesterday"  },
  { emoji: "💀",  exercise: "Deadlift",    value: "120 kg", change: "+10 kg", date: "Last week" },
];

const weekDays     = ["M","T","W","T","F","S","S"];
const weekActivity = [true, true, false, true, true, false, false];

const suggestedPeople = [
  { name: "Casey L.",  sport: "CrossFit · 5×/week", avatar: "bg-teal-400"  },
  { name: "Morgan B.", sport: "Running · 4×/week",   avatar: "bg-rose-400"  },
  { name: "Riley P.",  sport: "Strength · 3×/week",  avatar: "bg-amber-400" },
];

const gradientBg:  React.CSSProperties = { background: "linear-gradient(135deg, #7c3aed, #f97316)" };
const gradientBar: React.CSSProperties = { background: "linear-gradient(90deg,  #7c3aed, #f97316)" };

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AppSidebar />

      <div className="flex-1 md:ml-[260px] flex min-h-screen">
        <main className="flex-1 pb-24 md:pb-10 min-w-0">
          <div className="max-w-2xl mx-auto px-4 md:px-8">

            {/* Header */}
            <div className="flex items-center justify-between pt-10 pb-5">
              <div>
                <p className="text-slate-400 text-sm">Good morning 👋</p>
                <h1 className="text-xl font-black text-slate-800 mt-0.5">Let's get moving</h1>
              </div>
              <div className="flex items-center gap-3">
                <button className="relative w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-500 shadow-sm">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
                  </svg>
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-400"/>
                </button>
                <div className="w-10 h-10 rounded-full bg-violet-400 flex items-center justify-center text-white font-bold text-sm md:hidden">Y</div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {todayStats.map((s) => (
                <div key={s.label} className="bg-white rounded-2xl px-3 py-4 flex flex-col items-center gap-1 shadow-sm">
                  <span className="text-xl">{s.emoji}</span>
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-xl font-black text-slate-800">{s.value}</span>
                    <span className="text-xs text-slate-400 font-medium">{s.unit}</span>
                  </div>
                  <span className="text-xs text-slate-400 text-center leading-tight">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Today's Plan */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-slate-800">Today's Plan</h2>
                <button className="text-xs text-violet-600 font-medium">View program</button>
              </div>
              <div className="flex flex-col gap-3">
                {todayPlan.map((w) => (
                  <div key={w.id} className="bg-white rounded-2xl p-4 shadow-sm border-l-4" style={{ borderLeftColor: w.color }}>
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: `${w.color}18` }}>
                        {w.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          {w.recommended && <span className="text-[10px] font-bold text-white px-2 py-0.5 rounded-full" style={{ background: w.color }}>RECOMMENDED</span>}
                          <span className="text-xs text-slate-400">{w.type}</span>
                        </div>
                        <p className="font-bold text-slate-800">{w.name}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                          <span>⏱ {w.duration}</span><span>· {w.exercises} exercises</span>
                          <span>· {"●".repeat(w.difficulty)}{"○".repeat(5 - w.difficulty)}</span>
                        </div>
                        <div className="flex gap-1.5 mt-2 flex-wrap">
                          {w.tags.map((t) => <span key={t} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">{t}</span>)}
                        </div>
                      </div>
                      <button className="flex-shrink-0 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm" style={gradientBg}>Start →</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenges */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-slate-800">Active Challenges</h2>
                <button className="text-xs text-violet-600 font-medium">See all</button>
              </div>
              <div className="flex flex-col gap-3">
                {challenges.map((c) => (
                  <div key={c.id} className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-xl">{c.emoji}</div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm">{c.title}</p>
                          <p className="text-slate-400 text-xs mt-0.5">{c.desc}</p>
                        </div>
                      </div>
                      <span className="text-xs text-slate-400 font-medium whitespace-nowrap">{c.daysLeft}d left</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${c.progress * 100}%`, ...gradientBar }}/>
                      </div>
                      <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">{c.current}/{c.total}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">{c.participants} athletes competing</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Feed */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-slate-800">Friend Activity</h2>
                <button className="text-xs text-violet-600 font-medium">See all</button>
              </div>
              <div className="flex flex-col gap-2.5">
                {feed.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl px-4 py-3.5 shadow-sm flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex-shrink-0 ${item.avatar} flex items-center justify-center text-white font-bold text-sm`}>{item.name[0]}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-800"><span className="font-semibold">{item.name}</span> {item.action}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{item.detail} · {item.time}</p>
                    </div>
                    <span className="text-xl flex-shrink-0">{item.emoji}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>

        {/* Right panel */}
        <aside className="hidden lg:flex flex-col w-[300px] flex-shrink-0 px-6 py-10 gap-7 border-l border-slate-100 sticky top-0 h-screen overflow-y-auto bg-white">
          <div>
            <h3 className="font-bold text-slate-800 text-sm mb-4">This week</h3>
            <div className="flex items-end gap-1.5 h-14">
              {weekDays.map((day, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
                  <div className="w-full rounded-lg flex-1 min-h-[8px]" style={weekActivity[i] ? gradientBg : { background: "#e2e8f0" }}/>
                  <span className="text-[10px] text-slate-400 font-medium">{day}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-3">4 of 5 goal days completed</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 text-sm">Personal Records</h3>
              <button className="text-xs text-violet-600 font-medium">All PRs</button>
            </div>
            <div className="flex flex-col gap-3">
              {personalRecords.map((pr) => (
                <div key={pr.exercise} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-lg flex-shrink-0">{pr.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-700 truncate">{pr.exercise}</p>
                    <p className="text-xs text-slate-400">{pr.date}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-black text-slate-800">{pr.value}</p>
                    <p className="text-xs font-semibold text-emerald-500">{pr.change}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 text-sm mb-4">Challenge leaderboard</h3>
            <div className="flex flex-col gap-2">
              {leaderboard.map((p) => (
                <div key={p.rank} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl ${p.isYou ? "bg-violet-50 border border-violet-100" : ""}`}>
                  <span className="text-xs font-black text-slate-300 w-4">{p.rank}</span>
                  <div className={`w-8 h-8 rounded-full ${p.avatar} flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}>{p.name[0]}</div>
                  <p className={`text-sm font-semibold flex-1 truncate ${p.isYou ? "text-violet-700" : "text-slate-700"}`}>{p.name}</p>
                  <span className="text-xs font-bold text-slate-500">{p.points.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 text-sm mb-4">Discover people</h3>
            <div className="flex flex-col gap-3">
              {suggestedPeople.map((p) => (
                <div key={p.name} className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${p.avatar} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>{p.name[0]}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-700 truncate">{p.name}</p>
                    <p className="text-xs text-slate-400 truncate">{p.sport}</p>
                  </div>
                  <button className="text-xs font-semibold text-violet-600 hover:text-violet-500 transition-colors flex-shrink-0">Follow</button>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
