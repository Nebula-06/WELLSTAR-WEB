import { Navigation, Phone, Siren } from "lucide-react";
import { OpenStatusBadge } from "@/components/OpenStatusBadge";
import { ClinicMap } from "@/components/ClinicMap";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { CLINIC_ADDRESS, CLINIC_HOURS, EMERGENCY_NOTE, EMERGENCY_URL, MAPS_URL, PHONE_URL } from "@/data/site";
import { formatClock, useOpenStatus } from "@/hooks/useOpenStatus";

// Show Monday first, Sunday last.
const ORDER = [1, 2, 3, 4, 5, 6, 0];

export function VisitUs() {
  const today = useOpenStatus()?.today ?? -1;

  return (
    <section className="section-y border-t border-border">
      <div className="container-x grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="card-glass flex flex-col p-7 sm:p-9">
          <p className="kicker self-start">Visit us</p>
          <h2 className="mt-4 font-display text-4xl font-black leading-tight text-foreground">Find us in Hebbal.</h2>
          <p className="mt-3 leading-7 text-muted-foreground">{CLINIC_ADDRESS}</p>
          <OpenStatusBadge className="mt-5 self-start" />

          <table className="mt-6 w-full text-sm">
            <caption className="sr-only">Opening hours</caption>
            <tbody>
              {ORDER.map((dayIndex) => {
                const hours = CLINIC_HOURS[dayIndex];
                const isToday = dayIndex === today;
                return (
                  <tr key={hours.day} className={isToday ? "font-bold text-primary" : "text-muted-foreground"}>
                    <th scope="row" className={`py-1.5 pr-4 text-left font-semibold ${isToday ? "text-primary" : "text-foreground"}`}>
                      {hours.day}
                      {isToday && <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-[0.65rem] uppercase tracking-wider text-primary-foreground">Today</span>}
                    </th>
                    <td className="py-1.5 text-right">
                      {formatClock(hours.open)} – {formatClock(hours.close)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <Button asChild variant="accent">
              <a href={MAPS_URL} target="_blank" rel="noreferrer">
                <Navigation aria-hidden="true" /> Get directions
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={PHONE_URL}>
                <Phone aria-hidden="true" /> +91 63620 64109
              </a>
            </Button>
          </div>

          <p className="mt-6 flex gap-2.5 rounded-2xl border border-brand-red/30 bg-brand-red/10 p-3.5 text-sm leading-6 text-foreground">
            <Siren aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-red" />
            <span>
              {EMERGENCY_NOTE.split("call 108")[0]}
              <a href={EMERGENCY_URL} className="font-bold text-brand-red underline underline-offset-2">
                call 108
              </a>
              {EMERGENCY_NOTE.split("call 108")[1]}
            </span>
          </p>
        </Reveal>

        <Reveal delay={0.1} className="relative min-h-80 overflow-hidden rounded-[2rem] border border-border shadow-xl lg:min-h-full">
          <ClinicMap />
        </Reveal>
      </div>
    </section>
  );
}
