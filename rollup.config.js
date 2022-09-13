// import vue from 'rollup-plugin-vue'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import path from 'path'
// import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import { uglify } from 'rollup-plugin-uglify'
import scss from 'rollup-plugin-scss'
import pkg from './package.json'
const deps = Object.keys(pkg.dependencies)
// eslint-disable-next-line @typescript-eslint/no-var-requires
const vue = require('rollup-plugin-vue')

export default [
    {
        input: path.resolve(__dirname, './packages/index.js'),
        output: [
            {
                format: 'es',
                file: pkg.module,
                sourcemap: true
            }
        ],
        plugins: [
            terser(),
            uglify(),
            nodeResolve(),
            scss(),
            // commonjs(),
            vue({
                target: 'browser',
                css: false,
                exposeFilename: false,
            }),
        ],
        external(id) {
            return /^vue/.test(id)
                || deps.some(k => new RegExp('^' + k).test(id))
        },
    },
]