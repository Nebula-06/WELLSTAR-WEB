import { ArrowUpRight, BadgeIndianRupee, Phone, ShieldCheck, Stethoscope, Truck, type LucideIcon } from "lucide-react";
import pharmacyHero from "@/assets/pharmacy-hero.webp";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { SpotlightCard } from "@/components/SpotlightCard";
import { Button } from "@/components/ui/button";
import { pharmacyCategories, pharmacyPoints, PHARMACY_DELIVERY_URL, whatsappLink } from "@/data/site";
import { usePageMeta } from "@/hooks/usePageMeta";

const pointIcons: LucideIcon[] = [ShieldCheck, BadgeIndianRupee, Truck, Stethoscope];

export default function Pharmacy() {
  usePageMeta(
    "Pharmacy & Medicine Home Delivery | Wellstar, Hebbal",
    "WHO-GMP quality medicines, affordable pricing and doctor-supervised dispensing, with home delivery within 2 km of Wellstar, Hebbal. Call 63637 78957.",
  );
  return (
    <main>
      <PageHero
        kicker="Medicines & supplies"
        title="Prescribed medicines. Get home delivery."
        description="WHO-GMP quality medicines, affordable pricing, doctor-supervised dispensing and delivery within 2 km."
        image={pharmacyHero}
        imageAlt="Medicines, capsules and pharmacy supplies"
        actions={
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="accent" size="lg">
              <a href={PHARMACY_DELIVERY_URL}>
                <Truck aria-hidden="true" /> Call 63637 78957
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={whatsappLink("Hello, I would like to ask about medicines or pharmacy delivery.")} target="_blank" rel="noreferrer">
                Ask on WhatsApp <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
          </div>
        }
      />

      <section className="section-y border-t border-border bg-surface">
        <div className="container-x">
          <Stagger className="flex flex-wrap gap-2.5" gap={0.05}>
            {pharmacyCategories.map((category) => (
              <StaggerItem key={category}>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 font-display text-sm font-bold text-foreground shadow-sm">
                  <span className="size-2 rounded-full bg-brand-teal" aria-hidden="true" />
                  {category}
                </span>
              </StaggerItem>
            ))}
          </Stagger>

          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pharmacyPoints.map((item, index) => {
              const Icon = pointIcons[index] ?? ShieldCheck;
              return (
                <StaggerItem key={item.title} className="h-full">
                  <SpotlightCard className="card-glass card-lift h-full p-7">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary transition-all duration-300 group-hover:-rotate-6 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon aria-hidden="true" className="size-6" />
                    </span>
                    <h2 className="mt-6 font-display text-xl font-extrabold text-foreground">{item.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                  </SpotlightCard>
                </StaggerItem>
              );
            })}
          </Stagger>

          <Reveal className="bg-navy-mesh relative mt-12 overflow-hidden rounded-[2rem] p-8 text-white sm:p-12">
            <Truck aria-hidden="true" className="pointer-events-none absolute -bottom-6 -right-4 size-48 text-white/10 sm:size-64" />
            <h2 className="font-display text-4xl font-black sm:text-5xl">Need medicines urgently?</h2>
            <p className="mt-4 max-w-2xl text-white/80">
              Call this number for immediate medicine delivery within 2 km, or message the clinic on WhatsApp.
            </p>
            <div className="relative mt-8 flex flex-wrap gap-3">
              <Button asChild variant="light" size="lg">
                <a href={PHARMACY_DELIVERY_URL}>
                  <Phone aria-hidden="true" /> 63637 78957
                </a>
              </Button>
              <Button asChild variant="glass" size="lg">
                <a href={whatsappLink("Hello, I need pharmacy / medicine delivery support.")} target="_blank" rel="noreferrer">
                  WhatsApp clinic <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
