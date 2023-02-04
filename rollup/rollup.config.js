import fs from "fs/promises";
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
import copy from "rollup-plugin-copy";
import virtual from "@rollup/plugin-virtual";
import path from "path";

/** @type {import("rollup").RollupOptions} */
export default {
  input: "src/manifest.json",
  output: {
    dir: "dist",
    format: "esm",
    chunkFileNames: "chunk.[name]-[hash].js",
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

    virtual({
      // TODO: Use globby thingy
      "#addons": importAddonDir("addons"),
      "#popups": importAddonDir("popups"),
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

async function importAddonDir(dir, id) {
  const imports = await addAddonImport(dir, id);
  return imports.join("\n");
}

async function addAddonImport(dir, id) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map(async (dirent) => {
      const res = path.resolve(dir, dirent.name);
      if (dirent.isDirectory()) {
        return await addAddonImport(res, dirent.name);
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
