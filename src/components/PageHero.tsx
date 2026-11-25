import { Fragment, type CSSProperties, type ReactNode } from "react";
import { EcgLine } from "@/components/EcgLine";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * Inner-page hero. Entrances are CSS animations (anim-*) so they start at first paint,
 * before JavaScript loads, and aren't replayed when the pre-rendered page hydrates.
 */
export function PageHero({
  kicker,
  title,
  description,
  actions,
  image,
  imageAlt,
  aside,
}: {
  kicker: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  image?: string;
  imageAlt?: string;
  aside?: ReactNode;
}) {
  const words = title.split(" ");
  const hasSide = Boolean(image || aside);
  // Accent the second sentence ("… Trusted results.") or, for one-sentence titles, the last word.
  const firstStop = words.findIndex((word, i) => word.endsWith(".") && i < words.length - 1);
  const accentFrom = firstStop >= 0 ? firstStop + 1 : words.length - 1;

  return (
    <section className="relative isolate overflow-hidden pt-28 sm:pt-32">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

      <div className={`container-x grid gap-12 pb-16 sm:pb-20 ${hasSide ? "lg:grid-cols-[1.05fr_0.95fr] lg:items-center" : ""}`}>
        <div>
          <p className="kicker anim-rise">{kicker}</p>
          <h1 className="mt-6 max-w-3xl font-display text-[2.6rem] font-bold leading-[1.03] tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl">
            {words.map((word, index) => (
              <Fragment key={`${word}-${index}`}>
                <span
                  className={`anim-soft inline-block ${index >= accentFrom ? "text-gradient" : ""}`}
                  style={delay(80 + index * 60)}
                >
                  {word}
                </span>
                {index < words.length - 1 && " "}
              </Fragment>
            ))}
          </h1>
          <EcgLine className="mt-5 h-8 w-56 sm:w-72" />
          {description && (
            <p className="anim-soft mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg" style={delay(320)}>
              {description}
            </p>
          )}
          {actions && (
            <div className="anim-rise mt-8" style={delay(420)}>
              {actions}
            </div>
          )}
        </div>

        {image && (
          <div className="anim-lift relative" style={delay(150)}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/60 shadow-[var(--ws-shadow-lg)]">
              <img src={image} alt={imageAlt ?? ""} fetchPriority="high" className="absolute inset-0 size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" aria-hidden="true" />
            </div>
          </div>
        )}
        {!image && aside && (
          <div className="anim-lift" style={delay(200)}>
            {aside}
          </div>
        )}
      </div>
    </section>
  );
}
