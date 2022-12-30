import alias from "@rollup/plugin-alias";
import path from "path";
import {
  chromeExtension,
  simpleReloader,
} from "rollup-plugin-chrome-extension";
import typescript from "@rollup/plugin-typescript";
import image from "@rollup/plugin-image";
import vue from "rollup-plugin-vue";
import postcss from "rollup-plugin-postcss";
import replace from "@rollup/plugin-replace";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/manifest.json",
  output: {
    dir: "dist",
    format: "esm",
  },
  plugins: [
    alias({
      entries: {
        "@": path.resolve(path.dirname(""), "src"),
      },
    }),
    chromeExtension(),
    simpleReloader(),
    image(),
    vue({ target: "browser" }),
    postcss(),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
      preventAssignment: true,
    }),
    typescript(),
    json(),
    resolve(),
    commonjs(),
  ],
};
