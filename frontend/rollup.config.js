import typescript from 'rollup-plugin-typescript';

/** @type {import('rollup').RollupOptions} */
const config = {
    input: 'src/index.ts',
    output: {
        file: 'lib/index.js',
        format: 'esm',
        sourcemap: true,
    },
    plugins: [typescript(), resolve(), terser()],
};

export default [config];
