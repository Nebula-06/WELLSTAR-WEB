import { Fragment, useRef, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, MapPin, Phone } from "lucide-react";
import { ConditionFinder } from "@/components/ConditionFinder";
import { EcgLine } from "@/components/EcgLine";
import { HeroCollage } from "@/components/home/HeroCollage";
import { HomeDoctors } from "@/components/home/HomeDoctors";
import { HomePackages } from "@/components/home/HomePackages";
import { HomeSpecialties } from "@/components/home/HomeSpecialties";
import { HowItWorks } from "@/components/home/HowItWorks";
import { TrustStrip } from "@/components/home/TrustStrip";
import { VisitUs } from "@/components/home/VisitUs";
import { OpenStatusBadge } from "@/components/OpenStatusBadge";
import { Reveal } from "@/components/Reveal";
import { ReviewsSpotlight } from "@/components/ReviewsSpotlight";
import { SectionActions } from "@/components/SectionActions";
import { Button } from "@/components/ui/button";
import { formatInr, generalHealthPackages, PHONE_URL, whatsappLink, womensHealthPackages } from "@/data/site";

const fromPrice = Math.min(...[...generalHealthPackages, ...womensHealthPackages].map((pkg) => pkg.offerPrice));

const headline = [
  { text: "Multispecialty", accent: false },
  { text: "clinic.", accent: false },
  { text: "One", accent: true },
  { text: "roof.", accent: true },
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <main>
      <section ref={heroRef} className="relative isolate overflow-hidden pt-28 sm:pt-32">
        <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

        <div className="container-x grid items-center gap-12 pb-16 lg:grid-cols-[1fr_1fr] lg:gap-10 lg:pb-20">
          <div>
            <div className="anim-rise flex flex-wrap items-center gap-2.5">
              <OpenStatusBadge />
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/70 px-3.5 py-2 text-sm font-semibold text-muted-foreground backdrop-blur">
                <MapPin aria-hidden="true" className="size-4 text-primary" /> Kanaka Nagar, Hebbal
              </span>
            </div>

            <h1 className="mt-7 font-display text-[3rem] font-bold leading-[1] tracking-[-0.04em] text-foreground sm:text-7xl xl:text-[5.25rem]">
              {headline.map((word, index) => (
                <Fragment key={word.text}>
                  <span
                    className={`anim-soft inline-block ${word.accent ? "text-gradient" : ""}`}
                    style={{ "--d": `${80 + index * 70}ms` } as CSSProperties}
                  >
                    {word.text}
                  </span>
                  {index < headline.length - 1 && " "}
                </Fragment>
              ))}
            </h1>

            <EcgLine className="mt-6 h-10 w-full max-w-md" />

            <p
              className="anim-soft mt-4 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg"
              style={{ "--d": "420ms" } as CSSProperties}
            >
              Specialist care, diagnostics and pharmacy — summaries first, full details one tap away, booking on WhatsApp.
            </p>

            <div className="anim-rise mt-8 flex flex-wrap gap-3" style={{ "--d": "520ms" } as CSSProperties}>
              <Button asChild variant="accent" size="lg">
                <a href={whatsappLink("Hello, I would like to book an appointment.")} target="_blank" rel="noreferrer">
                  Book on WhatsApp <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={PHONE_URL}>
                  <Phone aria-hidden="true" /> Call now
                </a>
              </Button>
            </div>

            <div className="anim-rise" style={{ "--d": "640ms" } as CSSProperties}>
              <Link
                to="/lab#packages"
                className="group mt-6 inline-flex items-center gap-2 rounded-full bg-secondary py-1.5 pl-1.5 pr-4 text-sm font-semibold text-secondary-foreground transition hover:bg-secondary/70"
              >
                <span className="rounded-full bg-brand-red px-2.5 py-1 text-xs font-extrabold text-brand-red-foreground">Lab</span>
                Health packages from {formatInr(fromPrice)}
                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <HeroCollage heroRef={heroRef} />
        </div>

        <TrustStrip />
      </section>

      <ConditionFinder className="border-b border-border bg-surface" />
      <HomeSpecialties />
      <HomeDoctors />
      <HomePackages />
      <HowItWorks />

      <section className="section-y relative overflow-hidden border-t border-border bg-surface">
        <div className="container-x">
          <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="kicker">Patients say</p>
              <h2 className="section-title mt-4">Trusted across Bengaluru — and beyond.</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                Patients visit from across the city, and from abroad when they’re home — two live review spotlights keep rotating.
              </p>
            </div>
            <SectionActions
              detailsTo="/doctors"
              detailsLabel="Meet our doctors"
              whatsappHref={whatsappLink("Hello, I would like to book an appointment.")}
              className="mt-0"
            />
          </Reveal>
          <Reveal className="mt-12">
            <ReviewsSpotlight />
          </Reveal>
        </div>
      </section>

      <VisitUs />
    </main>
  );
}
