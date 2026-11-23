import { motion } from "motion/react";

/** Decorative heartbeat trace that draws itself in — Wellstar's signature motif. */
export function EcgLine({ className = "", strokeClassName = "stroke-brand-red" }: { className?: string; strokeClassName?: string }) {
  return (
    <svg viewBox="0 0 600 80" fill="none" preserveAspectRatio="none" className={className} aria-hidden="true">
      <motion.path
        d="M0 40 H170 L190 40 L205 12 L222 70 L238 4 L254 58 L266 40 H330 L345 40 L356 26 L368 40 H600"
        className={strokeClassName}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, ease: "easeInOut" }}
      />
    </svg>
  );
}
