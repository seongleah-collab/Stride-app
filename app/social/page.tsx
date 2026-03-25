"use client";
import { useState } from "react";
import AppSidebar from "@/app/components/AppSidebar";

// ── Data ─────────────────────────────────────────────────────────────────────

const friendRequests = [
  { id: 1, name: "Jamie L.",   avatar: "bg-pink-400",   sport: "CrossFit · 5×/week",    mutuals: 3 },
  { id: 2, name: "Drew K.",    avatar: "bg-sky-400",    sport: "Running · Marathon prep", mutuals: 1 },
];

const suggestedPeople = [
  { id: 10, name: "Casey L.",   avatar: "bg-teal-400",   sport: "CrossFit · 5×/week",    mutuals: 4, badges: ["🏆","🔥"] },
  { id: 11, name: "Morgan B.",  avatar: "bg-rose-400",   sport: "Running · 4×/week",     mutuals: 2, badges: ["🏃"]      },
  { id: 12, name: "Riley P.",   avatar: "bg-amber-400",  sport: "Strength · 3×/week",    mutuals: 5, badges: ["💪","⚡"] },
  { id: 13, name: "Jordan K.",  avatar: "bg-pink-400",   sport: "HIIT · 6×/week",        mutuals: 3, badges: ["🔥","🥊"] },
  { id: 14, name: "Sam R.",     avatar: "bg-orange-400", sport: "Powerlifting · 4×/week",mutuals: 1, badges: ["🏋️"]     },
  { id: 15, name: "Taylor W.",  avatar: "bg-violet-400", sport: "Yoga · Daily",          mutuals: 2, badges: ["🧘"]      },
  { id: 16, name: "Alex M.",    avatar: "bg-indigo-400", sport: "Cycling · 5×/week",     mutuals: 6, badges: ["🚴","🏆"] },
  { id: 17, name: "Quinn D.",   avatar: "bg-emerald-400",sport: "Swimming · 3×/week",    mutuals: 0, badges: ["🏊"]      },
];

const myFriends = [
  { id: 20, name: "Jordan K.",  avatar: "bg-pink-400",   sport: "HIIT · 6×/week",         lastActive: "2m ago",  streak: 14 },
  { id: 21, name: "Alex M.",    avatar: "bg-sky-400",    sport: "Cycling · 5×/week",      lastActive: "1h ago",  streak: 8  },
  { id: 22, name: "Sam R.",     avatar: "bg-orange-400", sport: "Powerlifting · 4×/week", lastActive: "3h ago",  streak: 21 },
  { id: 23, name: "Taylor W.",  avatar: "bg-teal-400",   sport: "Yoga · Daily",           lastActive: "Yesterday",streak: 30 },
];

const myClubs = [
  { id: 1, emoji: "🏃", color: "#f97316", name: "Morning Runners NYC",   members: 142, lastPost: "2m ago",   private: false },
  { id: 2, emoji: "💪", color: "#7c3aed", name: "Lift Heavy Club",       members: 87,  lastPost: "15m ago",  private: true  },
];

const discoverClubs = [
  { id: 10, emoji: "🧘", color: "#8b5cf6", name: "Mindful Movement",      desc: "Yoga, meditation, and mindfulness for athletes",  members: 1240, category: "Wellness",  joined: false, private: false },
  { id: 11, emoji: "🚴", color: "#7c3aed", name: "Road Cyclists NYC",     desc: "Weekend group rides and training tips",            members: 534,  category: "Cycling",   joined: false, private: false },
  { id: 12, emoji: "🥊", color: "#ef4444", name: "Boxing Collective",     desc: "Technique breakdowns, sparring stories, WODs",     members: 318,  category: "Boxing",    joined: false, private: false },
  { id: 13, emoji: "🏋️", color: "#7c3aed", name: "Barbell Society",      desc: "Powerlifting, Olympic lifting, and strength PRs",  members: 892,  category: "Strength",  joined: false, private: false },
  { id: 14, emoji: "🏔️", color: "#10b981", name: "Trail Blazers",        desc: "Hikes, trail runs, and outdoor adventures",        members: 675,  category: "Hiking",    joined: false, private: false },
  { id: 15, emoji: "⚡", color: "#f97316", name: "HIIT Nation",           desc: "Daily HIIT WODs, tips, and accountability",        members: 2100, category: "HIIT",      joined: false, private: false },
  { id: 16, emoji: "🏊", color: "#0ea5e9", name: "Open Water Swimmers",  desc: "Ocean, lake, and open water swim community",       members: 201,  category: "Swimming",  joined: false, private: true  },
  { id: 17, emoji: "🎿", color: "#60a5fa", name: "Ski & Board Fitness",  desc: "Off-season conditioning for snow sports",          members: 389,  category: "Skiing",    joined: false, private: false },
];

