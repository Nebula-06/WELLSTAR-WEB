import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowUpRight, BadgeCheck, GraduationCap } from "lucide-react";
import { DoctorConditions } from "@/components/DoctorConditions";
import { DoctorTimings } from "@/components/DoctorTimings";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { doctors, whatsappLink } from "@/data/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export function HomeDoctors() {
  return (
    <section className="section-y relative overflow-hidden border-y border-border bg-surface">
      <div className="container-x">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="kicker">Our doctors</p>
            <h2 className="section-title mt-4">
              Meet our specialists. <span className="text-gradient">Trusted expertise.</span>
            </h2>
          </div>
          <Button asChild variant="outline" size="lg" className="self-start lg:self-auto">
            <Link to="/doctors">
              Full profiles <ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {doctors.map((doctor, index) => (
            <motion.article
              key={doctor.name}
              className="card-glass card-lift group grid overflow-hidden sm:grid-cols-[0.85fr_1.15fr]"
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <div className="relative aspect-[4/4] overflow-hidden bg-secondary sm:aspect-auto sm:min-h-full">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent sm:hidden" aria-hidden="true" />
              </div>
              <div className="flex flex-col p-6 sm:p-7">
                <p className="inline-flex self-start rounded-full bg-brand-red px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-brand-red-foreground">
                  {doctor.specialty}
                </p>
                <h3 className="mt-4 font-display text-3xl font-black text-foreground">{doctor.name}</h3>
                <p className="mt-3 flex gap-2 text-sm font-semibold leading-6 text-primary">
                  <GraduationCap aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
                  {doctor.credentials}
                </p>
                <p className="mt-3 inline-flex items-center gap-1.5 self-start rounded-full border border-brand-teal/40 bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
                  <BadgeCheck aria-hidden="true" className="size-4" /> {doctor.registration}
                </p>
                <DoctorTimings timings={doctor.timings} compact className="mt-4 self-start" />
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{doctor.summary}</p>
                <DoctorConditions doctor={doctor} limit={4} className="mt-5" />
                <div className="mt-auto flex flex-wrap gap-2.5 pt-6">
                  <Button asChild>
                    <a href={whatsappLink(`Hello, I would like to book with ${doctor.name}.`)} target="_blank" rel="noreferrer">
                      Book with Dr. {doctor.name.split(" ")[1]} <ArrowUpRight aria-hidden="true" />
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/doctors">Read bio</Link>
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
