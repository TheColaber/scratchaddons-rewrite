import path from "path";
import fs from "fs/promises";

import alias from "@rollup/plugin-alias";
import { chromeExtension } from "rollup-plugin-chrome-extension";
import typescript from "@rollup/plugin-typescript";
import image from "@rollup/plugin-image";
import vue from "rollup-plugin-vue";
import postcss from "rollup-plugin-postcss";
import replace from "@rollup/plugin-replace";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

let popups = await list("src/popups");

export default {
  input: "src/manifest.json",
  output: {
    dir: "dist",
    format: "esm",
  },
  plugins: [
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
        return `export const popups = ${JSON.stringify(popups)}`;
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
    alias({
      entries: {
        "@": path.resolve(path.dirname(""), "src"),
      },
    }),
    chromeExtension(),
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

async function list(dir) {
  const folders = await fs.readdir(dir);

  return await Promise.all(
    folders.map(async (id) => {
      return {
        id,
        manifest: JSON.parse(
          await fs.readFile(path.resolve(dir, id, "addon.json"), "utf-8")
        ),
      };
    })
  );
}
