import { Base } from "./base";
import { Profile } from "./profile";

export interface Leave extends Base {
	doctor: Profile
	reason: string
	startDate: string;
	endDate: string
}
