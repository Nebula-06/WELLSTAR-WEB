import doctorShakeeb from "@/assets/doctor-shakeeb.webp";
import doctorMehnaz from "@/assets/doctor-mehnaz.webp";

export const SITE_URL = "https://wellstarpolyclinic.com";
export const WHATSAPP_URL ="https://wa.me/916362064109";
export const PHONE_URL = "tel:+916362064109";
export const PHARMACY_DELIVERY_URL = "tel:+916363778957";
export const EMAIL = "frontdesk@wellstar.in";
export const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61583266480205";
export const INSTAGRAM_URL = "https://www.instagram.com/wellstarpolyclinic_2025/";
export const CLINIC_ADDRESS = "45/2, 8th A Cross Rd, Kanaka Nagar, Hebbal, Bengaluru, Karnataka 560045";
export const MAPS_URL = "https://maps.google.com/?q=45%2F2%2C+8th+A+Cross+Rd%2C+Kanaka+Nagar%2C+Hebbal%2C+Bengaluru+560045";

/** Opening hours (IST). Day index follows JS: 0 = Sunday … 6 = Saturday. Times are minutes from midnight. */
export const CLINIC_HOURS: { day: string; open: number; close: number }[] = [
  { day: "Sunday", open: 8 * 60, close: 13 * 60 },
  { day: "Monday", open: 8 * 60, close: 22 * 60 },
  { day: "Tuesday", open: 8 * 60, close: 22 * 60 },
  { day: "Wednesday", open: 8 * 60, close: 22 * 60 },
  { day: "Thursday", open: 8 * 60, close: 22 * 60 },
  { day: "Friday", open: 8 * 60, close: 22 * 60 },
  { day: "Saturday", open: 8 * 60, close: 22 * 60 },
];

/** Health packages featured on the home page (by name). */
export const FEATURED_PACKAGES = ["Basic Fever", "Diabetes Health", "Women's Health", "Comprehensive Health"];

export const EMERGENCY_NOTE =
  "In a medical emergency, call 108 or go to the nearest hospital emergency department.";
export const EMERGENCY_URL = "tel:108";

/*
 * Google reviews. Set these in `.env.local` (see `.env.example`):
 *  - VITE_GOOGLE_PLACE_ID: the clinic's Google Place ID (enables live reviews + "Write a review").
 *  - VITE_GOOGLE_MAPS_API_KEY: a browser key with "Places API (New)" + "Maps JavaScript API",
 *    restricted to the website's domain. Without it, the curated reviews below are shown.
 */
export const GOOGLE_PLACE_ID: string = import.meta.env.VITE_GOOGLE_PLACE_ID ?? "";
export const GOOGLE_MAPS_API_KEY: string = import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? "";
export const GOOGLE_REVIEWS_URL = GOOGLE_PLACE_ID
  ? `https://www.google.com/maps/place/?q=place_id:${GOOGLE_PLACE_ID}`
  : "https://www.google.com/maps/search/?api=1&query=Wellstar+Polyclinic+%26+Diagnostic+Centre+Hebbal+Bengaluru";
export const GOOGLE_WRITE_REVIEW_URL = GOOGLE_PLACE_ID
  ? `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`
  : "";

export function whatsappLink(message: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}

export const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Doctors", to: "/doctors" },
  { label: "Services", to: "/services" },
  { label: "Lab", to: "/lab" },
  { label: "Pharmacy", to: "/pharmacy" },
  { label: "Contact", to: "/contact" },
];

export const teamRoles = [
  "Dr. Shakeeb Ahmer — Physician Specialist (Internal Medicine & Chronic Disease Management)",
  "Dr. Mehnaz Rashid — Obstetrician & Gynecologist (Women’s Health & Maternity Care)",
  "Orthopaedic Surgeon — Bone, Joint & Spine Health",
  "Dermatologist — Skin, Hair & Cosmetic Treatments",
  "General Physician — Everyday Health & Wellness for Children, Adults and Elders",
  "Physiotherapist — Pain Relief, Mobility & Rehabilitation",
];

