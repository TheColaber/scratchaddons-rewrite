import { rollup, watch } from "rollup";
import config from "./rollup.config.js";

const [, , arg] = process.argv;
if (arg === "-w") {
  const watcher = watch(config);
  watcher.on("event", (event) => {
    console.log(event.code);

    if (event.code === "ERROR") {
      console.log(event.error);
    }

    if (event.code === "BUNDLE_END") {
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
