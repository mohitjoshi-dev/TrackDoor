export default function ProfileCardWrapper({
  children,
  className = "",
  topGlow = "bg-violet-500/15",
  bottomGlow = "bg-sky-500/20",
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm ${className}`}
    >
      <div
        className={`absolute -right-20 -top-20 h-56 w-56 rounded-full blur-[110px] ${topGlow}`}
      />

      <div
        className={`absolute -left-16 bottom-0 h-44 w-44 rounded-full blur-[110px] ${bottomGlow}`}
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}