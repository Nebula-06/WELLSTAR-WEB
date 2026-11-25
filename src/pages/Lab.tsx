import {
  Activity,
  ArrowDown,
  ArrowUpRight,
  Baby,
  Clock3,
  Droplets,
  FileText,
  FlaskConical,
  Flower2,
  HeartPulse,
  House,
  Microscope,
  Phone,
  ScanLine,
  ShieldCheck,
  Stethoscope,
  TestTube,
  Thermometer,
  Venus,
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

const packageSections = [
  { id: "packages", label: "General Health Packages", short: "General", kicker: PACKAGES_TAGLINE, packages: generalHealthPackages },
  { id: "womens-packages", label: "Women’s Health Packages", short: "Women’s", kicker: "Women’s health", packages: womensHealthPackages },
] as const;

const labInfo: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: House,
    title: "Home sample collection",
    description: `We collect samples from home. Book on WhatsApp or call ${PACKAGES_PHONE_DISPLAY}.`,
  },
  {
    icon: Clock3,
    title: "Fasting tests",
    description:
      "FBS, lipid profile and OGTT usually need 8–12 hours of fasting (water is fine). PPBS is taken 2 hours after a meal. We’ll confirm when you book.",
  },
  {
    icon: FileText,
    title: "Digital health records",
    description: "Accurate, efficient testing with digital health records for seamless follow-up care.",
  },
];

const allPackages =[...generalHealthPackages, ...womensHealthPackages];
const lowestPrice = Math.min(...allPackages.map((pkg) => pkg.offerPrice));

export default function Lab() {
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
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff8a98]">Expert Quality Care</p>
            <p className="mt-3 font-display text-4xl font-black leading-none sm:text-5xl">Health Packages</p>
            <p className="mt-3 font-serif text-2xl italic text-[#7fe0e8]">{PACKAGES_TAGLINE}</p>
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

      {packageSections.map((section, sectionIndex) => {
        const isWomen = section.id === "womens-packages";
        const other = packageSections[1 - sectionIndex];
        return (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-title`}
            className={`section-y relative isolate scroll-mt-24 overflow-hidden ${isWomen ? "" : "border-t border-border bg-surface"}`}
          >
            {isWomen && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_85%_0%,color-mix(in_oklab,var(--ws-red)_9%,transparent),transparent_70%),radial-gradient(50%_45%_at_0%_100%,color-mix(in_oklab,var(--ws-teal)_8%,transparent),transparent_70%)]"
              />
            )}
            <div className="container-x">
              <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <p className="kicker">{section.kicker}</p>
                  <h2 id={`${section.id}-title`} className="section-title mt-4">
                    {section.label}
                  </h2>
                  <p className="mt-4 text-sm font-semibold text-muted-foreground">
                    {section.packages.length} packages · from{" "}
                    <span className="text-brand-red">{formatInr(Math.min(...section.packages.map((pkg) => pkg.offerPrice)))}</span>
                  </p>
                </div>
                <a
                  href={`#${other.id}`}
                  className="group inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-border bg-card px-5 text-sm font-bold text-foreground shadow-sm transition hover:border-primary hover:text-primary lg:self-auto"
                >
                  {isWomen ? <HeartPulse aria-hidden="true" className="size-4" /> : <Venus aria-hidden="true" className="size-4 text-brand-red" />}
                  {other.short} packages ({other.packages.length})
                  <ArrowDown
                    aria-hidden="true"
                    className={`size-4 transition-transform ${isWomen ? "rotate-180 group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}`}
                  />
                </a>
              </Reveal>

              <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {section.packages.map((pkg, index) => (
                  <PackageCard key={pkg.name} pkg={pkg} index={index} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="section-y relative border-y border-border bg-surface">
        <div className="container-x">
          <Stagger className="grid gap-4 md:grid-cols-3" gap={0.08}>
            {labInfo.map((item) => (
              <StaggerItem key={item.title} className="card-glass flex gap-4 p-6">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-teal text-white">
                  <item.icon aria-hidden="true" className="size-6" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-extrabold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

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
