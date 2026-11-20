import { useState, type FormEvent } from "react";
import { ArrowUpRight, Clock3, MapPin, Phone } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CLINIC_ADDRESS,
  EMAIL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  MAPS_URL,
  PHARMACY_DELIVERY_URL,
  PHONE_URL,
  questions,
  specialties,
  whatsappLink,
} from "@/data/site";

export default function Contact() {
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
    ].filter(Boolean).join("\n");

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
            <Button asChild className="min-h-11 rounded-sm">
              <a href={whatsappLink("Hello, I would like to get in touch with Wellstar.")} target="_blank" rel="noreferrer">
                WhatsApp <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="outline" className="min-h-11 rounded-sm">
              <a href={PHONE_URL}><Phone aria-hidden="true" /> +91 63620 64109</a>
            </Button>
          </div>
        }
      />

      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12">
          <Reveal className="flex flex-col gap-6">
            <div className="flex gap-4 border-b border-border pb-5">
              <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-primary" />
              <div>
                <h2 className="font-semibold">Address</h2>
                <p className="mt-1 leading-6 text-muted-foreground">{CLINIC_ADDRESS}, IN.</p>
                <a href={MAPS_URL} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Directions <ArrowUpRight aria-hidden="true" className="size-4" />
                </a>
              </div>
            </div>
            <div className="flex gap-4 border-b border-border pb-5">
              <Phone aria-hidden="true" className="mt-1 size-5 shrink-0 text-primary" />
              <div>
                <h2 className="font-semibold">Call the clinic</h2>
                <a href={PHONE_URL} className="mt-1 inline-block text-muted-foreground">+91 63620 64109</a>
                <p className="mt-2 text-sm text-muted-foreground">
                  Pharmacy delivery: <a href={PHARMACY_DELIVERY_URL} className="font-medium text-primary">+91 63637 78957</a>
                </p>
              </div>
            </div>
            <div className="flex gap-4 border-b border-border pb-5">
              <Clock3 aria-hidden="true" className="mt-1 size-5 shrink-0 text-primary" />
              <div>
                <h2 className="font-semibold">Opening hours</h2>
                <p className="mt-1 text-muted-foreground">Mon–Sat: 8:00 AM – 10:00 PM</p>
                <p className="mt-1 text-muted-foreground">Sunday: 8:00 AM – 1:00 PM</p>
              </div>
            </div>
            <div>
              <h2 className="font-semibold">Email & social</h2>
              <a href={`mailto:${EMAIL}`} className="mt-2 block text-muted-foreground">{EMAIL}</a>
              <div className="mt-3 flex flex-wrap gap-3">
                <Button asChild variant="outline" className="min-h-10 rounded-sm">
                  <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram <ArrowUpRight aria-hidden="true" /></a>
                </Button>
                <Button asChild variant="outline" className="min-h-10 rounded-sm">
                  <a href={FACEBOOK_URL} target="_blank" rel="noreferrer">Facebook <ArrowUpRight aria-hidden="true" /></a>
                </Button>
              </div>
            </div>
          </Reveal>
          <Reveal className="overflow-hidden rounded-sm border border-border bg-secondary">
            <iframe
              title="Map showing Wellstar Polyclinic & Diagnostic Centre in Hebbal, Bengaluru"
              src={`https://www.google.com/maps?q=${encodeURIComponent(CLINIC_ADDRESS)}&output=embed`}
              className="aspect-[4/3] min-h-72 w-full border-0 lg:aspect-auto lg:h-full lg:min-h-[27rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </Reveal>
        </div>
      </section>

      <section id="contact-form" className="border-t border-border bg-clinic-surface px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <p className="section-kicker">Contact form</p>
            <h2 className="section-title mt-3">Let’s find the right next step.</h2>
            <p className="mt-4 leading-7 text-muted-foreground">Share a few details and WhatsApp opens with your message ready.</p>
          </Reveal>
          <Reveal className="rounded-sm border border-border bg-card p-5 sm:p-8">
            <form onSubmit={handleContactSubmit} className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="contact-name">Name</Label>
                  <Input id="contact-name" name="name" autoComplete="name" placeholder="Name" required className="min-h-11 rounded-sm bg-background" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact-phone">Phone Number</Label>
                  <Input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="Phone Number" required className="min-h-11 rounded-sm bg-background" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-specialty">Specialty</Label>
                <Select value={specialty} onValueChange={(value) => { setSpecialty(value); setFormError(""); }}>
                  <SelectTrigger id="contact-specialty" aria-required="true" aria-invalid={Boolean(formError)} className="min-h-11 rounded-sm bg-background">
                    <SelectValue placeholder="Choose a specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map((item) => <SelectItem key={item.title} value={item.title}>{item.title}</SelectItem>)}
                    <SelectItem value="Lab & Diagnostic">Lab & Diagnostic</SelectItem>
                    <SelectItem value="Medicines & Supplies">Medicines & Supplies</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-message">Message</Label>
                <Textarea id="contact-message" name="message" placeholder="Message" rows={4} className="rounded-sm bg-background" />
              </div>
              {formError && <p role="alert" className="text-sm text-destructive">{formError}</p>}
              <Button type="submit" className="min-h-12 w-full rounded-sm sm:w-fit sm:px-6">Continue to WhatsApp <ArrowUpRight aria-hidden="true" /></Button>
            </form>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <Reveal>
            <p className="section-kicker">FAQ</p>
            <h2 className="section-title mt-3">A few helpful answers.</h2>
          </Reveal>
          <Reveal>
            <Accordion type="single" collapsible className="w-full">
              {questions.map((item, index) => (
                <AccordionItem key={item.question} value={`question-${index}`} className="border-border">
                  <AccordionTrigger className="py-5 text-left text-base hover:no-underline">{item.question}</AccordionTrigger>
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
