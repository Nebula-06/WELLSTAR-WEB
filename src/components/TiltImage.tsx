import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";

/** Photo panel with a 3D mouse tilt, moving glare and gentle scroll parallax. */
export function TiltImage({
  src,
  alt,
  position,
  className = "",
  children,
}: {
  src: string;
  alt: string;
  position?: string;
  className?: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), { stiffness: 180, damping: 18 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-9, 9]), { stiffness: 180, damping: 18 });
  const glareX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(py, [0, 1], ["0%", "100%"]);
  const glare = useMotionTemplate`radial-gradient(520px circle at ${glareX} ${glareY}, rgba(255,255,255,0.28), transparent 55%)`;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  }

  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div ref={ref} className={`[perspective:1100px] ${className}`}>
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative isolate size-full overflow-hidden rounded-[1.6rem] shadow-2xl"
      >
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          className="absolute inset-x-0 -top-[10%] -z-10 h-[120%] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ y: imageY, objectPosition: position }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#030816] from-5% via-[#030816]/65 via-45% to-[#030816]/5" aria-hidden="true" />
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glare }}
          aria-hidden="true"
        />
        <div className="relative flex size-full flex-col justify-end p-6 sm:p-8" style={{ transform: "translateZ(40px)" }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
