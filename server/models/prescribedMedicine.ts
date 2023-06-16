import { Base } from "./base";
import { Medicine } from "./medicine";
import { Prescription } from "./prescription";

export const Dosage = [	"OD",  "BD",  "TD",  "QD",  "OW",  "BW",  "TW",  "QW"] as const;

export interface PrescribedMedicine extends Base {
	duration: number
	description?: string
	medicine?: Medicine
	dosage: typeof Dosage
	quantityPerDose?: string
	prescription?: Prescription
}
