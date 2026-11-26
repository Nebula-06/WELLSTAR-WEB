import { Quote } from "lucide-react";
import type { Doctor } from "@/data/site";

/** Three short trust facts (experience, qualifications, hospitals) from the doctor's bio. */
export function DoctorHighlights({ doctor, className = "" }: { doctor: Doctor; className?: string }) {
  return (
    <dl className={`grid grid-cols-3 gap-2 ${className}`}>
      {doctor.highlights.map((item) => (
        <div key={item.label} className="rounded-2xl border border-border bg-card px-2.5 py-3 text-center">
          <dt className="sr-only">{item.label}</dt>
          <dd className="font-display text-lg font-black leading-none text-primary sm:text-xl">{item.value}</dd>
          <dd className="mt-1.5 text-[0.68rem] font-semibold leading-tight text-muted-foreground">{item.label}</dd>
        </div>
      ))}
    </dl>
  );
}

/** A real Google review that names the doctor. */
export function DoctorReview({ doctor, className = "" }: { doctor: Doctor; className?: string }) {
  if (!doctor.review) return null;
  return (
    <figure className={`relative rounded-2xl border border-border bg-secondary/50 p-4 pl-11 ${className}`}>
      <Quote aria-hidden="true" className="absolute left-4 top-4 size-4 text-brand-red" />
      <blockquote className="text-sm italic leading-6 text-foreground">“{doctor.review.quote}”</blockquote>
      <figcaption className="mt-2 text-xs font-semibold text-muted-foreground">
        {doctor.review.name} · Google review
      </figcaption>
    </figure>
  );
}
