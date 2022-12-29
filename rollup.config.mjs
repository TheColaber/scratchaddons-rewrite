import {
  chromeExtension,
  simpleReloader,
} from "rollup-plugin-chrome-extension";
import typescript from "rollup-plugin-typescript2"; // rollup-plugin-typescript
import vue from "rollup-plugin-vue";
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
    chromeExtension(),
    simpleReloader(),
    vue({ target: "browser" }),
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
