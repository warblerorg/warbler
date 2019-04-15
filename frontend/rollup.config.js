import typescript from 'rollup-plugin-typescript';

/** @type {import('rollup').RollupOptions} */
const config = {
    input: 'src/index.ts',
    output: {
        file: 'lib/index.js',
        format: 'esm',
        sourcemap: true,
    },
    plugins: [typescript()],
};

/** @type {import('rollup').RollupOptions} */
const themeSelectConfig = {
    input: 'src/theme-select.js',
    output: {
        file: 'lib/theme-select.js',
        format: 'esm',
    },
};

export default [config, themeSelectConfig];