export const specialties = [
  {
    id: "general-physician",
    title: "General Physician & Internal Medicine",
    lead: "Diagnostics & care under one roof, led by Dr. Shakeeb Ahmer.",
    summary: "First point of contact for everyday health, chronic disease care and family consultations.",
    description:
      "Our Consultant Physician & Internal Medicine Specialist provides comprehensive care for the entire family. We are the trusted first point of contact for everyday health issues, offering expert consultation for both adults and children.",
    points: [
      "Accurate diagnosis and evidence-based management of chronic conditions like Diabetes Mellitus, Hypertension and Thyroid disorders",
      "Preventative care including annual medical check-ups and health counselling",
      "In-house day-care for acute conditions such as Dengue and severe dehydration",
      "Minor procedures including wound suturing and IV treatments",
    ],
  },
  {
    id: "gynecology",
    title: "Gynecology & Obstetrics",
    lead: "Compassionate, personalised care for women at every stage of life.",
    summary: "High-risk pregnancy, PCOS, fertility support and women’s health with Dr. Mehnaz Rashid.",
    description:
      "The Obstetrics & Gynecology department, led by Dr. Mehnaz Rashid, offers comprehensive women’s healthcare with expertise, empathy and integrity.",
    points: [
      "High-risk pregnancy management, pre-natal and post-partum care",
      "PCOS, infertility and adolescent health concerns",
      "Irregular/heavy cycles, endometriosis and fibroids",
      "Minimally invasive gynecologic surgery, Pap smears, HPV vaccination and STI/STD diagnosis",
      "In-house IUD/Copper-T insertion/removal and CTG/NST for pregnant women",
    ],
  },
  {
    id: "orthopedics",
    title: "Orthopedics",
    lead: "Bone, joint and muscle care.",
    summary: "Fractures, sports injuries, arthritis and spine-related concerns.",
    description:
      "Our Orthopedician specialises in comprehensive musculoskeletal care — helping patients regain mobility and long-term wellbeing through personalised, evidence-based plans.",
    points: [
      "Acute injuries: fractures, sports-related trauma and ligament tears",
      "Chronic conditions: osteoarthritis, joint pain, back pain and spinal health issues",
      "Surgical and non-surgical approaches",
      "First-aid for trauma, wound management and post-injury care",
    ],
  },
  {
    id: "dermatology",
    title: "Dermatology",
    lead: "Expert care for skin, hair and nail concerns.",
    summary: "Acne, pigmentation, hair fall and in-house cosmetic procedures.",
    description:
      "Our Dermatology department diagnoses and treats common to complex skin conditions, with advanced cosmetic procedures available in-house.",
    points: [
      "Management of acne, scars, pigmentation and melasma",
      "Dermatological peels, wart/mole removal and microdermabrasion (Diamond Peel)",
      "Hair-fall treatments",
      "Aesthetic care including PRP therapy, MNRF and anti-ageing / skin-brightening procedures",
    ],
  },
  {
    id: "day-care",
    title: "Day Care",
    lead: "Acute care without an overnight hospital stay.",
    summary: "IV care, fever management, infusions and short observation.",
    description:
      "A dedicated day-care facility for effective treatment and close observation of acute conditions in a controlled, comfortable environment.",
    points: [
      "Severe fever including Dengue, gastroenteritis, hyperemesis, asthma exacerbations, acute migraines and dehydration",
      "IV iron transfusions",
      "Vitamin infusions / vitality drips",
      "Continuous medical care and IV medication for a quicker return to wellness",
    ],
  },
];

export type DoctorCondition = {
  label: string;
  /** Everyday words patients type (e.g. "sugar" for diabetes), used by the condition finder. */
  keywords: string[];
};

export type Doctor = {
  name: string;
  /** Brand colour used to tell the doctors apart in the condition finder. */
  accent: "teal" | "red";
  /** Conditions the doctor manages (approved by the clinic). */
  conditions: DoctorCondition[];
  /** Short trust facts taken from the doctor's bio. */
  highlights: { value: string; label: string }[];
  /** A real Google review that names the doctor, quoted word for word. */
  review?: { quote: string; name: string };
  credentials: string;
  registration: string;
  timings: string;
  specialty: string;
  image: string;
  summary: string;
  bio: string[];
  /** Hospitals the doctor practises at outside Wellstar. */
  hospitals?: { primary: string; visiting: string[] };
};

