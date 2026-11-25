import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/** Counts from 0 to `to` the first time it scrolls into view. */
export function CountUp({ to, prefix = "", className = "" }: { to: number; prefix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (reduce) {
      el.textContent = `${prefix}${to.toLocaleString("en-IN")}`;
      return;
    }
    const controls = animate(0, to, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (value) => {
        el.textContent = `${prefix}${Math.round(value).toLocaleString("en-IN")}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, prefix, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {to.toLocaleString("en-IN")}
    </span>
  );
}
