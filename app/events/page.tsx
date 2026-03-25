"use client";
import { useState } from "react";
import AppSidebar from "@/app/components/AppSidebar";

// ── Data ─────────────────────────────────────────────────────────────────────

const upcomingEvents = [
  {
    id: 1,
    emoji: "🏃",
    color: "#f97316",
    name: "Brooklyn 10K Run",
    type: "Race",
    date: "Sat, Apr 5",
    time: "7:00 AM",
    location: "Prospect Park, Brooklyn, NY",
    distance: "2.1 mi away",
    attendees: 312,
    capacity: 500,
    price: "Free",
    tags: ["Running", "All levels"],
    going: false,
    featured: true,
  },
  {
    id: 2,
    emoji: "💪",
    color: "#7c3aed",
    name: "Open Gym Throwdown",
    type: "Competition",
    date: "Sun, Apr 6",
    time: "9:00 AM",
    location: "Iron Republic Gym, Manhattan",
    distance: "3.4 mi away",
    attendees: 88,
    capacity: 100,
    price: "$15",
    tags: ["Strength", "CrossFit"],
    going: false,
    featured: true,
  },
  {
    id: 3,
    emoji: "🧘",
    color: "#8b5cf6",
    name: "Sunrise Yoga in the Park",
    type: "Class",
    date: "Sat, Apr 5",
    time: "6:30 AM",
    location: "Central Park Great Lawn, NY",
    distance: "1.8 mi away",
    attendees: 45,
    capacity: 60,
    price: "Free",
    tags: ["Yoga", "Outdoor", "Beginner-friendly"],
    going: false,
    featured: false,
  },
  {
    id: 4,
    emoji: "🚴",
    color: "#7c3aed",
    name: "Group Ride — Hudson Valley",
    type: "Group ride",
    date: "Sun, Apr 13",
    time: "8:00 AM",
    location: "Riverside Park, NY",
    distance: "0.9 mi away",
    attendees: 27,
    capacity: 40,
    price: "Free",
    tags: ["Cycling", "Intermediate"],
    going: false,
    featured: false,
  },
  {
    id: 5,
    emoji: "🥊",
    color: "#ef4444",
    name: "Boxing for Beginners",
    type: "Workshop",
    date: "Wed, Apr 9",
    time: "6:30 PM",
    location: "Gleason's Gym, Brooklyn",
    distance: "4.2 mi away",
    attendees: 18,
    capacity: 20,
    price: "$10",
    tags: ["Boxing", "Beginner-friendly"],
    going: false,
    featured: false,
  },
  {
    id: 6,
    emoji: "🏊",
    color: "#0ea5e9",
    name: "Open Water Swim Clinic",
    type: "Clinic",
    date: "Sat, Apr 19",
    time: "7:30 AM",
    location: "Orchard Beach, Bronx",
    distance: "8.1 mi away",
    attendees: 34,
    capacity: 50,
    price: "$20",
    tags: ["Swimming", "Open water"],
    going: false,
    featured: false,
  },
  {
    id: 7,
    emoji: "🏔️",
    color: "#10b981",
    name: "Catskills Trail Hike",
    type: "Group hike",
    date: "Sat, Apr 26",
    time: "6:00 AM",
    location: "Catskill Mountains, NY",
    distance: "12.4 mi away",
    attendees: 61,
    capacity: 75,
    price: "Free",
    tags: ["Hiking", "Intermediate"],
    going: false,
    featured: false,
  },
  {
    id: 8,
    emoji: "⚡",
    color: "#f97316",
    name: "HIIT in the Heights",
    type: "Class",
    date: "Thu, Apr 10",
    time: "7:00 PM",
    location: "Fort Tryon Park, Manhattan",
    distance: "5.3 mi away",
    attendees: 29,
    capacity: 35,
    price: "Free",
    tags: ["HIIT", "Outdoor", "All levels"],
    going: false,
    featured: false,
  },
];

const eventTypes = ["All", "Race", "Class", "Competition", "Group ride", "Workshop", "Clinic", "Group hike"];

// ── Gradient helpers ──────────────────────────────────────────────────────────

const gradientBg:  React.CSSProperties = { background: "linear-gradient(135deg, #7c3aed, #f97316)" };

// ── Component ─────────────────────────────────────────────────────────────────

