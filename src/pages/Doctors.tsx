import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import doctorsHero from "@/assets/doctors-hero.webp";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { doctors, whatsappLink } from "@/data/site";

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
          <Button asChild className="min-h-11 rounded-sm">
            <a href={whatsappLink("Hello, I would like to book with a doctor at Wellstar.")} target="_blank" rel="noreferrer">
              Book a doctor <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        }
      />

      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {doctors.map((doctor) => {
            const isOpen = expandedDoctor === doctor.name;
            return (
              <Reveal key={doctor.name} className="surface-card overflow-hidden">
                <div className="relative aspect-[4/3] bg-secondary">
                  <img src={doctor.image} alt={doctor.name} className="size-full object-cover object-top" />
                </div>
                <div className="p-5 sm:p-6">
                  <h2 className="font-display text-2xl text-foreground">{doctor.name}</h2>
                  <p className="mt-2 text-sm leading-5 text-muted-foreground">{doctor.credentials}</p>
                  <p className="mt-3 border-t border-border pt-3 text-sm font-medium leading-6 text-foreground">{doctor.specialty}</p>
                  <div className={`mt-3 space-y-3 text-sm leading-6 text-muted-foreground ${isOpen ? "" : "line-clamp-4"}`}>
                    {doctor.bio.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="mt-3 text-sm font-semibold text-primary"
                    onClick={() => setExpandedDoctor(isOpen ? null : doctor.name)}
                  >
                    {isOpen ? "Show less" : "Read full bio"}
                  </button>
                  <Button asChild variant="outline" className="mt-5 min-h-11 w-full rounded-sm">
                    <a href={whatsappLink(`Hello, I would like to book with ${doctor.name}.`)} target="_blank" rel="noreferrer">
                      Book with {doctor.name.split(" ").slice(-1)[0]} <ArrowUpRight aria-hidden="true" />
                    </a>
                  </Button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </main>
  );
}
