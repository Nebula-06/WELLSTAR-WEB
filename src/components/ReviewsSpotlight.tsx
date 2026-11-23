import { ChevronLeft, ChevronRight, Pause, Play, Quote, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { testimonials } from "@/data/site";

const ROTATE_MS = 5200;

function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 text-amber-400 ${className}`} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-4 fill-current" />
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

function ReviewCard({ quote, name, variant, contentKey }: { quote: string; name: string; variant: "navy" | "light"; contentKey: string }) {
  const navy = variant === "navy";
  return (
    <article
      className={`relative flex min-h-[17rem] flex-col justify-between overflow-hidden rounded-[1.75rem] p-7 ${
        navy ? "bg-navy-mesh text-white shadow-2xl" : "card-glass text-foreground"
      }`}
    >
      <Quote
        aria-hidden="true"
        className={`absolute -right-3 -top-3 size-28 rotate-180 ${navy ? "text-white/10" : "text-primary/10"}`}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={contentKey}
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
          transition={{ duration: 0.45 }}
          className="relative flex h-full flex-col justify-between"
        >
          <div>
            <Stars />
            <p className={`mt-4 text-[0.95rem] leading-7 ${navy ? "text-white/90" : "text-foreground"}`}>{quote}</p>
          </div>
          <div className={`mt-6 flex items-center gap-3 border-t pt-4 ${navy ? "border-white/15" : "border-border"}`}>
            <span
              className={`flex size-10 items-center justify-center rounded-full text-xs font-bold uppercase ${
                navy ? "bg-white/15 text-white" : "bg-primary text-primary-foreground"
              }`}
            >
              {initials(name)}
            </span>
            <div>
              <p className={`text-sm font-bold ${navy ? "text-white" : "text-foreground"}`}>{name}</p>
              <p className={`text-xs ${navy ? "text-white/65" : "text-muted-foreground"}`}>Google review</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </article>
  );
}

export function ReviewsSpotlight() {
  const total = testimonials.length;
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [stopped, setStopped] = useState(false);
  const paused = hovered || stopped;

  useEffect(() => {
    if (paused || total < 2) return;
    const id = window.setInterval(() => setActive((prev) => (prev + 1) % total), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused, total]);

  const left = testimonials[active % total];
  const right = testimonials[(active + Math.ceil(total / 2)) % total];
  const go = (delta: number) => setActive((prev) => (prev + delta + total) % total);

  return (
    <div
      className="grid items-stretch gap-5 lg:grid-cols-[0.7fr_1.3fr]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
    >
      <div className="card-glass relative overflow-hidden p-7 sm:p-8">
        <div className="pointer-events-none absolute -left-10 -top-10 size-48 rounded-full bg-brand-red/15 blur-3xl" aria-hidden="true" />
        <div className="relative">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-red">Trusted nearby</p>
          <p className="mt-4 font-display text-8xl font-black leading-none tracking-tighter text-foreground">
            100<span className="text-brand-red">+</span>
          </p>
          <p className="mt-2 font-display text-xl font-extrabold text-foreground">Google reviews</p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
            Real feedback from patients across Bengaluru and visiting NRIs — care they come back for.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-sm">
            <Stars />
            <span className="text-sm font-bold text-foreground">4.9</span>
            <span className="text-xs text-muted-foreground">avg rating</span>
          </div>

          <div className="mt-8 flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous reviews"
              className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-border bg-card transition hover:border-primary hover:text-primary"
            >
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => setStopped((s) => !s)}
              aria-label={stopped ? "Resume review rotation" : "Pause review rotation"}
              className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-border bg-card transition hover:border-primary hover:text-primary"
            >
              {stopped ? <Play aria-hidden="true" className="size-4" /> : <Pause aria-hidden="true" className="size-4" />}
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next reviews"
              className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-border bg-card transition hover:border-primary hover:text-primary"
            >
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
            <span className="ml-2 text-xs font-semibold text-muted-foreground" aria-live="polite">
              {active + 1} / {total}
            </span>
          </div>
          <div className="mt-5 flex gap-1.5" aria-hidden="true">
            {testimonials.map((_, index) => (
              <span
                key={index}
                className={`h-1.5 rounded-full transition-all duration-500 ${index === active ? "w-8 bg-brand-red" : "w-2.5 bg-border"}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <ReviewCard quote={left.quote} name={left.name} variant="navy" contentKey={`L-${active}`} />
        <ReviewCard quote={right.quote} name={right.name} variant="light" contentKey={`R-${active}`} />
      </div>
    </div>
  );
}
