import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowUpRight, Stethoscope } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { serviceMedia } from "@/data/serviceMedia";
import { specialties } from "@/data/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export function HomeSpecialties() {
  return (
    <section className="section-y">
      <div className="container-x">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="kicker">Our services</p>
            <h2 className="section-title mt-4">
              Specialist care, <span className="text-gradient">close to home.</span>
            </h2>
            <p className="mt-5 leading-7 text-muted-foreground">
              {specialties.length} specialties including physician care, gynecology, orthopedics, dermatology and day care.
            </p>
          </div>
          <Button asChild variant="outline" size="lg" className="self-start lg:self-auto">
            <Link to="/services">
              All services <ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
        </Reveal>

        <div className="-mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0 lg:pb-0">
          {specialties.map((item, index) => {
            const media = serviceMedia[item.id];
            const Icon = media?.icon ?? Stethoscope;
            return (
              <motion.div
                key={item.id}
                className={`w-[72%] shrink-0 snap-center sm:w-[42%] lg:w-auto ${index % 2 === 1 ? "lg:mt-10" : ""}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{ duration: 0.7, ease: EASE, delay: index * 0.08 }}
              >
                <Link
                  to={`/services#${item.id}`}
                  className="group relative isolate flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-[1.75rem] p-5 text-white shadow-xl"
                >
                  <img
                    src={media?.image}
                    alt={media?.alt ?? ""}
                    loading="lazy"
                    className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{ objectPosition: media?.position }}
                  />
                  <div
                    className="absolute inset-0 -z-10 bg-gradient-to-t from-[#030816] from-10% via-[#030816]/60 via-45% to-[#030816]/0 transition-opacity duration-500"
                    aria-hidden="true"
                  />
                  <span className="absolute left-5 top-5 font-display text-sm font-black text-white/75">0{index + 1}</span>
                  <span
                    className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/15 opacity-0 backdrop-blur transition-all duration-300 group-hover:rotate-45 group-hover:opacity-100"
                    aria-hidden="true"
                  >
                    <ArrowUpRight className="size-5" />
                  </span>
                  <span
                    className="flex size-11 items-center justify-center rounded-2xl text-[#041029] transition-transform duration-300 group-hover:-translate-y-1"
                    style={{ backgroundColor: media?.accent }}
                  >
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="mt-3 font-display text-xl font-black leading-tight">{item.title}</h3>
                  <p className="mt-1 text-sm leading-5 text-white/80 lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:transition-all lg:duration-500 lg:group-hover:mt-2 lg:group-hover:max-h-24 lg:group-hover:opacity-100 lg:group-focus-visible:max-h-24 lg:group-focus-visible:opacity-100">
                    {item.summary}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
