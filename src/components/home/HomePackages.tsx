import { Link } from "react-router-dom";
import { ArrowUpRight, Check, House } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import {
  FEATURED_PACKAGES,
  formatInr,
  generalHealthPackages,
  PACKAGES_TAGLINE,
  whatsappLink,
  womensHealthPackages,
  type HealthPackage,
} from "@/data/site";

const allPackages = [...generalHealthPackages, ...womensHealthPackages];
const featured = FEATURED_PACKAGES.map((name) => allPackages.find((pkg) => pkg.name === name)).filter(
  (pkg): pkg is HealthPackage => Boolean(pkg),
);
const SHOWN_TESTS = 4;

export function HomePackages() {
  return (
    <section className="section-y relative overflow-hidden">
      <div className="container-x relative">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="kicker">{PACKAGES_TAGLINE}</p>
            <h2 className="section-title mt-4">
              Health packages <span className="text-gradient">from {formatInr(Math.min(...allPackages.map((p) => p.offerPrice)))}.</span>
            </h2>
            <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <House aria-hidden="true" className="size-4 text-brand-teal" /> We collect samples from home.
            </p>
          </div>
          <Button asChild variant="outline" size="lg" className="self-start lg:self-auto">
            <Link to="/lab#packages">
              See all {allPackages.length} packages <ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
        </Reveal>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" gap={0.1}>
          {featured.map((pkg, index) => {
            const saving = Math.round(((pkg.originalPrice - pkg.offerPrice) / pkg.originalPrice) * 100);
            const extra = pkg.tests.length - SHOWN_TESTS;
            const highlight = index === featured.length - 1;
            return (
              <StaggerItem key={pkg.name} className="h-full">
                <article
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] p-6 transition duration-300 hover:-translate-y-1.5 ${
                    highlight ? "bg-navy-mesh text-white shadow-2xl" : "card-glass"
                  }`}
                >
                  {highlight && (
                    <span className="absolute right-5 top-5 rounded-full bg-white px-2.5 py-1 text-[0.65rem] font-black uppercase tracking-wider text-[#0a2a6e]">
                      Full body
                    </span>
                  )}
                  <p className={`text-xs font-bold uppercase tracking-[0.16em] ${highlight ? "text-white/70" : "text-muted-foreground"}`}>
                    {pkg.tests.length} tests
                  </p>
                  <h3 className={`mt-2 font-display text-2xl font-black leading-tight ${highlight ? "text-white" : "text-foreground"}`}>
                    {pkg.name}
                  </h3>
                  <ul className="mt-4 grid flex-1 content-start gap-1.5">
                    {pkg.tests.slice(0, SHOWN_TESTS).map((test) => (
                      <li key={test} className={`flex items-center gap-2 text-sm ${highlight ? "text-white/85" : "text-foreground"}`}>
                        <Check aria-hidden="true" className={`size-4 shrink-0 ${highlight ? "text-[#3fd0da]" : "text-brand-teal"}`} strokeWidth={3} />
                        {test}
                      </li>
                    ))}
                    {extra > 0 && (
                      <li className={`pl-6 text-sm font-semibold ${highlight ? "text-[#7fe0e8]" : "text-primary"}`}>+ {extra} more {extra === 1 ? "test" : "tests"}</li>
                    )}
                  </ul>
                  <div className={`mt-6 border-t border-dashed pt-4 ${highlight ? "border-white/20" : "border-border"}`}>
                    <div className="flex items-end justify-between gap-2">
                      <div>
                        <p className={`text-xs font-semibold line-through ${highlight ? "text-white/55" : "text-muted-foreground"}`}>
                          MRP {formatInr(pkg.originalPrice)}
                        </p>
                        <p className={`font-display text-4xl font-black leading-none ${highlight ? "text-[#ff8a98]" : "text-brand-red"}`}>
                          {formatInr(pkg.offerPrice)}
                        </p>
                      </div>
                      <span className="rounded-full bg-brand-red px-2.5 py-1 text-xs font-extrabold text-brand-red-foreground">Save {saving}%</span>
                    </div>
                    <Button asChild variant={highlight ? "light" : "default"} className="mt-5 w-full">
                      <a
                        href={whatsappLink(`Hello, I would like to book the ${pkg.name} package (package price ${formatInr(pkg.offerPrice)}).`)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Book now<span className="sr-only"> — {pkg.name} package on WhatsApp</span> <ArrowUpRight aria-hidden="true" />
                      </a>
                    </Button>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
