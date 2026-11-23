import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, PenLine, Play, Quote, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { GOOGLE_REVIEWS_URL, GOOGLE_WRITE_REVIEW_URL, testimonials, type Testimonial } from "@/data/site";
import { useGoogleReviews } from "@/hooks/useGoogleReviews";

const ROTATE_MS = 5200;

function Stars({ value, className = "" }: { value: number; className?: string }) {
  const rounded = Math.round(value);
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} role="img" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} aria-hidden="true" className={`size-4 ${i < rounded ? "fill-amber-400 text-amber-400" : "text-amber-400/40"}`} />
      ))}
    </span>
  );
}

function GoogleMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M22.6 12.3c0-.8-.1-1.6-.2-2.3H12v4.3h5.9a5 5 0 0 1-2.2 3.3v2.8h3.6c2.1-1.9 3.3-4.8 3.3-8.1z" />
      <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.8c-1 .7-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.1v2.9A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.8 14.1a6.6 6.6 0 0 1 0-4.2V7H2.1a11 11 0 0 0 0 10l3.7-2.9z" />
      <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2A11 11 0 0 0 2.1 7l3.7 2.9C6.7 7.3 9.1 5.4 12 5.4z" />
    </svg>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function ReviewCard({ review, variant, contentKey }: { review: Testimonial; variant: "navy" | "light"; contentKey: string }) {
  const navy = variant === "navy";
  const nameClass = `text-sm font-bold ${navy ? "text-white" : "text-foreground"}`;
  return (
    <article
      className={`relative flex min-h-[17rem] flex-col justify-between overflow-hidden rounded-[1.75rem] p-7 ${
        navy ? "bg-navy-mesh text-white shadow-2xl" : "card-glass text-foreground"
      }`}
    >
      <Quote aria-hidden="true" className={`absolute -right-3 -top-3 size-28 rotate-180 ${navy ? "text-white/10" : "text-primary/10"}`} />
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
            {review.rating ? <Stars value={review.rating} /> : <GoogleMark className="size-5" />}
            <p className={`mt-4 line-clamp-[8] text-[0.95rem] leading-7 ${navy ? "text-white/90" : "text-foreground"}`}>“{review.quote}”</p>
          </div>
          <div className={`mt-6 flex items-center gap-3 border-t pt-4 ${navy ? "border-white/15" : "border-border"}`}>
            <span
              className={`flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                navy ? "bg-white/15 text-white" : "bg-primary text-primary-foreground"
              }`}
              aria-hidden="true"
            >
              {initials(review.name)}
            </span>
            <div className="min-w-0">
              {review.url ? (
                <a href={review.url} target="_blank" rel="noreferrer" className={`${nameClass} hover:underline`}>
                  {review.name}
                </a>
              ) : (
                <p className={nameClass}>{review.name}</p>
              )}
              <p className={`text-xs ${navy ? "text-white/65" : "text-muted-foreground"}`}>
                Google review{review.when ? ` · ${review.when}` : ""}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </article>
  );
}

export function ReviewsSpotlight() {
  const { live, rating, count, reviews } = useGoogleReviews(testimonials);
  const total = reviews.length;
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [stopped, setStopped] = useState(false);
  const paused = hovered || stopped;

  useEffect(() => {
    if (paused || total < 2) return;
    const id = window.setInterval(() => setActive((prev) => (prev + 1) % total), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused, total]);

  if (total === 0) return null;

  const index = active % total;
  const left = reviews[index];
  const right = reviews[(index + Math.ceil(total / 2)) % total];
  const go = (delta: number) => setActive((prev) => (prev + delta + total) % total);
  const controlClass =
    "flex size-11 cursor-pointer items-center justify-center rounded-full border border-border bg-card transition hover:border-primary hover:text-primary";

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
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-red">
            <GoogleMark className="size-4" /> Reviews from Google
          </p>

          {live && rating ? (
            <>
              <p className="mt-4 font-display text-8xl font-black leading-none tracking-tighter text-foreground">
                {rating.toFixed(1)}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Stars value={rating} />
                {count ? <span className="text-sm font-semibold text-muted-foreground">{count.toLocaleString("en-IN")} Google reviews</span> : null}
              </div>
            </>
          ) : (
            <p className="mt-4 font-display text-4xl font-black leading-tight tracking-tight text-foreground">
              What patients say on <span className="text-gradient">Google</span>
            </p>
          )}

          <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
            Real feedback our patients have left on the Wellstar Google profile.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-semibold text-foreground shadow-sm transition hover:border-primary hover:text-primary"
            >
              Read all reviews <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
            {GOOGLE_WRITE_REVIEW_URL && (
              <a
                href={GOOGLE_WRITE_REVIEW_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5"
              >
                <PenLine aria-hidden="true" className="size-4" /> Write a review
              </a>
            )}
          </div>

          {total > 1 && (
            <>
              <div className="mt-8 flex items-center gap-2">
                <button type="button" onClick={() => go(-1)} aria-label="Previous reviews" className={controlClass}>
                  <ChevronLeft aria-hidden="true" className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setStopped((s) => !s)}
                  aria-label={stopped ? "Resume review rotation" : "Pause review rotation"}
                  className={controlClass}
                >
                  {stopped ? <Play aria-hidden="true" className="size-4" /> : <Pause aria-hidden="true" className="size-4" />}
                </button>
                <button type="button" onClick={() => go(1)} aria-label="Next reviews" className={controlClass}>
                  <ChevronRight aria-hidden="true" className="size-5" />
                </button>
                <span className="ml-2 text-xs font-semibold text-muted-foreground" aria-live="polite">
                  {index + 1} / {total}
                </span>
              </div>
              <div className="mt-5 flex gap-1.5" aria-hidden="true">
                {reviews.map((review, i) => (
                  <span
                    key={`${review.name}-${i}`}
                    className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? "w-8 bg-brand-red" : "w-2.5 bg-border"}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <ReviewCard review={left} variant="navy" contentKey={`L-${index}`} />
        {total > 1 && <ReviewCard review={right} variant="light" contentKey={`R-${index}`} />}
      </div>
    </div>
  );
}
