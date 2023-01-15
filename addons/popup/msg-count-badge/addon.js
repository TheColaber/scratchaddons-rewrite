import { d as defineManifest } from '../../../chunk.define-manifest.js';
import worker from './worker.js';

var addon = defineManifest({
    name: "Message count on badge",
    description: "Message count from scratch on popup badge",
    tags: [],
    versionAdded: "1.0.0",
    worker,
    enabledByDefault: true,
});

export { addon as default };
