import { ArrowUpRight, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { teamRoles, values, whatsappLink, PHONE_URL } from "@/data/site";

export default function About() {
  return (
    <main>
      <PageHero
        kicker="About us"
        title="Where expertise meets empathy."
        description="Wellstar Polyclinic was founded by Syed Ashfaq and a dedicated founding team so affordable, high-quality healthcare is accessible under one roof."
        actions={
          <div className="flex flex-wrap gap-3">
            <Button asChild className="min-h-11 rounded-sm">
              <a href={whatsappLink("Hello, I would like to know more about Wellstar Polyclinic.")} target="_blank" rel="noreferrer">
                Ask on WhatsApp <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="outline" className="min-h-11 rounded-sm">
              <a href={PHONE_URL}><Phone aria-hidden="true" /> Call clinic</a>
            </Button>
          </div>
        }
      />

      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal className="space-y-5 text-base leading-7 text-muted-foreground">
            <p>
              At Wellstar Polyclinic & Diagnostic Centre, we believe healthcare should be personal, trusted and continuous. Led by Dr. Shakeeb Ahmer, Physician Specialist, and Dr. Mehnaz Rashid, Consultant Obstetrician & Gynecologist, Wellstar is where expertise meets empathy.
            </p>
            <p>
              Every consultation is guided by experience, compassion and advanced medical science. Our Diagnostic Centre ensures accurate, efficient testing with digital health records for seamless follow-up care — whether you need a routine check-up, specialist consultation or preventive screening.
            </p>
          </Reveal>
          <Reveal>
            <h2 className="font-display text-3xl text-foreground">Our team includes</h2>
            <ul className="mt-6 space-y-3">
              {teamRoles.map((role) => (
                <li key={role} className="flex gap-3 border-t border-border pt-3 text-sm leading-6 text-foreground">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  <span>{role}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border bg-clinic-surface px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="section-kicker">Why Wellstar</p>
            <h2 className="section-title mt-3">A multi-specialty health hub for your family.</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((item) => (
              <Reveal key={item.title} className="border-t border-border pt-5">
                <h3 className="font-display text-2xl text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
