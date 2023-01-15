import { d as defineManifest } from '../../../chunk.define-manifest.js';
import worker from './worker.js';

var addon = defineManifest({
    name: "Test Addon",
    description: "test desc",
    versionAdded: "1.0.0",
    tags: ["recommended"],
    enabledByDefault: true,
    worker,
});

export { addon as default };
