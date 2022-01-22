import typescript from "rollup-plugin-typescript2";
import { readFileSync } from "fs";

// Just want to override tslib from the rollup-plugin-typescript2
const tslib = readFileSync("./src/tslib.js", "utf-8");

export default {
    input: 'src/index.ts',
    output: [
        {
            file: './build/bundle.mjs',
            format: 'esm',
            sourcemap: true,
            freeze: false
        },
        ...(process.env.FULL ? [
            {
                file: './build/bundle.cjs',
                format: 'commonjs',
                sourcemap: true,
                freeze: false
            }, {
                name: '__IteratorHelpersPolyfill',
                file: './build/bundle.js',
                format: 'umd',
                sourcemap: true,
                freeze: false
            }
        ] : [])
    ],
    plugins: [
        Object.create(typescript(), { load: { value: x => x === "\0tslib.js" ? tslib : null } })
    ]
};