import { Auth } from "./auth";
import { Base } from "./base";

export const Sex = ["M", "F", "O"] as const;

export const Category = [
"GENERAL_MEDICINE",
"CARDIOLOGY",
"DERMATOLOGY",
"INTERNAL_MEDICINE",
"OPHTHALMOLOGY",
"ENT",
"GYNECOLOGY",
] as const;

export const Role = [
  "DOCTOR",
  "ADMIN",
  "RECEPTIONIST",
  "PHARMACIST",
  "INVENTORY_MANAGER",
  "CO_ADMIN",
  "OTHER",
] as const;

export const Days = [
	"SUN",
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
] as const

export interface Profile extends Base {
	designation?: string
  contact?: string
  address?: string
  bio?: string
  roomNumber?: string
  sex: typeof Sex[number]
  authorityName?: string
  category: typeof Category[number]
  role: typeof Role[number]
  origin?: string
  auth: Auth
  availableDays: Array<typeof Days[number]>
  // availability         Json? // time range
  // leave                Leave[]
  // Appointment          Appointment[] @relation("doctor")
  // ReferredAppointments Appointment[] @relation("referredDoc")
}
