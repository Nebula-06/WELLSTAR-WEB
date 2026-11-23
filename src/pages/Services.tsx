import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Bone, Check, HeartPulse, Sparkles, Stethoscope, Syringe, type LucideIcon } from "lucide-react";
import servicesHero from "@/assets/services-hero.webp";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { specialties, whatsappLink } from "@/data/site";
import { usePageMeta } from "@/hooks/usePageMeta";

const specialtyIcons: Record<string, LucideIcon> = {
  "general-physician": Stethoscope,
  gynecology: HeartPulse,
  orthopedics: Bone,
  dermatology: Sparkles,
  "day-care": Syringe,
};

export default function Services() {
  usePageMeta(
    "Medical Services | Wellstar Polyclinic, Hebbal",
    "General physician & internal medicine, gynecology & obstetrics, orthopedics, dermatology and day care at Wellstar Polyclinic, Hebbal, Bengaluru.",
  );
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

      <section className="section-y border-t border-border bg-surface">
        <div className="container-x grid gap-10 lg:grid-cols-[17rem_1fr]">
          <nav aria-label="Specialties" className="hidden lg:block">
            <ul className="sticky top-28 grid gap-1.5">
              {specialties.map((item, index) => {
                const Icon = specialtyIcons[item.id] ?? Stethoscope;
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

          <div className="grid gap-6">
            {specialties.map((item, index) => {
              const Icon = specialtyIcons[item.id] ?? Stethoscope;
              return (
                <Reveal key={item.id} id={item.id} className="card-glass scroll-mt-28 overflow-hidden">
                  <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="relative border-b border-border p-7 sm:p-9 lg:border-b-0 lg:border-r">
                      <span className="pointer-events-none absolute right-5 top-3 font-display text-8xl font-black leading-none text-primary/[0.07]" aria-hidden="true">
                        0{index + 1}
                      </span>
                      <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-brand-teal text-white shadow-lg">
                        <Icon aria-hidden="true" className="size-7" />
                      </span>
                      <h2 className="mt-6 font-display text-3xl font-black leading-tight text-foreground">{item.title}</h2>
                      <p className="mt-3 text-sm font-semibold leading-6 text-brand-teal">{item.lead}</p>
                      <Button asChild variant="outline" className="mt-6">
                        <a href={whatsappLink(`Hello, I would like to ask about ${item.title}.`)} target="_blank" rel="noreferrer">
                          Book / ask on WhatsApp <ArrowUpRight aria-hidden="true" />
                        </a>
                      </Button>
                    </div>
                    <div className="p-7 sm:p-9">
                      <p className="leading-7 text-muted-foreground">{item.description}</p>
                      <ul className="mt-6 grid gap-3">
                        {item.points.map((point) => (
                          <li key={point} className="flex gap-3 text-sm leading-6 text-foreground">
                            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                              <Check aria-hidden="true" className="size-3" strokeWidth={3.5} />
                            </span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
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
