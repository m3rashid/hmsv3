import { atom } from 'recoil';

import { MODEL } from 'gatekeeper';

export interface AuthState {
	isLoggedIn: boolean;
	user: MODEL.PartialUser | null;
	token: string | null;
	loading: boolean;
	error: any;
}

export const authDefaultState: AuthState = {
	isLoggedIn: false,
	user: null,
	token: null,
	loading: false,
	error: null,
};

export const authState = atom<AuthState>({
	key: 'auth',
	default: authDefaultState,
});
