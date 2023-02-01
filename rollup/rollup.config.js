import { chromeExtension, simpleReloader } from "rollup-plugin-chrome-extension"
import vue from "rollup-plugin-vue"
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from "rollup-plugin-typescript2" // "@rollup/plugin-typescript"
import replace from '@rollup/plugin-replace';

/** @type {import("rollup").RollupOptions} */
export default {
  input: "src/manifest.json",
  output: {
    dir: "dist",
    format: "esm",
  },
  plugins: [
    chromeExtension(),
    simpleReloader(),

    typescript(),
    vue({ target: "browser"}),
    // Vue needs NODE_ENV to be set to production.
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
      preventAssignment: true
    }),

    resolve(),
    commonjs()
  ]
}