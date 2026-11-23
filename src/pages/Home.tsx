import { Fragment, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowUpRight,
  Building2,
  Clock3,
  FlaskConical,
  HeartPulse,
  MapPin,
  Phone,
  Pill,
  Plus,
  Stethoscope,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import homeHero from "@/assets/home-hero.webp";
import { EcgLine } from "@/components/EcgLine";
import { Marquee } from "@/components/Marquee";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { ReviewsSpotlight } from "@/components/ReviewsSpotlight";
import { SectionActions } from "@/components/SectionActions";
import { SpotlightCard } from "@/components/SpotlightCard";
import { Button } from "@/components/ui/button";
import { doctors, PHONE_URL, specialties, whatsappLink } from "@/data/site";

const EASE = [0.22, 1, 0.36, 1] as const;

type HomeSection = {
  icon: LucideIcon;
  title: string;
  summary: string;
  detailsTo: string;
  whatsapp: string;
  span: string;
  featured?: boolean;
};

const homeSections: HomeSection[] = [
  {
    icon: Building2,
    title: "About Wellstar",
    summary: "Founded for affordable, high-quality care under one roof — expertise with empathy in Hebbal.",
    detailsTo: "/about",
    whatsapp: whatsappLink("Hello, I would like to know more about Wellstar Polyclinic."),
    span: "lg:col-span-2",
  },
  {
    icon: Stethoscope,
    title: "Our Services",
    summary: `${specialties.length} specialties including physician care, gynecology, orthopedics, dermatology and day care.`,
    detailsTo: "/services",
    whatsapp: whatsappLink("Hello, I would like to ask about your medical services."),
    span: "",
  },
  {
    icon: UserRound,
    title: "Our Doctors",
    summary: `Meet ${doctors.map((d) => d.name.replace("Dr. ", "")).join(", ")} — specialists patients trust.`,
    detailsTo: "/doctors",
    whatsapp: whatsappLink("Hello, I would like to book with a doctor at Wellstar."),
    span: "",
  },
  {
    icon: FlaskConical,
    title: "Lab & Diagnostic",
    summary: "General and women’s health packages, blood tests, ECG, CTG/NST and preventive check-ups.",
    detailsTo: "/lab",
    whatsapp: whatsappLink("Hello, I would like to book a lab test / health package."),
    span: "lg:col-span-2",
    featured: true,
  },
  {
    icon: Pill,
    title: "Medicines & Supplies",
    summary: "WHO-GMP pharmacy with home delivery within 2 km and doctor-supervised dispensing.",
    detailsTo: "/pharmacy",
    whatsapp: whatsappLink("Hello, I would like to ask about medicines or pharmacy delivery."),
    span: "",
  },
  {
    icon: MapPin,
    title: "Visit / Contact",
    summary: "Kanaka Nagar, Hebbal · Mon–Sat 8 AM–10 PM · Sun 8 AM–1 PM · +91 63620 64109",
    detailsTo: "/contact",
    whatsapp: whatsappLink("Hello, I would like to get in touch with Wellstar."),
    span: "lg:col-span-2",
  },
];

const marqueeItems = [...specialties.map((s) => s.title), "Lab & Diagnostic", "Medicines & Supplies"];

const headline = [
  { text: "Multispecialty", accent: false },
  { text: "clinic.", accent: false },
  { text: "One", accent: true },
  { text: "roof.", accent: true },
  { text: "Always", accent: false },
  { text: "near.", accent: false },
];

function RotatingBadge() {
  const label = "Clinic · Diagnostics · Pharmacy · ";
  return (
    <div className="relative flex size-28 items-center justify-center rounded-full bg-card shadow-xl ring-1 ring-border sm:size-32">
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-spin-slow" aria-hidden="true">
        <defs>
          <path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-foreground text-[8.6px] font-bold uppercase tracking-[0.18em]">
          <textPath href="#badge-circle">{label + label}</textPath>
        </text>
      </svg>
      <span className="flex size-11 items-center justify-center rounded-full bg-brand-red text-white">
        <Plus aria-hidden="true" className="size-6" strokeWidth={3.5} />
      </span>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const floatY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <main>
      <section ref={heroRef} className="relative isolate overflow-hidden pt-28 sm:pt-32">
        <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
        <motion.div
          className="pointer-events-none absolute -left-40 -top-24 -z-10 size-[34rem] rounded-full bg-primary/20 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
        <motion.div
          className="pointer-events-none absolute -right-32 top-32 -z-10 size-[30rem] rounded-full bg-brand-red/15 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />

        <div className="container-x grid items-center gap-12 pb-16 lg:grid-cols-[1fr_1fr] lg:gap-10 lg:pb-24">
          <div>
            <motion.p
              className="kicker"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-brand-red opacity-70" />
                <span className="relative size-2 rounded-full bg-brand-red" />
              </span>
              Hebbal, Bengaluru
            </motion.p>

            <h1 className="mt-6 font-display text-[3rem] font-black leading-[0.98] tracking-tight text-foreground sm:text-7xl xl:text-[5.4rem]">
              {headline.map((word, index) => (
                <Fragment key={word.text}>
                  <motion.span
                    className={`inline-block ${word.accent ? "text-gradient" : ""}`}
                    initial={{ opacity: 0, y: "0.7em", rotate: 4, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.1 + index * 0.08 }}
                  >
                    {word.text}
                  </motion.span>
                  {index < headline.length - 1 && " "}
                </Fragment>
              ))}
            </h1>

            <EcgLine className="mt-6 h-10 w-full max-w-md" />

            <motion.p
              className="mt-4 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.6 }}
            >
              Specialist care, diagnostics and pharmacy — summaries first, full details one tap away, booking on WhatsApp.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.7 }}
            >
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
            </motion.div>

            <motion.div
              className="mt-8 flex flex-wrap gap-2.5 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.85 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-2 text-muted-foreground backdrop-blur">
                <MapPin aria-hidden="true" className="size-4 text-primary" /> Kanaka Nagar, Hebbal
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-2 text-muted-foreground backdrop-blur">
                <Clock3 aria-hidden="true" className="size-4 text-primary" /> Mon–Sat 8 AM–10 PM · Sun 8 AM–1 PM
              </span>
            </motion.div>
          </div>

          <motion.div
            className="relative mx-auto w-full max-w-xl lg:max-w-none"
            initial={{ opacity: 0, scale: 0.92, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          >
            <div
              className="absolute -inset-4 -z-10 rounded-[3rem] bg-gradient-to-br from-primary/40 via-brand-teal/25 to-brand-red/35 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-white/40 shadow-2xl sm:aspect-[5/5] lg:aspect-[4/5]">
              <motion.img
                src={homeHero}
                alt="Patient receiving compassionate care at a modern clinic"
                className="absolute inset-0 size-full object-cover"
                style={{ y: imageY, scale: imageScale }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" aria-hidden="true" />
            </div>

            <motion.div
              style={{ y: floatY }}
              className="absolute -left-3 bottom-8 z-10 sm:-left-8"
            >
              <div className="card-glass flex animate-float items-center gap-3 px-4 py-3.5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand-red text-white">
                  <HeartPulse aria-hidden="true" className="size-5" />
                </span>
                <span>
                  <span className="block font-display text-sm font-extrabold text-foreground">Care that feels personal</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">Clinic · Diagnostics · Pharmacy</span>
                </span>
              </div>
            </motion.div>

            <div className="absolute -right-2 -top-6 z-10 sm:-right-6">
              <RotatingBadge />
            </div>

            <div className="card-glass absolute left-4 top-10 z-10 hidden items-center gap-3 px-4 py-3 sm:-left-8 sm:flex">
              <div className="flex -space-x-3">
                {doctors.map((doctor) => (
                  <img
                    key={doctor.name}
                    src={doctor.image}
                    alt=""
                    className="size-10 rounded-full border-2 border-card object-cover object-top"
                  />
                ))}
              </div>
              <span className="font-display text-sm font-extrabold text-foreground">Our Doctors</span>
            </div>
          </motion.div>
        </div>

        <div className="border-y border-border bg-card/60 py-6 text-foreground backdrop-blur">
          <Marquee items={marqueeItems} />
        </div>
      </section>

      <section className="section-y relative">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="kicker">Explore Wellstar</p>
            <h2 className="section-title mt-4">
              Summaries first. <span className="text-gradient">Details when you need them.</span>
            </h2>
            <p className="mt-5 leading-7 text-muted-foreground">
              Each section has two actions — open the full page, or book / ask on WhatsApp right away.
            </p>
          </Reveal>

          <Stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {homeSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <StaggerItem key={section.title} className={section.span}>
                  <SpotlightCard
                    glow={section.featured ? "#3fd0da" : "var(--ws-primary)"}
                    className={`card-lift h-full rounded-[1.75rem] border p-6 sm:p-8 ${
                      section.featured ? "bg-navy-mesh border-transparent text-white" : "card-glass"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={`flex size-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${
                          section.featured ? "bg-white/15 text-white" : "bg-secondary text-primary"
                        }`}
                      >
                        <Icon aria-hidden="true" className="size-6" />
                      </span>
                      <span
                        className={`font-display text-5xl font-black leading-none ${
                          section.featured ? "text-white/20" : "text-primary/10"
                        }`}
                        aria-hidden="true"
                      >
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className={`mt-6 font-display text-2xl font-extrabold sm:text-3xl ${section.featured ? "text-white" : "text-foreground"}`}>
                      {section.title}
                    </h3>
                    <p className={`mt-2 max-w-xl text-sm leading-6 ${section.featured ? "text-white/80" : "text-muted-foreground"}`}>
                      {section.summary}
                    </p>
                    <SectionActions detailsTo={section.detailsTo} whatsappHref={section.whatsapp} />
                  </SpotlightCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

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
    </main>
  );
}
