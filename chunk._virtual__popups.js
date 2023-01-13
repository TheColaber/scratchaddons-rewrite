import { d as defineManifest } from './chunk.define-manifest.js';
import { c as createElementBlock, t as toDisplayString, o as openBlock } from './chunk.runtime-core.esm-bundler.js';

const storagePromise = chrome.storage.sync.get("addonSettings");

var script = {
  props: ["manifest"],
  data() {
    return {
      storage: {},
    };
  },
  async created() {
    const { addonSettings = {} } = await storagePromise;
    this.storage = addonSettings;
  },
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", null, " test " + toDisplayString($data.storage), 1 /* TEXT */))
}

script.render = render;
script.__file = "src/popups/scratch-messaging/component.vue";

var addon = defineManifest({
    name: "Scratch Messaging",
    description: "Available when clicking the Scratch Addons icon. Provides easy reading and replying to your Scratch messages: groups messages by project, shows full comment text and context, allows direct comment replying.",
    credits: [
        {
            name: "World_Languages",
        },
        {
            name: "griffpatch",
        },
    ],
    popup: {
        component: script,
        name: "Messaging",
        icon: "envelope",
    },
    versionAdded: "1.0.0",
    tags: ["recommended"],
    enabledByDefault: true,
});

var popups = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'scratch-messaging': addon
});

export { popups as p };
