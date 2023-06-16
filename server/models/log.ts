import { Base } from "./base";

export interface Log extends Base {
	action: string
	fromId: string
	toId: string
}