/** Page anchor for a doctor's profile on the Doctors page, e.g. "dr-shakeeb-ahmer". */
export const doctorSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const doctors: Doctor[] = [
  {
    name: "Dr. Shakeeb Ahmer",
    accent: "teal",
    conditions: [
      { label: "Diabetes", keywords: ["sugar", "diabetic", "blood sugar", "hba1c", "insulin", "glucose"] },
      { label: "High blood pressure", keywords: ["bp", "hypertension", "blood pressure", "pressure"] },
      { label: "Thyroid disorders", keywords: ["thyroid", "hypothyroid", "hyperthyroid", "tsh", "goitre"] },
      { label: "Fever & infections", keywords: ["fever", "dengue", "typhoid", "viral", "infection", "malaria", "cold", "cough", "flu"] },
      { label: "Dehydration", keywords: ["vomiting", "loose motion", "diarrhoea", "diarrhea", "dehydrated", "weakness"] },
      { label: "Chronic & multi-system illness", keywords: ["chronic", "long-term illness", "multiple problems", "complex illness"] },
      { label: "Preventive health check-ups", keywords: ["check-up", "checkup", "health check", "screening", "full body", "preventive"] },
      { label: "Lifestyle counselling", keywords: ["lifestyle", "weight", "diet", "exercise", "obesity"] },
    ],
    highlights: [
      { value: "10+ yrs", label: "Clinical experience" },
      { value: "MRCP", label: "United Kingdom" },
      { value: "4", label: "Leading hospitals served" },
    ],
    review: {
      quote: "Dr Shakeeb is an excellent doctor who listens carefully, explains things properly and treats with compassion and the treatment plan was effective. Highly recommended!",
      name: "Vivek Chaudhary",
    },
    credentials: "MBBS, DNB (Internal Medicine), MRCP (UK)",
    registration: "KMC Reg. No. 0001593",
    timings: "6:00 PM – 9:00 PM",
    specialty: "Consultant Physician & Internal Medicine Specialist",
    image: doctorShakeeb,
    summary: "Internal medicine specialist with over a decade of experience and a special interest in diabetes care.",
    bio: [
      "Dr. Shakeeb Ahmer is a trusted Internal Medicine Specialist with over a decade of clinical experience in adult medical care. After completing his MBBS, he earned his DNB in Internal Medicine and the prestigious MRCP (UK), building a strong foundation in evidence-based clinical practice.",
      "He has trained and served at leading hospitals including Narayana Hrudayalaya (Gurugram), Manipal Hospital (Hebbal, Bangalore), St. Philomena’s Hospital and Apex Hospital — gaining extensive experience in diagnosing and managing complex, multisystem disorders.",
      "His practice covers preventive check-ups, lifestyle counselling and chronic conditions such as hypertension, thyroid disorders and infectious diseases. He has a special interest in Diabetes Mellitus, helping patients achieve optimal sugar control and prevent long-term complications through personalised care.",
      "Known for listening carefully and taking detailed histories before starting treatment, Dr. Shakeeb is committed to clear, effective and compassionate medical care guided by the latest international standards.",
    ],
  },
  {
    name: "Dr. Mehnaz Rashid",
    accent: "red",
    conditions: [
      { label: "Pregnancy care", keywords: ["pregnant", "pregnancy", "antenatal", "prenatal", "expecting"] },
      { label: "High-risk pregnancy", keywords: ["high risk", "high-risk", "complicated pregnancy", "gestational"] },
      { label: "Deliveries", keywords: ["delivery", "labour", "labor", "childbirth", "normal delivery", "c-section", "caesarean", "cesarean"] },
      { label: "PCOS / PCOD", keywords: ["pcos", "pcod", "cyst", "ovary", "ovarian"] },
      { label: "Infertility", keywords: ["fertility", "infertility", "conceive", "trying for a baby"] },
      { label: "Period problems", keywords: ["period", "periods", "menstrual", "irregular periods", "cramps", "menstruation"] },
      { label: "Minimally invasive & robotic gynaecological surgery", keywords: ["surgery", "laparoscopy", "laparoscopic", "keyhole", "robotic"] },
      { label: "Reproductive health", keywords: ["reproductive", "gynaecologist", "gynecologist", "gynae", "gyne", "women's health", "womens health"] },
    ],
    highlights: [
      { value: "ICRS", label: "Robotic surgery certified" },
      { value: "FMAS", label: "Minimal access surgery" },
      { value: "6+", label: "Hospitals she practises at" },
    ],
    review: {
      quote: "Great experience. Dr.Mehnaz mam is a best doctor and she is good listener.she has healing hands.over all great experience",
      name: "Rakheeba Y",
    },
    credentials: "MBBS, DNB (Obstetrics & Gynecology), FMAS, DMAS, ICRS (Robotic Surgery)",
    registration: "KMC Reg. No. 0000589",
    hospitals: {
      primary: "Motherhood Hospital",
      visiting: ["Rainbow", "Cloudnine", "Even", "Viva", "JMJ"],
    },
    timings: "6:00 PM – 9:00 PM",
    specialty: "Consultant Obstetrician & Gynecologist",
    image: doctorMehnaz,
    summary: "Specialist in high-risk pregnancy, minimally invasive surgery and reproductive health.",
    bio: [
      "Dr. Mehnaz Rashid is a highly skilled and compassionate Obstetrician & Gynecologist, specialising in high-risk pregnancy management, minimally invasive gynecologic surgery and reproductive health care.",
      "After completing her MBBS, she pursued a DNB in Obstetrics & Gynecology, followed by FMAS & DMAS and ICRS-certified Robotic Surgery training for safer, faster and more precise outcomes.",
      "She has served at the High-Risk Pregnancy Unit at Bhagwan Mahaveer Jain Hospital and Koshy’s Hospital, and currently practises primarily as a Consultant at Motherhood Hospital. She also conducts deliveries as a Visiting Consultant at Rainbow, Cloudnine, Even, Viva and JMJ hospitals, among others.",
      "Deeply committed to volunteer work through women’s health camps, her approach is empathetic, evidence-based and holistic — integrating nutrition, exercise therapy and everyday herbs into personalised treatment plans. At Wellstar she leads the Department of Obstetrics & Gynecology.",
    ],
  },
];

