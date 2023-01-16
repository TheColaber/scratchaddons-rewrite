import { s as script$1, I as Icon, c as createApp } from '../../chunk.index.js';
import { p as popups } from '../../chunk._virtual__popups.js';
import { s as styleInject, c as createElementBlock, e as createBaseVNode, n as normalizeClass, z as createTextVNode, f as createVNode, F as Fragment, A as renderList, B as createBlock, C as resolveDynamicComponent, o as openBlock, t as toDisplayString, D as createCommentVNode, r as resolveComponent } from '../../chunk.style-inject.es.js';
import '../../chunk.define-manifest.js';

var css_248z$2 = ".colors-module_lightTheme__Dq1Tc {\n  --content-background: #f7f7f7;\n  --control-border: #aaa;\n  /* Button */\n  --button-background: #ecebeb;\n  --button-hover-background: #d4d3d3;\n  --content-text: #000;\n}\n\n.colors-module_darkTheme__Is8W- {\n  /* Content */\n  --content-background: #2a2a2a;\n  --content-text: #fff;\n  --control-border: #000;\n  --page-background: #222;\n  /* Button */\n  --button-background: #222;\n  --button-hover-background: #1a1a1a;\n}";
var colors = {"lightTheme":"colors-module_lightTheme__Dq1Tc","darkTheme":"colors-module_darkTheme__Is8W-"};
styleInject(css_248z$2);

var css_248z$1 = "@font-face {\n  font-family: \"Sora\";\n  src: url(\"../css/Sora.ttf\") format(\"truetype\");\n}";
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
  .map((id) => ({ [id]: enabledPopups[id].component }))
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
const _hoisted_2 = ["onClick"];
const _hoisted_3 = ["href"];

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
          createBaseVNode("a", {
            class: normalizeClass(_ctx.$style.link),
            href: "https://scratchaddons.com/changelog",
            target: "_blank",
            title: "View changelog"
          }, " v2.0.0 ", 2 /* CLASS */)
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
            createBaseVNode("span", {
              class: normalizeClass(_ctx.$style.name)
            }, toDisplayString($data.popups[id].name), 3 /* TEXT, CLASS */),
            (id !== 'settings-page')
              ? (openBlock(), createElementBlock("a", {
                  key: 0,
                  class: normalizeClass(_ctx.$style.link),
                  target: "_blank",
                  href: 'fullscreen.html?id=' + id
                }, [
                  createVNode(_component_Icon, { icon: "uil:external-link-alt" })
                ], 10 /* CLASS, PROPS */, _hoisted_3))
              : createCommentVNode("v-if", true)
          ], 10 /* CLASS, PROPS */, _hoisted_2))
        }), 256 /* UNKEYED_FRAGMENT */))
      ], 2 /* CLASS */),
      createBaseVNode("div", {
        class: normalizeClass(_ctx.$style.component)
      }, [
        (openBlock(), createBlock(resolveDynamicComponent($data.selectedTab)))
      ], 2 /* CLASS */)
    ], 2 /* CLASS */)
  ], 2 /* CLASS */))
}

