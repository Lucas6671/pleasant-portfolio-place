interface EyebrowProps {
  children: React.ReactNode;
}

export const Eyebrow = ({ children }: EyebrowProps) => (
  <div className="inline-flex items-center gap-2 mb-7 px-3.5 py-1.5 rounded-full bg-brand/10 border border-brand-soft text-[12px] font-medium tracking-[0.06em] uppercase text-[hsl(var(--brand-blue-soft))]">
    <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse-dot" />
    {children}
  </div>
);
