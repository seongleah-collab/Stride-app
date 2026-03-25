import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-12 overflow-hidden bg-white">

      {/* Background glow blobs */}
      <div className="absolute top-[-80px] left-[-60px] w-72 h-72 rounded-full bg-violet-300 opacity-30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-60px] right-[-40px] w-64 h-64 rounded-full bg-orange-300 opacity-25 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-indigo-200 opacity-20 blur-3xl pointer-events-none" />

      {/* Pill badge */}
      <div className="mb-8 flex items-center gap-2 bg-violet-50 border border-violet-200 rounded-full px-4 py-1.5">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs text-violet-600 font-medium tracking-wide">Now in beta · Join free</span>
      </div>

      {/* Logo */}
      <div className="flex flex-col items-center gap-5 mb-10">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl"
          style={{ background: "linear-gradient(135deg, #7c3aed 0%, #f97316 100%)" }}
        >
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
            <path
              d="M 11 3 L 34 3 L 22 24 L 37 24 L 24 46 L 11 32 L 21 29 Z"
              fill="white"
              stroke="white"
              strokeWidth="4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Gradient wordmark */}
        <h1
          className="text-6xl md:text-7xl font-black tracking-tight"
          style={{ background: "linear-gradient(90deg, #7c3aed, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
        >
          Stride
        </h1>

        <p className="text-slate-500 text-center text-base max-w-xs leading-relaxed">
          Move together. Track your workouts,<br />challenge friends, and hit every goal.
        </p>
      </div>

      {/* Social proof */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex -space-x-2">
          {["bg-pink-400", "bg-sky-400", "bg-violet-400", "bg-orange-400"].map((color, i) => (
            <div key={i} className={`w-7 h-7 rounded-full border-2 border-white ${color}`} />
          ))}
        </div>
        <p className="text-slate-400 text-xs">
          <span className="text-slate-800 font-semibold">2,400+</span> athletes already running
        </p>
      </div>

      {/* CTA button */}
      <Link href="/sign-in" className="w-full max-w-xs md:max-w-sm">
        <button
          className="w-full text-white font-bold text-lg md:text-xl py-4 md:py-5 rounded-2xl shadow-lg active:scale-95 transition-transform"
          style={{ background: "linear-gradient(90deg, #7c3aed, #f97316)" }}
        >
          Get Started
        </button>
      </Link>

      {/* Feature pills */}
      <div className="flex gap-2 mt-6 flex-wrap justify-center">
        {["💪 Workout tracking", "👥 Social feed", "🏆 Challenges"].map((tag) => (
          <span key={tag} className="text-xs text-slate-500 bg-slate-100 border border-slate-200 rounded-full px-3 py-1">
            {tag}
          </span>
        ))}
      </div>

      <p className="mt-6 text-slate-400 text-sm">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-violet-600 font-medium hover:text-violet-500 transition-colors">
          Sign in
        </Link>
      </p>
    </main>
  );
}
