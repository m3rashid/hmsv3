import { Base } from "./base";
import { Sex } from "./profile";

export const   PatientType = [
  "EMPLOYEE",
  "STUDENT",
  "PENSIONER",
  "FAMILY_PENSIONER",
  "DEPENDENT",
  "OTHER",
] as const;

export const BloodGroup = [
	"A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "UNKNOWN"
] as const;

export interface Patient extends Base {
	user?: string
  name?: string
  fathersName?: string
  type: typeof PatientType
  otherUser?: string
  sex: typeof Sex[number]
  dob?: string
  designation?: string
  contact?: string
  dor?: string
  department?: string
  fdr?: string
  bloodGroup: typeof BloodGroup[number]
  lastVisit?: string
  address?:	string
  dependentStatus: boolean

  // relationWithOtherUser String        @default("SELF")
  // maritalStatus         MaritalStatus @default(SINGLE)
  // userData              Json?
  // Appointment           Appointment[]
}
