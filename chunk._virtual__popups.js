import { d as defineManifest } from './chunk.define-manifest.js';
import { c as createElementBlock, t as toDisplayString, n as normalizeClass, o as openBlock } from './chunk.runtime-core.esm-bundler.js';
import { s as styleInject } from './chunk.style-inject.es.js';

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
  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.$style.container)
  }, " test " + toDisplayString($data.storage), 3 /* TEXT, CLASS */))
}

var css_248z = "._container_1grok_2 {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  background: var(--page-background);\n}";
styleInject(css_248z);

var style0 = {"container":"_container_1grok_2"};

const cssModules = script.__cssModules = {};
cssModules["$style"] = style0;

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
