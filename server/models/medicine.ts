import { Base } from "./base";
import { Category } from "./profile";

export const MedType = ["TABLET", "SYRUP"] as const;

export interface Medicine extends Base {
	name: string
	quantity: string
	batchNumber?: string
	tabletsPerStrip?: number
	expiryDate: string
	category?: typeof Category
	medType?: typeof MedType
	manufacturer?: string
}

