import type { LucideIcon } from "lucide-react";
import { Bone, HeartPulse, Sparkles, Stethoscope, Syringe } from "lucide-react";
import dayCareImage from "@/assets/services/day-care.webp";
import dermatologyImage from "@/assets/services/dermatology.webp";
import generalPhysicianImage from "@/assets/services/general-physician.webp";
import gynecologyImage from "@/assets/services/gynecology.webp";
import orthopedicsImage from "@/assets/services/orthopedics.webp";

/** Photo, alt text, icon and accent colour per specialty id (photos: see assets/services/CREDITS.md). */
export const serviceMedia: Record<string, { image: string; alt: string; icon: LucideIcon; accent: string; position?: string }> = {
  "general-physician": {
    image: generalPhysicianImage,
    alt: "Physician with a stethoscope talking with a patient during a consultation",
    icon: Stethoscope,
    accent: "#3fd0da",
    position: "60% 30%",
  },
  gynecology: {
    image: gynecologyImage,
    alt: "Doctor speaking with a pregnant patient in a clinic room",
    icon: HeartPulse,
    accent: "#ff8a98",
    position: "55% 40%",
  },
  orthopedics: {
    image: orthopedicsImage,
    alt: "Doctor fitting a wrist splint on a patient’s arm",
    icon: Bone,
    accent: "#9bbcff",
    position: "50% 50%",
  },
  dermatology: {
    image: dermatologyImage,
    alt: "Patient receiving a facial skin treatment from a gloved clinician",
    icon: Sparkles,
    accent: "#f6c177",
    position: "55% 45%",
  },
  "day-care": {
    image: dayCareImage,
    alt: "Patient resting in bed with an IV line in the hand",
    icon: Syringe,
    accent: "#7fe0e8",
    position: "50% 50%",
  },
};
