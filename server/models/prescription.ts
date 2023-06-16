import { Appointment } from "./appointment";
import { Base } from "./base";
import { PrescribedMedicine } from "./prescribedMedicine";
import { Test } from "./test"

export interface Prescription extends Base {
	symptoms: string
	appointment?: Appointment
	pending: boolean
	tests: Test[]
	medicines: PrescribedMedicine[]
}
