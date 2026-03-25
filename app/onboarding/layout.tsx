export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:min-h-screen md:bg-slate-100 md:flex md:items-center md:justify-center md:py-12">
      <div className="md:w-full md:max-w-sm md:bg-white md:rounded-3xl md:shadow-xl md:overflow-hidden">
        {children}
      </div>
    </div>
  );
}
