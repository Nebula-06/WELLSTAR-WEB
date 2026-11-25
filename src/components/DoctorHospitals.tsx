import { Baby, Building2 } from "lucide-react";
import type { Doctor } from "@/data/site";

/** Where a doctor practises outside Wellstar: main hospital plus visiting-consultant hospitals. */
export function DoctorHospitals({ hospitals, className = "" }: { hospitals: NonNullable<Doctor["hospitals"]>; className?: string }) {
  return (
    <div className={`rounded-2xl border border-border bg-secondary/40 p-4 ${className}`}>
      <p className="flex items-start gap-2.5 text-sm leading-6 text-foreground">
        <Building2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
        <span>
          <span className="block text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">Primarily practises at</span>
          <span className="font-bold">{hospitals.primary}</span>
        </span>
      </p>
      <div className="mt-3 flex items-start gap-2.5">
        <Baby aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-red" />
        <div>
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Visiting consultant for deliveries
          </p>
          <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Visiting consultant hospitals">
            {hospitals.visiting.map((name) => (
              <li
                key={name}
                className="rounded-full border border-border bg-card px-2.5 py-1 text-xs font-semibold text-foreground"
              >
                {name}
              </li>
            ))}
            <li className="rounded-full px-1 py-1 text-xs font-medium text-muted-foreground">& more</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
