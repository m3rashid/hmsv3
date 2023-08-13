import React, { Context } from 'react';

export default function FixedUseContext(_context: Context<any>) {
	const context = React.useContext(_context);

	if (context === undefined) {
		return {};
	}

	return context;
}
