"use client";
import { useState } from "react";
import AppSidebar from "@/app/components/AppSidebar";

// ── Data ─────────────────────────────────────────────────────────────────────

const myChallenges = [
  {
    id: 1,
    emoji: "🔥",
    color: "#f97316",
    title: "30-Day Consistency",
    desc: "Work out 25 of 30 days",
    category: "Consistency",
    progress: 0.6,
    current: 18,
    total: 30,
    participants: 128,
    daysLeft: 12,
    rank: 2,
    totalRanked: 128,
    leaderboard: [
      { name: "Jordan K.", avatar: "bg-pink-400",   points: 24, isYou: false },
      { name: "You",       avatar: "bg-violet-400", points: 18, isYou: true  },
      { name: "Alex M.",   avatar: "bg-sky-400",    points: 17, isYou: false },
    ],
  },
  {
    id: 2,
    emoji: "⚡",
    color: "#7c3aed",
    title: "Power Week",
    desc: "Complete 5 strength sessions in 7 days",
    category: "Strength",
    progress: 0.4,
    current: 2,
    total: 5,
    participants: 54,
    daysLeft: 5,
    rank: 4,
    totalRanked: 54,
    leaderboard: [
      { name: "Sam R.",    avatar: "bg-orange-400", points: 4, isYou: false },
      { name: "Taylor W.", avatar: "bg-teal-400",   points: 3, isYou: false },
      { name: "You",       avatar: "bg-violet-400", points: 2, isYou: true  },
    ],
  },
  {
    id: 3,
    emoji: "🏃",
    color: "#10b981",
    title: "Run Every Day",
    desc: "Log a run for 7 days straight",
    category: "Running",
    progress: 0.71,
    current: 5,
    total: 7,
    participants: 89,
    daysLeft: 2,
    rank: 1,
    totalRanked: 89,
    leaderboard: [
      { name: "You",       avatar: "bg-violet-400", points: 5, isYou: true  },
      { name: "Morgan B.", avatar: "bg-rose-400",   points: 5, isYou: false },
      { name: "Casey L.",  avatar: "bg-teal-400",   points: 4, isYou: false },
    ],
  },
];

const browseChallenges = [
  { id: 10, emoji: "🧘", color: "#8b5cf6", title: "Mindful May",          desc: "10 yoga or meditation sessions in a month",  category: "Wellness",    participants: 312, duration: "30 days",  difficulty: "Easy",   trending: true  },
  { id: 11, emoji: "🚴", color: "#7c3aed", title: "Century Ride",         desc: "Cycle a combined 100 km in one week",         category: "Cycling",     participants: 76,  duration: "7 days",   difficulty: "Hard",   trending: false },
  { id: 12, emoji: "💪", color: "#f97316", title: "1000 Push-ups",        desc: "Log 1,000 push-ups in any 30-day window",     category: "Strength",    participants: 204, duration: "30 days",  difficulty: "Medium", trending: true  },
  { id: 13, emoji: "🏊", color: "#0ea5e9", title: "Swim the Channel",     desc: "Swim a total of 34 km over the month",        category: "Swimming",    participants: 41,  duration: "30 days",  difficulty: "Hard",   trending: false },
  { id: 14, emoji: "🌅", color: "#f59e0b", title: "Early Bird Club",      desc: "Work out before 8 am, 10 days in a row",      category: "Consistency", participants: 511, duration: "10 days",  difficulty: "Medium", trending: true  },
  { id: 15, emoji: "🏔️", color: "#10b981", title: "Elevation Challenge",  desc: "Climb a combined 5,000 m on hikes or runs",    category: "Hiking",      participants: 93,  duration: "60 days",  difficulty: "Hard",   trending: false },
  { id: 16, emoji: "🔥", color: "#ef4444", title: "HIIT Streak",          desc: "5 HIIT sessions in 5 days",                   category: "HIIT",        participants: 187, duration: "5 days",   difficulty: "Hard",   trending: true  },
  { id: 17, emoji: "🥊", color: "#ef4444", title: "Knockout Week",        desc: "4 boxing workouts in 7 days",                 category: "Boxing",      participants: 63,  duration: "7 days",   difficulty: "Medium", trending: false },
  { id: 18, emoji: "🎯", color: "#7c3aed", title: "Step it Up",           desc: "Hit 10,000 steps every day for 2 weeks",      category: "Cardio",      participants: 740, duration: "14 days",  difficulty: "Easy",   trending: true  },
];

