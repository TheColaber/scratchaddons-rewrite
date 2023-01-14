import path from "path";
import fs from "fs/promises";

import virtual from "@rollup/plugin-virtual";
import { chromeExtension } from "rollup-plugin-chrome-extension";
import typescript from "@rollup/plugin-typescript";
import vue from "rollup-plugin-vue";
import postcss from "rollup-plugin-postcss";
import replace from "@rollup/plugin-replace";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const popups = await getAddonManifests("src/popups");
const addons = await getAddonManifests("src/addons");

/** @type {import("rollup").RollupOptions} */
export default {
  input: "src/manifest.json",
  output: {
    dir: "dist",
    format: "esm",
    chunkFileNames: "chunk.[name].js",
  },
  plugins: [
    virtual({
      "#addons": addons.join("\n"),
      "#popups": popups.join("\n"),
    }),
    chromeExtension(),
    typescript(),
    vue({ target: "browser" }),
    postcss(),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
      preventAssignment: true,
    }),
    json({
      preferConst: true,
    }),
    resolve(),
    commonjs(),
  ],
};

/** @returns {{id: string, manifest: any, path:string}[]} */
async function getAddonManifests(dir, id) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map(async (dirent) => {
      const res = path.resolve(dir, dirent.name);
      if (dirent.isDirectory()) {
        return await getAddonManifests(res, dirent.name);
      } else if (dirent.name === "addon.ts") {
        return `export { default as "${id}" } from "${res.replace(
          /\\/g,
          "/"
        )}";`;
      } else {
        return null;
      }
    })
  );
  return files.filter((manifest) => !!manifest).flat();
}
