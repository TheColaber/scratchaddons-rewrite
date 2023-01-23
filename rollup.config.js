import path from "path";
import fs from "fs/promises";

import virtual from "@rollup/plugin-virtual";
import { chromeExtension } from "rollup-plugin-chrome-extension";
import typescript from "@rollup/plugin-typescript";
import vue from "rollup-plugin-vue";
import postcss from "rollup-plugin-postcss";
import replace from "@rollup/plugin-replace";
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
    chromeExtension(),
    virtual({
      "#addons": addons,
      "#popups": popups,
    }),
    vue({ target: "browser", styleInjector: "cry"  }),
    postcss(),
    typescript(),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
      preventAssignment: true,
    }),
    {
      name: "addon-imports",
      transform(code, id) {
        let fullPath = id;
        let parts = [];
        while (path.basename(fullPath) !== "") {
          parts.push(path.basename(fullPath));
          fullPath = path.dirname(fullPath)
          if (fullPath === ".") break;
          if (path.basename(fullPath) === "src") break;
        }
        if (!parts.includes("addons")) return;
        if (parts[0] === "addon.ts") {
          code = `import defineManifest from "${path.relative(path.dirname(id), "src/helpers/define-manifest").replace(
            /\\/g,
            "/"
          )}";\n` + code;
          return code;
        }
        if (parts[0].endsWith(".ts")) {
          code = `import defineScript from "${path.relative(path.dirname(id), "src/helpers/define-script").replace(
            /\\/g,
            "/"
          )}";\n` + code;
          return code;
        }
      }
    },
    resolve(),
    commonjs(),
  ],
};

/** @returns {{id: string, manifest: any, path:string}[]} */
async function getAddonManifests(dir, id) {
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