const friendChallenges = [
  { id: 20, emoji: "🏆", color: "#f97316", title: "Squad Strength Cup",    desc: "Most total weight lifted this week",          friends: ["Jordan K.", "Alex M.", "Sam R."],   friendAvatars: ["bg-pink-400","bg-sky-400","bg-orange-400"],  participants: 4,  daysLeft: 3  },
  { id: 21, emoji: "🏃", color: "#10b981", title: "5K Time Trial",         desc: "Best 5K time logged by Sunday",               friends: ["Morgan B.", "Casey L."],             friendAvatars: ["bg-rose-400","bg-teal-400"],                 participants: 6,  daysLeft: 6  },
  { id: 22, emoji: "🔥", color: "#ef4444", title: "Calorie Crusher",       desc: "Most calories burned in 7 days",              friends: ["Taylor W.", "Jordan K.", "Alex M."], friendAvatars: ["bg-orange-400","bg-pink-400","bg-sky-400"],  participants: 5,  daysLeft: 4  },
  { id: 23, emoji: "🧘", color: "#8b5cf6", title: "Zen Seven",             desc: "7 mindfulness sessions this week",            friends: ["Riley P."],                          friendAvatars: ["bg-amber-400"],                             participants: 3,  daysLeft: 5  },
];

const categories = ["All", "Consistency", "Strength", "Running", "Cycling", "Wellness", "HIIT", "Cardio", "Hiking"];

const stats = [
  { emoji: "🏆", value: "7",   label: "Challenges won"    },
  { emoji: "🔥", value: "23",  label: "Total completed"   },
  { emoji: "👥", value: "310", label: "Athletes beaten"   },
];

// ── Gradient helpers ──────────────────────────────────────────────────────────

const gradientBg:  React.CSSProperties = { background: "linear-gradient(135deg, #7c3aed, #f97316)" };
const gradientBar: React.CSSProperties = { background: "linear-gradient(90deg,  #7c3aed, #f97316)" };

// ── Component ─────────────────────────────────────────────────────────────────