export const diagnostics = [
  { title: "Blood & Urine Tests", description: "Comprehensive testing for kidney, liver, heart, infection and general health conditions." },
  { title: "Allergy Testing", description: "Identify triggers and manage allergic reactions effectively." },
  { title: "Sexual Health Screening", description: "Confidential STI/STD diagnosis and treatment." },
  { title: "Full Body & Preventive Health Check-ups", description: "Regular assessments to monitor overall wellness." },
  { title: "Hormone & Vitamin Panels", description: "Testing for thyroid, vitamin deficiencies and hormonal imbalances." },
  { title: "Diabetes Profile", description: "Includes blood sugar, HbA1c and insulin level evaluation." },
  { title: "Kidney & Liver Function (RFT, LFT)", description: "Assess organ performance and detect abnormalities early." },
  { title: "Fever & Infection Profile", description: "Detect common infections, fevers and related conditions." },
  { title: "ECG (Electrocardiogram)", description: "12-lead ECG to assess heart rhythm and electrical activity." },
  { title: "Lipid & Cardiac Profile", description: "Detailed heart and cholesterol health check-up." },
  { title: "CTG / NST", description: "Fetal heart rate and pregnancy wellbeing assessment." },
  { title: "Partner imaging", description: "X-rays and ultrasounds are arranged at a nearby tied-up centre." },
];

export type PackageAddOn = {
  test: string;
  price: number;
};

export type HealthPackage = {
  name: string;
  tests: string[];
  addOns?: PackageAddOn[];
  originalPrice: number;
  offerPrice: number;
};

export const PACKAGES_PHONE_URL = "tel:+916362064109";
export const PACKAGES_PHONE_DISPLAY = "6362064109";
export const PACKAGES_TAGLINE = "Specially Curated by Doctors";

