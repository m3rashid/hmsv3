import { Base } from "./base";
import { Patient } from "./patient";
import { Prescription } from "./prescription";
import { Profile } from "./profile";

export interface Appointment extends Base {
	referredBy?: Profile
	prescription?: Prescription
	patient?: Patient
	doctor?:Profile
	pending: boolean
	remarks?: string
}
