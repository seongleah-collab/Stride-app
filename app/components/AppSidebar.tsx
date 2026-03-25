"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "Home",
    href: "/home",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    label: "Workouts",
    href: "/workouts",
    icon: (
      <svg viewBox="0 0 48 48" fill="currentColor" className="w-5 h-5">
        <path d="M 11 3 L 34 3 L 22 24 L 37 24 L 24 46 L 11 32 L 21 29 Z"/>
      </svg>
    ),
  },
  {
    label: "Challenges",
    href: "/challenges",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M6 9H4a2 2 0 000 4h2M18 9h2a2 2 0 010 4h-2"/>
        <path d="M6 9V5a2 2 0 012-2h8a2 2 0 012 2v4M6 9c0 5 3 7 6 7s6-2 6-7"/>
        <path d="M12 16v4M8 20h8"/>
      </svg>
    ),
  },
  {
    label: "Social",
    href: "/social",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
  {
    label: "Events",
    href: "/events",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    label: "Profile",
    href: "/profile",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
];

const gradientBg: React.CSSProperties = { background: "linear-gradient(135deg, #7c3aed, #f97316)" };
const gradientText: React.CSSProperties = { background: "linear-gradient(90deg, #7c3aed, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" };

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col fixed top-0 left-0 h-screen w-[260px] bg-white border-r border-slate-100 px-5 py-7 z-20">
        <Link href="/home" className="flex items-center gap-2.5 mb-10 px-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={gradientBg}>
            <svg viewBox="0 0 48 48" fill="none" className="w-5 h-5">
              <path d="M 11 3 L 34 3 L 22 24 L 37 24 L 24 46 L 11 32 L 21 29 Z" fill="white" stroke="white" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="font-black text-xl" style={gradientText}>Stride</span>
        </Link>

        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                  active ? "text-white shadow-md" : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                }`}
                style={active ? gradientBg : {}}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
          <div className="w-10 h-10 rounded-full bg-violet-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">Y</div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">Your Name</p>
            <p className="text-xs text-slate-400">View profile</p>
          </div>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-2 py-2 z-20">
        <div className="flex items-center justify-around max-w-sm mx-auto">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors ${
                  active ? "text-violet-600" : "text-slate-400"
                }`}
              >
                {item.icon}
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
