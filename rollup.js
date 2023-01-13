import { rollup, watch } from "rollup";
import config from "./rollup.config.js";

const [, , arg] = process.argv;
if (arg === "-w") {
  const watcher = watch(config);
  watcher.on("event", (event) => {
    if (event.code === "BUNDLE_START") {
      console.log("Bundling...")
    }

    if (event.code === "ERROR") {
      console.log(event.error);
    }

    if (event.code === "BUNDLE_END") {
      console.log("Done in", event.duration, "ms", "- Watching for changes...");
      console.log();
      event.result.close();
    }
  });
} else {
  (async () => {
    const bundle = await rollup(config);
    await bundle.write({
      dir: "dist",
      chunkFileNames: config.output.chunkFileNames,
    });
    process.exit(0);
  })();
}
