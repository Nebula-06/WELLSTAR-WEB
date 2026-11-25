import { BadgeCheck, CalendarCheck, FlaskConical, House, Stethoscope, Truck, type LucideIcon } from "lucide-react";
import { CountUp } from "@/components/CountUp";
import { Stagger, StaggerItem } from "@/components/Reveal";
import { doctors, formatInr, generalHealthPackages, specialties, womensHealthPackages } from "@/data/site";

const packages = [...generalHealthPackages, ...womensHealthPackages];
const fromPrice = Math.min(...packages.map((pkg) => pkg.offerPrice));

type Fact = { icon: LucideIcon; value?: number; title: string; detail: string };

const facts: Fact[] = [
  { icon: BadgeCheck, value: doctors.length, title: "Specialist doctors", detail: "KMC registered" },
  { icon: Stethoscope, value: specialties.length, title: "Specialties", detail: "Under one roof" },
  { icon: FlaskConical, value: packages.length, title: "Health packages", detail: `From ${formatInr(fromPrice)}` },
  { icon: House, title: "Home sample collection", detail: "Book on WhatsApp" },
  { icon: Truck, title: "Medicine delivery", detail: "Within 2 km" },
  { icon: CalendarCheck, title: "Open 7 days", detail: "Mon–Sat 8–10 · Sun 8–1" },
];

export function TrustStrip() {
  return (
    <div className="border-y border-border bg-card/70 backdrop-blur">
      <Stagger className="container-x grid grid-cols-2 gap-px py-2 sm:grid-cols-3 lg:grid-cols-6" gap={0.06}>
        {facts.map((fact) => (
          <StaggerItem key={fact.title} className="flex items-center gap-3 px-2 py-4 sm:px-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
              <fact.icon aria-hidden="true" className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block font-display text-sm font-extrabold leading-tight text-foreground">
                {fact.value !== undefined && <CountUp to={fact.value} className="mr-1 text-brand-red" />}
                {fact.title}
              </span>
              <span className="mt-0.5 block text-xs text-muted-foreground">{fact.detail}</span>
            </span>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
