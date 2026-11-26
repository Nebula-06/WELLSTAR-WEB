import { Link } from "react-router-dom";
import { ArrowUpRight, Stethoscope } from "lucide-react";
import { doctorSlug, type Doctor } from "@/data/site";
import { bookForCondition } from "@/lib/conditions";

const dot = { teal: "bg-brand-teal", red: "bg-brand-red" } as const;

/**
 * "Conditions treated" chips for a doctor's profile. Each chip books that doctor on WhatsApp
 * for that condition. `limit` shows the first few and links to the full profile for the rest.
 */
export function DoctorConditions({ doctor, limit, className = "" }: { doctor: Doctor; limit?: number; className?: string }) {
  const shown = limit ? doctor.conditions.slice(0, limit) : doctor.conditions;
  const hidden = doctor.conditions.length - shown.length;

  return (
    <div className={className}>
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
        <Stethoscope aria-hidden="true" className="size-4 text-primary" /> Conditions treated
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {shown.map((condition) => (
          <li key={condition.label}>
            <a
              href={bookForCondition(doctor, condition)}
              target="_blank"
              rel="noreferrer"
              className="group/chip inline-flex min-h-9 items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[0.8rem] font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-[var(--ws-shadow-sm)]"
            >
              <span aria-hidden="true" className={`size-1.5 shrink-0 rounded-full ${dot[doctor.accent]}`} />
              {condition.label}
              <span className="sr-only"> — book with {doctor.name} on WhatsApp</span>
              <ArrowUpRight
                aria-hidden="true"
                className="-ml-0.5 size-3.5 opacity-0 transition-all group-hover/chip:opacity-100 group-focus-visible/chip:opacity-100"
              />
            </a>
          </li>
        ))}
        {hidden > 0 && (
          <li>
            <Link
              to={`/doctors#${doctorSlug(doctor.name)}`}
              className="inline-flex min-h-9 items-center rounded-full bg-secondary px-3 py-1.5 text-[0.8rem] font-bold text-secondary-foreground transition hover:bg-primary hover:text-primary-foreground"
            >
              +{hidden} more<span className="sr-only"> conditions treated by {doctor.name}</span>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
