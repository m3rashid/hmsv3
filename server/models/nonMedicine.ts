import { Base } from "./base";

export interface NonMedicine extends Base {
	name: string
	quantity: number
	batchNumber?: string
	expiryDate: string
}
