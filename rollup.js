import { rollup, watch } from "rollup";
import fs from "fs/promises";
import path from "path";
import config from "./rollup.config.js";

const [, , arg] = process.argv;
if (arg === "-w") {
  const watcher = watch(config);
  watcher.on("event", (event) => {
    console.log(event.code);
    if (event.code === "START") {
      generateTypes();
    }

    if (event.code === "ERROR") {
      console.log(event.error);
    }

    if (event.code === "BUNDLE_END") {
      event.result.close();
    }
  });
} else {
  rollup(config);
}

async function generateTypes() {
  // const popups = await getAddonManifests("src/popups");
  // // await fs.mkdir("dist/types", { recursive: true });
  // // await fs.writeFile(
  // //   "dist/types/addons.d.ts",
  // //   popups
  // //     .map(({ id, path }) => `export { default as data } from "${path}";`)
  // //     .join("\n")
  // // );
}

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
            path: res.replace(/\\/g, "/"),
          };
        } else {
          return null;
        }
      }
    })
  );
  return files.filter((manifest) => !!manifest).flat();
}
