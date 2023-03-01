import { a as styleInject, m as createApp, d as defineComponent, k as withAsyncContext, r as ref, c as createElementBlock, b as createBaseVNode, n as normalizeClass, F as Fragment, l as renderList, e as createVNode, u as unref, s as storage$1, p as createBlock, j as withCtx, S as Suspense, o as openBlock, q as isRef, I as Icon, t as toDisplayString, f as createTextVNode } from '../chunk.style-inject.es-cbd22147.js';
import { s as script$4 } from '../chunk.content-54072954.js';
import '../chunk._virtual__addons-19cb23e2.js';

const _hoisted_1$1 = ["src"];
const _hoisted_2$1 = ["onClick"];
var script$3 = /* @__PURE__ */ defineComponent({
  __name: "header",
  async setup(__props) {
    let __temp, __restore;
    const data = ([__temp, __restore] = withAsyncContext(() => storage$1.get(["darkTheme"])), __temp = await __temp, __restore(), __temp);
    ref(data.darkTheme);
    let selectedTab = "all";
    const tabs = [
      {
        id: "popup",
        icon: "app-window"
      },
      {
        id: "website",
        icon: "world"
      },
      {
        id: "editor",
        icon: "flag"
      },
      {
        id: "hotkeys",
        icon: "keyboard"
      }
    ];
    function openSupport() {
      console.log("openning support");
    }
    function openSettings() {
      console.log("openning settings");
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass(_ctx.$style.header)
        },
        [
          createBaseVNode(
            "div",
            {
              class: normalizeClass(_ctx.$style.title)
            },
            [
              createBaseVNode("img", {
                src: "../../images/icon.svg",
                class: normalizeClass(_ctx.$style.logo)
              }, null, 10, _hoisted_1$1),
              createBaseVNode(
                "span",
                {
                  class: normalizeClass(_ctx.$style.text)
                },
                " Scratch Addons ",
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          ),
          createBaseVNode(
            "div",
            {
              class: normalizeClass([_ctx.$style.tabs, _ctx.$style.mainTabs])
            },
            [
              (openBlock(), createElementBlock(
                Fragment,
                null,
                renderList(tabs, (tab) => {
                  return createBaseVNode("button", {
                    class: normalizeClass([_ctx.$style.tab, { [_ctx.$style.sel]: tab.id === unref(selectedTab) }]),
                    onClick: ($event) => isRef(selectedTab) ? selectedTab.value = tab.id : selectedTab = tab.id
                  }, [
                    createVNode(unref(Icon), {
                      class: normalizeClass(_ctx.$style.icon),
                      icon: "tabler:" + tab.icon
                    }, null, 8, ["class", "icon"]),
                    createBaseVNode(
                      "span",
                      {
                        class: normalizeClass(_ctx.$style.name)
                      },
                      toDisplayString(tab.id),
                      3
                      /* TEXT, CLASS */
                    )
                  ], 10, _hoisted_2$1);
                }),
                64
                /* STABLE_FRAGMENT */
              ))
            ],
            2
            /* CLASS */
          ),
          createBaseVNode(
            "div",
            {
              class: normalizeClass(_ctx.$style.tabs)
            },
            [
              createBaseVNode(
                "button",
                {
                  class: normalizeClass(_ctx.$style.tab),
                  onClick: openSupport
                },
                [
                  createVNode(unref(Icon), {
                    class: normalizeClass(_ctx.$style.icon),
                    icon: "tabler:message"
                  }, null, 8, ["class"]),
                  createBaseVNode(
                    "span",
                    {
                      class: normalizeClass(_ctx.$style.name)
                    },
                    "Support",
                    2
                    /* CLASS */
                  )
                ],
                2
                /* CLASS */
              ),
              createBaseVNode(
                "button",
                {
                  class: normalizeClass(_ctx.$style.tab),
                  onClick: openSettings
                },
                [
                  createVNode(unref(Icon), {
                    class: normalizeClass(_ctx.$style.icon),
                    icon: "tabler:tool"
                  }, null, 8, ["class"]),
                  createBaseVNode(
                    "span",
                    {
                      class: normalizeClass(_ctx.$style.name)
                    },
                    "More Settings",
                    2
                    /* CLASS */
                  )
                ],
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          ),
          createBaseVNode(
            "div",
            {
              class: normalizeClass(_ctx.$style.menu)
            },
            [
              createVNode(unref(Icon), {
                class: normalizeClass(_ctx.$style.icon),
                icon: "tabler:menu-2"
              }, null, 8, ["class"])
            ],
            2
            /* CLASS */
          )
        ],
        2
        /* CLASS */
      );
    };
  }
});

var css_248z$2 = "._header_anfu1_2 {\n  background-image: var(--gradient);\n  display: flex;\n  justify-content: center;\n  gap: 20px;\n  padding: 0px 20px;\n  box-sizing: border-box;\n  height: 60px;\n  width: 100%;\n  color: #fff;\n}\n._header_anfu1_2 ._title_anfu1_12 {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n._header_anfu1_2 ._title_anfu1_12 ._text_anfu1_16 {\n  font-size: 18px;\n  font-weight: 400;\n}\n@media (max-width: 890px) {\n  ._header_anfu1_2 ._title_anfu1_12 ._text_anfu1_16 {\n    display: none;\n  }\n}\n._header_anfu1_2 ._title_anfu1_12 ._logo_anfu1_23 {\n  height: 30px;\n}\n._header_anfu1_2 ._menu_anfu1_27 {\n  display: none;\n}\n@media (max-width: 730px) {\n  ._header_anfu1_2 ._tabs_anfu1_31:not(._mainTabs_anfu1_31) {\n    display: none;\n  }\n  ._header_anfu1_2 ._menu_anfu1_27 {\n    display: flex;\n    align-items: center;\n    font-size: 24px;\n  }\n}\n._header_anfu1_2 ._tabs_anfu1_31 {\n  padding: 12px 0px;\n  display: flex;\n  justify-content: center;\n  gap: 8px;\n}\n._header_anfu1_2 ._tabs_anfu1_31._mainTabs_anfu1_31 {\n  flex: 1;\n}\n._header_anfu1_2 ._tabs_anfu1_31 ._tab_anfu1_31 {\n  display: flex;\n  align-items: center;\n  padding: 0px 8px;\n  font-size: 12px;\n  color: var(--content-text);\n  background: none;\n  border: none;\n  border-radius: 8px;\n  transition: 0.2s ease background;\n  font-family: inherit;\n}\n._header_anfu1_2 ._tabs_anfu1_31 ._tab_anfu1_31:has(._link_anfu1_60) {\n  padding: 0px 15.5px;\n}\n._header_anfu1_2 ._tabs_anfu1_31 ._tab_anfu1_31:hover {\n  background-color: var(--button-hover-background);\n  padding: 0px 8px;\n}\n._header_anfu1_2 ._tabs_anfu1_31 ._tab_anfu1_31:focus-visible {\n  padding: 0px 8px;\n  outline: none;\n  box-shadow: inset 0 0 0 3px var(--content-text);\n}\n._header_anfu1_2 ._tabs_anfu1_31 ._tab_anfu1_31._sel_anfu1_72 {\n  padding: 0px 8px;\n  background-image: var(--gradient);\n  color: #fff;\n}\n._header_anfu1_2 ._tabs_anfu1_31 ._tab_anfu1_31 ._icon_anfu1_77 {\n  font-size: 24px;\n}\n._header_anfu1_2 ._tabs_anfu1_31 ._tab_anfu1_31 ._name_anfu1_80 {\n  padding: 0px 0px 0px 5px;\n}";
styleInject(css_248z$2);

var style0$2 = { "header": "_header_anfu1_2", "title": "_title_anfu1_12", "text": "_text_anfu1_16", "logo": "_logo_anfu1_23", "menu": "_menu_anfu1_27", "tabs": "_tabs_anfu1_31", "mainTabs": "_mainTabs_anfu1_31", "tab": "_tab_anfu1_31", "link": "_link_anfu1_60", "sel": "_sel_anfu1_72", "icon": "_icon_anfu1_77", "name": "_name_anfu1_80" };

const cssModules$2 = script$3.__cssModules = {};
cssModules$2["$style"] = style0$2;


script$3.__file = "src/settings/header.vue";

const _hoisted_1 = ["src"];
const _hoisted_2 = /* @__PURE__ */ createBaseVNode(
  "button",
  null,
  "Get Started",
  -1
  /* HOISTED */
);
function render(_ctx, _cache) {
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(_ctx.$style.overlay)
    },
    [
      createBaseVNode(
        "div",
        {
          class: normalizeClass(_ctx.$style.container)
        },
        [
          createBaseVNode("img", {
            src: "../../images/icon.svg",
            class: normalizeClass(_ctx.$style.logo)
          }, null, 10, _hoisted_1),
          createBaseVNode(
            "span",
            {
              class: normalizeClass(_ctx.$style.title)
            },
            "Welcome to Scratch Addons",
            2
            /* CLASS */
          ),
          createBaseVNode(
            "span",
            {
              class: normalizeClass(_ctx.$style.description)
            },
            "It's time to completely change Scratch with your full configuration.",
            2
            /* CLASS */
          ),
          createBaseVNode(
            "div",
            {
              class: normalizeClass(_ctx.$style.options)
            },
            [
              _hoisted_2,
              createBaseVNode(
                "span",
                {
                  class: normalizeClass(_ctx.$style["other-option"])
                },
                [
                  createTextVNode(" or\xA0 "),
                  createBaseVNode(
                    "span",
                    {
                      class: normalizeClass(_ctx.$style.exit),
                      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("exit"))
                    },
                    "view the settings page",
                    2
                    /* CLASS */
                  )
                ],
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          )
        ],
        2
        /* CLASS */
      )
    ],
    2
    /* CLASS */
  );
}

var css_248z$1 = "._overlay_1kyzc_2 {\n  display: flex;\n  flex: 1;\n  background-image: var(--gradient);\n}\n._overlay_1kyzc_2 ._container_1kyzc_7 {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  color: #fff;\n  background-color: var(--background-secondary);\n  border: 1px solid var(--background-tertiary);\n  padding: 20px;\n  border-radius: 10px;\n  width: -webkit-fill-available;\n  box-sizing: border-box;\n  flex: 1;\n  margin: 40px;\n}\n._overlay_1kyzc_2 ._container_1kyzc_7 ._logo_1kyzc_21 {\n  height: 192px;\n}\n._overlay_1kyzc_2 ._container_1kyzc_7 ._title_1kyzc_24 {\n  font-size: 32px;\n}\n._overlay_1kyzc_2 ._container_1kyzc_7 ._description_1kyzc_27 {\n  font-size: 12px;\n}\n._overlay_1kyzc_2 ._container_1kyzc_7 ._options_1kyzc_30 {\n  margin-top: 10px;\n  display: flex;\n  gap: 5px;\n  flex-direction: row;\n}\n._overlay_1kyzc_2 ._container_1kyzc_7 ._options_1kyzc_30 ._other-option_1kyzc_35 {\n  display: flex;\n  flex-wrap: wrap;\n  align-content: center;\n}\n._overlay_1kyzc_2 ._container_1kyzc_7 ._options_1kyzc_30 ._other-option_1kyzc_35 ._exit_1kyzc_39 {\n  text-decoration: underline;\n  cursor: pointer;\n}\n._overlay_1kyzc_2 ._container_1kyzc_7 button {\n  color: var(--content-text);\n  background: var(--background-primary);\n  border: 1px solid var(--button-border);\n  padding: 0 12px;\n  border-radius: 4px;\n  transition: 0.2s ease;\n  height: 32px;\n  box-sizing: border-box;\n  font-family: inherit;\n  font-size: 12px;\n}";
styleInject(css_248z$1);

var style0$1 = { "overlay": "_overlay_1kyzc_2", "container": "_container_1kyzc_7", "logo": "_logo_1kyzc_21", "title": "_title_1kyzc_24", "description": "_description_1kyzc_27", "options": "_options_1kyzc_30", "other-option": "_other-option_1kyzc_35", "exit": "_exit_1kyzc_39" };

const script$2 = {};

const cssModules$1 = script$2.__cssModules = {};
cssModules$1["$style"] = style0$1;

script$2.render = render;
script$2.__file = "src/settings/components/onboarding.vue";

var script$1 = /* @__PURE__ */ defineComponent({
  __name: "page",
  async setup(__props) {
    let __temp, __restore;
    const data = ([__temp, __restore] = withAsyncContext(() => storage$1.get([
      "darkTheme",
      "addonsEnabled",
      "installedDetails"
    ])), __temp = await __temp, __restore(), __temp);
    const darkTheme = ref(data.darkTheme);
    const installedDetails = ref(data.installedDetails);
    if (installedDetails.value && installedDetails.value.reason === "install") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      storage$1.set({ darkTheme: prefersDark });
      darkTheme.value = prefersDark;
    }
    storage$1.valueStream.subscribe((values) => {
      darkTheme.value = values.darkTheme;
    });
    function removeInstallDetails() {
      storage$1.set({ installedDetails: null });
      installedDetails.value = null;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass([_ctx.$style.container, { theme: true, darkTheme: darkTheme.value }])
        },
        [
          installedDetails.value && installedDetails.value.reason === "install" ? (openBlock(), createBlock(script$2, {
            key: 0,
            onExit: removeInstallDetails
          })) : (openBlock(), createElementBlock(
            Fragment,
            { key: 1 },
            [
              createVNode(script$3),
              createVNode(script$4)
            ],
            64
            /* STABLE_FRAGMENT */
          ))
        ],
        2
        /* CLASS */
      );
    };
  }
});

var css_248z = "\n._container_19wj0_2 {\n  --gradient: linear-gradient(to right, var(--theme), hsl(24deg 100% 67%));\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  font-family: \"Sora\", sans-serif;\n}\n";
styleInject(css_248z);

var style0 = { "container": "_container_19wj0_2" };

const cssModules = script$1.__cssModules = {};
cssModules["$style"] = style0;


script$1.__file = "src/settings/page.vue";

var script = /* @__PURE__ */ defineComponent({
  __name: "index",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Suspense, null, {
        default: withCtx(() => [
          createVNode(script$1)
        ]),
        _: 1
        /* STABLE */
      });
    };
  }
});

script.__file = "src/settings/index.vue";

createApp(script).mount(document.body);
