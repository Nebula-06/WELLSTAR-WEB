import { doctors, whatsappLink, type Doctor, type DoctorCondition } from "@/data/site";

export type ConditionMatch = { doctor: Doctor; condition: DoctorCondition };

const normalize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9' -]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/**
 * True when what the patient typed matches a condition: the query appears in the condition's
 * name or keywords ("thyr" → Thyroid), or a keyword appears in a longer query
 * ("i have high sugar" → Diabetes).
 */
export function conditionMatches(condition: DoctorCondition, query: string) {
  const q = normalize(query);
  if (!q) return true;
  return [condition.label, ...condition.keywords].map(normalize).some((term) => {
    if (term.includes(q)) return true;
    if (q.length < 3 || term.length < 2) return false;
    // Whole-word check so short keywords like "bp" don't match inside other words.
    return new RegExp(`(^|\\s)${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(\\s|$)`).test(q);
  });
}

/** Every condition across all doctors, in doctor order. */
export const allConditions: ConditionMatch[] = doctors.flatMap((doctor) =>
  doctor.conditions.map((condition) => ({ doctor, condition })),
);

export function searchConditions(query: string): ConditionMatch[] {
  return allConditions.filter(({ condition }) => conditionMatches(condition, query));
}

/** Words that suggest the patient may need emergency care rather than a clinic visit. */
const EMERGENCY_TERMS = [
  "chest pain",
  "heart attack",
  "can't breathe",
  "cannot breathe",
  "breathless",
  "difficulty breathing",
  "breathing difficulty",
  "unconscious",
  "fainted",
  "fainting",
  "seizure",
  "stroke",
  "paralysis",
  "accident",
  "suicide",
  "suicidal",
];

export function looksLikeEmergency(query: string) {
  const q = normalize(query);
  return q.length > 3 && EMERGENCY_TERMS.some((term) => q.includes(term));
}

export const firstName = (doctor: Doctor) => doctor.name.split(" ")[1];

export const bookForCondition = (doctor: Doctor, condition?: DoctorCondition) =>
  whatsappLink(
    condition
      ? `Hello, I would like to book with ${doctor.name} for: ${condition.label}.`
      : `Hello, I would like to book with ${doctor.name}.`,
  );
