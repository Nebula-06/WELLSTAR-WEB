import { useId, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, MessageCircle, Phone, Search, Siren, X } from "lucide-react";
import { DoctorTimings } from "@/components/DoctorTimings";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { doctors, doctorSlug, EMERGENCY_URL, PHONE_URL, whatsappLink, type Doctor, type DoctorCondition } from "@/data/site";
import { bookForCondition, firstName, looksLikeEmergency, searchConditions, type ConditionMatch } from "@/lib/conditions";

const EASE = [0.22, 1, 0.36, 1] as const;
const accentDot = { teal: "bg-brand-teal", red: "bg-brand-red" } as const;
const accentRing = { teal: "ring-brand-teal/40", red: "ring-brand-red/40" } as const;
const shortRole: Record<string, string> = {
  teal: "Physician & Internal Medicine",
  red: "Obstetrics & Gynaecology",
};

const SUGGESTIONS = ["sugar", "thyroid", "BP", "PCOS", "pregnant", "fever"];

const sameMatch = (a: ConditionMatch | null, b: ConditionMatch) =>
  a?.doctor.name === b.doctor.name && a.condition.label === b.condition.label;

/**
 * "What brings you in?" — patients search a symptom or condition in their own words and see
 * which doctor treats it, with hours and a one-tap WhatsApp booking for that condition.
 */
