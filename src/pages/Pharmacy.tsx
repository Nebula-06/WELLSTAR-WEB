import { ArrowUpRight, Phone, Truck } from "lucide-react";
import pharmacyHero from "@/assets/pharmacy-hero.webp";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import {
  pharmacyCategories,
  pharmacyPoints,
  PHARMACY_DELIVERY_URL,
  whatsappLink,
} from "@/data/site";

export default function Pharmacy() {
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
            <Button asChild className="min-h-11 rounded-sm">
              <a href={PHARMACY_DELIVERY_URL}>
                <Truck aria-hidden="true" /> Call 63637 78957
              </a>
            </Button>
            <Button asChild variant="outline" className="min-h-11 rounded-sm">
              <a href={whatsappLink("Hello, I would like to ask about medicines or pharmacy delivery.")} target="_blank" rel="noreferrer">
                Ask on WhatsApp <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
          </div>
        }
      />

      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2">
            {pharmacyCategories.map((category) => (
              <span key={category} className="rounded-sm border border-border bg-clinic-surface px-3 py-1.5 text-sm">
                {category}
              </span>
            ))}
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pharmacyPoints.map((item) => (
              <Reveal key={item.title} className="border-t border-border pt-5">
                <h2 className="font-display text-2xl text-foreground">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 rounded-sm border border-border bg-card p-6 sm:p-8">
            <h2 className="font-display text-3xl text-foreground">Need medicines urgently?</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Call this number for immediate medicine delivery within 2 km, or message the clinic on WhatsApp.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="min-h-11 rounded-sm">
                <a href={PHARMACY_DELIVERY_URL}><Phone aria-hidden="true" /> 63637 78957</a>
              </Button>
              <Button asChild variant="outline" className="min-h-11 rounded-sm">
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
