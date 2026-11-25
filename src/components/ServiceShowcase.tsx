import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowUpRight, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { serviceMedia } from "@/data/serviceMedia";
import { specialties, whatsappLink } from "@/data/site";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Expanding photo panels (desktop) / swipeable photo cards (mobile) for the specialties.
 * Pattern inspired by 21st.dev "expandable gallery" cards.
 */
export function ServiceShowcase() {
  const [active, setActive] = useState(0);
  const total = specialties.length;

  return (
    <>
      {/* Desktop: expanding panels */}
      <div className="hidden h-[36rem] gap-3 lg:flex">
        {specialties.map((item, index) => {
          const media = serviceMedia[item.id];
          const Icon = media?.icon ?? Stethoscope;
          const isActive = index === active;
          return (
            <motion.div
              key={item.id}
              className="group relative isolate min-w-0 cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 shadow-xl"
              animate={{ flexGrow: isActive ? 5.2 : 1 }}
              style={{ flexBasis: 0 }}
              transition={{ type: "spring", stiffness: 160, damping: 24 }}
              onMouseEnter={() => setActive(index)}
              onClick={() => setActive(index)}
            >
              <motion.img
                src={media?.image}
                alt={media?.alt ?? ""}
                loading="lazy"
                className="absolute inset-0 -z-10 size-full object-cover"
                style={{ objectPosition: media?.position }}
                animate={{ scale: isActive ? 1.04 : 1.18 }}
                transition={{ duration: 1.1, ease: EASE }}
              />
              <div
                className={`absolute inset-0 -z-10 transition-colors duration-500 ${
                  isActive
                    ? "bg-gradient-to-t from-[#030816] from-10% via-[#030816]/75 via-45% to-[#030816]/5"
                    : "bg-[#071637]/70 group-hover:bg-[#071637]/55"
                }`}
                aria-hidden="true"
              />

              {/* Collapsed state */}
              <AnimatePresence>
                {!isActive && (
                  <motion.button
                    type="button"
                    aria-label={`Show ${item.title}`}
                    onFocus={() => setActive(index)}
                    className="absolute inset-0 flex flex-col items-center justify-between py-7 text-white focus-visible:outline-offset-[-6px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.2 } }}
                    exit={{ opacity: 0, transition: { duration: 0.12 } }}
                  >
                    <span className="font-display text-sm font-black text-white/60">0{index + 1}</span>
                    <span className="font-display text-xl font-extrabold tracking-tight [writing-mode:vertical-rl] rotate-180 whitespace-nowrap">
                      {item.title}
                    </span>
                    <span
                      className="flex size-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur transition-transform duration-300 group-hover:scale-110"
                      style={{ color: media?.accent }}
                    >
                      <Icon aria-hidden="true" className="size-6" />
                    </span>
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Expanded state */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    className="absolute inset-x-0 bottom-0 p-8 text-white xl:p-10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.22, duration: 0.55, ease: EASE } }}
                    exit={{ opacity: 0, y: 12, transition: { duration: 0.15 } }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="flex size-12 items-center justify-center rounded-2xl text-[#041029] shadow-lg"
                        style={{ backgroundColor: media?.accent }}
                      >
                        <Icon aria-hidden="true" className="size-6" />
                      </span>
                      <span className="font-display text-sm font-bold tracking-[0.2em] text-white/70">
                        0{index + 1} / 0{total}
                      </span>
                    </div>
                    <h3 className="mt-5 max-w-xl font-display text-4xl font-black leading-[1.05] xl:text-5xl">{item.title}</h3>
                    <p className="mt-3 max-w-lg text-base font-semibold" style={{ color: media?.accent }}>
                      {item.lead}
                    </p>
                    <p className="mt-2 max-w-lg text-sm leading-6 text-white/80">{item.summary}</p>
                    <div className="mt-6 flex flex-wrap gap-2.5">
                      <Button asChild variant="light">
                        <a href={`#${item.id}`}>
                          View details <ArrowDown aria-hidden="true" />
                        </a>
                      </Button>
                      <Button asChild variant="glass">
                        <a href={whatsappLink(`Hello, I would like to ask about ${item.title}.`)} target="_blank" rel="noreferrer">
                          Book / ask on WhatsApp <ArrowUpRight aria-hidden="true" />
                        </a>
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile / tablet: swipeable cards */}
      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:hidden">
        {specialties.map((item, index) => {
          const media = serviceMedia[item.id];
          const Icon = media?.icon ?? Stethoscope;
          return (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              className="relative isolate flex aspect-[3/4] w-[78%] shrink-0 snap-center flex-col justify-end overflow-hidden rounded-[1.75rem] p-6 text-white shadow-xl sm:w-[46%]"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: index * 0.06 }}
              whileTap={{ scale: 0.97 }}
            >
              <img
                src={media?.image}
                alt={media?.alt ?? ""}
                loading="lazy"
                className="absolute inset-0 -z-10 size-full object-cover"
                style={{ objectPosition: media?.position }}
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#030816] from-15% via-[#030816]/70 via-50% to-[#030816]/10" aria-hidden="true" />
              <span className="absolute left-5 top-5 font-display text-sm font-black text-white/70">0{index + 1}</span>
              <span
                className="flex size-11 items-center justify-center rounded-2xl text-[#041029]"
                style={{ backgroundColor: media?.accent }}
              >
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <h3 className="mt-4 font-display text-2xl font-black leading-tight">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/80">{item.lead}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: media?.accent }}>
                View details <ArrowDown aria-hidden="true" className="size-4" />
              </span>
            </motion.a>
          );
        })}
      </div>
    </>
  );
}
