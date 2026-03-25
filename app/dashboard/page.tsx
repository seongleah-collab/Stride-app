import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center max-w-sm mx-auto w-full">
      <div
        className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-xl mb-6 text-5xl"
        style={{ background: "linear-gradient(135deg, #7c3aed, #f97316)" }}
      >
        🎉
      </div>
      <h1 className="text-3xl font-black text-slate-800 mb-3">You're all set!</h1>
      <p className="text-slate-400 text-base leading-relaxed mb-10">
        Your personalized Stride plan is being built.<br />The full dashboard is coming soon.
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="px-6 py-3 rounded-2xl border-2 border-slate-200 text-slate-600 font-medium text-sm hover:bg-slate-50 transition-colors"
        >
          Back to home
        </Link>
        <Link
          href="/home"
          className="px-6 py-3 rounded-2xl text-white font-medium text-sm"
          style={{ background: "linear-gradient(90deg, #7c3aed, #f97316)" }}
        >
          Explore Stride
        </Link>
      </div>
    </main>
  );
}
