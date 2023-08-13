import typescript from '@rollup/plugin-typescript';

// eslint-disable-next-line no-undef
const dev = process.env.ROLLUP_WATCH === 'true';
const config = {
	input: './index.ts',
	output: {
		file: 'dist/index.js',
	},
	plugins: [typescript()],
};

export default config;
