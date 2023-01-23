import worker from "./worker";

export default defineManifest({
  name: "Test Addon",
  description: "test desc",
  versionAdded: "1.0.0",
  tags: ["recommended"],
  enabledByDefault: true,
  worker,
});
