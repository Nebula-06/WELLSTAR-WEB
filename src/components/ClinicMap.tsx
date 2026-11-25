import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { CLINIC_ADDRESS } from "@/data/site";

const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(CLINIC_ADDRESS)}&output=embed`;

/**
 * Google Maps embed that loads only once it is (nearly) on screen. The embed is heavy, and the
 * browser's own loading="lazy" still fetches it well before it is visible, which slows the page.
 */
export function ClinicMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShow(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 bg-muted">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground" aria-hidden="true">
        <MapPin className="size-8 text-primary" />
        <span className="text-sm font-semibold">Loading map…</span>
      </div>
      {show && (
        <iframe
          title="Map showing Wellstar Polyclinic & Diagnostic Centre in Hebbal, Bengaluru"
          src={MAP_SRC}
          className="absolute inset-0 size-full border-0"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      )}
    </div>
  );
}
