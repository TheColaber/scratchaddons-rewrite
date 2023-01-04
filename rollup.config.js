import path from "path";
import fs from "fs/promises";

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

/** @type {import("rollup").InputOptions} */
export default {
  input: "src/manifest.json",
  output: {
    dir: "dist",
    format: "esm",
  },
  plugins: [
    {
      name: "test",
      async generateBundle() {
        this.emitFile({
          type: "asset",
          fileName: "images/icon.svg",
          source: await fs.readFile("src/images/icon.svg"),
        });
        this.emitFile({
          type: "asset",
          fileName: "images/icon-gray-16.png",
          source: await fs.readFile("src/images/icon-gray-16.png"),
        });
        this.emitFile({
          type: "asset",
          fileName: "images/icon-gray-32.png",
          source: await fs.readFile("src/images/icon-gray-32.png"),
        });
      },
    },
    ((modules) => {
      return {
        name: "virtual",
        resolveId(id, importer) {
          if (id in modules) {
            return id + ":sep:" + importer;
          }
          return null;
        },
        load(id) {
          const match = id.match(/(.*):sep:(.*)/);
          if (match) {
            const [, idWithoutSep, file] = match;
            if (idWithoutSep in modules) {
              return modules[idWithoutSep](file);
            }
          }

          return null;
        },
      };
    })({
      "#addons": () => {
        return `
        export const popups = ${JSON.stringify(popups)};
        export const addons = ${JSON.stringify(addons)};`;
      },
      "#popup-components": () => {
        return popups
          .map(
            ({ id, manifest }) =>
              `export { default as "${id}" } from "${path
                .resolve(
                  path.dirname(""),
                  `./src/popups/${id}/${manifest.popup.component}`
                )
                .replace(/\\/g, "/")}";`
          )
          .join("\n");
      },
    }),
    chromeExtension(),
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

async function getAddonManifests(dir, id) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map(async (dirent) => {
      const res = path.resolve(dir, dirent.name);
      if (dirent.isDirectory()) {
        return await getAddonManifests(res, dirent.name);
      } else {
        if (dirent.name === "addon.json") {
          return {
            id,
            manifest: JSON.parse(await fs.readFile(res, "utf-8")),
          };
        } else {
          return null;
        }
      }
    })
  );
  return files.filter((manifest) => !!manifest).flat();
}
