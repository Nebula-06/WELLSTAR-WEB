import type { ReactNode } from "react";
import { motion } from "motion/react";

/** Shared motion tokens: one easing curve, calm durations, short travel distances. */
const EASE = [0.22, 1, 0.36, 1] as const;
const DURATION = 0.65;

export function Reveal({
  children,
  className = "",
  id,
  delay = 0,
  y = 20,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: DURATION, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Staggers its direct <StaggerItem> children as the group scrolls into view. */
export function Stagger({ children, className = "", gap = 0.07 }: { children: ReactNode; className?: string; gap?: number }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <motion.div
      id={id}
      className={className}
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: DURATION, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}
