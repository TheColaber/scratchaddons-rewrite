import { I as Icon, s as script$2, a as styleInject, c as createApp, b as createElementBlock, d as createBaseVNode, e as createVNode, F as Fragment, r as renderList, f as createBlock, g as resolveDynamicComponent, n as normalizeClass, o as openBlock, h as createTextVNode, t as toDisplayString, i as resolveComponent } from '../../chunk.index.js';
import { p as popups } from '../../chunk._virtual__popups.js';

await chrome.storage.sync.get("addonSettings");

var script$1 = {
  props: ["manifest"],
};

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", null, "test"))
}

script$1.render = render$1;
script$1.__file = "src/popups/scratch-messaging/component.vue";

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'scratch-messaging': script$1
});

const { darkTheme = false, addonsEnabled = {} } = await chrome.storage.sync.get(
  ["darkTheme", "addonsEnabled"]
);

const enabledPopups = {};
for (const id in popups) {
  if (addonsEnabled[id]) {
  /* @ts-ignore */
  enabledPopups[id] = popups[id].popup;
  }
}

/* @ts-ignore */
enabledPopups["settings-page"] = {name: "Addons", icon: "wrench"};

var script = {
  components: { Icon, ...components, "settings-page": script$2 },
  data() {
    return {
      ORDER: ["scratch-messaging", "settings-page"],
      popups: enabledPopups,
      darkTheme: !!darkTheme,
      selectedTab: "",
    };
  },
  created() {
    this.selectedTab = this.ORDER[0];

    chrome.storage.sync.onChanged.addListener((changes) => {
      console.log(changes);
      if (changes.darkTheme) {
        this.darkTheme = changes.darkTheme.newValue;
        console.log(this.darkTheme);
      }
    });
  },
  methods: {
    openSettingsPage() {
      chrome.runtime.openOptionsPage();
    },
  },
};

const _hoisted_1 = { class: "header" };
const _hoisted_2 = { class: "title" };
const _hoisted_3 = ["src"];
const _hoisted_4 = /*#__PURE__*/createBaseVNode("span", { class: "text" }, [
  /*#__PURE__*/createTextVNode(" Scratch Addons "),
  /*#__PURE__*/createBaseVNode("a", {
    href: "https://scratchaddons.com/changelog",
    target: "_blank",
    title: "View changelog"
  }, " v2.0.0 ")
], -1 /* HOISTED */);
const _hoisted_5 = { class: "popups" };
const _hoisted_6 = { class: "tabs" };
const _hoisted_7 = ["href"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(["container", { darkTheme: $data.darkTheme }])
  }, [
    createBaseVNode("div", _hoisted_1, [
      createBaseVNode("div", _hoisted_2, [
        createBaseVNode("img", {
          src: '../../images/icon.svg',
          class: "logo"
        }, null, 8 /* PROPS */, _hoisted_3),
        _hoisted_4
      ]),
      createBaseVNode("button", {
        class: "settings",
        onClick: _cache[0] || (_cache[0] = $event => ($options.openSettingsPage()))
      }, [
        createVNode(_component_Icon, { icon: "uil:cog" })
      ])
    ]),
    createBaseVNode("div", _hoisted_5, [
      createBaseVNode("div", _hoisted_6, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($data.ORDER, (id) => {
          return (openBlock(), createElementBlock("button", {
            class: normalizeClass(["tab", { sel: id === $data.selectedTab }])
          }, [
            createVNode(_component_Icon, {
              icon: 'uil:' + $data.popups[id].icon
            }, null, 8 /* PROPS */, ["icon"]),
            createBaseVNode("span", null, toDisplayString($data.popups[id].name), 1 /* TEXT */),
            createBaseVNode("a", {
              target: "_blank",
              href: 'fullscreen.html?id=' + id
            }, [
              createVNode(_component_Icon, { icon: "uil:external-link-alt" })
            ], 8 /* PROPS */, _hoisted_7)
          ], 2 /* CLASS */))
        }), 256 /* UNKEYED_FRAGMENT */))
      ]),
      (openBlock(), createBlock(resolveDynamicComponent($data.selectedTab)))
    ])
  ], 2 /* CLASS */))
}

var css_248z = ".container {\n  --content-background: #f7f7f7;\n  --control-border: #aaa;\n  /* Button */\n  --button-background: #ecebeb;\n  --button-hover-background: #d4d3d3;\n  --content-text: #000;\n}\n.container.darkTheme {\n  --content-background: #2a2a2a;\n  --control-border: #000;\n  /* Button */\n  --button-background: #222;\n  --button-hover-background: #1a1a1a;\n  --content-text: #fff;\n}\n\n.container {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  font-family: \"Sora\", sans-serif;\n}\n\n.header {\n  display: flex;\n  height: 60px;\n  color: #fff;\n}\n.header .title {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n  padding: 0 20px;\n}\n.header .title .text {\n  font-size: 18px;\n  font-weight: 400;\n}\n.header .title .text a {\n  color: inherit;\n  margin: 5px;\n  text-decoration: none;\n  opacity: 0.75;\n  font-size: 12px;\n}\n.header .title .logo {\n  height: 30px;\n  margin-inline-end: 20px;\n}\n.header .settings {\n  padding: 0 20px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  background: none;\n  color: inherit;\n}\n.header .settings svg {\n  font-size: 24px;\n}\n.header button:focus-visible,\n.header a:focus-visible {\n  outline: none;\n  box-shadow: 0 0 0 3px #fff;\n}\n\n.popups {\n  background-color: var(--content-background);\n  flex: 1;\n}\n.popups .tabs {\n  padding: 10px;\n  padding-bottom: 0px;\n  display: flex;\n  border-bottom: 1px solid var(--control-border);\n  height: 35px;\n  overflow: hidden;\n}\n.popups .tabs .tab {\n  display: flex;\n  align-items: center;\n  padding: 0px 12px;\n  font-size: 12px;\n  color: var(--content-text);\n  background-color: var(--button-background);\n  border: 1px solid var(--control-border);\n  border-bottom: none;\n  border-radius: 12px 12px 0 0;\n  transition: 0.2s ease;\n}\n.popups .tabs .tab:hover {\n  background-color: var(--button-hover-background);\n}\n.popups .tabs .tab.sel {\n  background-color: rgb(var(--theme));\n  color: #fff;\n}\n.popups .tabs .tab.sel a svg {\n  color: #fff;\n}\n.popups .tabs .tab svg {\n  font-size: 18px;\n}\n.popups .tabs .tab span {\n  padding: 0px 0px 0px 5px;\n}\n.popups .tabs .tab a {\n  height: 100%;\n  display: flex;\n  align-items: center;\n}\n.popups .tabs .tab a svg {\n  color: var(--content-text);\n  font-size: 10px;\n  margin-left: 1px;\n  padding: 2px;\n}\n.popups .tabs .tab a svg:hover {\n  background: #fff;\n  color: rgb(var(--theme));\n  border-radius: 2px;\n}\n.popups button {\n  font-family: inherit;\n}\n.popups button:focus-visible,\n.popups a:focus-visible {\n  outline: none;\n  box-shadow: 0 0 0 3px var(--content-text);\n}";
styleInject(css_248z);

script.render = render;
script.__file = "src/webpages/popup/index.vue";

createApp(script).mount("#app");