var css_248z = "._container_anvxk_2 {\n  --gradient: linear-gradient(to right, var(--theme), hsl(24deg 100% 67%));\n  height: inherit;\n  display: flex;\n  flex-direction: column;\n  font-family: \"Sora\", sans-serif;\n}\n\n._header_anvxk_9 {\n  background-image: var(--gradient);\n  display: flex;\n  height: 60px;\n  color: #fff;\n}\n._header_anvxk_9 ._title_anvxk_14 {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n  padding: 0 20px;\n}\n._header_anvxk_9 ._title_anvxk_14 ._text_anvxk_19 {\n  font-size: 18px;\n  font-weight: 400;\n}\n._header_anvxk_9 ._title_anvxk_14 ._text_anvxk_19 ._link_anvxk_22 {\n  color: inherit;\n  margin: 5px;\n  text-decoration: none;\n  opacity: 0.75;\n  font-size: 12px;\n  border-radius: 4px;\n}\n._header_anvxk_9 ._title_anvxk_14 ._text_anvxk_19 ._link_anvxk_22:focus-visible {\n  outline: none;\n  box-shadow: 0 0 0 3px #fff;\n}\n._header_anvxk_9 ._title_anvxk_14 ._logo_anvxk_36 {\n  height: 30px;\n  margin-inline-end: 20px;\n}\n._header_anvxk_9 ._settings_anvxk_41 {\n  padding: 0 20px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  background: none;\n  color: inherit;\n}\n._header_anvxk_9 ._settings_anvxk_41:focus-visible {\n  outline: none;\n  box-shadow: inset 0 0 0 3px #fff;\n}\n._header_anvxk_9 ._settings_anvxk_41 svg {\n  font-size: 24px;\n}\n\n._popups_anvxk_61 {\n  background-color: var(--page-background);\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n._popups_anvxk_61 ._tabs_anvxk_67 {\n  margin: 10px;\n  background-color: var(--content-background);\n  border-radius: 12px;\n  padding: 10px;\n  display: flex;\n  gap: 8px;\n  height: 35px;\n  overflow: hidden;\n}\n._popups_anvxk_61 ._tabs_anvxk_67 ._tab_anvxk_67 {\n  display: flex;\n  align-items: center;\n  padding: 0px 8px;\n  font-size: 12px;\n  color: var(--content-text);\n  background: none;\n  border: none;\n  border-radius: 12px;\n  transition: 0.2s ease background;\n  font-family: inherit;\n}\n._popups_anvxk_61 ._tabs_anvxk_67 ._tab_anvxk_67:has(._link_anvxk_22) {\n  padding: 0px 15.5px;\n}\n._popups_anvxk_61 ._tabs_anvxk_67 ._tab_anvxk_67:hover {\n  background-color: var(--button-hover-background);\n  padding: 0px 8px;\n}\n._popups_anvxk_61 ._tabs_anvxk_67 ._tab_anvxk_67:focus-visible {\n  padding: 0px 8px;\n  outline: none;\n  box-shadow: inset 0 0 0 3px var(--content-text);\n}\n._popups_anvxk_61 ._tabs_anvxk_67 ._tab_anvxk_67._sel_anvxk_103 {\n  padding: 0px 8px;\n  background-image: var(--gradient);\n  color: #fff;\n}\n._popups_anvxk_61 ._tabs_anvxk_67 ._tab_anvxk_67._sel_anvxk_103 a svg {\n  color: #fff;\n}\n._popups_anvxk_61 ._tabs_anvxk_67 ._tab_anvxk_67 svg {\n  font-size: 18px;\n}\n._popups_anvxk_61 ._tabs_anvxk_67 ._tab_anvxk_67 ._name_anvxk_114 {\n  padding: 0px 0px 0px 5px;\n}\n._popups_anvxk_61 ._tabs_anvxk_67 ._tab_anvxk_67 ._link_anvxk_22 {\n  display: none;\n  outline: none;\n}\n._popups_anvxk_61 ._tabs_anvxk_67 ._tab_anvxk_67._sel_anvxk_103 ._link_anvxk_22, ._popups_anvxk_61 ._tabs_anvxk_67 ._tab_anvxk_67:focus-visible ._link_anvxk_22, ._popups_anvxk_61 ._tabs_anvxk_67 ._tab_anvxk_67:hover ._link_anvxk_22 {\n  display: flex;\n  height: 100%;\n  align-items: center;\n}\n._popups_anvxk_61 ._tabs_anvxk_67 ._tab_anvxk_67._sel_anvxk_103 ._link_anvxk_22 svg, ._popups_anvxk_61 ._tabs_anvxk_67 ._tab_anvxk_67:focus-visible ._link_anvxk_22 svg, ._popups_anvxk_61 ._tabs_anvxk_67 ._tab_anvxk_67:hover ._link_anvxk_22 svg {\n  color: var(--content-text);\n  font-size: 10px;\n  margin-left: 1px;\n  padding: 2px;\n  border-radius: 2px;\n}\n._popups_anvxk_61 ._tabs_anvxk_67 ._tab_anvxk_67._sel_anvxk_103 ._link_anvxk_22 svg:hover, ._popups_anvxk_61 ._tabs_anvxk_67 ._tab_anvxk_67:focus-visible ._link_anvxk_22 svg:hover, ._popups_anvxk_61 ._tabs_anvxk_67 ._tab_anvxk_67:hover ._link_anvxk_22 svg:hover {\n  background: #fff;\n  color: var(--theme);\n}\n._popups_anvxk_61 ._tabs_anvxk_67 ._tab_anvxk_67._sel_anvxk_103 ._link_anvxk_22:focus-visible svg, ._popups_anvxk_61 ._tabs_anvxk_67 ._tab_anvxk_67:focus-visible ._link_anvxk_22:focus-visible svg, ._popups_anvxk_61 ._tabs_anvxk_67 ._tab_anvxk_67:hover ._link_anvxk_22:focus-visible svg {\n  background: #fff;\n  color: var(--theme);\n}\n._popups_anvxk_61 ._component_anvxk_150 {\n  display: flex;\n  flex: 1;\n}";
styleInject(css_248z);

var style0 = {"container":"_container_anvxk_2","header":"_header_anvxk_9","title":"_title_anvxk_14","text":"_text_anvxk_19","link":"_link_anvxk_22","logo":"_logo_anvxk_36","settings":"_settings_anvxk_41","popups":"_popups_anvxk_61","tabs":"_tabs_anvxk_67","tab":"_tab_anvxk_67","sel":"_sel_anvxk_103","name":"_name_anvxk_114","component":"_component_anvxk_150"};

const cssModules = script.__cssModules = {};
cssModules["$style"] = style0;

script.render = render;
script.__file = "src/webpages/popup/index.vue";

createApp(script).mount("#app");
