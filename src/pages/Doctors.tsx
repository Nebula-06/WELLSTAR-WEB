import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, BadgeCheck, ChevronDown, GraduationCap } from "lucide-react";
import doctorsHero from "@/assets/doctors-hero.webp";
import { ConditionFinder } from "@/components/ConditionFinder";
import { DoctorConditions } from "@/components/DoctorConditions";
import { DoctorHighlights, DoctorReview } from "@/components/DoctorHighlights";
import { DoctorHospitals } from "@/components/DoctorHospitals";
import { DoctorTimings } from "@/components/DoctorTimings";
import { PageHero } from "@/components/PageHero";
import { Stagger, StaggerItem } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { doctors, doctorSlug, whatsappLink } from "@/data/site";

export default function Doctors() {
  const [expandedDoctor, setExpandedDoctor] = useState<string | null>(doctors[0]?.name ?? null);

  return (
    <main>
      <PageHero
        kicker="Our doctors"
        title="Meet our specialists. Trusted expertise."
        description="Full doctor profiles from the Wellstar doctors page — read each bio and book directly on WhatsApp."
        image={doctorsHero}
        imageAlt="Caring clinician speaking warmly with a patient"
        actions={
          <Button asChild variant="accent" size="lg">
            <a href={whatsappLink("Hello, I would like to book with a doctor at Wellstar.")} target="_blank" rel="noreferrer">
              Book a doctor <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        }
      />

      <section className="section-y border-t border-border bg-surface">
        <Stagger className="mx-auto grid w-full max-w-5xl items-start gap-6 px-4 sm:px-8 md:grid-cols-2 lg:px-10" gap={0.12}>
          {doctors.map((doctor) => {
            const isOpen = expandedDoctor === doctor.name;
            const bioId = `bio-${doctor.name.replace(/\W+/g, "-").toLowerCase()}`;
            return (
              <StaggerItem key={doctor.name} id={doctorSlug(doctor.name)} className="scroll-mt-28">
                <article className="card-glass card-lift group overflow-hidden">
                  <div className="relative aspect-[4/4] overflow-hidden bg-secondary">
                    <img
                      src={doctor.image}
                      loading="lazy"
                      alt={doctor.name}
                      className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" aria-hidden="true" />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                      <p className="inline-flex rounded-full bg-brand-red px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider">
                        {doctor.specialty}
                      </p>
                      <h2 className="mt-3 font-display text-3xl font-black">{doctor.name}</h2>
                    </div>
                  </div>
                  <div className="p-6 sm:p-7">
                    <p className="flex gap-2.5 text-sm font-semibold leading-6 text-primary">
                      <GraduationCap aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
                      {doctor.credentials}
                    </p>
                    <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-brand-teal/40 bg-accent px-3 py-1 text-xs font-bold tracking-wide text-accent-foreground">
                      <BadgeCheck aria-hidden="true" className="size-4" />
                      {doctor.registration}
                    </p>
                    <DoctorTimings timings={doctor.timings} className="mt-4" />
                    {doctor.hospitals && <DoctorHospitals hospitals={doctor.hospitals} className="mt-3" />}
                    <DoctorHighlights doctor={doctor} className="mt-4" />
                    <DoctorConditions doctor={doctor} className="mt-6" />
                    <DoctorReview doctor={doctor} className="mt-6" />

                    <motion.div layout className="mt-4 text-sm leading-6 text-muted-foreground">
                      <p>{doctor.bio[0]}</p>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={bioId}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-3 pt-3">
                              {doctor.bio.slice(1).map((paragraph) => (
                                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={bioId}
                      className="mt-3 inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-sm font-bold text-primary"
                      onClick={() => setExpandedDoctor(isOpen ? null : doctor.name)}
                    >
                      {isOpen ? "Show less" : "Read full bio"}
                      <ChevronDown aria-hidden="true" className={`size-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </button>

                    <Button asChild className="mt-4 w-full">
                      <a href={whatsappLink(`Hello, I would like to book with ${doctor.name}.`)} target="_blank" rel="noreferrer">
                        Book with Dr. {doctor.name.split(" ")[1]} <ArrowUpRight aria-hidden="true" />
                      </a>
                    </Button>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      <ConditionFinder />
    </main>
  );
}
