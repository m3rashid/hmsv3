export const isProduction = process.env.NODE_ENV === 'production';

export const	PORT = process.env.PORT || 5000
export const HOST = process.env.SERVER_HOST || 'localhost'
export const corsOrigin = '*'
	// corsOrigin: isProduction ? "*" : "*",
