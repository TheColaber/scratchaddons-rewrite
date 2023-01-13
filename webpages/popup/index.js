import { a as styleInject, c as createApp, s as script$1, I as Icon } from '../../chunk.index.js';
import { p as popups } from '../../chunk._virtual__popups.js';
import { c as createElementBlock, e as createBaseVNode, f as createVNode, F as Fragment, x as renderList, y as createBlock, z as resolveDynamicComponent, A as normalizeClass, o as openBlock, t as toDisplayString, B as createCommentVNode, p as pushScopeId, g as popScopeId, C as createTextVNode, r as resolveComponent } from '../../chunk.runtime-core.esm-bundler.js';
import '../../chunk.define-manifest.js';

const { darkTheme = false, addonsEnabled = {} } = await chrome.storage.sync.get(
  ["darkTheme", "addonsEnabled"]
);

const enabledPopups = {
  "settings-page": {
    name: "Addons",
    icon: "wrench",
    component: script$1,
  },
};
for (const id in popups) {
  if (addonsEnabled[id]) {
    /* @ts-ignore */
    enabledPopups[id] = popups[id].popup;
  }
}
const components = {};
for (const id in enabledPopups) {
  /* @ts-ignore */
  components[id] = enabledPopups[id].component;
}
var script = {
  components: { Icon, ...components },
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

const _withScopeId = n => (pushScopeId("data-v-38561269"),n=n(),popScopeId(),n);
const _hoisted_1 = { class: "header" };
const _hoisted_2 = { class: "title" };
const _hoisted_3 = ["src"];
const _hoisted_4 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("span", { class: "text" }, [
  /*#__PURE__*/createTextVNode(" Scratch Addons "),
  /*#__PURE__*/createBaseVNode("a", {
    href: "https://scratchaddons.com/changelog",
    target: "_blank",
    title: "View changelog"
  }, " v2.0.0 ")
], -1 /* HOISTED */));
const _hoisted_5 = { class: "popups" };
const _hoisted_6 = { class: "tabs" };
const _hoisted_7 = ["onClick"];
const _hoisted_8 = ["href"];

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
            class: normalizeClass(["tab", { sel: id === $data.selectedTab }]),
            onClick: $event => ($data.selectedTab = id)
          }, [
            createVNode(_component_Icon, {
              icon: 'uil:' + $data.popups[id].icon
            }, null, 8 /* PROPS */, ["icon"]),
            createBaseVNode("span", null, toDisplayString($data.popups[id].name), 1 /* TEXT */),
            (id !== 'settings-page')
              ? (openBlock(), createElementBlock("a", {
                  key: 0,
                  target: "_blank",
                  href: 'fullscreen.html?id=' + id
                }, [
                  createVNode(_component_Icon, { icon: "uil:external-link-alt" })
                ], 8 /* PROPS */, _hoisted_8))
              : createCommentVNode("v-if", true)
          ], 10 /* CLASS, PROPS */, _hoisted_7))
        }), 256 /* UNKEYED_FRAGMENT */))
      ]),
      (openBlock(), createBlock(resolveDynamicComponent($data.selectedTab)))
    ])
  ], 2 /* CLASS */))
}

var css_248z = "@import url(\"../css/colors.css\");\n@import url(\"../css/sora.css\");\n.container[data-v-38561269] {\n  height: inherit;\n  display: flex;\n  flex-direction: column;\n  font-family: \"Sora\", sans-serif;\n}\n\n.header[data-v-38561269] {\n  display: flex;\n  height: 60px;\n  color: #fff;\n}\n.header[data-v-38561269] .title[data-v-38561269] {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n  padding: 0 20px;\n}\n.header[data-v-38561269] .title[data-v-38561269] .text[data-v-38561269] {\n  font-size: 18px;\n  font-weight: 400;\n}\n.header[data-v-38561269] .title[data-v-38561269] .text[data-v-38561269] a[data-v-38561269] {\n  color: inherit;\n  margin: 5px;\n  text-decoration: none;\n  opacity: 0.75;\n  font-size: 12px;\n}\n.header[data-v-38561269] .title[data-v-38561269] .logo[data-v-38561269] {\n  height: 30px;\n  margin-inline-end: 20px;\n}\n.header[data-v-38561269] .settings[data-v-38561269] {\n  padding: 0 20px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  background: none;\n  color: inherit;\n}\n.header[data-v-38561269] .settings[data-v-38561269] svg[data-v-38561269] {\n  font-size: 24px;\n}\n.header[data-v-38561269] button[data-v-38561269]:focus-visible,\n.header[data-v-38561269] a[data-v-38561269]:focus-visible {\n  outline: none;\n  box-shadow: 0 0 0 3px #fff;\n}\n\n.popups[data-v-38561269] {\n  background-color: var(--content-background);\n  flex: 1;\n}\n.popups[data-v-38561269] .tabs[data-v-38561269] {\n  padding: 10px;\n  padding-bottom: 0px;\n  display: flex;\n  border-bottom: 1px solid var(--control-border);\n  height: 35px;\n  overflow: hidden;\n}\n.popups[data-v-38561269] .tabs[data-v-38561269] .tab[data-v-38561269] {\n  display: flex;\n  align-items: center;\n  padding: 0px 12px;\n  font-size: 12px;\n  color: var(--content-text);\n  background-color: var(--button-background);\n  border: 1px solid var(--control-border);\n  border-bottom: none;\n  border-radius: 12px 12px 0 0;\n  transition: 0.2s ease;\n}\n.popups[data-v-38561269] .tabs[data-v-38561269] .tab[data-v-38561269][data-v-38561269]:hover {\n  background-color: var(--button-hover-background);\n}\n.popups[data-v-38561269] .tabs[data-v-38561269] .tab[data-v-38561269].sel[data-v-38561269] {\n  background-color: rgb(var(--theme));\n  color: #fff;\n}\n.popups[data-v-38561269] .tabs[data-v-38561269] .tab[data-v-38561269].sel[data-v-38561269] a svg[data-v-38561269] {\n  color: #fff;\n}\n.popups[data-v-38561269] .tabs[data-v-38561269] .tab[data-v-38561269] svg[data-v-38561269] {\n  font-size: 18px;\n}\n.popups[data-v-38561269] .tabs[data-v-38561269] .tab[data-v-38561269] span[data-v-38561269] {\n  padding: 0px 0px 0px 5px;\n}\n.popups[data-v-38561269] .tabs[data-v-38561269] .tab[data-v-38561269] a[data-v-38561269] {\n  height: 100%;\n  display: flex;\n  align-items: center;\n}\n.popups[data-v-38561269] .tabs[data-v-38561269] .tab[data-v-38561269] a[data-v-38561269] svg[data-v-38561269] {\n  color: var(--content-text);\n  font-size: 10px;\n  margin-left: 1px;\n  padding: 2px;\n}\n.popups[data-v-38561269] .tabs[data-v-38561269] .tab[data-v-38561269] a[data-v-38561269] svg[data-v-38561269][data-v-38561269]:hover {\n  background: #fff;\n  color: rgb(var(--theme));\n  border-radius: 2px;\n}\n.popups[data-v-38561269] button[data-v-38561269] {\n  font-family: inherit;\n}\n.popups[data-v-38561269] button[data-v-38561269]:focus-visible,\n.popups[data-v-38561269] a[data-v-38561269]:focus-visible {\n  outline: none;\n  box-shadow: 0 0 0 3px var(--content-text);\n}";
styleInject(css_248z);

script.render = render;
script.__scopeId = "data-v-38561269";
script.__file = "src/webpages/popup/index.vue";

createApp(script).mount("#app");
