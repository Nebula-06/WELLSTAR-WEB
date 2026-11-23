import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Activity,
  ArrowUpRight,
  Baby,
  Droplets,
  FlaskConical,
  Flower2,
  HeartPulse,
  Microscope,
  Phone,
  ScanLine,
  ShieldCheck,
  Stethoscope,
  TestTube,
  Thermometer,
  type LucideIcon,
} from "lucide-react";
import { PackageCard } from "@/components/PackageCard";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import {
  diagnostics,
  formatInr,
  generalHealthPackages,
  PACKAGES_PHONE_DISPLAY,
  PACKAGES_PHONE_URL,
  PACKAGES_TAGLINE,
  whatsappLink,
  womensHealthPackages,
} from "@/data/site";

const diagnosticIcons: Record<string, LucideIcon> = {
  "Blood & Urine Tests": Droplets,
  "Allergy Testing": Flower2,
  "Sexual Health Screening": ShieldCheck,
  "Full Body & Preventive Health Check-ups": HeartPulse,
  "Hormone & Vitamin Panels": FlaskConical,
  "Diabetes Profile": TestTube,
  "Kidney & Liver Function (RFT, LFT)": Microscope,
  "Fever & Infection Profile": Thermometer,
  "ECG (Electrocardiogram)": Activity,
  "Lipid & Cardiac Profile": Stethoscope,
  "CTG / NST": Baby,
  "Partner imaging": ScanLine,
};

const tabs = [
  { id: "general", label: "General Health Packages", short: "General", packages: generalHealthPackages },
  { id: "women", label: "Women’s Health Packages", short: "Women’s", packages: womensHealthPackages },
] as const;

type TabId = (typeof tabs)[number]["id"];

const allPackages = [...generalHealthPackages, ...womensHealthPackages];
const lowestPrice = Math.min(...allPackages.map((pkg) => pkg.offerPrice));

export default function Lab() {
  const [activeTab, setActiveTab] = useState<TabId>("general");
  const current = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  return (
    <main>
      <PageHero
        kicker="Lab & diagnostic"
        title="Accurate diagnostics. Trusted results."
        description="Health packages and individual tests from the Wellstar Lab & Diagnostic page — including General and Women’s packages."
        actions={
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="accent" size="lg">
              <a href={whatsappLink("Hello, I would like to book a lab test / health package.")} target="_blank" rel="noreferrer">
                Book lab test now <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={PACKAGES_PHONE_URL}>
                <Phone aria-hidden="true" /> Mob: {PACKAGES_PHONE_DISPLAY}
              </a>
            </Button>
          </div>
        }
        aside={
          <div className="bg-navy-mesh relative overflow-hidden rounded-[2rem] p-7 text-white shadow-2xl sm:p-9">
            <div
              className="pointer-events-none absolute -bottom-20 -right-20 size-64 animate-spin-slow rounded-full border-2 border-dashed border-white/15"
              aria-hidden="true"
            />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff8a98]">Expert Quality Care</p>
            <p className="mt-3 font-display text-4xl font-black leading-none sm:text-5xl">Health Packages</p>
            <p className="mt-3 font-display text-xl font-bold italic text-[#7fe0e8]">{PACKAGES_TAGLINE}</p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                <p className="font-display text-4xl font-black">{allPackages.length}</p>
                <p className="mt-1 text-xs text-white/75">General & women’s packages</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                <p className="font-display text-4xl font-black text-[#ff8a98]">{formatInr(lowestPrice)}</p>
                <p className="mt-1 text-xs text-white/75">Package prices from</p>
              </div>
            </div>
            <a
              href={PACKAGES_PHONE_URL}
              className="mt-4 flex items-center justify-between rounded-2xl bg-white px-5 py-3.5 font-display text-lg font-extrabold text-[#0a2a6e] transition hover:-translate-y-0.5"
            >
              <span>MOB: {PACKAGES_PHONE_DISPLAY}</span>
              <Phone aria-hidden="true" className="size-5 text-[#d7263d]" />
            </a>
          </div>
        }
      />

      <section id="packages" className="section-y relative scroll-mt-24 border-y border-border bg-surface">
        <div className="container-x">
          <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="kicker">{PACKAGES_TAGLINE}</p>
              <h2 className="section-title mt-4">{current.label}</h2>
            </div>

            <div
              role="tablist"
              aria-label="Health package categories"
              className="inline-flex w-full rounded-full border border-border bg-card p-1.5 shadow-sm sm:w-auto"
            >
              {tabs.map((tab) => {
                const selected = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    id={`tab-${tab.id}`}
                    aria-selected={selected}
                    aria-controls="package-panel"
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative min-h-11 flex-1 cursor-pointer rounded-full px-5 text-sm font-bold transition-colors sm:flex-none ${
                      selected ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {selected && (
                      <motion.span
                        layoutId="package-tab"
                        className="absolute inset-0 rounded-full bg-primary"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative">
                      {tab.short} <span className="opacity-70">({tab.packages.length})</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <div id="package-panel" role="tabpanel" aria-labelledby={`tab-${activeTab}`} className="mt-12">
            <AnimatePresence mode="popLayout">
              <motion.div key={activeTab} className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {current.packages.map((pkg, index) => (
                  <PackageCard key={pkg.name} pkg={pkg} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <Reveal className="mt-14 flex flex-col items-center gap-4 text-center">
            <Button asChild variant="accent" size="lg">
              <a href={whatsappLink("Hello, I would like to book a lab test / health package.")} target="_blank" rel="noreferrer">
                Book Lab Test Now <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
            <a href={PACKAGES_PHONE_URL} className="text-sm font-semibold text-muted-foreground hover:text-primary">
              MOB: {PACKAGES_PHONE_DISPLAY}
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="kicker">Diagnostics</p>
            <h2 className="section-title mt-4">Individual lab & diagnostic services</h2>
            <p className="mt-4 text-muted-foreground">Ask us which tests you need — including partner imaging nearby for X-ray and ultrasound.</p>
          </Reveal>
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {diagnostics.map((item, index) => {
              const Icon = diagnosticIcons[item.title] ?? FlaskConical;
              const featured = index === 0 || index === 3;
              return (
                <StaggerItem
                  key={item.title}
                  className={`card-glass card-lift group p-6 ${featured ? "lg:col-span-2" : ""}`}
                >
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary transition-all duration-300 group-hover:rotate-[-8deg] group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon aria-hidden="true" className="size-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-extrabold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>
    </main>
  );
}
