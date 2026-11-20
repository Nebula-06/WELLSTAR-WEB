import {
  ArrowUpRight,
  Building2,
  Clock3,
  FlaskConical,
  HeartPulse,
  MapPin,
  Phone,
  Pill,
  Stethoscope,
  UserRound,
} from "lucide-react";
import homeHero from "@/assets/home-hero.webp";
import { Reveal } from "@/components/Reveal";
import { ReviewsSpotlight } from "@/components/ReviewsSpotlight";
import { SectionActions } from "@/components/SectionActions";
import { Button } from "@/components/ui/button";
import {
  doctors,
  PHONE_URL,
  specialties,
  whatsappLink,
} from "@/data/site";

const homeSections = [
  {
    icon: Building2,
    title: "About Wellstar",
    summary: "Founded for affordable, high-quality care under one roof — expertise with empathy in Hebbal.",
    detailsTo: "/about",
    whatsapp: whatsappLink("Hello, I would like to know more about Wellstar Polyclinic."),
  },
  {
    icon: Stethoscope,
    title: "Our Services",
    summary: `${specialties.length} specialties including physician care, gynecology, orthopedics, dermatology and day care.`,
    detailsTo: "/services",
    whatsapp: whatsappLink("Hello, I would like to ask about your medical services."),
  },
  {
    icon: UserRound,
    title: "Our Doctors",
    summary: `Meet ${doctors.map((d) => d.name.replace("Dr. ", "")).join(", ")} — specialists patients trust.`,
    detailsTo: "/doctors",
    whatsapp: whatsappLink("Hello, I would like to book with a doctor at Wellstar."),
  },
  {
    icon: FlaskConical,
    title: "Lab & Diagnostic",
    summary: "General and women’s health packages, blood tests, ECG, CTG/NST and preventive check-ups.",
    detailsTo: "/lab",
    whatsapp: whatsappLink("Hello, I would like to book a lab test / health package."),
  },
  {
    icon: Pill,
    title: "Medicines & Supplies",
    summary: "WHO-GMP pharmacy with home delivery within 2 km and doctor-supervised dispensing.",
    detailsTo: "/pharmacy",
    whatsapp: whatsappLink("Hello, I would like to ask about medicines or pharmacy delivery."),
  },
  {
    icon: MapPin,
    title: "Visit / Contact",
    summary: "Kanaka Nagar, Hebbal · Mon–Sat 8 AM–10 PM · Sun 8 AM–1 PM · +91 63620 64109",
    detailsTo: "/contact",
    whatsapp: whatsappLink("Hello, I would like to get in touch with Wellstar."),
  },
];

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,color-mix(in_oklab,var(--ws-clinic-surface)_70%,transparent))]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 pb-12 pt-10 sm:px-8 sm:pb-16 sm:pt-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 lg:px-10 lg:py-16">
          <div className="py-4 sm:py-8 lg:py-10">
            <p className="mb-5 inline-flex items-center gap-3 rounded-sm border border-border/80 bg-card/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary shadow-sm backdrop-blur">
              <span className="h-px w-6 bg-clinic-gold" aria-hidden="true" />
              Hebbal, Bengaluru
            </p>
            <h1 className="max-w-xl font-display text-5xl leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Multispecialty clinic. One roof. Always near.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
              Specialist care, diagnostics and pharmacy — summaries first, full details one tap away, booking on WhatsApp.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="min-h-12 rounded-sm px-5 shadow-[0_14px_30px_-16px_rgba(22,90,64,0.7)]">
                <a href={whatsappLink("Hello, I would like to book an appointment.")} target="_blank" rel="noreferrer">
                  Book on WhatsApp <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="outline" className="min-h-12 rounded-sm px-5">
                <a href={PHONE_URL}>
                  <Phone aria-hidden="true" /> Call now
                </a>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2"><MapPin aria-hidden="true" className="size-4 text-primary" /> Kanaka Nagar, Hebbal</span>
              <span className="inline-flex items-center gap-2"><Clock3 aria-hidden="true" className="size-4 text-primary" /> Mon–Sat 8 AM–10 PM · Sun 8 AM–1 PM</span>
            </div>
          </div>

          <div className="hero-frame relative min-h-[22rem] sm:min-h-[26rem] lg:min-h-[32rem] lg:self-stretch">
            <img
              src={homeHero}
              alt="Patient receiving compassionate care at a modern clinic"
              className="absolute inset-0 size-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" aria-hidden="true" />
            <div className="absolute bottom-4 left-4 z-10 flex max-w-[calc(100%-2rem)] items-center gap-3 rounded-sm border border-border/60 bg-card/90 px-4 py-3 backdrop-blur-md sm:bottom-6 sm:left-6">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-secondary text-primary">
                <HeartPulse aria-hidden="true" className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-foreground">Care that feels personal</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">Clinic · Diagnostics · Pharmacy</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-clinic-surface/90 px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-2xl">
            <p className="section-kicker">Explore Wellstar</p>
            <h2 className="section-title mt-3">Summaries first. Details when you need them.</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Each section has two actions — open the full page, or book / ask on WhatsApp right away.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {homeSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <Reveal key={section.title} className="surface-card p-5 sm:p-7">
                  <div className="flex items-start gap-4">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-sm bg-secondary text-primary ring-1 ring-border/70">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <h3 className="font-display text-2xl text-foreground">{section.title}</h3>
                        <span className="text-xs font-medium text-clinic-gold">0{index + 1}</span>
                      </div>
                      <p className="text-sm leading-6 text-muted-foreground">{section.summary}</p>
                      <SectionActions
                        detailsTo={section.detailsTo}
                        whatsappHref={section.whatsapp}
                      />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="section-kicker">Patients say</p>
              <h2 className="section-title mt-3">Trusted across Bengaluru — and beyond.</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
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
          <Reveal className="mt-10">
            <ReviewsSpotlight />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
