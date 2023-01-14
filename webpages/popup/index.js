import { a as styleInject, s as script$1, I as Icon, c as createApp } from '../../chunk.index.js';
import { p as popups } from '../../chunk._virtual__popups.js';
import { c as createElementBlock, e as createBaseVNode, x as normalizeClass, y as createTextVNode, f as createVNode, F as Fragment, z as renderList, A as createBlock, B as resolveDynamicComponent, o as openBlock, t as toDisplayString, C as createCommentVNode, r as resolveComponent } from '../../chunk.runtime-core.esm-bundler.js';
import '../../chunk.define-manifest.js';

var css_248z$2 = ".colors-module_lightTheme__Dq1Tc {\n  --content-background: #f7f7f7;\n  --control-border: #aaa;\n  /* Button */\n  --button-background: #ecebeb;\n  --button-hover-background: #d4d3d3;\n  --content-text: #000;\n}\n\n.colors-module_darkTheme__Is8W- {\n  --content-background: #2a2a2a;\n  --control-border: #000;\n  /* Button */\n  --button-background: #222;\n  --button-hover-background: #1a1a1a;\n  --content-text: #fff;\n}";
var colors = {"lightTheme":"colors-module_lightTheme__Dq1Tc","darkTheme":"colors-module_darkTheme__Is8W-"};
styleInject(css_248z$2);

var css_248z$1 = "@font-face {\n  font-family: \"Sora\";\n  src: url(\"./Sora.ttf\") format(\"truetype\");\n}";
styleInject(css_248z$1);

const { darkTheme = false, addonsEnabled = {} } = await chrome.storage.sync.get(
  ["darkTheme", "addonsEnabled"]
);

const enabledPopups = Object.keys(popups)
  .map((id) => {
    if (!addonsEnabled[id]) return {};
    return { [id]: popups[id].popup };
  })
  .reduce((prev, curr) => ({ ...prev, ...curr }), {});
enabledPopups["settings-page"] = {
  name: "Addons",
  icon: "wrench",
  component: script$1,
};

const components = Object.keys(enabledPopups)
  .map((id) => {
    if (!addonsEnabled[id]) return {};
    return { [id]: enabledPopups[id].component };
  })
  .reduce((prev, curr) => ({ ...prev, ...curr }), {});

var script = {
  components: { Icon, ...components },
  data() {
    return {
      ORDER: ["scratch-messaging", "settings-page"],
      popups: enabledPopups,
      darkTheme: !!darkTheme,
      selectedTab: "",
      colors,
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

const _hoisted_1 = ["src"];
const _hoisted_2 = /*#__PURE__*/createBaseVNode("a", {
  href: "https://scratchaddons.com/changelog",
  target: "_blank",
  title: "View changelog"
}, " v2.0.0 ", -1 /* HOISTED */);
const _hoisted_3 = ["onClick"];
const _hoisted_4 = ["href"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass([
      _ctx.$style.container,
      { [$data.colors.darkTheme]: $data.darkTheme, [$data.colors.lightTheme]: !$data.darkTheme },
    ])
  }, [
    createBaseVNode("div", {
      class: normalizeClass(_ctx.$style.header)
    }, [
      createBaseVNode("div", {
        class: normalizeClass(_ctx.$style.title)
      }, [
        createBaseVNode("img", {
          src: '../../images/icon.svg',
          class: normalizeClass(_ctx.$style.logo)
        }, null, 10 /* CLASS, PROPS */, _hoisted_1),
        createBaseVNode("span", {
          class: normalizeClass(_ctx.$style.text)
        }, [
          createTextVNode(" Scratch Addons "),
          _hoisted_2
        ], 2 /* CLASS */)
      ], 2 /* CLASS */),
      createBaseVNode("button", {
        class: normalizeClass(_ctx.$style.settings),
        onClick: _cache[0] || (_cache[0] = $event => ($options.openSettingsPage()))
      }, [
        createVNode(_component_Icon, { icon: "uil:cog" })
      ], 2 /* CLASS */)
    ], 2 /* CLASS */),
    createBaseVNode("div", {
      class: normalizeClass(_ctx.$style.popups)
    }, [
      createBaseVNode("div", {
        class: normalizeClass(_ctx.$style.tabs)
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($data.ORDER, (id) => {
          return (openBlock(), createElementBlock("button", {
            class: normalizeClass([_ctx.$style.tab, { [_ctx.$style.sel]: id === $data.selectedTab }]),
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
                ], 8 /* PROPS */, _hoisted_4))
              : createCommentVNode("v-if", true)
          ], 10 /* CLASS, PROPS */, _hoisted_3))
        }), 256 /* UNKEYED_FRAGMENT */))
      ], 2 /* CLASS */),
      (openBlock(), createBlock(resolveDynamicComponent($data.selectedTab)))
    ], 2 /* CLASS */)
  ], 2 /* CLASS */))
}

