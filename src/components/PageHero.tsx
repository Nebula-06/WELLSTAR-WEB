import { Fragment, type ReactNode } from "react";
import { motion } from "motion/react";
import { EcgLine } from "@/components/EcgLine";

const EASE = [0.22, 1, 0.36, 1] as const;

export function PageHero({
  kicker,
  title,
  description,
  actions,
  image,
  imageAlt,
  aside,
}: {
  kicker: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  image?: string;
  imageAlt?: string;
  aside?: ReactNode;
}) {
  const words = title.split(" ");
  const hasSide = Boolean(image || aside);

  return (
    <section className="relative isolate overflow-hidden pt-28 sm:pt-32">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-32 -top-32 -z-10 size-[30rem] rounded-full bg-brand-teal/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-40 top-40 -z-10 size-[26rem] rounded-full bg-primary/15 blur-3xl"
        aria-hidden="true"
      />

      <div className={`container-x grid gap-12 pb-16 sm:pb-20 ${hasSide ? "lg:grid-cols-[1.05fr_0.95fr] lg:items-center" : ""}`}>
        <div>
          <motion.p
            className="kicker"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span className="size-1.5 rounded-full bg-brand-red" aria-hidden="true" />
            {kicker}
          </motion.p>
          <h1 className="mt-5 max-w-3xl font-display text-[2.6rem] font-black leading-[1.02] text-foreground sm:text-6xl lg:text-7xl">
            {words.map((word, index) => (
              <Fragment key={`${word}-${index}`}>
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, y: "0.6em", filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.08 + index * 0.06 }}
                >
                  {word}
                </motion.span>
                {index < words.length - 1 && " "}
              </Fragment>
            ))}
          </h1>
          <EcgLine className="mt-5 h-8 w-56 sm:w-72" />
          {description && (
            <motion.p
              className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
            >
              {description}
            </motion.p>
          )}
          {actions && (
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.45 }}
            >
              {actions}
            </motion.div>
          )}
        </div>

        {image && (
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.94, rotate: 1.5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          >
            <div
              className="absolute -inset-3 -z-10 rounded-[2.4rem] bg-gradient-to-br from-primary/30 via-brand-teal/20 to-brand-red/25 blur-xl"
              aria-hidden="true"
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/40 shadow-2xl">
              <img src={image} alt={imageAlt ?? ""} className="absolute inset-0 size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" aria-hidden="true" />
            </div>
          </motion.div>
        )}
        {!image && aside && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          >
            {aside}
          </motion.div>
        )}
      </div>
    </section>
  );
}
