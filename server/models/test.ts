import { Base } from "./base";
import { Prescription } from "./prescription";

export interface Test extends Base {
	name: string
	description?: string
	prescription?: Prescription
	testType?: string
	testResultDocs?: string[] // link of the documents
}