var css_248z = "._container_10sq7_2 {\n  height: inherit;\n  display: flex;\n  flex-direction: column;\n  font-family: \"Sora\", sans-serif;\n}\n\n._header_10sq7_8 {\n  display: flex;\n  height: 60px;\n  color: #fff;\n}\n._header_10sq7_8 ._title_10sq7_12 {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n  padding: 0 20px;\n}\n._header_10sq7_8 ._title_10sq7_12 ._text_10sq7_17 {\n  font-size: 18px;\n  font-weight: 400;\n}\n._header_10sq7_8 ._title_10sq7_12 ._text_10sq7_17 a {\n  color: inherit;\n  margin: 5px;\n  text-decoration: none;\n  opacity: 0.75;\n  font-size: 12px;\n}\n._header_10sq7_8 ._title_10sq7_12 ._logo_10sq7_28 {\n  height: 30px;\n  margin-inline-end: 20px;\n}\n._header_10sq7_8 ._settings_10sq7_33 {\n  padding: 0 20px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  background: none;\n  color: inherit;\n}\n._header_10sq7_8 ._settings_10sq7_33 svg {\n  font-size: 24px;\n}\n._header_10sq7_8 button:focus-visible,\n._header_10sq7_8 a:focus-visible {\n  outline: none;\n  box-shadow: 0 0 0 3px #fff;\n}\n\n._popups_10sq7_52 {\n  background-color: var(--content-background);\n  flex: 1;\n}\n._popups_10sq7_52 ._tabs_10sq7_55 {\n  padding: 10px;\n  padding-bottom: 0px;\n  display: flex;\n  border-bottom: 1px solid var(--control-border);\n  height: 35px;\n  overflow: hidden;\n}\n._popups_10sq7_52 ._tabs_10sq7_55 ._tab_10sq7_55 {\n  display: flex;\n  align-items: center;\n  padding: 0px 12px;\n  font-size: 12px;\n  color: var(--content-text);\n  background-color: var(--button-background);\n  border: 1px solid var(--control-border);\n  border-bottom: none;\n  border-radius: 12px 12px 0 0;\n  transition: 0.2s ease;\n}\n._popups_10sq7_52 ._tabs_10sq7_55 ._tab_10sq7_55:hover {\n  background-color: var(--button-hover-background);\n}\n._popups_10sq7_52 ._tabs_10sq7_55 ._tab_10sq7_55._sel_10sq7_76 {\n  background-color: rgb(var(--theme));\n  color: #fff;\n}\n._popups_10sq7_52 ._tabs_10sq7_55 ._tab_10sq7_55._sel_10sq7_76 a svg {\n  color: #fff;\n}\n._popups_10sq7_52 ._tabs_10sq7_55 ._tab_10sq7_55 svg {\n  font-size: 18px;\n}\n._popups_10sq7_52 ._tabs_10sq7_55 ._tab_10sq7_55 span {\n  padding: 0px 0px 0px 5px;\n}\n._popups_10sq7_52 ._tabs_10sq7_55 ._tab_10sq7_55 a {\n  height: 100%;\n  display: flex;\n  align-items: center;\n}\n._popups_10sq7_52 ._tabs_10sq7_55 ._tab_10sq7_55 a svg {\n  color: var(--content-text);\n  font-size: 10px;\n  margin-left: 1px;\n  padding: 2px;\n}\n._popups_10sq7_52 ._tabs_10sq7_55 ._tab_10sq7_55 a svg:hover {\n  background: #fff;\n  color: rgb(var(--theme));\n  border-radius: 2px;\n}\n._popups_10sq7_52 button {\n  font-family: inherit;\n}\n._popups_10sq7_52 button:focus-visible,\n._popups_10sq7_52 a:focus-visible {\n  outline: none;\n  box-shadow: 0 0 0 3px var(--content-text);\n}";
styleInject(css_248z);

var style0 = {"container":"_container_10sq7_2","header":"_header_10sq7_8","title":"_title_10sq7_12","text":"_text_10sq7_17","logo":"_logo_10sq7_28","settings":"_settings_10sq7_33","popups":"_popups_10sq7_52","tabs":"_tabs_10sq7_55","tab":"_tab_10sq7_55","sel":"_sel_10sq7_76"};

const cssModules = script.__cssModules = {};
cssModules["$style"] = style0;

script.render = render;
script.__file = "src/webpages/popup/index.vue";

createApp(script).mount("#app");
