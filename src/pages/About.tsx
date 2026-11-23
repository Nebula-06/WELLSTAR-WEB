import { ArrowUpRight, Building2, Check, Microscope, MonitorSmartphone, Phone, ShieldCheck, type LucideIcon } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { SpotlightCard } from "@/components/SpotlightCard";
import { Button } from "@/components/ui/button";
import { teamRoles, values, whatsappLink, PHONE_URL } from "@/data/site";
import { usePageMeta } from "@/hooks/usePageMeta";

const valueIcons: LucideIcon[] = [Building2, ShieldCheck, Microscope, MonitorSmartphone];

export default function About() {
  usePageMeta(
    "About Wellstar | Polyclinic & Diagnostic Centre, Hebbal",
    "Wellstar Polyclinic & Diagnostic Centre in Hebbal, Bengaluru — specialists, diagnostics and pharmacy under one roof, where expertise meets empathy.",
  );
  return (
    <main>
      <PageHero
        kicker="About us"
        title="Where expertise meets empathy."
        description="Wellstar Polyclinic was founded by Syed Ashfaq and a dedicated founding team so affordable, high-quality healthcare is accessible under one roof."
        actions={
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="accent" size="lg">
              <a href={whatsappLink("Hello, I would like to know more about Wellstar Polyclinic.")} target="_blank" rel="noreferrer">
                Ask on WhatsApp <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={PHONE_URL}>
                <Phone aria-hidden="true" /> Call clinic
              </a>
            </Button>
          </div>
        }
      />

      <section className="section-y border-t border-border bg-surface">
        <div className="container-x grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <Reveal className="card-glass space-y-6 p-7 text-lg leading-8 text-muted-foreground sm:p-10">
            <p>
              <span className="font-display text-2xl font-extrabold text-foreground">
                At Wellstar Polyclinic & Diagnostic Centre, we believe healthcare should be personal, trusted and continuous.
              </span>{" "}
              Led by Dr. Shakeeb Ahmer, Physician Specialist, and Dr. Mehnaz Rashid, Consultant Obstetrician & Gynecologist, Wellstar is where expertise meets empathy.
            </p>
            <p>
              Every consultation is guided by experience, compassion and advanced medical science. Our Diagnostic Centre ensures accurate, efficient testing with digital health records for seamless follow-up care — whether you need a routine check-up, specialist consultation or preventive screening.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="bg-navy-mesh relative overflow-hidden rounded-[1.75rem] p-7 text-white sm:p-10">
            <div className="pointer-events-none absolute -bottom-16 -right-16 size-56 animate-spin-slow rounded-full border-2 border-dashed border-white/15" aria-hidden="true" />
            <h2 className="font-display text-3xl font-black">Our team includes</h2>
            <Stagger className="mt-6 grid gap-3" gap={0.06}>
              {teamRoles.map((role) => (
                <StaggerItem key={role}>
                  <p className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-white/90 backdrop-blur">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#3fd0da] text-[#041029]">
                      <Check aria-hidden="true" className="size-3" strokeWidth={3.5} />
                    </span>
                    <span>{role}</span>
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="kicker">Why Wellstar</p>
            <h2 className="section-title mt-4">
              A multi-specialty <span className="text-gradient">health hub</span> for your family.
            </h2>
          </Reveal>
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((item, index) => {
              const Icon = valueIcons[index] ?? Building2;
              return (
                <StaggerItem key={item.title} className="h-full">
                  <SpotlightCard className="card-glass card-lift h-full p-7">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                      <Icon aria-hidden="true" className="size-6" />
                    </span>
                    <h3 className="mt-6 font-display text-xl font-extrabold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                  </SpotlightCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>
    </main>
  );
}
