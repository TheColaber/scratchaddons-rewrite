import { chromeExtension, simpleReloader } from "rollup-plugin-chrome-extension"
import vue from "rollup-plugin-vue"
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from "rollup-plugin-typescript2" // "@rollup/plugin-typescript"

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
    vue(),

    resolve(),
    commonjs()
  ]
}