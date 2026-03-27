import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f7f4] flex flex-col">

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7c3aed, #f97316)" }}>
            <svg viewBox="0 0 48 48" fill="none" className="w-4 h-4">
              <path d="M 11 3 L 34 3 L 22 24 L 37 24 L 24 46 L 11 32 L 21 29 Z" fill="white" stroke="white" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="font-black text-lg text-slate-900">Stride</span>
        </div>
        <Link href="/sign-in" className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
          Sign in
        </Link>
      </nav>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-16 pt-8 text-center">

        <div className="inline-flex items-center gap-2 bg-white border border-stone-200 rounded-full px-4 py-1.5 mb-10 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-xs text-slate-600 font-medium">Now in beta · Join free</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight mb-6">
          Move with<br />people who<br />
          <span style={{ background: "linear-gradient(90deg, #7c3aed, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            push you.
          </span>
        </h1>

        <p className="text-slate-500 text-lg max-w-sm mx-auto leading-relaxed mb-10">
          Track real workouts, stay accountable to friends, and actually follow through on your goals.
        </p>

        {/* Social proof */}
        <div className="flex items-center gap-3 mb-10">
          <div className="flex -space-x-2.5">
            {["bg-rose-400", "bg-sky-500", "bg-violet-400", "bg-amber-400", "bg-emerald-400"].map((c, i) => (
              <div key={i} className={`w-9 h-9 rounded-full border-[3px] border-[#f8f7f4] ${c}`} />
            ))}
          </div>
          <p className="text-slate-500 text-sm text-left">
            <span className="text-slate-900 font-bold">2,400+ athletes</span><br />already running
          </p>
        </div>

        {/* CTA */}
        <Link href="/sign-in" className="w-full max-w-xs">
          <button className="w-full bg-slate-900 text-white font-bold text-base py-4 rounded-xl hover:bg-slate-700 active:scale-95 transition-all shadow-sm">
            Get started — it's free
          </button>
        </Link>
        <p className="mt-3 text-slate-400 text-xs">No credit card needed. Ever.</p>

        {/* Feature pills */}
        <div className="flex gap-2 mt-10 flex-wrap justify-center">
          {["Workout tracking", "Social feed", "Challenges", "Stride AI"].map((tag) => (
            <span key={tag} className="text-xs text-slate-500 border border-stone-200 rounded-full px-3 py-1.5 bg-white shadow-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
