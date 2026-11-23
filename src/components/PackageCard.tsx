import { ArrowUpRight, Check, Plus } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { formatInr, type HealthPackage, whatsappLink } from "@/data/site";

export function PackageCard({ pkg, index }: { pkg: HealthPackage; index: number }) {
  const savingPct = Math.round(((pkg.originalPrice - pkg.offerPrice) / pkg.originalPrice) * 100);
  const bookHref = whatsappLink(
    `Hello, I would like to book the ${pkg.name} package (package price ${formatInr(pkg.offerPrice)}).`,
  );

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.96, transition: { duration: 0.18 } }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      className="group relative flex h-full flex-col rounded-[1.75rem] bg-gradient-to-br from-border via-border to-border p-px transition-all duration-300 hover:from-primary hover:via-brand-teal hover:to-brand-red"
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(1.75rem-1px)] bg-card p-6 sm:p-7">
        <div
          className="pointer-events-none absolute -right-16 -top-16 size-44 rounded-full bg-primary/10 blur-2xl transition-all duration-500 group-hover:bg-brand-red/15"
          aria-hidden="true"
        />

        <div className="relative flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
              {pkg.tests.length} tests{pkg.addOns ? " + optional add-on" : ""}
            </p>
            <h3 className="mt-2 font-display text-2xl font-extrabold leading-tight text-foreground">{pkg.name}</h3>
          </div>
          <span className="shrink-0 rounded-full bg-brand-red px-3 py-1 text-xs font-extrabold text-brand-red-foreground shadow-[0_8px_18px_-8px_var(--ws-red)]">
            Save {savingPct}%
          </span>
        </div>

        <ul className="relative mt-5 flex flex-1 flex-wrap content-start gap-2">
          {pkg.tests.map((test) => (
            <li
              key={test}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-3 py-1 text-[0.8rem] font-medium text-foreground"
            >
              <Check aria-hidden="true" className="size-3.5 text-brand-teal" strokeWidth={3} />
              {test}
            </li>
          ))}
        </ul>

        {pkg.addOns && (
          <ul className="relative mt-3 grid gap-2">
            {pkg.addOns.map((addOn) => (
              <li
                key={addOn.test}
                className="flex items-center justify-between gap-3 rounded-2xl border border-dashed border-brand-teal/50 bg-accent/60 px-3.5 py-2 text-sm"
              >
                <span className="inline-flex items-center gap-1.5 font-semibold text-accent-foreground">
                  <Plus aria-hidden="true" className="size-3.5" strokeWidth={3} /> {addOn.test}
                  <span className="font-normal text-muted-foreground">(optional)</span>
                </span>
                <span className="font-bold text-accent-foreground">+{formatInr(addOn.price)}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="relative mt-6 flex items-end justify-between gap-4 border-t border-dashed border-border pt-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              MRP <span className="ml-1 text-sm font-semibold normal-case tracking-normal line-through decoration-brand-red/70 decoration-2">{formatInr(pkg.originalPrice)}</span>
            </p>
            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-brand-teal">Package Price</p>
            <p className="font-display text-4xl font-black leading-none text-brand-red">{formatInr(pkg.offerPrice)}</p>
          </div>
          <Button asChild aria-label={`Book ${pkg.name} package on WhatsApp`}>
            <a href={bookHref} target="_blank" rel="noreferrer">
              Book now <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