export const generalHealthPackages: HealthPackage[] = [
  {
    name: "Basic Fever",
    tests: ["CBC", "CRP", "Widal Test", "MP Smear", "ESR"],
    originalPrice: 2540,
    offerPrice: 999,
  },
  {
    name: "Fever Health",
    tests: ["CBC", "CRP", "Urine Routine", "Widal Test", "MP Smear", "Dengue Profile", "Culture (Blood / Urine / Sputum)"],
    originalPrice: 4100,
    offerPrice: 2399,
  },
  {
    name: "Basic Health",
    tests: ["CBC", "Creatinine", "Urine Routine", "Total Cholesterol", "Triglycerides", "RBS", "TSH"],
    originalPrice: 2700,
    offerPrice: 1409,
  },
  {
    name: "Diabetes Health",
    tests: ["FBS", "PPBS", "HbA1c", "Creatinine", "Urine Routine", "Lipid Profile", "Vitamin B12"],
    originalPrice: 3290,
    offerPrice: 1799,
  },
  {
    name: "Anemia Health",
    tests: ["Complete Hemogram", "Iron Profile", "LFT - Basic", "Vitamin B12", "Blood Group & Rh Typing"],
    originalPrice: 3320,
    offerPrice: 2299,
  },
  {
    name: "Comprehensive Health",
    tests: ["Complete Hemogram", "RFT", "Urine Routine", "LFT", "Lipid Profile", "FBS", "PPBS", "HbA1c", "TFT", "Vitamin B12", "Vitamin D", "ECG"],
    originalPrice: 6870,
    offerPrice: 3999,
  },
];

export const womensHealthPackages: HealthPackage[] = [
  {
    name: "Basic Antenatal Profile",
    tests: ["CBC", "FBS / RBS", "TSH", "Blood Group & Rh Typing", "HIV", "HBsAg", "VDRL", "Urine Routine"],
    originalPrice: 2050,
    offerPrice: 1299,
  },
  {
    name: "Antenatal Health",
    tests: ["CBC", "Blood Group & Rh Typing", "Urine Routine", "HbA1c", "TSH", "Anti HCV", "HBsAg", "HIV", "VDRL", "Vitamin B12", "Vitamin D"],
    addOns: [{ test: "β-HCG", price: 400 }],
    originalPrice: 5970,
    offerPrice: 3999,
  },
  {
    name: "Antenatal Health II",
    tests: ["CBC", "Urine Routine", "TSH", "OGTT"],
    addOns: [{ test: "HbA1c", price: 350 }],
    originalPrice: 1420,
    offerPrice: 999,
  },
  {
    name: "Women's Health",
    tests: ["CBC", "Creatinine", "Urine Routine", "TSH", "HbA1c", "Vitamin B12", "Vitamin D"],
    originalPrice: 4370,
    offerPrice: 2199,
  },
  {
    name: "Infertility / PCOS Health",
    tests: ["CBC", "Urine Routine", "TSH", "HbA1c", "PRL", "AMH", "Vitamin B12", "Vitamin D"],
    originalPrice: 6445,
    offerPrice: 4299,
  },
  {
    name: "Basic Fertility",
    tests: ["CBC", "ESR", "FBS / RBS", "Urine Routine", "TFT", "HbA1c", "PRL"],
    addOns: [{ test: "FSH", price: 450 }],
    originalPrice: 2070,
    offerPrice: 1799,
  },
  {
    name: "Pre Fertility Comprehensive Check Up",
    tests: ["CBC", "ESR", "Urine Routine", "FBS / RBS", "TFT", "HbA1c", "LH", "PRL", "FSH", "AMH", "Vitamin B12", "Vitamin D"],
    addOns: [{ test: "Insulin", price: 600 }],
    originalPrice: 9095,
    offerPrice: 6199,
  },
  {
    name: "Comprehensive Fertility",
    tests: ["CBC", "ESR", "Urine Routine", "FBS / RBS", "TFT", "HbA1c", "LH", "PRL", "FSH", "AMH", "Testosterone", "Vitamin B12", "Vitamin D"],
    addOns: [{ test: "Insulin", price: 600 }],
    originalPrice: 9895,
    offerPrice: 6699,
  },
];

