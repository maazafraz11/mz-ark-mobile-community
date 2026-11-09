export const Badge = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <span
    className={
      "inline-flex items-center rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] " +
      (className ?? "")
    }
  >
    {children}
  </span>
);
