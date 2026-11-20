import type { ReactNode } from "react";

export function PageHero({
  kicker,
  title,
  description,
  actions,
  image,
  imageAlt,
}: {
  kicker: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="border-b border-border bg-clinic-surface/80 px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
      <div className={`mx-auto grid max-w-7xl gap-8 ${image ? "lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12" : ""}`}>
        <div>
          <p className="section-kicker">{kicker}</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">{title}</h1>
          {description && <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{description}</p>}
          {actions && <div className="mt-7">{actions}</div>}
        </div>
        {image && (
          <div className="hero-frame relative min-h-[16rem] sm:min-h-[20rem] lg:min-h-[22rem]">
            <img
              src={image}
              alt={imageAlt ?? ""}
              className="absolute inset-0 size-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/25 via-transparent to-transparent" aria-hidden="true" />
          </div>
        )}
      </div>
    </section>
  );
}
