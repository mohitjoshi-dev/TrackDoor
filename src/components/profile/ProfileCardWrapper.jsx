export default function ProfileCardWrapper({
  children,
  className = "",
  topGlow = "bg-primary/10",
  bottomGlow = "bg-primary/8",
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-border bg-linear-to-r from-background via-card to-background p-6 shadow-sm ${className}`}
    >
      <div
        className={`absolute -right-24 -top-20 h-72 w-72 rounded-full blur-3xl ${topGlow}`}
      />

      <div
        className={`absolute -left-24 bottom-0 h-56 w-56 rounded-full blur-3xl ${bottomGlow}`}
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}