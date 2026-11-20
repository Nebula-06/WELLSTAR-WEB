import { ArrowUpRight } from "lucide-react";
import servicesHero from "@/assets/services-hero.webp";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { specialties, whatsappLink } from "@/data/site";

export default function Services() {
  return (
    <main>
      <PageHero
        kicker="Our services"
        title="Highlighting the care & support."
        description="Full multi-specialty services from the Wellstar services page — diagnostics and care under one roof."
        image={servicesHero}
        imageAlt="Doctor consulting with a smiling patient in clinic"
        actions={
          <Button asChild className="min-h-11 rounded-sm">
            <a href={whatsappLink("Hello, I would like to ask about your medical services.")} target="_blank" rel="noreferrer">
              Ask about services <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        }
      />

      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl space-y-5">
          {specialties.map((item, index) => (
            <Reveal key={item.id} id={item.id} className="surface-card scroll-mt-28 p-5 sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
                <div className="lg:w-[38%]">
                  <p className="mb-2 text-xs font-medium text-clinic-gold">0{index + 1}</p>
                  <h2 className="font-display text-2xl leading-tight text-foreground sm:text-3xl">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.lead}</p>
                  <Button asChild variant="outline" className="mt-5 min-h-11 rounded-sm">
                    <a href={whatsappLink(`Hello, I would like to ask about ${item.title}.`)} target="_blank" rel="noreferrer">
                      Book / ask on WhatsApp <ArrowUpRight aria-hidden="true" />
                    </a>
                  </Button>
                </div>
                <div className="lg:w-[62%]">
                  <p className="text-sm leading-7 text-muted-foreground sm:text-base">{item.description}</p>
                  <ul className="mt-5 space-y-2">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-6 text-foreground">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
