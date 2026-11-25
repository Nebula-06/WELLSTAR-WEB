// Real photos of the clinic for the home page collage (optimised from src/assets/clinic/originals).
import consultation from "@/assets/clinic/consultation.webp";
import corridor from "@/assets/clinic/corridor.webp";
import reception from "@/assets/clinic/reception.webp";

export type ClinicPhoto = { src: string; alt: string; label: string; position?: string };

export const clinicPhotos: { main: ClinicPhoto; top: ClinicPhoto; bottom: ClinicPhoto } = {
  main: {
    src: consultation,
    alt: "Dr. Shakeeb Ahmer consulting a patient at Wellstar Polyclinic",
    label: "Consultation",
    position: "48% 35%",
  },
  top: {
    src: corridor,
    alt: "Consultation rooms and the corridor at Wellstar Polyclinic",
    label: "Our clinic",
    position: "50% 62%",
  },
  bottom: {
    src: reception,
    alt: "Reception and waiting area at Wellstar Polyclinic",
    label: "Reception",
    position: "50% 42%",
  },
};
