import { PartialUser } from "./utils/types"

declare global {
	namespace Express {
		interface Request {
			user: PartialUser;
			isAuthenticated: boolean;
			permissions: string[];
		}
	}
}
