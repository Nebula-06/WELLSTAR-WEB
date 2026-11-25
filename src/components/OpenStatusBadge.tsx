import { Clock3 } from "lucide-react";
import { useOpenStatus } from "@/hooks/useOpenStatus";

export function OpenStatusBadge({ className = "" }: { className?: string }) {
  const status = useOpenStatus();

  // Before the live status is known (pre-rendered HTML), show the hours neutrally.
  if (!status) {
    return (
      <span
        className={`inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-2 text-sm font-semibold text-muted-foreground ${className}`}
      >
        <Clock3 aria-hidden="true" className="size-4 text-primary" /> Mon–Sat 8 AM–10 PM · Sun 8 AM–1 PM
      </span>
    );
  }

  const { open, label } = status;
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-bold ${
        open
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
          : "border-brand-red/30 bg-brand-red/10 text-brand-red"
      } ${className}`}
    >
      <span className="relative flex size-2.5" aria-hidden="true">
        {open && <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-70" />}
        <span className={`relative size-2.5 rounded-full ${open ? "bg-emerald-500" : "bg-brand-red"}`} />
      </span>
      {label}
    </span>
  );
}
