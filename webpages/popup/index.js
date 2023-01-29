import { s as script$1, I as Icon, c as createApp } from '../../chunk.index.js';
import { p as popups } from '../../chunk._virtual__popups.js';
import { c as createElementBlock, e as createBaseVNode, n as normalizeClass, v as createTextVNode, f as createVNode, F as Fragment, w as renderList, x as createBlock, y as resolveDynamicComponent, o as openBlock, z as toDisplayString, A as createCommentVNode, r as resolveComponent } from '../../chunk.runtime-core.esm-bundler.js';
import injectStyle from '../../mainworld/inject-style.js';
import '../../chunk.define-manifest.js';

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
      { darkTheme: $data.darkTheme, lightTheme: !$data.darkTheme },
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

var css_248z = "._container_12pr1_2 {\n  height: inherit;\n  display: flex;\n  flex-direction: column;\n  font-family: \"Sora\", sans-serif;\n}\n\n._header_12pr1_8 {\n  background-image: var(--gradient);\n  display: flex;\n  height: 60px;\n  color: #fff;\n}\n._header_12pr1_8 ._title_12pr1_13 {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n  padding: 0 20px;\n}\n._header_12pr1_8 ._title_12pr1_13 ._text_12pr1_18 {\n  font-size: 18px;\n  font-weight: 400;\n}\n._header_12pr1_8 ._title_12pr1_13 ._text_12pr1_18 ._link_12pr1_21 {\n  color: inherit;\n  margin: 5px;\n  text-decoration: none;\n  opacity: 0.75;\n  font-size: 12px;\n  border-radius: 4px;\n}\n._header_12pr1_8 ._title_12pr1_13 ._text_12pr1_18 ._link_12pr1_21:focus-visible {\n  outline: none;\n  box-shadow: 0 0 0 3px #fff;\n}\n._header_12pr1_8 ._title_12pr1_13 ._logo_12pr1_35 {\n  height: 30px;\n  margin-inline-end: 20px;\n}\n._header_12pr1_8 ._settings_12pr1_40 {\n  padding: 0 20px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  background: none;\n  color: inherit;\n}\n._header_12pr1_8 ._settings_12pr1_40:focus-visible {\n  outline: none;\n  box-shadow: inset 0 0 0 3px #fff;\n}\n._header_12pr1_8 ._settings_12pr1_40 svg {\n  font-size: 24px;\n}\n\n._popups_12pr1_60 {\n  background-color: var(--background-primary);\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n._popups_12pr1_60 ._tabs_12pr1_66 {\n  margin: 10px;\n  background-color: var(--background-secondary);\n  border-radius: 12px;\n  padding: 10px;\n  display: flex;\n  gap: 8px;\n  height: 35px;\n  overflow: hidden;\n}\n._popups_12pr1_60 ._tabs_12pr1_66 ._tab_12pr1_66 {\n  display: flex;\n  align-items: center;\n  padding: 0px 8px;\n  font-size: 12px;\n  color: var(--content-text);\n  background: none;\n  border: none;\n  border-radius: 12px;\n  transition: 0.2s ease background;\n  font-family: inherit;\n}\n._popups_12pr1_60 ._tabs_12pr1_66 ._tab_12pr1_66:has(._link_12pr1_21) {\n  padding: 0px 15.5px;\n}\n._popups_12pr1_60 ._tabs_12pr1_66 ._tab_12pr1_66:hover {\n  background-color: var(--button-hover-background);\n  padding: 0px 8px;\n}\n._popups_12pr1_60 ._tabs_12pr1_66 ._tab_12pr1_66:focus-visible {\n  padding: 0px 8px;\n  outline: none;\n  box-shadow: inset 0 0 0 3px var(--content-text);\n}\n._popups_12pr1_60 ._tabs_12pr1_66 ._tab_12pr1_66._sel_12pr1_102 {\n  padding: 0px 8px;\n  background-image: var(--gradient);\n  color: #fff;\n}\n._popups_12pr1_60 ._tabs_12pr1_66 ._tab_12pr1_66._sel_12pr1_102 a svg {\n  color: #fff;\n}\n._popups_12pr1_60 ._tabs_12pr1_66 ._tab_12pr1_66 svg {\n  font-size: 18px;\n}\n._popups_12pr1_60 ._tabs_12pr1_66 ._tab_12pr1_66 ._name_12pr1_113 {\n  padding: 0px 0px 0px 5px;\n}\n._popups_12pr1_60 ._tabs_12pr1_66 ._tab_12pr1_66 ._link_12pr1_21 {\n  display: none;\n  outline: none;\n}\n._popups_12pr1_60 ._tabs_12pr1_66 ._tab_12pr1_66._sel_12pr1_102 ._link_12pr1_21, ._popups_12pr1_60 ._tabs_12pr1_66 ._tab_12pr1_66:focus-visible ._link_12pr1_21, ._popups_12pr1_60 ._tabs_12pr1_66 ._tab_12pr1_66:hover ._link_12pr1_21 {\n  display: flex;\n  height: 100%;\n  align-items: center;\n}\n._popups_12pr1_60 ._tabs_12pr1_66 ._tab_12pr1_66._sel_12pr1_102 ._link_12pr1_21 svg, ._popups_12pr1_60 ._tabs_12pr1_66 ._tab_12pr1_66:focus-visible ._link_12pr1_21 svg, ._popups_12pr1_60 ._tabs_12pr1_66 ._tab_12pr1_66:hover ._link_12pr1_21 svg {\n  color: var(--content-text);\n  font-size: 10px;\n  margin-left: 1px;\n  padding: 2px;\n  border-radius: 2px;\n}\n._popups_12pr1_60 ._tabs_12pr1_66 ._tab_12pr1_66._sel_12pr1_102 ._link_12pr1_21 svg:hover, ._popups_12pr1_60 ._tabs_12pr1_66 ._tab_12pr1_66:focus-visible ._link_12pr1_21 svg:hover, ._popups_12pr1_60 ._tabs_12pr1_66 ._tab_12pr1_66:hover ._link_12pr1_21 svg:hover {\n  background: #fff;\n  color: var(--theme);\n}\n._popups_12pr1_60 ._tabs_12pr1_66 ._tab_12pr1_66._sel_12pr1_102 ._link_12pr1_21:focus-visible svg, ._popups_12pr1_60 ._tabs_12pr1_66 ._tab_12pr1_66:focus-visible ._link_12pr1_21:focus-visible svg, ._popups_12pr1_60 ._tabs_12pr1_66 ._tab_12pr1_66:hover ._link_12pr1_21:focus-visible svg {\n  background: #fff;\n  color: var(--theme);\n}\n._popups_12pr1_60 ._component_12pr1_149 {\n  flex: 1;\n}";
 injectStyle(css_248z);

var style0 = {"container":"_container_12pr1_2","header":"_header_12pr1_8","title":"_title_12pr1_13","text":"_text_12pr1_18","link":"_link_12pr1_21","logo":"_logo_12pr1_35","settings":"_settings_12pr1_40","popups":"_popups_12pr1_60","tabs":"_tabs_12pr1_66","tab":"_tab_12pr1_66","sel":"_sel_12pr1_102","name":"_name_12pr1_113","component":"_component_12pr1_149"};

const cssModules = script.__cssModules = {};
cssModules["$style"] = style0;

script.render = render;
script.__file = "src/webpages/popup/index.vue";

createApp(script).mount("#app");
