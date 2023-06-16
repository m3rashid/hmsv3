import { Auth } from "./auth";

export interface Base {
	_id: string;
	createdAt: string
	updatedAt: string
	createdBy: Auth
	updatedBy: Auth
	isDeleted: boolean
}
