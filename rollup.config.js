import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import { readFileSync } from "fs";

// Just want to override tslib from the rollup-plugin-typescript2
const tslib = readFileSync("./src/tslib.js", "utf-8");

export default {
    input: 'src/index.ts',
    output: [
        {
            file: './build/bundle.min.mjs',
            format: 'esm',
            sourcemap: true,
            freeze: false
        },
        ...(process.env.FULL ? [
            {
                file: './build/bundle.min.cjs',
                format: 'commonjs',
                sourcemap: true,
                freeze: false
            }, {
                name: '__IteratorHelpersPolyfill',
                file: './build/bundle.min.js',
                format: 'umd',
                sourcemap: true,
                freeze: false
            }
        ] : [])
    ],
    plugins: [
        Object.create(typescript(), { load: { value: x => x === "\0tslib.js" ? tslib : null } }),
        terser({ format: { comments: false }, mangle: { reserved: ['AsyncIterator', 'Iterator', 'Config'] }, compress: { unsafe: true } })
    ]
};