export const pharmacyPoints = [
  { title: "Quality medicines", description: "All drugs are WHO-GMP certified, ensuring safety and effectiveness." },
  { title: "Affordable pricing", description: "Medications are available at pocket-friendly rates." },
  { title: "Home delivery", description: "Medicines delivered within a 2 km radius for patient convenience." },
  { title: "Doctor-supervised dispensing", description: "Prescriptions are reviewed and dispensed under medical supervision for accurate dosage and usage." },
];

export const pharmacyCategories = ["Diabetes", "Cardiac Care", "Stomach Care", "Pregnancy", "Mom and Baby"];

export const values = [
  { title: "Specialists under one roof", description: "Physician, gynecologist, orthopedician, dermatologist, general physician and physiotherapist support for your family." },
  { title: "Evidence-based care", description: "Every consultation is guided by experience, compassion and advanced medical science." },
  { title: "Diagnostics on-site", description: "Accurate, efficient testing with digital health records for seamless follow-up care." },
  { title: "Online consultations", description: "In-clinic visits and virtual consults available via Apollo 24|7." },
];

export type Testimonial = {
  name: string;
  quote: string;
  rating?: number;
  when?: string;
  url?: string;
};

/* Real Google reviews, quoted word for word (long ones trimmed with “…”). Shown when live reviews are not configured. */
export const testimonials: Testimonial[] = [
  {
    name: "Vivek Chaudhary",
    quote: "Dr Shakeeb is an excellent doctor who listens carefully, explains things properly and treats with compassion and the treatment plan was effective. Highly recommended!",
  },
  {
    name: "Rakheeba Y",
    quote: "Great experience. Dr.Mehnaz mam is a best doctor and she is good listener.she has healing hands.over all great experience",
  },
  {
    name: "Tabrez Khan",
    quote: "Consulted Dr Shakeeb for my father who is diabetic and had some other serious issues. The doctor is highly professional and always helpful and supportive in an emergency situation. … I am very much grateful and thankful to him for his continuous support and guidance in this tough situation.",
  },
  {
    name: "Aliya Ayub",
    quote: "I was suffering from diabetes starting now after consulting dr. shakeeb ahmer my diabetic condition as come to control it was very good after consulting doctor recommend for all",
  },
  {
    name: "Noufil Ahmed Kazi",
    quote: "Dr Shakeeb, best physician around.",
  },
];

export const questions = [
  {
    question: "What are the clinic timings?",
    answer: "Monday to Saturday: 8:00 AM – 10:00 PM. Sunday: 8:00 AM – 1:00 PM. Please call ahead if you need to confirm a specific doctor’s availability.",
  },
  {
    question: "Can I walk in without an appointment?",
    answer: "Walk-ins may be possible depending on the doctor’s schedule. Calling or messaging us first helps us confirm availability and reduce waiting time.",
  },
  {
    question: "How do I book an online consultation?",
    answer: "Online consultations are available via Apollo 24|7. Contact our team on WhatsApp or phone if you need help getting started.",
  },
  {
    question: "What lab tests are available?",
    answer: "We offer blood and urine tests, allergy testing, sexual health screening, full-body and women’s health packages, hormone and vitamin panels, diabetes profile, RFT/LFT, fever panels, ECG, lipid and cardiac profile, and CTG/NST. X-ray and ultrasound are arranged at a nearby tied-up centre.",
  },
  {
    question: "Do you collect samples from home?",
    answer: "Yes. We collect lab samples from home — book on WhatsApp or call 6362064109. Tests such as FBS, lipid profile and OGTT usually need 8–12 hours of fasting (water is fine); our team will confirm the preparation when you book.",
  },
  {
    question: "Do you deliver medicines?",
    answer: "Yes. Our pharmacy offers home delivery within a 2 km radius. Call 63637 78957 for immediate medicine delivery. Categories include Diabetes, Cardiac Care, Stomach Care, Pregnancy, and Mom and Baby.",
  },
  {
    question: "Who founded Wellstar?",
    answer: "Wellstar Polyclinic was founded by Syed Ashfaq and a dedicated team of founding members on the premise that affordable, high-quality healthcare should be accessible to everyone under one roof, delivered with compassion, integrity and excellence.",
  },
];

export function formatInr(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}
