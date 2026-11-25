import type { CSSProperties, RefObject } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { HeartPulse } from "lucide-react";
import { clinicPhotos, type ClinicPhoto } from "@/data/clinicPhotos";
import { doctors } from "@/data/site";

function Tile({
  photo,
  y,
  delay,
  className,
  priority = false,
}: {
  photo: ClinicPhoto;
  y: MotionValue<string>;
  delay: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`anim-lift group relative overflow-hidden rounded-[1.75rem] border border-white/60 bg-muted shadow-[var(--ws-shadow-lg)] ${className ?? ""}`}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      <motion.img
        src={photo.src}
        alt={photo.alt}
        fetchPriority={priority ? "high" : "low"}
        loading="eager"
        decoding="async"
        className="absolute inset-x-0 -top-6 h-[calc(100%+3rem)] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        style={{ y, objectPosition: photo.position ?? "50% 50%" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-transparent to-ink/25" aria-hidden="true" />
      <span className="absolute left-3 top-3 rounded-full border border-white/30 bg-black/30 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
        {photo.label}
      </span>
    </div>
  );
}

/** Home hero: three clinic photos in an asymmetric collage, each drifting at its own scroll speed. */
export function HeroCollage({ heroRef }: { heroRef: RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const mainY = useTransform(scrollYProgress, [0, 1], ["0rem", "2.5rem"]);
  const topY = useTransform(scrollYProgress, [0, 1], ["0rem", "-1.5rem"]);
  const bottomY = useTransform(scrollYProgress, [0, 1], ["0rem", "1.5rem"]);
  const floatY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <div className="relative mx-auto mb-8 w-full max-w-xl sm:mb-0 lg:max-w-none">
      <div className="grid aspect-[6/5] grid-cols-[1.35fr_1fr] grid-rows-2 gap-3 sm:gap-4 lg:aspect-[1/1]">
        <Tile photo={clinicPhotos.main} y={mainY} delay={150} priority className="row-span-2" />
        <Tile photo={clinicPhotos.top} y={topY} delay={260} />
        <Tile photo={clinicPhotos.bottom} y={bottomY} delay={370} />
      </div>

      <motion.div style={{ y: floatY }} className="absolute -bottom-8 left-3 z-10 sm:-left-8 sm:bottom-16">
        <div className="card-glass flex animate-float items-center gap-3 px-4 py-3.5">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand-red text-white">
            <HeartPulse aria-hidden="true" className="size-5" />
          </span>
          <span>
            <span className="block font-display text-sm font-extrabold text-foreground">Care that feels personal</span>
            <span className="mt-0.5 block text-xs text-muted-foreground">Clinic · Diagnostics · Pharmacy</span>
          </span>
        </div>
      </motion.div>

      <Link
        to="/doctors"
        className="card-glass absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 items-center gap-3 px-4 py-3 transition hover:-translate-y-[calc(50%+2px)] sm:flex lg:-right-6"
      >
        <span className="flex -space-x-3">
          {doctors.map((doctor) => (
            <img
              key={doctor.name}
              src={doctor.image}
              alt=""
              loading="lazy"
              width={40}
              height={40}
              className="size-10 rounded-full border-2 border-card object-cover object-top"
            />
          ))}
        </span>
        <span className="font-display text-sm font-extrabold text-foreground">Our Doctors</span>
      </Link>
    </div>
  );
}
