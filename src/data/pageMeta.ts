/** Per-route <title> and description. Used in the browser (usePageMeta) and by the build-time pre-renderer. */
export type PageMeta = { title: string; description: string };

export const pageMeta: Record<string, PageMeta> = {
  "/": {
    title: "Wellstar Polyclinic & Diagnostic Centre | Hebbal, Bengaluru",
    description:
      "Multispecialty clinic in Hebbal, Bengaluru — physician, gynecology, orthopedics, dermatology and day care, with an on-site lab, health packages and pharmacy delivery.",
  },
  "/about": {
    title: "About Wellstar | Polyclinic & Diagnostic Centre, Hebbal",
    description:
      "Wellstar Polyclinic & Diagnostic Centre in Hebbal, Bengaluru — specialists, diagnostics and pharmacy under one roof, where expertise meets empathy.",
  },
  "/doctors": {
    title: "Our Doctors | Wellstar Polyclinic, Hebbal",
    description:
      "Meet Dr. Shakeeb Ahmer (Internal Medicine) and Dr. Mehnaz Rashid (Obstetrics & Gynecology) at Wellstar Polyclinic, Hebbal. Book on WhatsApp.",
  },
  "/services": {
    title: "Medical Services | Wellstar Polyclinic, Hebbal",
    description:
      "General physician & internal medicine, gynecology & obstetrics, orthopedics, dermatology and day care at Wellstar Polyclinic, Hebbal, Bengaluru.",
  },
  "/lab": {
    title: "Health Packages from ₹999 & Lab Tests | Wellstar, Hebbal",
    description:
      "Doctor-curated general and women’s health packages from ₹999, home sample collection, blood tests, ECG and CTG/NST at Wellstar Diagnostic Centre, Hebbal.",
  },
  "/pharmacy": {
    title: "Pharmacy & Medicine Home Delivery | Wellstar, Hebbal",
    description:
      "WHO-GMP quality medicines, affordable pricing and doctor-supervised dispensing, with home delivery within 2 km of Wellstar, Hebbal. Call 63637 78957.",
  },
  "/contact": {
    title: "Contact & Directions | Wellstar Polyclinic, Hebbal",
    description:
      "Visit Wellstar Polyclinic at 45/2, 8th A Cross Rd, Kanaka Nagar, Hebbal, Bengaluru. Mon–Sat 8 AM–10 PM, Sun 8 AM–1 PM. Call +91 63620 64109.",
  },
};

/** "/lab/" → "/lab" (hosts may serve pages with or without a trailing slash). */
export function normalizePath(pathname: string): string {
  return pathname.replace(/\/+$/, "") || "/";
}

export function metaFor(pathname: string): PageMeta {
  return pageMeta[normalizePath(pathname)] ?? pageMeta["/"];
}
