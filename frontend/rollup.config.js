import svelte from 'rollup-plugin-svelte';
import typescript from 'rollup-plugin-typescript';

const production = !process.env.ROLLUP_WATCH;

/** @type {import('rollup').RollupOptions} */
const config = {
    input: 'src/index.ts',
    output: {
        file: 'lib/index.js',
        format: 'esm',
        sourcemap: true,
    },
    plugins: [
        svelte({
            dev: !production,
        }),
        typescript(),
    ],
};

export default [config];
