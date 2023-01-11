import { s as styleInject, c as createApp, I as Icon, a as createElementBlock, b as createBaseVNode, d as createVNode, r as resolveComponent, o as openBlock } from '../../chunk.style-inject.es.js';

const { darkTheme = false, addonsEnabled = {} } = await chrome.storage.sync.get(
  ["darkTheme", "addonsEnabled"]
);

var script = {
  components: { Icon },
  data() {
    return {
      darkTheme: !!darkTheme,
    };
  },
  methods: {
    async switchMode() {
      this.darkTheme = !this.darkTheme;
      await chrome.storage.sync.set({ darkTheme: this.darkTheme });
    },
  },
};

const _hoisted_1 = { class: "container" };
const _hoisted_2 = { class: "navbar" };
const _hoisted_3 = ["src"];
const _hoisted_4 = /*#__PURE__*/createBaseVNode("div", { class: "title" }, "Settings", -1 /* HOISTED */);
const _hoisted_5 = /*#__PURE__*/createBaseVNode("div", { class: "main" }, null, -1 /* HOISTED */);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      createBaseVNode("img", {
        src: '../../images/icon.svg',
        class: "logo"
      }, null, 8 /* PROPS */, _hoisted_3),
      _hoisted_4,
      createBaseVNode("button", {
        class: "themeSwitcher",
        onClick: _cache[0] || (_cache[0] = (...args) => ($options.switchMode && $options.switchMode(...args)))
      }, [
        createVNode(_component_Icon, {
          icon: $data.darkTheme ? 'uil:moon' : 'uil:sun'
        }, null, 8 /* PROPS */, ["icon"])
      ])
    ]),
    _hoisted_5
  ]))
}

var css_248z = ".logo {\n  height: 30px;\n  margin-inline-end: 20px;\n}\n\n.themeSwitcher {\n  padding: 0 20px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  background: none;\n  color: inherit;\n}";
styleInject(css_248z);

script.render = render;
script.__file = "src/webpages/settings/index.vue";

createApp(script).mount("#app");