const clubCategories = ["All", "Strength", "Cardio", "Wellness", "Cycling", "Hiking", "HIIT", "Swimming", "Boxing"];

// ── Gradient helpers ──────────────────────────────────────────────────────────

const gradientBg: React.CSSProperties = { background: "linear-gradient(135deg, #7c3aed, #f97316)" };

// ── Sub-components ────────────────────────────────────────────────────────────

function Avatar({ cls, name, size = "md" }: { cls: string; name: string; size?: "sm" | "md" | "lg" }) {
  const sz = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-12 h-12 text-base" }[size];
  return (
    <div className={`${sz} rounded-full ${cls} flex items-center justify-center text-white font-bold flex-shrink-0`}>
      {name[0]}
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function SocialPage() {
  const [activeTab, setActiveTab]           = useState<"friends" | "clubs">("friends");
  const [clubCategory, setClubCategory]     = useState("All");
  const [following, setFollowing]           = useState<Set<number>>(new Set());
  const [dismissed, setDismissed]           = useState<Set<number>>(new Set());
  const [joinedClubs, setJoinedClubs]       = useState<Set<number>>(new Set());
  const [accepted, setAccepted]             = useState<Set<number>>(new Set());
  const [showCreateClub, setShowCreateClub] = useState(false);
  const [clubName, setClubName]             = useState("");
  const [clubDesc, setClubDesc]             = useState("");
  const [clubPrivate, setClubPrivate]       = useState(false);
  const [search, setSearch]                 = useState("");

  const toggleFollow  = (id: number) => setFollowing((s)   => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleClub    = (id: number) => setJoinedClubs((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const filteredSuggested = suggestedPeople
    .filter((p) => !dismissed.has(p.id))
    .filter((p) => search === "" || p.name.toLowerCase().includes(search.toLowerCase()) || p.sport.toLowerCase().includes(search.toLowerCase()));

  const filteredClubs = discoverClubs
    .filter((c) => clubCategory === "All" || c.category === clubCategory)
    .filter((c) => search === "" || c.name.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AppSidebar />

      <div className="flex-1 md:ml-[260px] flex min-h-screen">
        <main className="flex-1 pb-24 md:pb-10 min-w-0">
          <div className="max-w-2xl mx-auto px-4 md:px-8">

            {/* Header */}
            <div className="flex items-center justify-between pt-10 pb-6">
              <div>
                <h1 className="text-2xl font-black text-slate-800">Social</h1>
                <p className="text-slate-400 text-sm mt-0.5">Find your people, build your community</p>
              </div>
              {activeTab === "clubs" && (
                <button
                  onClick={() => setShowCreateClub(true)}
                  className="flex items-center gap-2 text-white text-sm font-bold px-4 py-2.5 rounded-2xl shadow-md"
                  style={gradientBg}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  New Club
                </button>
              )}
            </div>

            {/* Tabs */}
            <div className="flex bg-white rounded-2xl p-1 shadow-sm mb-6 border border-slate-100">
              {(["friends", "clubs"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setSearch(""); }}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all capitalize ${
                    activeTab === tab ? "text-white shadow-md" : "text-slate-500 hover:text-slate-700"
                  }`}
                  style={activeTab === tab ? gradientBg : {}}
                >
                  {tab === "friends" ? "👥 Friends" : "🏠 Clubs"}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={activeTab === "friends" ? "Search people..." : "Search clubs..."}
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-200"
              />
            </div>

            {/* ── FRIENDS TAB ── */}
            {activeTab === "friends" && (
              <div>
                {/* Friend requests */}
                {friendRequests.filter((r) => !accepted.has(r.id) && !dismissed.has(r.id)).length > 0 && (
                  <div className="mb-7">
                    <h2 className="font-bold text-slate-800 mb-3">
                      Friend Requests
                      <span className="ml-2 text-xs font-bold text-white px-2 py-0.5 rounded-full" style={gradientBg}>
                        {friendRequests.filter((r) => !accepted.has(r.id) && !dismissed.has(r.id)).length}
                      </span>
                    </h2>
                    <div className="flex flex-col gap-3">
                      {friendRequests
                        .filter((r) => !accepted.has(r.id) && !dismissed.has(r.id))
                        .map((r) => (
                          <div key={r.id} className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
                            <Avatar cls={r.avatar} name={r.name} size="lg" />
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-slate-800 text-sm">{r.name}</p>
                              <p className="text-xs text-slate-400">{r.sport}</p>
                              <p className="text-xs text-violet-500 font-medium mt-0.5">{r.mutuals} mutual friends</p>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                              <button
                                onClick={() => setDismissed((s) => { const n = new Set(s); n.add(r.id); return n; })}
                                className="text-xs font-semibold px-3 py-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                              >
                                Decline
                              </button>
                              <button
                                onClick={() => setAccepted((s) => { const n = new Set(s); n.add(r.id); return n; })}
                                className="text-xs font-bold px-3 py-2 rounded-xl text-white"
                                style={gradientBg}
                              >
                                Accept
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* My friends */}
                {!search && (
                  <div className="mb-7">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="font-bold text-slate-800">My Friends <span className="text-slate-400 font-normal text-sm">({myFriends.length})</span></h2>
                    </div>
                    <div className="flex flex-col gap-3">
                      {myFriends.map((f) => (
                        <div key={f.id} className="bg-white rounded-2xl px-4 py-3 shadow-sm flex items-center gap-3">
                          <Avatar cls={f.avatar} name={f.name} size="md" />
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-slate-800 text-sm">{f.name}</p>
                            <p className="text-xs text-slate-400">{f.sport}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-xs font-bold text-orange-400">🔥 {f.streak}</p>
                            <p className="text-[10px] text-slate-400">{f.lastActive}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggested people */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-bold text-slate-800">{search ? "Search Results" : "People You May Know"}</h2>
                    <span className="text-xs text-slate-400">{filteredSuggested.length} people</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    {filteredSuggested.map((p) => (
                      <div key={p.id} className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
                        <Avatar cls={p.avatar} name={p.name} size="md" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-slate-800 text-sm">{p.name}</p>
                            <div className="flex gap-0.5">
                              {p.badges.map((b) => <span key={b} className="text-xs">{b}</span>)}
                            </div>
                          </div>
                          <p className="text-xs text-slate-400">{p.sport}</p>
                          {p.mutuals > 0 && (
                            <p className="text-xs text-violet-500 font-medium mt-0.5">{p.mutuals} mutual friends</p>
                          )}
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          {!following.has(p.id) && (
                            <button
                              onClick={() => setDismissed((s) => { const n = new Set(s); n.add(p.id); return n; })}
                              className="text-slate-300 hover:text-slate-400 transition-colors p-1"
                            >
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                              </svg>
                            </button>
                          )}
                          <button
                            onClick={() => toggleFollow(p.id)}
                            className={`text-xs font-bold px-3 py-2 rounded-xl transition-all ${
                              following.has(p.id) ? "bg-slate-100 text-slate-500" : "text-white"
                            }`}
                            style={following.has(p.id) ? {} : gradientBg}
                          >
                            {following.has(p.id) ? "Following ✓" : "Follow"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── CLUBS TAB ── */}
            {activeTab === "clubs" && (
              <div>
                {/* My clubs */}
                {!search && myClubs.length > 0 && (
                  <div className="mb-7">
                    <h2 className="font-bold text-slate-800 mb-3">My Clubs</h2>
                    <div className="flex flex-col gap-3">
                      {myClubs.map((c) => (
                        <div key={c.id} className="bg-white rounded-2xl p-4 shadow-sm border-l-4 flex items-center gap-3" style={{ borderLeftColor: c.color }}>
                          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: `${c.color}18` }}>
                            {c.emoji}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <p className="font-bold text-slate-800 text-sm">{c.name}</p>
                              {c.private && <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full font-medium">Private</span>}
                            </div>
                            <p className="text-xs text-slate-400">{c.members} members · Active {c.lastPost}</p>
                          </div>
                          <button className="text-xs font-bold text-violet-600 hover:text-violet-500 transition-colors flex-shrink-0">
                            View
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Category filter */}
                {!search && (
                  <div className="flex gap-2 overflow-x-auto pb-2 mb-5" style={{ scrollbarWidth: "none" }}>
                    {clubCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setClubCategory(cat)}
                        className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          clubCategory === cat ? "text-white shadow-md" : "bg-white text-slate-500 border border-slate-200 hover:border-violet-200"
                        }`}
                        style={clubCategory === cat ? gradientBg : {}}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}

                {/* Discover clubs */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-bold text-slate-800">{search ? "Search Results" : "Discover Clubs"}</h2>
                    <span className="text-xs text-slate-400">{filteredClubs.length} clubs</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    {filteredClubs.map((c) => (
                      <div key={c.id} className="bg-white rounded-2xl p-4 shadow-sm">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: `${c.color}18` }}>
                            {c.emoji}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                              <p className="font-bold text-slate-800 text-sm">{c.name}</p>
                              {c.private && <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full font-medium">🔒 Private</span>}
                            </div>
                            <p className="text-xs text-slate-400 mb-2">{c.desc}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">{c.category}</span>
                              <span className="text-[10px] text-slate-400">👥 {c.members.toLocaleString()} members</span>
                            </div>
                          </div>
                          <button
                            onClick={() => toggleClub(c.id)}
                            className={`flex-shrink-0 text-xs font-bold px-3 py-2 rounded-xl transition-all ${
                              joinedClubs.has(c.id) ? "bg-slate-100 text-slate-500" : "text-white"
                            }`}
                            style={joinedClubs.has(c.id) ? {} : gradientBg}
                          >
                            {joinedClubs.has(c.id) ? "Joined ✓" : c.private ? "Request" : "Join"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>

        {/* Right panel */}
        <aside className="hidden lg:flex flex-col w-[300px] flex-shrink-0 px-6 py-10 gap-7 border-l border-slate-100 sticky top-0 h-screen overflow-y-auto bg-white">

          {/* Your social stats */}
          <div>
            <h3 className="font-bold text-slate-800 text-sm mb-3">Your Network</h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Friends", value: myFriends.length + accepted.size },
                { label: "Clubs",   value: myClubs.length + joinedClubs.size },
                { label: "Followers", value: 47 + following.size },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-1 bg-slate-50 rounded-2xl py-3 px-2">
                  <span className="text-lg font-black text-slate-800">{s.value}</span>
                  <span className="text-[10px] text-slate-400 text-center">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Active friends */}
          <div>
            <h3 className="font-bold text-slate-800 text-sm mb-3">Active Now</h3>
            <div className="flex flex-col gap-2.5">
              {myFriends.filter((f) => f.lastActive.includes("m ago")).map((f) => (
                <div key={f.id} className="flex items-center gap-2.5">
                  <div className="relative">
                    <Avatar cls={f.avatar} name={f.name} size="sm" />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-700 truncate">{f.name}</p>
                    <p className="text-xs text-slate-400">{f.sport.split("·")[0].trim()}</p>
                  </div>
                  <span className="text-[10px] text-emerald-500 font-medium">{f.lastActive}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top clubs */}
          <div>
            <h3 className="font-bold text-slate-800 text-sm mb-3">Popular Clubs</h3>
            <div className="flex flex-col gap-2.5">
              {discoverClubs
                .sort((a, b) => b.members - a.members)
                .slice(0, 4)
                .map((c) => (
                  <div key={c.id} className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: `${c.color}18` }}>
                      {c.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-700 truncate">{c.name}</p>
                      <p className="text-xs text-slate-400">{c.members.toLocaleString()} members</p>
                    </div>
                    <button
                      onClick={() => toggleClub(c.id)}
                      className={`text-xs font-semibold flex-shrink-0 transition-colors ${
                        joinedClubs.has(c.id) ? "text-slate-400" : "text-violet-600 hover:text-violet-500"
                      }`}
                    >
                      {joinedClubs.has(c.id) ? "Joined" : "Join"}
                    </button>
                  </div>
                ))}
            </div>
          </div>

          {/* Create club CTA */}
          <div
            className="rounded-2xl p-4 text-white cursor-pointer hover:opacity-90 transition-opacity"
            style={gradientBg}
            onClick={() => { setActiveTab("clubs"); setShowCreateClub(true); }}
          >
            <p className="text-lg mb-1">🏠</p>
            <p className="font-bold text-sm mb-0.5">Start your own club</p>
            <p className="text-xs opacity-75">Bring your training group together in one place</p>
          </div>

        </aside>
      </div>

      {/* Create Club modal */}
      {showCreateClub && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-black text-slate-800">Create a Club</h2>
              <button
                onClick={() => setShowCreateClub(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Club Name</label>
                <input
                  type="text"
                  value={clubName}
                  onChange={(e) => setClubName(e.target.value)}
                  placeholder="e.g. Morning Runners NYC"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-200"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Description</label>
                <textarea
                  value={clubDesc}
                  onChange={(e) => setClubDesc(e.target.value)}
                  placeholder="What's your club about?"
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-200 resize-none"
                />
              </div>
              <div className="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <p className="text-sm font-semibold text-slate-700">🔒 Private club</p>
                  <p className="text-xs text-slate-400">Members must request to join</p>
                </div>
                <button
                  onClick={() => setClubPrivate((v) => !v)}
                  className={`w-11 h-6 rounded-full transition-all ${clubPrivate ? "" : "bg-slate-200"}`}
                  style={clubPrivate ? gradientBg : {}}
                >
                  <span className={`block w-5 h-5 bg-white rounded-full shadow transition-transform mx-0.5 ${clubPrivate ? "translate-x-5" : ""}`} />
                </button>
              </div>
            </div>

            <button
              disabled={!clubName.trim()}
              onClick={() => setShowCreateClub(false)}
              className={`w-full mt-5 font-bold text-base py-3.5 rounded-2xl text-white transition-opacity ${!clubName.trim() ? "opacity-40" : ""}`}
              style={gradientBg}
            >
              Create Club
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
