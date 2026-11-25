import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Check, Stethoscope } from "lucide-react";
import servicesHero from "@/assets/services-hero.webp";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ServiceShowcase } from "@/components/ServiceShowcase";
import { TiltImage } from "@/components/TiltImage";
import { Button } from "@/components/ui/button";
import { serviceMedia } from "@/data/serviceMedia";
import { specialties, whatsappLink } from "@/data/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Services() {
  const [activeId, setActiveId] = useState(specialties[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    specialties.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <PageHero
        kicker="Our services"
        title="Highlighting the care & support."
        description="Full multi-specialty services from the Wellstar services page — diagnostics and care under one roof."
        image={servicesHero}
        imageAlt="Doctor consulting with a smiling patient in clinic"
        actions={
          <Button asChild variant="accent" size="lg">
            <a href={whatsappLink("Hello, I would like to ask about your medical services.")} target="_blank" rel="noreferrer">
              Ask about services <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        }
      />

      <section className="section-y border-t border-border">
        <div className="container-x">
          <Reveal className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="kicker">Explore specialties</p>
              <h2 className="section-title mt-4">
                {specialties.length} specialties. <span className="text-gradient">One roof.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              <span className="hidden lg:inline">Hover or tap a panel to open it.</span>
              <span className="lg:hidden">Swipe through the specialties.</span>
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ServiceShowcase />
          </Reveal>
        </div>
      </section>

      <section className="section-y border-t border-border bg-surface">
        <div className="container-x grid gap-10 lg:grid-cols-[16rem_1fr]">
          <nav aria-label="Specialties" className="hidden lg:block">
            <ul className="sticky top-28 grid gap-1.5">
              {specialties.map((item, index) => {
                const Icon = serviceMedia[item.id]?.icon ?? Stethoscope;
                const active = activeId === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={`relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                        active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="service-index"
                          className="absolute inset-0 rounded-2xl bg-primary"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <Icon aria-hidden="true" className="relative size-4 shrink-0" />
                      <span className="relative">
                        <span className="mr-1.5 opacity-60">0{index + 1}</span>
                        {item.title}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="grid gap-8">
            {specialties.map((item, index) => {
              const media = serviceMedia[item.id];
              const Icon = media?.icon ?? Stethoscope;
              const flip = index % 2 === 1;
              return (
                <Reveal key={item.id} id={item.id} className="card-glass scroll-mt-28 overflow-hidden p-3 sm:p-4">
                  <div className={`grid gap-4 xl:grid-cols-[0.95fr_1.05fr] ${flip ? "xl:[&>*:first-child]:order-2" : ""}`}>
                    <TiltImage
                      src={media?.image ?? ""}
                      alt={media?.alt ?? ""}
                      position={media?.position}
                      className="h-80 sm:h-96 xl:h-auto xl:min-h-[28rem]"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="flex size-12 items-center justify-center rounded-2xl text-[#041029] shadow-lg"
                          style={{ backgroundColor: media?.accent }}
                        >
                          <Icon aria-hidden="true" className="size-6" />
                        </span>
                        <span className="font-display text-sm font-bold tracking-[0.2em] text-white/75">
                          0{index + 1} / 0{specialties.length}
                        </span>
                      </div>
                      <h2 className="mt-4 font-display text-3xl font-black leading-tight text-white sm:text-4xl">{item.title}</h2>
                      <p className="mt-2 text-sm font-semibold sm:text-base" style={{ color: media?.accent }}>
                        {item.lead}
                      </p>
                    </TiltImage>

                    <div className="flex flex-col p-4 sm:p-6">
                      <p className="leading-7 text-muted-foreground">{item.description}</p>
                      <motion.ul
                        className="mt-6 grid gap-3"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }}
                      >
                        {item.points.map((point) => (
                          <motion.li
                            key={point}
                            className="flex gap-3 rounded-2xl border border-border/70 bg-background/60 p-3 text-sm leading-6 text-foreground"
                            variants={{
                              hidden: { opacity: 0, x: flip ? -20 : 20 },
                              show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
                            }}
                          >
                            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                              <Check aria-hidden="true" className="size-3" strokeWidth={3.5} />
                            </span>
                            <span>{point}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                      <div className="mt-auto pt-6">
                        <Button asChild>
                          <a href={whatsappLink(`Hello, I would like to ask about ${item.title}.`)} target="_blank" rel="noreferrer">
                            Book / ask on WhatsApp <ArrowUpRight aria-hidden="true" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
