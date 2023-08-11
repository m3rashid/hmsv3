import fs from 'node:fs';
import JWT from 'jsonwebtoken';
import { PartialUser } from './types';

const keys = JSON.parse(fs.readFileSync(__dirname + '/keys/keys.json').toString());

export const issueJWT = (user: PartialUser) => {
	const expiresIn = '1d';
	const payload = {
		sub: {
			id: user.id,
			permissions: user.permissions,
			name: user.name,
			email: user.email,
		},
		iat: Date.now(),
	};
	const signedToken = JWT.sign(payload, keys.ACCESS_SECRET, {
		expiresIn: expiresIn,
	});

	const refreshToken = JWT.sign(payload, keys.RESET_SECRET, {});

	return {
		token: signedToken,
		refreshToken: refreshToken,
		expires: expiresIn,
	};
};

export const verifyJWT = (token: string) => {
	try {
		const extractedToken = token.split(' ')[1];
		const decoded = JWT.verify(extractedToken, keys.ACCESS_SECRET);
		return {
			valid: true,
			expired: false,
			payload: decoded,
		};
	} catch (err: any) {
		console.log(err);
		return {
			valid: false,
			expired: err.message === 'jwt expired',
			payload: null,
		};
	}
};

export const revalidateJWT = (token: string) => {
	try {
		const extractedToken = token.split(' ')[1];
		const decoded = JWT.verify(extractedToken, keys.RESET_SECRET, {});

		return {
			valid: true,
			expired: false,
			payload: decoded,
		};
	} catch (err: any) {
		console.log(err);
		return {
			valid: false,
			expired: err.message === 'jwt expired',
			payload: null,
		};
	}
};