export default function ChallengesPage() {
  const [activeTab, setActiveTab]           = useState<"mine" | "browse" | "friends">("mine");
  const [activeCategory, setActiveCategory] = useState("All");
  const [joined, setJoined]                 = useState<Set<number>>(new Set());

  const filteredBrowse = activeCategory === "All"
    ? browseChallenges
    : browseChallenges.filter((c) => c.category === activeCategory);

  const difficultyColor: Record<string, string> = {
    Easy:   "text-emerald-600 bg-emerald-50",
    Medium: "text-orange-600 bg-orange-50",
    Hard:   "text-red-600 bg-red-50",
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
                <h1 className="text-2xl font-black text-slate-800">Challenges</h1>
                <p className="text-slate-400 text-sm mt-0.5">Compete, push harder, win together</p>
              </div>
              <button
                className="flex items-center gap-2 text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-sm bg-violet-600 hover:bg-violet-700 transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Create
              </button>
            </div>

            {/* Tabs */}
            <div className="flex bg-white rounded-2xl p-1 shadow-sm mb-6 border border-slate-100">
              {(["mine", "browse", "friends"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all capitalize ${
                    activeTab === tab ? "bg-violet-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {tab === "mine" ? "My Challenges" : tab === "browse" ? "Browse" : "Friends"}
                </button>
              ))}
            </div>

            {/* ── MY CHALLENGES ── */}
            {activeTab === "mine" && (
              <div className="flex flex-col gap-4">
                {myChallenges.map((c) => (
                  <div key={c.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    {/* Top accent bar */}
                    <div className="h-1" style={{ background: c.color }} />
                    <div className="p-4">
                      {/* Title row */}
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                          style={{ background: `${c.color}18` }}
                        >
                          {c.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-slate-800">{c.title}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{c.desc}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-xs font-bold text-slate-500">{c.daysLeft}d left</p>
                          <p className="text-[10px] text-slate-400">{c.participants} athletes</p>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{ width: `${c.progress * 100}%`, background: c.color }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-600 whitespace-nowrap">{c.current}/{c.total}</span>
                      </div>

                      {/* Rank + mini leaderboard */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-slate-400">Your rank:</span>
                          <span
                            className={`text-xs font-black px-2 py-0.5 rounded-full text-white`}
                            style={{ background: c.rank === 1 ? "#f59e0b" : c.color }}
                          >
                            #{c.rank}
                          </span>
                          <span className="text-xs text-slate-400">of {c.totalRanked}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">{c.category}</span>
                      </div>

                      {/* Mini leaderboard */}
                      <div className="flex flex-col gap-1.5 bg-slate-50 rounded-xl p-3">
                        {c.leaderboard.map((p, i) => (
                          <div key={p.name} className={`flex items-center gap-2.5 ${p.isYou ? "font-semibold" : ""}`}>
                            <span className="text-xs text-slate-300 font-black w-4">{i + 1}</span>
                            <div className={`w-6 h-6 rounded-full ${p.avatar} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}>
                              {p.name[0]}
                            </div>
                            <span className={`text-xs flex-1 ${p.isYou ? "text-violet-700 font-bold" : "text-slate-600"}`}>{p.name}</span>
                            <span className="text-xs text-slate-500 font-semibold">{p.points} pts</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── BROWSE CHALLENGES ── */}
            {activeTab === "browse" && (
              <div>
                {/* Category filter */}
                <div className="flex gap-2 overflow-x-auto pb-2 mb-5" style={{ scrollbarWidth: "none" }}>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        activeCategory === cat ? "bg-violet-600 text-white shadow-sm" : "bg-white text-slate-500 border border-slate-200 hover:border-violet-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col gap-3">
                  {filteredBrowse.map((c) => (
                    <div key={c.id} className="bg-white rounded-2xl p-4 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                          style={{ background: `${c.color}18` }}
                        >
                          {c.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                            <p className="font-bold text-slate-800 text-sm">{c.title}</p>
                            {c.trending && (
                              <span className="text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full">
                                🔥 Trending
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400">{c.desc}</p>
                          <div className="flex items-center gap-2 mt-2 flex-wrap">
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${difficultyColor[c.difficulty]}`}>
                              {c.difficulty}
                            </span>
                            <span className="text-[10px] text-slate-400">⏱ {c.duration}</span>
                            <span className="text-[10px] text-slate-400">👥 {c.participants.toLocaleString()} joining</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setJoined((prev) => {
                            const next = new Set(prev);
                            next.has(c.id) ? next.delete(c.id) : next.add(c.id);
                            return next;
                          })}
                          className={`flex-shrink-0 text-xs font-bold px-3 py-2 rounded-xl transition-all ${
                            joined.has(c.id) ? "bg-slate-100 text-slate-500" : "bg-violet-600 hover:bg-violet-700 text-white"
                          }`}
                        >
                          {joined.has(c.id) ? "Joined ✓" : "Join"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── FRIENDS' CHALLENGES ── */}
            {activeTab === "friends" && (
              <div className="flex flex-col gap-4">
                <p className="text-xs text-slate-400 -mt-2 mb-1">Challenges your friends are competing in</p>
                {friendChallenges.map((c) => (
                  <div key={c.id} className="bg-white rounded-2xl p-4 shadow-sm border-l-4" style={{ borderLeftColor: c.color }}>
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                        style={{ background: `${c.color}18` }}
                      >
                        {c.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-800 text-sm">{c.title}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{c.desc}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[10px] text-slate-400">{c.daysLeft}d left</span>
                          <span className="text-[10px] text-slate-400">·</span>
                          <span className="text-[10px] text-slate-400">{c.participants} competing</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setJoined((prev) => {
                          const next = new Set(prev);
                          next.has(c.id) ? next.delete(c.id) : next.add(c.id);
                          return next;
                        })}
                        className={`flex-shrink-0 text-xs font-bold px-3 py-2 rounded-xl transition-all ${
                          joined.has(c.id) ? "bg-slate-100 text-slate-500" : "text-white"
                        }`}
                        style={joined.has(c.id) ? {} : gradientBg}
                      >
                        {joined.has(c.id) ? "Joined ✓" : "Join"}
                      </button>
                    </div>

                    {/* Friends in this challenge */}
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {c.friendAvatars.map((av, i) => (
                          <div
                            key={i}
                            className={`w-6 h-6 rounded-full border-2 border-white ${av} flex items-center justify-center text-white text-[9px] font-bold`}
                          >
                            {c.friends[i]?.[0]}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-slate-500">
                        <span className="font-semibold">{c.friends[0]}</span>
                        {c.friends.length > 1 && ` and ${c.friends.length - 1} other${c.friends.length > 2 ? "s" : ""}`} joined
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </main>

        {/* Right panel */}
        <aside className="hidden lg:flex flex-col w-[300px] flex-shrink-0 px-6 py-10 gap-7 border-l border-slate-100 sticky top-0 h-screen overflow-y-auto bg-white">

          {/* Your challenge stats */}
          <div>
            <h3 className="font-bold text-slate-800 text-sm mb-4">Your Challenge Stats</h3>
            <div className="grid grid-cols-3 gap-2">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-1 bg-slate-50 rounded-2xl py-3 px-2">
                  <span className="text-xl">{s.emoji}</span>
                  <span className="text-lg font-black text-slate-800">{s.value}</span>
                  <span className="text-[10px] text-slate-400 text-center leading-tight">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Overall leaderboard */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 text-sm">Overall Leaderboard</h3>
              <button className="text-xs text-violet-600 font-medium">See all</button>
            </div>
            <div className="flex flex-col gap-2">
              {[
                { rank: 1, name: "Jordan K.", points: 2840, avatar: "bg-pink-400"   },
                { rank: 2, name: "You",       points: 2410, avatar: "bg-violet-400", isYou: true },
                { rank: 3, name: "Alex M.",   points: 2190, avatar: "bg-sky-400"    },
                { rank: 4, name: "Sam R.",    points: 1950, avatar: "bg-orange-400" },
                { rank: 5, name: "Taylor W.", points: 1720, avatar: "bg-teal-400"   },
              ].map((p) => (
                <div
                  key={p.rank}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl ${p.isYou ? "bg-violet-50 border border-violet-100" : ""}`}
                >
                  <span className={`text-xs font-black w-4 ${p.rank === 1 ? "text-amber-400" : "text-slate-300"}`}>
                    {p.rank === 1 ? "🥇" : p.rank}
                  </span>
                  <div className={`w-8 h-8 rounded-full ${p.avatar} flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}>
                    {p.name[0]}
                  </div>
                  <p className={`text-sm font-semibold flex-1 truncate ${p.isYou ? "text-violet-700" : "text-slate-700"}`}>{p.name}</p>
                  <span className="text-xs font-bold text-slate-500">{p.points.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Streak */}
          <div>
            <h3 className="font-bold text-slate-800 text-sm mb-3">Challenge Streak</h3>
            <div className="rounded-2xl p-4 text-white" style={gradientBg}>
              <p className="text-3xl font-black mb-0.5">7 🔥</p>
              <p className="text-sm font-semibold opacity-90">Days active in challenges</p>
              <p className="text-xs opacity-70 mt-1">Keep it going — your best is 12!</p>
            </div>
          </div>

          {/* Trending challenges */}
          <div>
            <h3 className="font-bold text-slate-800 text-sm mb-3">Trending Now</h3>
            <div className="flex flex-col gap-2.5">
              {browseChallenges.filter((c) => c.trending).slice(0, 3).map((c) => (
                <div key={c.id} className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: `${c.color}18` }}
                  >
                    {c.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-700 truncate">{c.title}</p>
                    <p className="text-xs text-slate-400">{c.participants.toLocaleString()} joining</p>
                  </div>
                  <button
                    onClick={() => setJoined((prev) => {
                      const next = new Set(prev);
                      next.has(c.id) ? next.delete(c.id) : next.add(c.id);
                      return next;
                    })}
                    className={`text-xs font-semibold flex-shrink-0 transition-colors ${
                      joined.has(c.id) ? "text-slate-400" : "text-violet-600 hover:text-violet-500"
                    }`}
                  >
                    {joined.has(c.id) ? "Joined" : "Join"}
                  </button>
                </div>
              ))}
            </div>
          </div>

        </aside>
      </div>
    </div>
  );
}
