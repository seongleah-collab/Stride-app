"use client";
import { useState, useEffect, useRef } from "react";
import AppSidebar from "@/app/components/AppSidebar";

// ── Data ─────────────────────────────────────────────────────────────────────

const allGoals = [
  { id: "lose_weight",  emoji: "🔥", label: "Lose weight",           desc: "Burn fat and reach a healthier body weight" },
  { id: "build_muscle", emoji: "💪", label: "Build muscle",           desc: "Gain strength and increase muscle mass" },
  { id: "endurance",    emoji: "🏃", label: "Boost endurance",        desc: "Go harder and farther for longer" },
  { id: "performance",  emoji: "⚡", label: "Improve performance",    desc: "Level up your sport or training output" },
  { id: "flexibility",  emoji: "🧘", label: "Flexibility & mobility", desc: "Move better, reduce stiffness and pain" },
  { id: "event",        emoji: "🏆", label: "Train for an event",     desc: "Prep for a race, competition, or challenge" },
  { id: "mental",       emoji: "🧠", label: "Mental wellness",        desc: "Reduce stress, improve mood and focus" },
  { id: "heart",        emoji: "❤️", label: "Heart health",           desc: "Strengthen your cardiovascular system" },
  { id: "consistency",  emoji: "🎯", label: "Stay consistent",        desc: "Build a sustainable, long-term habit" },
  { id: "rehab",        emoji: "🩹", label: "Recover & rehab",        desc: "Safely rebuild strength after injury" },
  { id: "tone",         emoji: "✨", label: "Tone up",                 desc: "Define your body and build lean muscle" },
  { id: "energy",       emoji: "🔋", label: "More energy",            desc: "Feel energized and less fatigued daily" },
];

const allActivities = [
  { id: "running",    emoji: "🏃", label: "Running"        },
  { id: "cycling",    emoji: "🚴", label: "Cycling"        },
  { id: "swimming",   emoji: "🏊", label: "Swimming"       },
  { id: "weights",    emoji: "🏋️", label: "Weight Training"},
  { id: "hiit",       emoji: "⚡", label: "HIIT"           },
  { id: "yoga",       emoji: "🧘", label: "Yoga"           },
  { id: "boxing",     emoji: "🥊", label: "Boxing"         },
  { id: "hiking",     emoji: "🥾", label: "Hiking"         },
  { id: "dance",      emoji: "💃", label: "Dance"          },
  { id: "basketball", emoji: "🏀", label: "Basketball"     },
  { id: "soccer",     emoji: "⚽", label: "Soccer"         },
  { id: "tennis",     emoji: "🎾", label: "Tennis"         },
  { id: "crossfit",   emoji: "🔗", label: "CrossFit"       },
  { id: "climbing",   emoji: "🧗", label: "Rock Climbing"  },
  { id: "pilates",    emoji: "🤸", label: "Pilates"        },
  { id: "rowing",     emoji: "🚣", label: "Rowing"         },
  { id: "golf",       emoji: "⛳", label: "Golf"           },
  { id: "skiing",     emoji: "🎿", label: "Skiing"         },
];

const hostedEvents = [
  { id: 1, emoji: "🏃", color: "#f97316", name: "Morning 5K Run",      date: "Mar 15, 2026", attendees: 24, status: "Completed" },
  { id: 2, emoji: "💪", color: "#7c3aed", name: "Strength Bootcamp",   date: "Apr 5, 2026",  attendees: 12, status: "Upcoming"  },
];

const stats = [
  { label: "Workouts",  value: "142" },
  { label: "Following", value: "38"  },
  { label: "Followers", value: "61"  },
];

const levelLabels: Record<string, { emoji: string; label: string }> = {
  beginner:     { emoji: "🌱", label: "Beginner"          },
  intermediate: { emoji: "💪", label: "Intermediate"       },
  active:       { emoji: "🔥", label: "Fairly Active"      },
  athlete:      { emoji: "🏆", label: "Dedicated Athlete"  },
};

const avatarColors = [
  "bg-violet-400", "bg-pink-400", "bg-sky-400",
  "bg-orange-400", "bg-emerald-400", "bg-rose-400", "bg-amber-400",
];

// ── Gradient helpers ──────────────────────────────────────────────────────────

const gradientBg: React.CSSProperties = { background: "linear-gradient(135deg, #7c3aed, #f97316)" };

