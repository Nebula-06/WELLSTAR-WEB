import { useState, type FormEvent } from "react";
import { ArrowUpRight, Clock3, Mail, MapPin, Phone, Siren } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { SpotlightCard } from "@/components/SpotlightCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CLINIC_ADDRESS,
  EMAIL,
  EMERGENCY_NOTE,
  EMERGENCY_URL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  MAPS_URL,
  PHARMACY_DELIVERY_URL,
  PHONE_URL,
  questions,
  specialties,
  whatsappLink,
} from "@/data/site";
import { usePageMeta } from "@/hooks/usePageMeta";

const fieldClass = "min-h-12 rounded-2xl border-input bg-background px-4 text-base sm:text-sm";

export default function Contact() {
  usePageMeta(
    "Contact & Directions | Wellstar Polyclinic, Hebbal",
    "Visit Wellstar Polyclinic at 45/2, 8th A Cross Rd, Kanaka Nagar, Hebbal, Bengaluru. Mon–Sat 8 AM–10 PM, Sun 8 AM–1 PM. Call +91 63620 64109.",
  );
  const [specialty, setSpecialty] = useState("");
  const [formError, setFormError] = useState("");

  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!specialty) {
      setFormError("Please choose a specialty.");
      return;
    }

    setFormError("");
    const text = [
      "Hello, I would like to get in touch with Wellstar Polyclinic & Diagnostic Centre.",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Specialty: ${specialty}`,
      message ? `Message: ${message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
  }

  return (
    <main>
      <PageHero
        kicker="Visit us / Contact"
        title="Get in touch."
        description="Find us in Kanaka Nagar, Hebbal — or message WhatsApp with your details ready to send."
        actions={
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="accent" size="lg">
              <a href={whatsappLink("Hello, I would like to get in touch with Wellstar.")} target="_blank" rel="noreferrer">
                WhatsApp <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={PHONE_URL}>
                <Phone aria-hidden="true" /> +91 63620 64109
              </a>
            </Button>
          </div>
        }
      />

      <section className="section-y border-t border-border bg-surface">
        <Reveal className="container-x mb-6">
          <div role="note" className="flex flex-col gap-3 rounded-[1.5rem] border border-brand-red/40 bg-brand-red/10 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-start gap-3 text-sm font-semibold leading-6 text-foreground">
              <Siren aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-red" />
              {EMERGENCY_NOTE}
            </p>
            <Button asChild variant="accent" className="shrink-0">
              <a href={EMERGENCY_URL}>
                <Phone aria-hidden="true" /> Call 108
              </a>
            </Button>
          </div>
        </Reveal>
        <div className="container-x grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1" gap={0.07}>
            <StaggerItem>
              <SpotlightCard className="card-glass h-full p-6">
                <div className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                    <MapPin aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <h2 className="font-display text-lg font-extrabold">Address</h2>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{CLINIC_ADDRESS}, IN.</p>
                    <a href={MAPS_URL} target="_blank" rel="noreferrer" className="mt-2 inline-flex min-h-11 items-center gap-1 text-sm font-bold text-primary">
                      Directions <ArrowUpRight aria-hidden="true" className="size-4" />
                    </a>
                  </div>
                </div>
              </SpotlightCard>
            </StaggerItem>
            <StaggerItem>
              <SpotlightCard className="card-glass h-full p-6">
                <div className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand-red text-white">
                    <Phone aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <h2 className="font-display text-lg font-extrabold">Call the clinic</h2>
                    <a href={PHONE_URL} className="mt-1 inline-block font-display text-xl font-black text-foreground hover:text-primary">
                      +91 63620 64109
                    </a>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Pharmacy delivery:{" "}
                      <a href={PHARMACY_DELIVERY_URL} className="font-bold text-primary">
                        +91 63637 78957
                      </a>
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </StaggerItem>
            <StaggerItem>
              <SpotlightCard className="card-glass h-full p-6">
                <div className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand-teal text-white">
                    <Clock3 aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <h2 className="font-display text-lg font-extrabold">Opening hours</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Mon–Sat: 8:00 AM – 10:00 PM</p>
                    <p className="mt-1 text-sm text-muted-foreground">Sunday: 8:00 AM – 1:00 PM</p>
                  </div>
                </div>
              </SpotlightCard>
            </StaggerItem>
            <StaggerItem>
              <SpotlightCard className="card-glass h-full p-6">
                <div className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
                    <Mail aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <h2 className="font-display text-lg font-extrabold">Email & social</h2>
                    <a href={`mailto:${EMAIL}`} className="mt-1 block text-sm text-muted-foreground hover:text-primary">
                      {EMAIL}
                    </a>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button asChild variant="outline">
                        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                          Instagram <ArrowUpRight aria-hidden="true" />
                        </a>
                      </Button>
                      <Button asChild variant="outline">
                        <a href={FACEBOOK_URL} target="_blank" rel="noreferrer">
                          Facebook <ArrowUpRight aria-hidden="true" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </StaggerItem>
          </Stagger>

          <Reveal delay={0.1} className="relative min-h-80 overflow-hidden rounded-[2rem] border border-border shadow-xl">
            <iframe
              title="Map showing Wellstar Polyclinic & Diagnostic Centre in Hebbal, Bengaluru"
              src={`https://www.google.com/maps?q=${encodeURIComponent(CLINIC_ADDRESS)}&output=embed`}
              className="absolute inset-0 size-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </Reveal>
        </div>
      </section>

      <section id="contact-form" className="section-y scroll-mt-24">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <p className="kicker">Contact form</p>
            <h2 className="section-title mt-4">
              Let’s find the <span className="text-gradient">right next step.</span>
            </h2>
            <p className="mt-5 leading-7 text-muted-foreground">Share a few details and WhatsApp opens with your message ready.</p>
          </Reveal>
          <Reveal delay={0.1} className="card-glass p-6 sm:p-9">
            <form onSubmit={handleContactSubmit} className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="contact-name" className="font-semibold">Name</Label>
                  <Input id="contact-name" name="name" autoComplete="name" placeholder="Name" required className={fieldClass} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact-phone" className="font-semibold">Phone Number</Label>
                  <Input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="Phone Number" required className={fieldClass} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-specialty" className="font-semibold">Specialty</Label>
                <Select
                  value={specialty}
                  onValueChange={(value) => {
                    setSpecialty(value);
                    setFormError("");
                  }}
                >
                  <SelectTrigger
                    id="contact-specialty"
                    aria-required="true"
                    aria-invalid={Boolean(formError)}
                    aria-describedby={formError ? "contact-specialty-error" : undefined}
                    className={fieldClass}
                  >
                    <SelectValue placeholder="Choose a specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map((item) => (
                      <SelectItem key={item.title} value={item.title}>
                        {item.title}
                      </SelectItem>
                    ))}
                    <SelectItem value="Lab & Diagnostic">Lab & Diagnostic</SelectItem>
                    <SelectItem value="Medicines & Supplies">Medicines & Supplies</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {formError && (
                  <p id="contact-specialty-error" role="alert" className="text-sm font-medium text-destructive">
                    {formError}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-message" className="font-semibold">Message</Label>
                <Textarea id="contact-message" name="message" placeholder="Message" rows={4} className="rounded-2xl bg-background px-4 py-3 text-base sm:text-sm" />
              </div>
              <Button type="submit" variant="accent" size="lg" className="w-full sm:w-fit">
                Continue to WhatsApp <ArrowUpRight aria-hidden="true" />
              </Button>
            </form>
          </Reveal>
        </div>
      </section>

      <section className="section-y border-t border-border bg-surface">
        <div className="container-x grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <Reveal>
            <p className="kicker">FAQ</p>
            <h2 className="section-title mt-4">A few helpful answers.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="grid w-full gap-3">
              {questions.map((item, index) => (
                <AccordionItem
                  key={item.question}
                  value={`question-${index}`}
                  className="card-glass overflow-hidden border px-6 data-[state=open]:border-primary/40"
                >
                  <AccordionTrigger className="min-h-14 py-5 text-left font-display text-lg font-bold hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="max-w-2xl pb-5 text-sm leading-6 text-muted-foreground">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
