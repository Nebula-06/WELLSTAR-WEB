import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { testimonials } from "@/data/site";

const ROTATE_MS = 5200;

function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 text-clinic-gold ${className}`} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-3.5 fill-current" />
      ))}
    </span>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

function ReviewCard({
  quote,
  name,
  accent,
  contentKey,
}: {
  quote: string;
  name: string;
  accent: "primary" | "gold";
  contentKey: string;
}) {
  const isPrimary = accent === "primary";

  return (
    <article
      className={[
        "relative flex min-h-[15.5rem] flex-col justify-between overflow-hidden rounded-sm border p-6 sm:min-h-[16.5rem] sm:p-7",
        isPrimary
          ? "border-primary/25 bg-primary text-primary-foreground shadow-[0_24px_50px_-28px_rgba(22,90,64,0.65)]"
          : "border-clinic-gold/35 bg-card text-foreground shadow-[0_22px_44px_-26px_rgba(166,124,46,0.45)] ring-1 ring-clinic-gold/20",
      ].join(" ")}
    >
      <div
        className={[
          "pointer-events-none absolute -right-8 -top-10 size-36 rounded-full blur-2xl",
          isPrimary ? "bg-white/10" : "bg-clinic-gold/15",
        ].join(" ")}
        aria-hidden="true"
      />

      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <Stars />
          <span
            className={["font-display text-5xl leading-none", isPrimary ? "text-white/20" : "text-clinic-gold/30"].join(" ")}
            aria-hidden="true"
          >
            “
          </span>
        </div>
        <p
          key={contentKey}
          className={[
            "mt-3 text-sm leading-7 animate-[review-fade_0.55s_ease] sm:text-[0.95rem] sm:leading-7",
            isPrimary ? "text-primary-foreground/95" : "text-foreground",
          ].join(" ")}
        >
          {quote}
        </p>
      </div>

      <div
        key={`meta-${contentKey}`}
        className={[
          "relative mt-6 flex items-center gap-3 border-t pt-4 animate-[review-fade_0.55s_ease]",
          isPrimary ? "border-white/15" : "border-border",
        ].join(" ")}
      >
        <span
          className={[
            "flex size-9 items-center justify-center rounded-sm text-xs font-bold uppercase tracking-wide",
            isPrimary ? "bg-white/15 text-white" : "bg-secondary text-primary",
          ].join(" ")}
        >
          {initials(name)}
        </span>
        <div>
          <p className={["text-sm font-semibold", isPrimary ? "text-white" : "text-primary"].join(" ")}>{name}</p>
          <p className={["text-xs", isPrimary ? "text-white/70" : "text-muted-foreground"].join(" ")}>Google review</p>
        </div>
      </div>
    </article>
  );
}

export function ReviewsSpotlight() {
  const total = testimonials.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || total < 2) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused, total]);

  const left = testimonials[active % total];
  const right = testimonials[(active + Math.ceil(total / 2)) % total];

  return (
    <div
      className="grid items-stretch gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative overflow-hidden rounded-sm border border-border bg-clinic-surface p-7 sm:p-8">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,color-mix(in_oklab,var(--ws-clinic-gold)_22%,transparent),transparent_45%),radial-gradient(circle_at_85%_80%,color-mix(in_oklab,var(--ws-primary)_14%,transparent),transparent_40%)]"
          aria-hidden="true"
        />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clinic-gold">Trusted nearby</p>
          <p className="mt-4 font-display text-7xl leading-none tracking-tight text-foreground sm:text-8xl">
            100<span className="text-clinic-gold">+</span>
          </p>
          <p className="mt-2 text-lg font-semibold text-foreground">Google reviews</p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
            Real feedback from patients across Bengaluru and visiting NRIs — care they come back for.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-sm border border-border/80 bg-card/90 px-3 py-2 shadow-sm">
            <Stars />
            <span className="text-sm font-semibold text-foreground">4.9</span>
            <span className="text-xs text-muted-foreground">avg rating</span>
          </div>
          <div className="mt-8 flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Show review set ${index + 1}`}
                onClick={() => setActive(index)}
                className={[
                  "h-1.5 rounded-full transition-all duration-300",
                  index === active ? "w-8 bg-primary" : "w-2.5 bg-border hover:bg-muted-foreground/40",
                ].join(" ")}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2" aria-live="polite">
        <ReviewCard quote={left.quote} name={left.name} accent="primary" contentKey={`L-${active}-${left.name}`} />
        <ReviewCard quote={right.quote} name={right.name} accent="gold" contentKey={`R-${active}-${right.name}`} />
      </div>
    </div>
  );
}
