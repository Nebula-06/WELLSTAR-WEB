import { Clock3 } from "lucide-react";

/**
 * Highlighted consultation-hours block shown on each doctor's profile.
 * `compact` fits narrow card columns (home page): small inline icon, time kept on one line.
 */
export function DoctorTimings({
  timings,
  compact = false,
  className = "",
}: {
  timings: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-brand-teal text-white shadow-[0_14px_30px_-16px_var(--ws-teal)] ${
        compact ? "px-3.5 py-2.5" : "flex items-center gap-3 px-4 py-3"
      } ${className}`}
    >
      <span
        className="pointer-events-none absolute -right-6 -top-8 size-24 rounded-full bg-white/15 blur-xl"
        aria-hidden="true"
      />
      {!compact && (
        <span className="relative flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25">
          <Clock3 aria-hidden="true" className="size-5" />
        </span>
      )}
      <span className="relative block">
        <span className="flex items-center gap-1.5 whitespace-nowrap text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white/80">
          {compact && <Clock3 aria-hidden="true" className="size-3.5" />}
          Consultation hours
        </span>
        <span
          className={`block whitespace-nowrap font-display font-black leading-tight ${compact ? "mt-0.5 text-base" : "text-lg sm:text-xl"}`}
        >
          {timings}
        </span>
      </span>
    </div>
  );
}