export default function EventsPage() {
  const [activeType, setActiveType]       = useState("All");
  const [going, setGoing]                 = useState<Set<number>>(new Set());
  const [search, setSearch]               = useState("");
  const [showHost, setShowHost]           = useState(false);
  const [showContact, setShowContact]     = useState(false);

  // host form
  const [hostName, setHostName]           = useState("");
  const [hostType, setHostType]           = useState("");
  const [hostDate, setHostDate]           = useState("");
  const [hostLocation, setHostLocation]   = useState("");
  const [hostDesc, setHostDesc]           = useState("");

  // contact form
  const [contactName, setContactName]     = useState("");
  const [contactEmail, setContactEmail]   = useState("");
  const [contactEvent, setContactEvent]   = useState("");
  const [contactMsg, setContactMsg]       = useState("");
  const [submitted, setSubmitted]         = useState(false);

  const toggleGoing = (id: number) =>
    setGoing((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const filtered = upcomingEvents
    .filter((e) => activeType === "All" || e.type === activeType)
    .filter((e) =>
      search === "" ||
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase()) ||
      e.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    );

  const featured = filtered.filter((e) => e.featured);
  const regular  = filtered.filter((e) => !e.featured);

  const spotsLeft = (e: typeof upcomingEvents[0]) => e.capacity - e.attendees - (going.has(e.id) ? 1 : 0);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AppSidebar />

      <div className="flex-1 md:ml-[260px] flex min-h-screen">
        <main className="flex-1 pb-24 md:pb-10 min-w-0">
          <div className="max-w-2xl mx-auto px-4 md:px-8">

            {/* Header */}
            <div className="flex items-center justify-between pt-10 pb-6">
              <div>
                <h1 className="text-2xl font-black text-slate-800">Events</h1>
                <p className="text-slate-400 text-sm mt-0.5">Find events near you or host your own</p>
              </div>
              <button
                onClick={() => setShowHost(true)}
                className="flex items-center gap-2 text-white text-sm font-bold px-4 py-2.5 rounded-2xl shadow-md"
                style={gradientBg}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Host Event
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search events, locations, or types..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-200"
              />
            </div>

            {/* Type filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-6" style={{ scrollbarWidth: "none" }}>
              {eventTypes.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveType(t)}
                  className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeType === t ? "text-white shadow-md" : "bg-white text-slate-500 border border-slate-200 hover:border-violet-200"
                  }`}
                  style={activeType === t ? gradientBg : {}}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Featured events */}
            {featured.length > 0 && !search && (
              <div className="mb-7">
                <h2 className="font-bold text-slate-800 mb-3">Featured Near You</h2>
                <div className="flex flex-col gap-3">
                  {featured.map((e) => (
                    <div key={e.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                      {/* Color banner */}
                      <div className="h-24 flex items-end p-4" style={{ background: `linear-gradient(135deg, ${e.color}cc, ${e.color}55)` }}>
                        <div className="flex items-center gap-3">
                          <span className="text-4xl">{e.emoji}</span>
                          <div>
                            <span className="text-xs font-bold text-white/80 uppercase tracking-wide">{e.type}</span>
                            <p className="text-lg font-black text-white leading-tight">{e.name}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-3">
                          <span className="flex items-center gap-1">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                            </svg>
                            {e.date} · {e.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                            </svg>
                            {e.location}
                          </span>
                          <span className="text-violet-500 font-semibold">{e.distance}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-1.5">
                              {["bg-pink-400","bg-sky-400","bg-orange-400"].map((c, i) => (
                                <div key={i} className={`w-5 h-5 rounded-full border-2 border-white ${c}`} />
                              ))}
                            </div>
                            <span className="text-xs text-slate-400">{e.attendees + (going.has(e.id) ? 1 : 0)} going</span>
                            <span className="text-xs font-semibold" style={{ color: spotsLeft(e) < 20 ? "#ef4444" : "#10b981" }}>
                              {spotsLeft(e)} spots left
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-bold ${e.price === "Free" ? "text-emerald-600" : "text-slate-600"}`}>{e.price}</span>
                            <button
                              onClick={() => toggleGoing(e.id)}
                              className={`text-xs font-bold px-4 py-2 rounded-xl transition-all ${going.has(e.id) ? "bg-slate-100 text-slate-500" : "text-white"}`}
                              style={going.has(e.id) ? {} : gradientBg}
                            >
                              {going.has(e.id) ? "Going ✓" : "Sign Up"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All / remaining events */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-slate-800">{search ? "Search Results" : "All Events"}</h2>
                <span className="text-xs text-slate-400">{filtered.length} events</span>
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-16 text-slate-400">
                  <p className="text-4xl mb-3">📭</p>
                  <p className="font-semibold text-slate-600">No events found</p>
                  <p className="text-sm mt-1">Try a different search or filter</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {(search ? filtered : regular).map((e) => (
                    <div key={e.id} className="bg-white rounded-2xl p-4 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                          style={{ background: `${e.color}18` }}
                        >
                          {e.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                            <p className="font-bold text-slate-800 text-sm">{e.name}</p>
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">{e.type}</span>
                          </div>
                          <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-slate-400 mb-2">
                            <span>📅 {e.date} · {e.time}</span>
                            <span>📍 {e.distance}</span>
                          </div>
                          <p className="text-xs text-slate-400 truncate mb-2">{e.location}</p>
                          <div className="flex items-center gap-2 flex-wrap">
                            {e.tags.map((t) => (
                              <span key={t} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">{t}</span>
                            ))}
                            <span className={`text-[10px] font-semibold ${e.price === "Free" ? "text-emerald-600" : "text-slate-500"}`}>{e.price}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <button
                            onClick={() => toggleGoing(e.id)}
                            className={`text-xs font-bold px-3 py-2 rounded-xl transition-all ${going.has(e.id) ? "bg-slate-100 text-slate-500" : "text-white"}`}
                            style={going.has(e.id) ? {} : gradientBg}
                          >
                            {going.has(e.id) ? "Going ✓" : "Sign Up"}
                          </button>
                          <span
                            className="text-[10px] font-semibold"
                            style={{ color: spotsLeft(e) < 10 ? "#ef4444" : "#94a3b8" }}
                          >
                            {spotsLeft(e)} spots
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Host / List your event CTA */}
            <div className="mt-8 rounded-2xl p-5 text-white" style={gradientBg}>
              <p className="font-black text-base mb-1">Want your event on Stride?</p>
              <p className="text-sm opacity-80 mb-4">
                Hosting a race, class, or group session? Reach thousands of athletes in your area by listing it on Stride.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowHost(true)}
                  className="flex-1 bg-white/20 hover:bg-white/30 transition-colors text-white text-sm font-bold py-2.5 rounded-xl"
                >
                  Host an event
                </button>
                <button
                  onClick={() => setShowContact(true)}
                  className="flex-1 bg-white text-sm font-bold py-2.5 rounded-xl"
                  style={{ color: "#7c3aed" }}
                >
                  Contact Stride
                </button>
              </div>
            </div>

          </div>
        </main>

        {/* Right panel */}
        <aside className="hidden lg:flex flex-col w-[300px] flex-shrink-0 px-6 py-10 gap-7 border-l border-slate-100 sticky top-0 h-screen overflow-y-auto bg-white">

          {/* My events */}
          <div>
            <h3 className="font-bold text-slate-800 text-sm mb-3">
              My Events
              {going.size > 0 && (
                <span className="ml-2 text-xs font-bold text-white px-2 py-0.5 rounded-full" style={gradientBg}>
                  {going.size}
                </span>
              )}
            </h3>
            {going.size === 0 ? (
              <p className="text-xs text-slate-400">You haven't signed up for any events yet.</p>
            ) : (
              <div className="flex flex-col gap-2.5">
                {upcomingEvents.filter((e) => going.has(e.id)).map((e) => (
                  <div key={e.id} className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: `${e.color}18` }}>
                      {e.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-700 truncate">{e.name}</p>
                      <p className="text-xs text-slate-400">{e.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* This weekend */}
          <div>
            <h3 className="font-bold text-slate-800 text-sm mb-3">This Weekend</h3>
            <div className="flex flex-col gap-2.5">
              {upcomingEvents
                .filter((e) => e.date.startsWith("Sat") || e.date.startsWith("Sun"))
                .slice(0, 4)
                .map((e) => (
                  <div key={e.id} className="flex items-center gap-2.5">
                    <div className="text-center flex-shrink-0 w-9">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">{e.date.split(",")[0]}</p>
                      <p className="text-sm font-black text-slate-700">{e.date.split(" ")[2]}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-700 truncate">{e.name}</p>
                      <p className="text-xs text-slate-400">{e.distance}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Friends going */}
          <div>
            <h3 className="font-bold text-slate-800 text-sm mb-3">Friends Going</h3>
            <div className="flex flex-col gap-2.5">
              {[
                { name: "Jordan K.", avatar: "bg-pink-400",   event: "Brooklyn 10K Run" },
                { name: "Alex M.",   avatar: "bg-sky-400",    event: "Group Ride — Hudson Valley" },
                { name: "Sam R.",    avatar: "bg-orange-400", event: "Open Gym Throwdown" },
              ].map((f) => (
                <div key={f.name} className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-full ${f.avatar} flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}>
                    {f.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-700 truncate">{f.name}</p>
                    <p className="text-xs text-slate-400 truncate">{f.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Host CTA */}
          <div
            className="rounded-2xl p-4 text-white cursor-pointer hover:opacity-90 transition-opacity"
            style={gradientBg}
            onClick={() => setShowHost(true)}
          >
            <p className="text-lg mb-1">📣</p>
            <p className="font-bold text-sm mb-0.5">Host an event</p>
            <p className="text-xs opacity-75">Reach athletes in your area</p>
          </div>

        </aside>
      </div>

      {/* ── Host Event Modal ── */}
      {showHost && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-black text-slate-800">Host an Event</h2>
                <p className="text-xs text-slate-400 mt-0.5">Fill in the details — we'll review and publish it</p>
              </div>
              <button
                onClick={() => setShowHost(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors flex-shrink-0"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Event Name</label>
                <input
                  type="text"
                  value={hostName}
                  onChange={(e) => setHostName(e.target.value)}
                  placeholder="e.g. Saturday Morning 5K"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-200"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Event Type</label>
                <div className="flex flex-wrap gap-2">
                  {["Race", "Class", "Workshop", "Group ride", "Group hike", "Competition", "Clinic", "Other"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setHostType(t)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border-2 transition-all ${
                        hostType === t ? "border-transparent text-white" : "border-slate-200 text-slate-600"
                      }`}
                      style={hostType === t ? gradientBg : {}}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Date</label>
                  <input
                    type="date"
                    value={hostDate}
                    onChange={(e) => setHostDate(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-200"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Location</label>
                  <input
                    type="text"
                    value={hostLocation}
                    onChange={(e) => setHostLocation(e.target.value)}
                    placeholder="City or venue"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-200"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Description</label>
                <textarea
                  value={hostDesc}
                  onChange={(e) => setHostDesc(e.target.value)}
                  placeholder="Tell people what to expect..."
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-200 resize-none"
                />
              </div>

              <div className="bg-violet-50 border border-violet-100 rounded-2xl px-4 py-3 text-xs text-violet-700">
                Once submitted, our team will review your event within 48 hours and reach out to confirm details before it goes live.
              </div>
            </div>

            <button
              disabled={!hostName.trim() || !hostType || !hostDate || !hostLocation}
              onClick={() => setShowHost(false)}
              className={`w-full mt-5 font-bold text-base py-3.5 rounded-2xl text-white transition-opacity ${
                !hostName.trim() || !hostType || !hostDate || !hostLocation ? "opacity-40" : ""
              }`}
              style={gradientBg}
            >
              Submit for Review
            </button>
          </div>
        </div>
      )}

      {/* ── Contact Stride Modal ── */}
      {showContact && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl">
            {submitted ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl" style={gradientBg}>
                  ✅
                </div>
                <h2 className="text-lg font-black text-slate-800 mb-2">Message Sent!</h2>
                <p className="text-sm text-slate-400 mb-5">Our team will get back to you within 1–2 business days.</p>
                <button
                  onClick={() => { setShowContact(false); setSubmitted(false); }}
                  className="text-sm font-bold text-white px-6 py-3 rounded-2xl"
                  style={gradientBg}
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-lg font-black text-slate-800">Contact Stride</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Tell us about your event and we'll be in touch</p>
                  </div>
                  <button
                    onClick={() => setShowContact(false)}
                    className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors flex-shrink-0"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Your Name</label>
                      <input
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Full name"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-200"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Email</label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="you@email.com"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Event Name</label>
                    <input
                      type="text"
                      value={contactEvent}
                      onChange={(e) => setContactEvent(e.target.value)}
                      placeholder="What's the event called?"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-200"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Tell us more</label>
                    <textarea
                      value={contactMsg}
                      onChange={(e) => setContactMsg(e.target.value)}
                      placeholder="Date, location, expected attendance, any other details..."
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-200 resize-none"
                    />
                  </div>
                </div>

                <button
                  disabled={!contactName.trim() || !contactEmail.trim() || !contactEvent.trim() || !contactMsg.trim()}
                  onClick={() => setSubmitted(true)}
                  className={`w-full mt-5 font-bold text-base py-3.5 rounded-2xl text-white transition-opacity ${
                    !contactName.trim() || !contactEmail.trim() || !contactEvent.trim() || !contactMsg.trim() ? "opacity-40" : ""
                  }`}
                  style={gradientBg}
                >
                  Send Message
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
