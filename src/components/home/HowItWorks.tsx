import { motion } from "motion/react";
import { CalendarCheck, MessageCircle, Stethoscope, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { PHONE_URL, whatsappLink } from "@/data/site";

const EASE = [0.22, 1, 0.36, 1] as const;

const steps: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: MessageCircle,
    title: "Message or call us",
    text: "Send a WhatsApp message or call +91 63620 64109 with your concern, the doctor you’d like to see or the package you need.",
  },
  {
    icon: CalendarCheck,
    title: "We confirm your slot",
    text: "Our front desk confirms a time with the right specialist — or a slot for home sample collection.",
  },
  {
    icon: Stethoscope,
    title: "Visit, or get tested at home",
    text: "See your specialist at the clinic or give samples at home, with digital health records for seamless follow-up care.",
  },
];

export function HowItWorks() {
  return (
    <section className="section-y relative overflow-hidden px-3 sm:px-6">
      <div className="bg-navy-mesh relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] px-6 py-16 text-white sm:px-12 sm:py-20">
        <Reveal className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#7fe0e8]">
            How it works
          </p>
          <h2 className="mt-4 font-display text-4xl font-black leading-[1.05] sm:text-5xl">
            Booking takes <span className="font-serif font-normal italic tracking-normal text-[#ff8a98]">one message.</span>
          </h2>
        </Reveal>

        <div className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-6">
          {/* connecting line (desktop) */}
          <motion.div
            className="absolute left-[8%] right-[8%] top-8 hidden h-0.5 origin-left bg-gradient-to-r from-[#3fd0da] via-white/60 to-[#ff8a98] md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
            aria-hidden="true"
          />
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.3 + index * 0.25 }}
            >
              <div className="flex items-center gap-4 md:flex-col md:items-start">
                <span className="relative flex size-16 shrink-0 items-center justify-center rounded-2xl bg-white text-[#0a2a6e] shadow-xl">
                  <step.icon aria-hidden="true" className="size-7" />
                  <span className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full bg-[#d7263d] font-display text-sm font-black text-white">
                    {index + 1}
                  </span>
                </span>
                <h3 className="font-display text-2xl font-extrabold md:mt-6">{step.title}</h3>
              </div>
              <p className="mt-3 max-w-sm text-sm leading-6 text-white/80">{step.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="relative mt-12 flex flex-wrap gap-3">
          <Button asChild variant="light" size="lg">
            <a href={whatsappLink("Hello, I would like to book an appointment.")} target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden="true" /> Book on WhatsApp
            </a>
          </Button>
          <Button asChild variant="glass" size="lg">
            <a href={PHONE_URL}>Call +91 63620 64109</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
