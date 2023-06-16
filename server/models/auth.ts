import { Base } from "./base"
import { Profile } from "./profile"

export interface Auth extends Base {
	name: string
	email: string
	password: string
	permissions: string[]
	profileId: Profile
}