export function ConditionFinder({ className = "" }: { className?: string }) {
  const inputId = useId();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<ConditionMatch | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const matches = useMemo(() => searchConditions(query), [query]);
  const emergency = looksLikeEmergency(query);
  const trimmed = query.trim();

  // Which doctor(s) to show on the right, and for which condition.
  const results: { doctor: Doctor; condition?: DoctorCondition }[] = selected
    ? [selected]
    : trimmed
      ? doctors.flatMap((doctor) => {
          const hit = matches.find((m) => m.doctor.name === doctor.name);
          return hit ? [hit] : [];
        })
      : doctors.map((doctor) => ({ doctor }));

  const resultKey = selected
    ? `sel-${selected.doctor.name}-${selected.condition.label}`
    : trimmed
      ? results.length
        ? `q-${results.map((r) => `${r.doctor.name}:${r.condition?.label}`).join("|")}`
        : emergency
          ? "emergency"
          : "none"
      : "all";

  const updateQuery = (value: string) => {
    setQuery(value);
    setSelected(null);
  };

  // On phones the result sits below the chips, so bring it into view after a choice.
  const choose = (match: ConditionMatch | null) => {
    setSelected(match);
    if (match && window.matchMedia("(max-width: 1023px)").matches) {
      requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  };

  return (
    <section aria-labelledby="finder-title" className={`section-y relative overflow-hidden ${className}`}>
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="kicker">Find the right doctor</p>
          <h2 id="finder-title" className="section-title mt-4">
            What brings you in <span className="text-gradient">today?</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            Search a symptom or condition in your own words — we’ll show you which of our specialists treats it, when
            they’re in, and book you on WhatsApp in one tap.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-10 grid grid-cols-1 items-start gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">
          {/* Search + condition chips */}
          <div className="card-glass min-w-0 p-5 sm:p-7">
            <label htmlFor={inputId} className="sr-only">
              Search a symptom or condition
            </label>
            <div className="relative">
              <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
              <input
                id={inputId}
                type="search"
                value={query}
                onChange={(event) => updateQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && matches.length && trimmed) {
                    event.preventDefault();
                    choose(matches[0]);
                  }
                  if (event.key === "Escape") updateQuery("");
                }}
                placeholder="Try “sugar”, “thyroid”, “PCOS”, “pregnant”…"
                autoComplete="off"
                enterKeyHint="search"
                className="h-14 w-full rounded-2xl border border-border bg-card pl-12 pr-12 text-base text-foreground shadow-[var(--ws-shadow-sm)] outline-none transition placeholder:text-muted-foreground/80 focus:border-primary focus:ring-4 focus:ring-primary/15 [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => updateQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-xl text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                >
                  <X aria-hidden="true" className="size-4" />
                </button>
              )}
            </div>

            {!trimmed && (
              <p className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                Popular:
                {SUGGESTIONS.map((word) => (
                  <button
                    key={word}
                    type="button"
                    onClick={() => updateQuery(word)}
                    className="cursor-pointer rounded-full px-2 py-1 font-semibold text-primary underline-offset-2 hover:underline"
                  >
                    {word}
                  </button>
                ))}
              </p>
            )}

            <AnimatePresence initial={false}>
              {emergency && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div role="alert" className="mt-4 flex gap-3 rounded-2xl border border-brand-red/40 bg-brand-red/10 p-4 text-sm leading-6 text-foreground">
                    <Siren aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-red" />
                    <span>
                      This could be a medical emergency. Please{" "}
                      <a href={EMERGENCY_URL} className="font-bold text-brand-red underline underline-offset-2">
                        call 108
                      </a>{" "}
                      or go to the nearest hospital emergency department now.
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-6 grid gap-6">
              {doctors.map((doctor) => {
                const doctorMatches = matches.filter((m) => m.doctor.name === doctor.name);
                if (!doctorMatches.length) return null;
                return (
                  <div key={doctor.name}>
                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                      <span aria-hidden="true" className={`size-2 rounded-full ${accentDot[doctor.accent]}`} />
                      {shortRole[doctor.accent]} · Dr. {firstName(doctor)}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      <AnimatePresence initial={false}>
                        {doctorMatches.map((match) => {
                          const active = sameMatch(selected, match);
                          return (
                            <motion.li
                              key={match.condition.label}
                              layout
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              transition={{ duration: 0.22, ease: EASE }}
                            >
                              <button
                                type="button"
                                aria-pressed={active}
                                onClick={() => choose(active ? null : match)}
                                className={`inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-left text-sm font-semibold transition-all ${
                                  active
                                    ? "border-primary bg-primary text-primary-foreground shadow-[var(--ws-shadow-md)]"
                                    : "border-border bg-card text-foreground hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                                }`}
                              >
                                {active ? (
                                  <Check aria-hidden="true" className="size-4" />
                                ) : (
                                  <span aria-hidden="true" className={`size-1.5 rounded-full ${accentDot[doctor.accent]}`} />
                                )}
                                {match.condition.label}
                              </button>
                            </motion.li>
                          );
                        })}
                      </AnimatePresence>
                    </ul>
                  </div>
                );
              })}
              {trimmed && !matches.length && (
                <p className="text-sm text-muted-foreground">No matching conditions — see the suggestion alongside.</p>
              )}
            </div>
          </div>

          {/* Result */}
          <div ref={resultRef} aria-live="polite" className="min-w-0 scroll-mt-28 lg:sticky lg:top-28">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={resultKey}
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.15 } }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                {results.length === 0 ? (
                  emergency ? <EmergencyCard /> : <NoMatch query={trimmed} />
                ) : results.length === 1 ? (
                  <DoctorMatchCard doctor={results[0].doctor} condition={results[0].condition} />
                ) : (
                  <div className="grid gap-3">
                    <p className="px-1 text-sm font-semibold text-muted-foreground">
                      {trimmed ? "Both our specialists can help:" : "Pick a condition to see who treats it — or book directly:"}
                    </p>
                    {results.map((result) => (
                      <DoctorRow key={result.doctor.name} doctor={result.doctor} condition={result.condition} />
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function DoctorMatchCard({ doctor, condition }: { doctor: Doctor; condition?: DoctorCondition }) {
  return (
    <article className={`card-glass relative overflow-hidden p-6 ring-2 sm:p-7 ${accentRing[doctor.accent]}`}>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-16 -top-16 size-48 rounded-full opacity-15 blur-3xl ${accentDot[doctor.accent]}`}
      />
      {condition && (
        <p className="relative inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
          <Check aria-hidden="true" className="size-3.5" strokeWidth={3} /> Treats {condition.label}
        </p>
      )}
      <div className={`relative flex items-center gap-4 ${condition ? "mt-4" : ""}`}>
        <img
          src={doctor.image}
          alt=""
          loading="lazy"
          width={80}
          height={80}
          className="size-20 shrink-0 rounded-2xl object-cover object-top shadow-[var(--ws-shadow-md)]"
        />
        <div className="min-w-0">
          <h3 className="font-display text-2xl font-black leading-tight text-foreground">{doctor.name}</h3>
          <p className="mt-1 text-sm font-semibold text-primary">{doctor.specialty}</p>
        </div>
      </div>
      <DoctorTimings timings={doctor.timings} compact className="relative mt-5 inline-block" />
      <dl className="relative mt-5 grid grid-cols-3 gap-2 border-t border-dashed border-border pt-5">
        {doctor.highlights.map((item) => (
          <div key={item.label}>
            <dt className="sr-only">{item.label}</dt>
            <dd className="font-display text-lg font-black leading-none text-foreground">{item.value}</dd>
            <dd className="mt-1 text-[0.68rem] font-semibold leading-tight text-muted-foreground">{item.label}</dd>
          </div>
        ))}
      </dl>
      <div className="relative mt-6 flex flex-wrap gap-2.5">
        <Button asChild variant="accent">
          <a href={bookForCondition(doctor, condition)} target="_blank" rel="noreferrer">
            Book with Dr. {firstName(doctor)}
            <span className="sr-only">{condition ? ` for ${condition.label}` : ""} on WhatsApp</span>
            <ArrowUpRight aria-hidden="true" />
          </a>
        </Button>
        <Button asChild variant="outline">
          <Link to={`/doctors#${doctorSlug(doctor.name)}`}>
            View profile<span className="sr-only"> of {doctor.name}</span>
          </Link>
        </Button>
      </div>
    </article>
  );
}

function DoctorRow({ doctor, condition }: { doctor: Doctor; condition?: DoctorCondition }) {
  return (
    <article className="card-glass flex items-center gap-4 p-4">
      <img
        src={doctor.image}
        alt=""
        loading="lazy"
        width={64}
        height={64}
        className="size-16 shrink-0 rounded-2xl object-cover object-top"
      />
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-2">
          <span aria-hidden="true" className={`size-2 shrink-0 rounded-full ${accentDot[doctor.accent]}`} />
          <span className="truncate font-display text-lg font-black text-foreground">{doctor.name}</span>
        </p>
        <p className="mt-0.5 truncate text-xs font-semibold text-muted-foreground">
          {condition ? `Treats ${condition.label}` : shortRole[doctor.accent]} · {doctor.timings}
        </p>
      </div>
      <a
        href={bookForCondition(doctor, condition)}
        target="_blank"
        rel="noreferrer"
        aria-label={`Book with ${doctor.name}${condition ? ` for ${condition.label}` : ""} on WhatsApp`}
        className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:-translate-y-0.5 hover:bg-primary/90"
      >
        <ArrowUpRight aria-hidden="true" className="size-5" />
      </a>
    </article>
  );
}

function EmergencyCard() {
  return (
    <article className="relative overflow-hidden rounded-[1.75rem] border border-brand-red/40 bg-card p-6 shadow-[var(--ws-shadow-md)] sm:p-7">
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-brand-red opacity-15 blur-3xl" />
      <span className="relative flex size-12 items-center justify-center rounded-2xl bg-brand-red text-white">
        <Siren aria-hidden="true" className="size-6" />
      </span>
      <h3 className="relative mt-4 font-display text-xl font-black text-foreground">Get emergency help now</h3>
      <p className="relative mt-2 text-sm leading-6 text-muted-foreground">
        Don’t wait for a clinic appointment. Call an ambulance or go to the nearest hospital emergency department.
      </p>
      <div className="relative mt-5 flex flex-wrap gap-2.5">
        <Button asChild variant="accent" size="lg">
          <a href={EMERGENCY_URL}>
            <Phone aria-hidden="true" /> Call 108
          </a>
        </Button>
      </div>
    </article>
  );
}

function NoMatch({ query }: { query: string }) {
  return (
    <article className="card-glass p-6 sm:p-7">
      <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
        <MessageCircle aria-hidden="true" className="size-6" />
      </span>
      <h3 className="mt-4 font-display text-xl font-black text-foreground">Not sure who to see?</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        We couldn’t match “{query}” to a condition, but our front desk can guide you to the right doctor.
      </p>
      <div className="mt-5 flex flex-wrap gap-2.5">
        <Button asChild variant="accent">
          <a
            href={whatsappLink(`Hello, I would like advice on which doctor to see for: ${query}.`)}
            target="_blank"
            rel="noreferrer"
          >
            Ask on WhatsApp <ArrowUpRight aria-hidden="true" />
          </a>
        </Button>
        <Button asChild variant="outline">
          <a href={PHONE_URL}>
            <Phone aria-hidden="true" /> Call us
          </a>
        </Button>
      </div>
    </article>
  );
}