// ── Component ─────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "goals" | "settings">("overview");

  // profile
  const [name, setName]         = useState("Your Name");
  const [bio, setBio]           = useState("Fitness enthusiast. Always chasing the next goal. 🏃");
  const [location, setLocation] = useState("New York, NY");
  const [avatarColor, setAvatarColor] = useState("bg-violet-400");
  const [avatarEmoji, setAvatarEmoji] = useState("");
  const [editingProfile, setEditingProfile] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  // draft state for editing
  const [draftName, setDraftName]         = useState("");
  const [draftBio, setDraftBio]           = useState("");
  const [draftLocation, setDraftLocation] = useState("");

  // goals & activities from onboarding
  const [goals, setGoals]           = useState<string[]>([]);
  const [activities, setActivities] = useState<string[]>([]);
  const [level, setLevel]           = useState("beginner");
  const [editingGoals, setEditingGoals]         = useState(false);
  const [editingActivities, setEditingActivities] = useState(false);
  const [draftGoals, setDraftGoals]               = useState<string[]>([]);
  const [draftActivities, setDraftActivities]     = useState<string[]>([]);

  // settings
  const [settings, setSettings] = useState({
    notifications:    true,
    friendActivity:   true,
    challengeUpdates: true,
    eventReminders:   true,
    weeklyDigest:     false,
    publicProfile:    true,
    showWorkouts:     true,
    showChallenges:   true,
    units:            "metric" as "metric" | "imperial",
    theme:            "light" as "light" | "dark" | "system",
  });

  const fileRef = useRef<HTMLInputElement>(null);
  const [avatarImg, setAvatarImg] = useState<string | null>(null);

  useEffect(() => {
    const g = JSON.parse(localStorage.getItem("stride_goals")      ?? "[]");
    const a = JSON.parse(localStorage.getItem("stride_activities")  ?? "[]");
    const s = JSON.parse(localStorage.getItem("stride_schedule")    ?? "{}");
    setGoals(g.length ? g : ["endurance", "build_muscle"]);
    setActivities(a.length ? a : ["running", "weights"]);
    setLevel(s.level ?? "beginner");
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarImg(reader.result as string);
    reader.readAsDataURL(file);
  };

  const saveProfile = () => {
    if (draftName.trim()) setName(draftName.trim());
    setBio(draftBio);
    if (draftLocation.trim()) setLocation(draftLocation.trim());
    setEditingProfile(false);
  };

  const saveGoals = () => {
    setGoals(draftGoals);
    localStorage.setItem("stride_goals", JSON.stringify(draftGoals));
    setEditingGoals(false);
  };

  const saveActivities = () => {
    setActivities(draftActivities);
    localStorage.setItem("stride_activities", JSON.stringify(draftActivities));
    setEditingActivities(false);
  };

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((s) => ({ ...s, [key]: !s[key] }));
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] flex">
      <AppSidebar />

      <div className="flex-1 md:ml-[260px] flex min-h-screen">
        <main className="flex-1 pb-24 md:pb-10 min-w-0">
          <div className="max-w-2xl mx-auto px-4 md:px-8">

            {/* Profile card */}
            <div className="pt-10 pb-2">
              <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
                {/* Banner */}
                <div className="h-24 w-full" style={gradientBg} />

                <div className="px-5 pb-5">
                  {/* Avatar + edit row */}
                  <div className="flex items-end justify-between -mt-10 mb-4">
                    <div className="relative">
                      <div
                        className={`w-20 h-20 rounded-2xl border-4 border-white shadow-md flex items-center justify-center text-white font-black text-2xl overflow-hidden ${!avatarImg ? avatarColor : ""}`}
                        style={avatarImg ? {} : {}}
                      >
                        {avatarImg
                          ? <img src={avatarImg} alt="avatar" className="w-full h-full object-cover" />
                          : avatarEmoji
                          ? <span className="text-3xl">{avatarEmoji}</span>
                          : name[0]?.toUpperCase()}
                      </div>
                      {/* Camera button */}
                      <button
                        onClick={() => setShowAvatarPicker(true)}
                        className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-slate-500 hover:text-violet-600 transition-colors"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                          <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
                          <circle cx="12" cy="13" r="4"/>
                        </svg>
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        setDraftName(name);
                        setDraftBio(bio);
                        setDraftLocation(location);
                        setEditingProfile(true);
                      }}
                      className="text-xs font-semibold text-violet-600 border border-violet-200 bg-violet-50 hover:bg-violet-100 transition-colors px-3 py-1.5 rounded-xl"
                    >
                      Edit Profile
                    </button>
                  </div>

                  {/* Name & bio */}
                  <h2 className="text-lg font-black text-slate-800">{name}</h2>
                  <p className="text-sm text-slate-500 mt-0.5">{bio}</p>
                  <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-400">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    {location}
                  </div>

                  {/* Level badge */}
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-xs font-bold text-white bg-violet-600 px-3 py-1 rounded-full">
                      {levelLabels[level]?.emoji} {levelLabels[level]?.label}
                    </span>
                  </div>

                  {/* Stats row */}
                  <div className="flex gap-6 mt-4 pt-4 border-t border-slate-100">
                    {stats.map((s) => (
                      <div key={s.label} className="flex flex-col items-center">
                        <span className="text-lg font-black text-slate-800">{s.value}</span>
                        <span className="text-xs text-slate-400">{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex bg-white rounded-2xl p-1 shadow-sm my-5 border border-slate-100">
              {(["overview", "goals", "settings"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all capitalize ${
                    activeTab === tab ? "bg-violet-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {tab === "overview" ? "Overview" : tab === "goals" ? "Goals" : "Settings"}
                </button>
              ))}
            </div>

            {/* ── OVERVIEW ── */}
            {activeTab === "overview" && (
              <div className="flex flex-col gap-5">

                {/* Activity summary */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <h3 className="font-bold text-slate-800 text-sm mb-4">This Month</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { emoji: "🏋️", value: "18",    label: "Workouts",    bg: "bg-violet-50",  text: "text-violet-700"  },
                      { emoji: "⏱",  value: "14h",   label: "Active time", bg: "bg-emerald-50", text: "text-emerald-700" },
                      { emoji: "🔥",  value: "6,240", label: "kcal burned", bg: "bg-orange-50",  text: "text-orange-700"  },
                    ].map((s) => (
                      <div key={s.label} className={`flex flex-col items-center gap-1 ${s.bg} rounded-2xl py-3`}>
                        <span className="text-xl">{s.emoji}</span>
                        <span className={`text-base font-black ${s.text}`}>{s.value}</span>
                        <span className="text-[10px] text-slate-400 text-center">{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* My activities */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-slate-800 text-sm">My Activities</h3>
                    <button
                      onClick={() => { setDraftActivities([...activities]); setEditingActivities(true); }}
                      className="text-xs text-violet-600 font-medium"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activities.map((id) => {
                      const a = allActivities.find((x) => x.id === id);
                      if (!a) return null;
                      return (
                        <span key={id} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-600">
                          {a.emoji} {a.label}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Personal records */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <h3 className="font-bold text-slate-800 text-sm mb-4">Personal Records</h3>
                  <div className="flex flex-col gap-3">
                    {[
                      { emoji: "🏋️", exercise: "Bench Press", value: "85 kg",  change: "+5 kg",  date: "This week"  },
                      { emoji: "🏃",  exercise: "5K Run",      value: "24:32",  change: "−1:18",  date: "Yesterday"  },
                      { emoji: "💀",  exercise: "Deadlift",    value: "120 kg", change: "+10 kg", date: "Last week"  },
                    ].map((pr) => (
                      <div key={pr.exercise} className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#f8f7f4] flex items-center justify-center text-lg flex-shrink-0">{pr.emoji}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-700">{pr.exercise}</p>
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

                {/* Hosted events */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-slate-800 text-sm">Hosted Events</h3>
                    <a href="/events" className="text-xs text-violet-600 font-medium">Host new</a>
                  </div>
                  {hostedEvents.length === 0 ? (
                    <p className="text-xs text-slate-400">You haven't hosted any events yet.</p>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {hostedEvents.map((e) => (
                        <div key={e.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: `${e.color}18` }}>
                            {e.emoji}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-700 truncate">{e.name}</p>
                            <p className="text-xs text-slate-400">{e.date} · {e.attendees} attendees</p>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            e.status === "Upcoming" ? "bg-violet-100 text-violet-700" : "bg-slate-100 text-slate-500"
                          }`}>
                            {e.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* ── GOALS ── */}
            {activeTab === "goals" && (
              <div className="flex flex-col gap-5">

                {/* Current goals */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-800 text-sm">My Goals</h3>
                    <button
                      onClick={() => { setDraftGoals([...goals]); setEditingGoals(true); }}
                      className="text-xs text-violet-600 font-medium border border-violet-200 bg-violet-50 px-3 py-1 rounded-xl"
                    >
                      Edit Goals
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    {goals.map((id) => {
                      const g = allGoals.find((x) => x.id === id);
                      if (!g) return null;
                      return (
                        <div key={id} className="flex items-center gap-3 px-4 py-3 rounded-2xl text-white bg-violet-600">
                          <span className="text-xl">{g.emoji}</span>
                          <div>
                            <p className="font-bold text-sm">{g.label}</p>
                            <p className="text-xs opacity-75">{g.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Experience level */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <h3 className="font-bold text-slate-800 text-sm mb-4">Experience Level</h3>
                  <div className="flex flex-col gap-2">
                    {Object.entries(levelLabels).map(([id, { emoji, label }]) => (
                      <button
                        key={id}
                        onClick={() => {
                          setLevel(id);
                          const s = JSON.parse(localStorage.getItem("stride_schedule") ?? "{}");
                          localStorage.setItem("stride_schedule", JSON.stringify({ ...s, level: id }));
                        }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 text-left transition-all ${
                          level === id ? "border-transparent text-white bg-violet-600" : "border-slate-200"
                        }`}
                      >
                        <span className="text-xl">{emoji}</span>
                        <span className={`font-semibold text-sm ${level === id ? "text-white" : "text-slate-700"}`}>{label}</span>
                        {level === id && (
                          <span className="ml-auto text-xs font-bold opacity-80">Current</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* ── SETTINGS ── */}
            {activeTab === "settings" && (
              <div className="flex flex-col gap-5">

                {/* Notifications */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <h3 className="font-bold text-slate-800 text-sm mb-4">Notifications</h3>
                  <div className="flex flex-col divide-y divide-slate-100">
                    {([
                      { key: "notifications",    label: "Push notifications",    desc: "Workout reminders and updates"        },
                      { key: "friendActivity",   label: "Friend activity",        desc: "When friends complete workouts"       },
                      { key: "challengeUpdates", label: "Challenge updates",      desc: "Leaderboard changes and completions"  },
                      { key: "eventReminders",   label: "Event reminders",        desc: "Alerts before events you've joined"   },
                      { key: "weeklyDigest",     label: "Weekly digest",          desc: "Your weekly summary every Monday"     },
                    ] as { key: keyof typeof settings; label: string; desc: string }[]).map(({ key, label, desc }) => (
                      <div key={key} className="flex items-center justify-between py-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-700">{label}</p>
                          <p className="text-xs text-slate-400">{desc}</p>
                        </div>
                        <button
                          onClick={() => toggleSetting(key)}
                          className={`w-11 h-6 rounded-full transition-all flex-shrink-0 relative ${settings[key] ? "bg-violet-600" : "bg-slate-200"}`}
                        >
                          <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${settings[key] ? "left-5" : "left-0.5"}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Privacy */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <h3 className="font-bold text-slate-800 text-sm mb-4">Privacy</h3>
                  <div className="flex flex-col divide-y divide-slate-100">
                    {([
                      { key: "publicProfile",  label: "Public profile",    desc: "Anyone can find and view your profile"  },
                      { key: "showWorkouts",   label: "Show workouts",     desc: "Friends can see your workout history"   },
                      { key: "showChallenges", label: "Show challenges",   desc: "Friends can see challenges you've joined"},
                    ] as { key: keyof typeof settings; label: string; desc: string }[]).map(({ key, label, desc }) => (
                      <div key={key} className="flex items-center justify-between py-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-700">{label}</p>
                          <p className="text-xs text-slate-400">{desc}</p>
                        </div>
                        <button
                          onClick={() => toggleSetting(key)}
                          className={`w-11 h-6 rounded-full transition-all flex-shrink-0 relative ${settings[key] ? "bg-violet-600" : "bg-slate-200"}`}
                        >
                          <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${settings[key] ? "left-5" : "left-0.5"}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preferences */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <h3 className="font-bold text-slate-800 text-sm mb-4">Preferences</h3>

                  <div className="mb-4">
                    <p className="text-sm font-semibold text-slate-700 mb-2">Units</p>
                    <div className="flex gap-2">
                      {(["metric", "imperial"] as const).map((u) => (
                        <button
                          key={u}
                          onClick={() => setSettings((s) => ({ ...s, units: u }))}
                          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all capitalize ${
                            settings.units === u ? "border-transparent text-white bg-violet-600" : "border-slate-200 text-slate-600"
                          }`}
                        >
                          {u === "metric" ? "Metric (kg, km)" : "Imperial (lb, mi)"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-700 mb-2">Theme</p>
                    <div className="flex gap-2">
                      {(["light", "dark", "system"] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() => setSettings((s) => ({ ...s, theme: t }))}
                          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all capitalize ${
                            settings.theme === t ? "border-transparent text-white bg-violet-600" : "border-slate-200 text-slate-600"
                          }`}
                        >
                          {t === "light" ? "Light" : t === "dark" ? "Dark" : "System"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Account */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <h3 className="font-bold text-slate-800 text-sm mb-4">Account</h3>
                  <div className="flex flex-col gap-2">
                    {[
                      "Change email",
                      "Change password",
                      "Connected apps",
                      "Download my data",
                    ].map((label) => (
                      <button key={label} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors text-left w-full">
                        <span className="text-sm font-medium text-slate-700 flex-1">{label}</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-300">
                          <polyline points="9 18 15 12 9 6"/>
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Danger zone */}
                <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
                  <h3 className="font-bold text-red-500 text-sm mb-3">Danger Zone</h3>
                  <div className="flex flex-col gap-2">
                    <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors text-left w-full">
                      <span className="text-sm font-medium text-red-500 flex-1">Log out</span>
                    </button>
                    <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors text-left w-full">
                      <span className="text-sm font-medium text-red-400 flex-1">Delete account</span>
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>
        </main>

        {/* Right panel */}
        <aside className="hidden lg:flex flex-col w-[300px] flex-shrink-0 px-6 py-10 gap-7 border-l border-slate-100 sticky top-0 h-screen overflow-y-auto bg-white">

          {/* Quick stats */}
          <div>
            <h3 className="font-bold text-slate-800 text-sm mb-3">All-time Stats</h3>
            <div className="flex flex-col gap-2">
              {[
                { label: "Total workouts",   value: "142" },
                { label: "Total active time",value: "197h" },
                { label: "Challenges won",   value: "7"   },
                { label: "Events attended",  value: "4"   },
                { label: "Longest streak",   value: "21 days" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-50">
                  <span className="text-xs text-slate-500">{s.label}</span>
                  <span className="text-sm font-black text-slate-800">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Active goals preview */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-800 text-sm">Active Goals</h3>
              <button onClick={() => setActiveTab("goals")} className="text-xs text-violet-600 font-medium">Edit</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {goals.slice(0, 4).map((id) => {
                const g = allGoals.find((x) => x.id === id);
                if (!g) return null;
                return (
                  <span key={id} className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-100">
                    {g.emoji} {g.label}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Member since */}
          <div className="rounded-2xl p-4 text-white" style={gradientBg}>
            <p className="text-xs opacity-75 mb-0.5">Member since</p>
            <p className="font-black text-lg">March 2026</p>
            <p className="text-xs opacity-75 mt-2">142 workouts logged 💪</p>
          </div>

        </aside>
      </div>

      {/* ── Edit Profile Modal ── */}
      {editingProfile && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-black text-slate-800">Edit Profile</h2>
              <button onClick={() => setEditingProfile(false)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Name</label>
                <input type="text" value={draftName} onChange={(e) => setDraftName(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-200" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Bio</label>
                <textarea value={draftBio} onChange={(e) => setDraftBio(e.target.value)} rows={2} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-200 resize-none" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Location</label>
                <input type="text" value={draftLocation} onChange={(e) => setDraftLocation(e.target.value)} placeholder="City, State" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-200" />
              </div>
            </div>
            <button onClick={saveProfile} className="w-full mt-5 font-bold text-base py-3.5 rounded-2xl text-white bg-violet-600 hover:bg-violet-700 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* ── Avatar Picker Modal ── */}
      {showAvatarPicker && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-black text-slate-800">Change Photo</h2>
              <button onClick={() => setShowAvatarPicker(false)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Upload photo */}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            <button
              onClick={() => fileRef.current?.click()}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 border-dashed border-violet-200 hover:border-violet-400 hover:bg-violet-50 transition-all mb-4"
            >
              <span className="text-xl">📸</span>
              <span className="text-sm font-semibold text-violet-600">Upload a photo</span>
            </button>

            {/* Avatar color */}
            <p className="text-xs font-semibold text-slate-600 mb-2">Or pick a color</p>
            <div className="flex gap-2 mb-4">
              {avatarColors.map((c) => (
                <button
                  key={c}
                  onClick={() => { setAvatarColor(c); setAvatarImg(null); setAvatarEmoji(""); }}
                  className={`w-9 h-9 rounded-full ${c} transition-transform ${avatarColor === c && !avatarImg ? "ring-2 ring-violet-500 ring-offset-2 scale-110" : ""}`}
                />
              ))}
            </div>

            {/* Emoji avatar */}
            <p className="text-xs font-semibold text-slate-600 mb-2">Or pick an emoji</p>
            <div className="flex flex-wrap gap-2">
              {["😎", "💪", "🏃", "🧘", "🏋️", "⚡", "🔥", "🌟"].map((e) => (
                <button
                  key={e}
                  onClick={() => { setAvatarEmoji(e); setAvatarImg(null); }}
                  className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all ${avatarEmoji === e && !avatarImg ? "bg-violet-100 ring-2 ring-violet-400" : "bg-slate-100 hover:bg-slate-200"}`}
                >
                  {e}
                </button>
              ))}
            </div>

            <button onClick={() => setShowAvatarPicker(false)} className="w-full mt-5 font-bold text-base py-3 rounded-2xl text-white bg-violet-600 hover:bg-violet-700 transition-colors">
              Done
            </button>
          </div>
        </div>
      )}

      {/* ── Edit Goals Modal ── */}
      {editingGoals && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-black text-slate-800">Edit Goals</h2>
              <button onClick={() => setEditingGoals(false)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-2 mb-5">
              {allGoals.map((g) => {
                const on = draftGoals.includes(g.id);
                return (
                  <button
                    key={g.id}
                    onClick={() => setDraftGoals((s) => on ? s.filter((x) => x !== g.id) : [...s, g.id])}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 text-left transition-all ${on ? "border-transparent bg-violet-600" : "border-slate-200"}`}
                  >
                    <span className="text-xl w-7 flex-shrink-0">{g.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold text-sm ${on ? "text-white" : "text-slate-800"}`}>{g.label}</p>
                      <p className={`text-xs ${on ? "text-white/75" : "text-slate-400"}`}>{g.desc}</p>
                    </div>
                    {on && (
                      <div className="w-5 h-5 rounded-full bg-white/30 flex items-center justify-center flex-shrink-0">
                        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            <button
              disabled={draftGoals.length === 0}
              onClick={saveGoals}
              className={`w-full font-bold text-base py-3.5 rounded-2xl text-white bg-violet-600 hover:bg-violet-700 transition-all ${draftGoals.length === 0 ? "opacity-40" : ""}`}
            >
              Save · {draftGoals.length} selected
            </button>
          </div>
        </div>
      )}

      {/* ── Edit Activities Modal ── */}
      {editingActivities && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-black text-slate-800">Edit Activities</h2>
              <button onClick={() => setEditingActivities(false)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2.5 mb-5">
              {allActivities.map((a) => {
                const on = draftActivities.includes(a.id);
                return (
                  <button
                    key={a.id}
                    onClick={() => setDraftActivities((s) => on ? s.filter((x) => x !== a.id) : [...s, a.id])}
                    className={`flex flex-col items-center gap-2 py-4 px-2 rounded-2xl border-2 transition-all ${on ? "border-transparent bg-violet-600" : "border-slate-200"}`}
                  >
                    <span className="text-2xl">{a.emoji}</span>
                    <span className={`text-xs font-medium text-center leading-tight ${on ? "text-white" : "text-slate-600"}`}>{a.label}</span>
                  </button>
                );
              })}
            </div>
            <button
              disabled={draftActivities.length === 0}
              onClick={saveActivities}
              className={`w-full font-bold text-base py-3.5 rounded-2xl text-white bg-violet-600 hover:bg-violet-700 transition-all ${draftActivities.length === 0 ? "opacity-40" : ""}`}
            >
              Save · {draftActivities.length} selected
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
