import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import {
  diagnostics,
  formatInr,
  generalHealthPackages,
  type HealthPackage,
  whatsappLink,
  womensHealthPackages,
} from "@/data/site";

function PackageCard({
  pkg,
  accent,
}: {
  pkg: HealthPackage;
  accent: "general" | "women";
}) {
  const bookHref = whatsappLink(
    `Hello, I would like to book the ${pkg.name} package (offer ${formatInr(pkg.offerPrice)}).`,
  );

  return (
    <Reveal className="surface-card flex h-full flex-col p-5 sm:p-6">
      <p className={`text-[11px] font-semibold uppercase tracking-[0.12em] ${accent === "women" ? "text-rose-700" : "text-primary"}`}>
        {accent === "women" ? "Women’s Health Packages" : "General Health Packages"}
      </p>
      <h3 className="mt-3 font-display text-2xl text-foreground">{pkg.name}</h3>
      <ul className="mt-4 grid flex-1 grid-cols-1 gap-x-4 gap-y-1.5 sm:grid-cols-2">
        {pkg.tests.map((test) => (
          <li key={test} className="flex gap-2 text-sm leading-5 text-muted-foreground">
            <span className="mt-2 size-1 shrink-0 rounded-full bg-clinic-gold" aria-hidden="true" />
            <span>{test}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 border-t border-border pt-4">
        <p className="text-xs uppercase text-muted-foreground">Package price</p>
        <div className="mt-1 flex flex-wrap items-end gap-3">
          <span className="text-sm text-muted-foreground line-through">{formatInr(pkg.originalPrice)}</span>
          <span className={`font-display text-3xl ${accent === "women" ? "text-rose-700" : "text-primary"}`}>
            {formatInr(pkg.offerPrice)}
          </span>
        </div>
        <Button asChild className="mt-4 min-h-11 w-full rounded-sm">
          <a href={bookHref} target="_blank" rel="noreferrer">
            Book now <ArrowUpRight aria-hidden="true" />
          </a>
        </Button>
      </div>
    </Reveal>
  );
}

export default function Lab() {
  return (
    <main>
      <PageHero
        kicker="Lab & diagnostic"
        title="Accurate diagnostics. Trusted results."
        description="Health packages and individual tests from the Wellstar Lab & Diagnostic page — including General and Women’s packages."
        actions={
          <Button asChild className="min-h-11 rounded-sm">
            <a href={whatsappLink("Hello, I would like to book a lab test / health package.")} target="_blank" rel="noreferrer">
              Book lab test now <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        }
      />

      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="section-title">General Health Packages</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">Fever, basic, comprehensive, anemia and diabetes packages with offer pricing.</p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {generalHealthPackages.map((pkg) => (
              <PackageCard key={pkg.name} pkg={pkg} accent="general" />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-clinic-surface px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="section-title">Women’s Health Packages</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">Antenatal, PCOS/infertility, women’s health and fertility packages.</p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {womensHealthPackages.map((pkg) => (
              <PackageCard key={pkg.name} pkg={pkg} accent="women" />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button asChild className="min-h-12 rounded-sm px-6">
              <a href={whatsappLink("Hello, I would like to book a lab test / health package.")} target="_blank" rel="noreferrer">
                Book Lab Test Now <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="section-title">Individual lab & diagnostic services</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">Ask us which tests you need — including partner imaging nearby for X-ray and ultrasound.</p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {diagnostics.map((item) => (
              <Reveal key={item.title} className="border-t-2 border-primary pt-5">
                <h3 className="font-display text-xl text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
