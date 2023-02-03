import {
  chromeExtension,
  simpleReloader,
} from "rollup-plugin-chrome-extension";
import vue from "rollup-plugin-vue";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import esbuild from "rollup-plugin-esbuild";
import replace from "@rollup/plugin-replace";
import postcss from "rollup-plugin-postcss";
import { emptyDir } from "rollup-plugin-empty-dir";
import copy from "rollup-plugin-copy";

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
    copy({
      targets: [
        { src: "src/css/*.ttf", dest: "dist/css" },
        { src: "src/images/*.svg", dest: "dist/images" },
      ],
    }),

    vue({ target: "browser" }),
    // Must be after vue plugin
    esbuild(),
    postcss(),
    // Vue needs NODE_ENV to be set to production.
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
      preventAssignment: true,
    }),

    resolve(),
    commonjs(),
  ],
};
