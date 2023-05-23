import { a as styleInject, q as createApp, _ as _export_sfc, d as defineComponent, o as openBlock, x as createBlock, w as withCtx, S as Suspense, i as createVNode, j as withAsyncContext, s as syncStorage, l as localStorage, r as ref, b as createElementBlock, F as Fragment, h as createCommentVNode, n as normalizeClass, f as createBaseVNode, k as renderList, u as unref, y as isRef, z as resolveDynamicComponent, t as toDisplayString, e as createTextVNode, c as createVueComponent } from '../chunk.createVueComponent-bde6c1e7.js';
import { s as settingsComponent, I as IconTool } from '../chunk.content-dbef4882.js';
import '../chunk._virtual__addons-19cb23e2.js';

/**
 * @tabler/icons-vue v2.20.0 - MIT
 */


var IconAppWindow = createVueComponent("app-window", "IconAppWindow", [
  [
    "path",
    {
      d: "M3 5m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z",
      key: "svg-0"
    }
  ],
  ["path", { d: "M6 8h.01", key: "svg-1" }],
  ["path", { d: "M9 8h.01", key: "svg-2" }]
]);

/**
 * @tabler/icons-vue v2.20.0 - MIT
 */


var IconFlag = createVueComponent("flag", "IconFlag", [
  [
    "path",
    {
      d: "M5 5a5 5 0 0 1 7 0a5 5 0 0 0 7 0v9a5 5 0 0 1 -7 0a5 5 0 0 0 -7 0v-9z",
      key: "svg-0"
    }
  ],
  ["path", { d: "M5 21v-7", key: "svg-1" }]
]);

/**
 * @tabler/icons-vue v2.20.0 - MIT
 */


var IconKeyboard = createVueComponent("keyboard", "IconKeyboard", [
  [
    "path",
    {
      d: "M2 6m0 2a2 2 0 0 1 2 -2h16a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-16a2 2 0 0 1 -2 -2z",
      key: "svg-0"
    }
  ],
  ["path", { d: "M6 10l0 .01", key: "svg-1" }],
  ["path", { d: "M10 10l0 .01", key: "svg-2" }],
  ["path", { d: "M14 10l0 .01", key: "svg-3" }],
  ["path", { d: "M18 10l0 .01", key: "svg-4" }],
  ["path", { d: "M6 14l0 .01", key: "svg-5" }],
  ["path", { d: "M18 14l0 .01", key: "svg-6" }],
  ["path", { d: "M10 14l4 .01", key: "svg-7" }]
]);

/**
 * @tabler/icons-vue v2.20.0 - MIT
 */


var IconMenu = createVueComponent("menu", "IconMenu", [
  ["path", { d: "M4 8l16 0", key: "svg-0" }],
  ["path", { d: "M4 16l16 0", key: "svg-1" }]
]);

/**
 * @tabler/icons-vue v2.20.0 - MIT
 */


var IconMessage = createVueComponent("message", "IconMessage", [
  ["path", { d: "M8 9h8", key: "svg-0" }],
  ["path", { d: "M8 13h6", key: "svg-1" }],
  [
    "path",
    {
      d: "M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z",
      key: "svg-2"
    }
  ]
]);

/**
 * @tabler/icons-vue v2.20.0 - MIT
 */


var IconMoon = createVueComponent("moon", "IconMoon", [
  [
    "path",
    {
      d: "M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z",
      key: "svg-0"
    }
  ]
]);

/**
 * @tabler/icons-vue v2.20.0 - MIT
 */


var IconSun = createVueComponent("sun", "IconSun", [
  ["path", { d: "M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0", key: "svg-0" }],
  [
    "path",
    {
      d: "M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7",
      key: "svg-1"
    }
  ]
]);

/**
 * @tabler/icons-vue v2.20.0 - MIT
 */


var IconWorld = createVueComponent("world", "IconWorld", [
  ["path", { d: "M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0", key: "svg-0" }],
  ["path", { d: "M3.6 9h16.8", key: "svg-1" }],
  ["path", { d: "M3.6 15h16.8", key: "svg-2" }],
  ["path", { d: "M11.5 3a17 17 0 0 0 0 18", key: "svg-3" }],
  ["path", { d: "M12.5 3a17 17 0 0 1 0 18", key: "svg-4" }]
]);

/**
 * @tabler/icons-vue v2.20.0 - MIT
 */


var IconX = createVueComponent("x", "IconX", [
  ["path", { d: "M18 6l-12 12", key: "svg-0" }],
  ["path", { d: "M6 6l12 12", key: "svg-1" }]
]);

const _hoisted_1$1 = ["src"];
const _hoisted_2$1 = ["onClick"];
var _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "header",
  emits: ["open-settings", "open-support"],
  setup(__props) {
    let selectedTab = ref("all");
    const tabs = [
      {
        id: "popup",
        icon: IconAppWindow
      },
      {
        id: "website",
        icon: IconWorld
      },
      {
        id: "editor",
        icon: IconFlag
      },
      {
        id: "hotkeys",
        icon: IconKeyboard
      }
    ];
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
                    (openBlock(), createBlock(resolveDynamicComponent(tab.icon))),
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
                  onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("open-support"))
                },
                [
                  createVNode(unref(IconMessage)),
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
                  onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("open-settings"))
                },
                [
                  createVNode(unref(IconTool)),
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
              createVNode(unref(IconMenu))
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

var css_248z$3 = ".header-vue-vue-type-style-index-0-lang-module_header__9nTzg {\n  background-image: var(--gradient);\n  display: flex;\n  justify-content: center;\n  gap: 20px;\n  padding: 0px 20px;\n  box-sizing: border-box;\n  height: 60px;\n  width: 100%;\n  color: #fff;\n}\n.header-vue-vue-type-style-index-0-lang-module_header__9nTzg .header-vue-vue-type-style-index-0-lang-module_title__oZeVc {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.header-vue-vue-type-style-index-0-lang-module_header__9nTzg .header-vue-vue-type-style-index-0-lang-module_title__oZeVc .header-vue-vue-type-style-index-0-lang-module_text__M-Xmx {\n  font-size: 18px;\n  font-weight: 400;\n}\n@media (max-width: 890px) {\n  .header-vue-vue-type-style-index-0-lang-module_header__9nTzg .header-vue-vue-type-style-index-0-lang-module_title__oZeVc .header-vue-vue-type-style-index-0-lang-module_text__M-Xmx {\n    display: none;\n  }\n}\n.header-vue-vue-type-style-index-0-lang-module_header__9nTzg .header-vue-vue-type-style-index-0-lang-module_title__oZeVc .header-vue-vue-type-style-index-0-lang-module_logo__73NmG {\n  height: 30px;\n}\n.header-vue-vue-type-style-index-0-lang-module_header__9nTzg .header-vue-vue-type-style-index-0-lang-module_menu__uVAED {\n  display: none;\n}\n@media (max-width: 730px) {\n  .header-vue-vue-type-style-index-0-lang-module_header__9nTzg .header-vue-vue-type-style-index-0-lang-module_tabs__STXX-:not(.header-vue-vue-type-style-index-0-lang-module_mainTabs__FQTC2) {\n    display: none;\n  }\n  .header-vue-vue-type-style-index-0-lang-module_header__9nTzg .header-vue-vue-type-style-index-0-lang-module_menu__uVAED {\n    display: flex;\n    align-items: center;\n    font-size: 24px;\n  }\n}\n.header-vue-vue-type-style-index-0-lang-module_header__9nTzg .header-vue-vue-type-style-index-0-lang-module_tabs__STXX- {\n  padding: 12px 0px;\n  display: flex;\n  justify-content: center;\n  gap: 8px;\n}\n.header-vue-vue-type-style-index-0-lang-module_header__9nTzg .header-vue-vue-type-style-index-0-lang-module_tabs__STXX-.header-vue-vue-type-style-index-0-lang-module_mainTabs__FQTC2 {\n  flex: 1;\n}\n.header-vue-vue-type-style-index-0-lang-module_header__9nTzg .header-vue-vue-type-style-index-0-lang-module_tabs__STXX- .header-vue-vue-type-style-index-0-lang-module_tab__i010Y {\n  display: flex;\n  align-items: center;\n  padding: 0px 8px;\n  font-size: 12px;\n  color: #fff;\n  background: none;\n  border: none;\n  border-radius: 8px;\n  transition: 0.2s ease background;\n  font-family: inherit;\n}\n.header-vue-vue-type-style-index-0-lang-module_header__9nTzg .header-vue-vue-type-style-index-0-lang-module_tabs__STXX- .header-vue-vue-type-style-index-0-lang-module_tab__i010Y:has(.header-vue-vue-type-style-index-0-lang-module_link__6yOGQ) {\n  padding: 0px 15.5px;\n}\n.header-vue-vue-type-style-index-0-lang-module_header__9nTzg .header-vue-vue-type-style-index-0-lang-module_tabs__STXX- .header-vue-vue-type-style-index-0-lang-module_tab__i010Y:hover {\n  background-color: var(--button-hover-background);\n  padding: 0px 8px;\n}\n.header-vue-vue-type-style-index-0-lang-module_header__9nTzg .header-vue-vue-type-style-index-0-lang-module_tabs__STXX- .header-vue-vue-type-style-index-0-lang-module_tab__i010Y:focus-visible {\n  padding: 0px 8px;\n  outline: none;\n  box-shadow: inset 0 0 0 3px #fff;\n}\n.header-vue-vue-type-style-index-0-lang-module_header__9nTzg .header-vue-vue-type-style-index-0-lang-module_tabs__STXX- .header-vue-vue-type-style-index-0-lang-module_tab__i010Y.header-vue-vue-type-style-index-0-lang-module_sel__TzDdM {\n  padding: 0px 8px;\n  background-image: var(--gradient);\n  color: #fff;\n}\n.header-vue-vue-type-style-index-0-lang-module_header__9nTzg .header-vue-vue-type-style-index-0-lang-module_tabs__STXX- .header-vue-vue-type-style-index-0-lang-module_tab__i010Y .header-vue-vue-type-style-index-0-lang-module_name__ZjD0M {\n  padding: 0px 0px 0px 5px;\n}";
var style0$3 = {"header":"header-vue-vue-type-style-index-0-lang-module_header__9nTzg","title":"header-vue-vue-type-style-index-0-lang-module_title__oZeVc","text":"header-vue-vue-type-style-index-0-lang-module_text__M-Xmx","logo":"header-vue-vue-type-style-index-0-lang-module_logo__73NmG","menu":"header-vue-vue-type-style-index-0-lang-module_menu__uVAED","tabs":"header-vue-vue-type-style-index-0-lang-module_tabs__STXX-","mainTabs":"header-vue-vue-type-style-index-0-lang-module_mainTabs__FQTC2","tab":"header-vue-vue-type-style-index-0-lang-module_tab__i010Y","link":"header-vue-vue-type-style-index-0-lang-module_link__6yOGQ","sel":"header-vue-vue-type-style-index-0-lang-module_sel__TzDdM","name":"header-vue-vue-type-style-index-0-lang-module_name__ZjD0M"};
styleInject(css_248z$3);

const cssModules$3 = {
  "$style": style0$3
};
var Header = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__cssModules", cssModules$3], ["__file", "/home/runner/work/scratchaddons-rewrite/scratchaddons-rewrite/src/settings/header.vue"]]);

const _hoisted_1 = ["src"];
const _hoisted_2 = /* @__PURE__ */ createBaseVNode(
  "button",
  null,
  "Get Started",
  -1
  /* HOISTED */
);
var _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "onboarding",
  emits: ["exit"],
  setup(__props) {
    return (_ctx, _cache) => {
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
    };
  }
});

var css_248z$2 = ".onboarding-vue-vue-type-style-index-0-lang-module_overlay__bnSaK {\n  display: flex;\n  flex: 1;\n  background-image: var(--gradient);\n}\n.onboarding-vue-vue-type-style-index-0-lang-module_overlay__bnSaK .onboarding-vue-vue-type-style-index-0-lang-module_container__V9Wu8 {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  color: #fff;\n  background-color: var(--background-secondary);\n  border: 1px solid var(--background-tertiary);\n  padding: 20px;\n  border-radius: 10px;\n  width: -webkit-fill-available;\n  box-sizing: border-box;\n  flex: 1;\n  margin: 40px;\n}\n.onboarding-vue-vue-type-style-index-0-lang-module_overlay__bnSaK .onboarding-vue-vue-type-style-index-0-lang-module_container__V9Wu8 .onboarding-vue-vue-type-style-index-0-lang-module_logo__XvRmI {\n  height: 192px;\n}\n.onboarding-vue-vue-type-style-index-0-lang-module_overlay__bnSaK .onboarding-vue-vue-type-style-index-0-lang-module_container__V9Wu8 .onboarding-vue-vue-type-style-index-0-lang-module_title__wld1N {\n  font-size: 32px;\n}\n.onboarding-vue-vue-type-style-index-0-lang-module_overlay__bnSaK .onboarding-vue-vue-type-style-index-0-lang-module_container__V9Wu8 .onboarding-vue-vue-type-style-index-0-lang-module_description__PfRIs {\n  font-size: 12px;\n}\n.onboarding-vue-vue-type-style-index-0-lang-module_overlay__bnSaK .onboarding-vue-vue-type-style-index-0-lang-module_container__V9Wu8 .onboarding-vue-vue-type-style-index-0-lang-module_options__BSNFo {\n  margin-top: 10px;\n  display: flex;\n  gap: 5px;\n  flex-direction: row;\n}\n.onboarding-vue-vue-type-style-index-0-lang-module_overlay__bnSaK .onboarding-vue-vue-type-style-index-0-lang-module_container__V9Wu8 .onboarding-vue-vue-type-style-index-0-lang-module_options__BSNFo .onboarding-vue-vue-type-style-index-0-lang-module_other-option__yc-qK {\n  display: flex;\n  flex-wrap: wrap;\n  align-content: center;\n}\n.onboarding-vue-vue-type-style-index-0-lang-module_overlay__bnSaK .onboarding-vue-vue-type-style-index-0-lang-module_container__V9Wu8 .onboarding-vue-vue-type-style-index-0-lang-module_options__BSNFo .onboarding-vue-vue-type-style-index-0-lang-module_other-option__yc-qK .onboarding-vue-vue-type-style-index-0-lang-module_exit__x8BPc {\n  text-decoration: underline;\n  cursor: pointer;\n}\n.onboarding-vue-vue-type-style-index-0-lang-module_overlay__bnSaK .onboarding-vue-vue-type-style-index-0-lang-module_container__V9Wu8 button {\n  color: var(--content-text);\n  background: var(--background-primary);\n  border: 1px solid var(--button-border);\n  padding: 0 12px;\n  border-radius: 4px;\n  transition: 0.2s ease;\n  height: 32px;\n  box-sizing: border-box;\n  font-family: inherit;\n  font-size: 12px;\n}";
var style0$2 = {"overlay":"onboarding-vue-vue-type-style-index-0-lang-module_overlay__bnSaK","container":"onboarding-vue-vue-type-style-index-0-lang-module_container__V9Wu8","logo":"onboarding-vue-vue-type-style-index-0-lang-module_logo__XvRmI","title":"onboarding-vue-vue-type-style-index-0-lang-module_title__wld1N","description":"onboarding-vue-vue-type-style-index-0-lang-module_description__PfRIs","options":"onboarding-vue-vue-type-style-index-0-lang-module_options__BSNFo","other-option":"onboarding-vue-vue-type-style-index-0-lang-module_other-option__yc-qK","exit":"onboarding-vue-vue-type-style-index-0-lang-module_exit__x8BPc"};
styleInject(css_248z$2);

const cssModules$2 = {
  "$style": style0$2
};
var Onboarding = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__cssModules", cssModules$2], ["__file", "/home/runner/work/scratchaddons-rewrite/scratchaddons-rewrite/src/settings/components/onboarding.vue"]]);

var _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "more-settings",
  async setup(__props) {
    let __temp, __restore;
    const data = ([__temp, __restore] = withAsyncContext(() => syncStorage.get(["darkTheme"])), __temp = await __temp, __restore(), __temp);
    const darkTheme = ref(data.darkTheme);
    function switchTheme() {
      darkTheme.value = !darkTheme.value;
      syncStorage.set({ darkTheme: darkTheme.value });
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass(_ctx.$style.container)
        },
        [
          createBaseVNode(
            "button",
            {
              class: normalizeClass(_ctx.$style.themeSwitcher),
              onClick: switchTheme
            },
            [
              (openBlock(), createBlock(resolveDynamicComponent(darkTheme.value ? unref(IconMoon) : unref(IconSun))))
            ],
            2
            /* CLASS */
          ),
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("close"))
          }, [
            createVNode(unref(IconX))
          ])
        ],
        2
        /* CLASS */
      );
    };
  }
});

var css_248z$1 = ".more-settings-vue-vue-type-style-index-0-lang-module_container__nlyoP {\n  position: fixed;\n  background: #ddd;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n.more-settings-vue-vue-type-style-index-0-lang-module_container__nlyoP .more-settings-vue-vue-type-style-index-0-lang-module_themeSwitcher__yNSbA {\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  background: none;\n  color: inherit;\n}\n.more-settings-vue-vue-type-style-index-0-lang-module_container__nlyoP .more-settings-vue-vue-type-style-index-0-lang-module_themeSwitcher__yNSbA:focus-visible {\n  outline: none;\n  box-shadow: inset 0 0 0 3px #fff;\n}";
var style0$1 = {"container":"more-settings-vue-vue-type-style-index-0-lang-module_container__nlyoP","themeSwitcher":"more-settings-vue-vue-type-style-index-0-lang-module_themeSwitcher__yNSbA"};
styleInject(css_248z$1);

const cssModules$1 = {
  "$style": style0$1
};
var MoreSettings = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__cssModules", cssModules$1], ["__file", "/home/runner/work/scratchaddons-rewrite/scratchaddons-rewrite/src/settings/components/more-settings.vue"]]);

var _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "page",
  async setup(__props) {
    let __temp, __restore;
    const data = ([__temp, __restore] = withAsyncContext(() => syncStorage.get(["darkTheme", "addonsEnabled"])), __temp = await __temp, __restore(), __temp);
    const localData = ([__temp, __restore] = withAsyncContext(() => localStorage.get("installedDetails")), __temp = await __temp, __restore(), __temp);
    const darkTheme = ref(data.darkTheme);
    const installedDetails = ref(localData.installedDetails);
    if (installedDetails.value && installedDetails.value.reason === "install") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      syncStorage.set({ darkTheme: prefersDark });
      darkTheme.value = prefersDark;
    }
    syncStorage.valueStream.subscribe(
      (values) => darkTheme.value = values.darkTheme
    );
    function removeInstalledDetails() {
      localStorage.set({ installedDetails: null });
      installedDetails.value = null;
    }
    const showSettings = ref(false);
    const showSupport = ref(false);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass([_ctx.$style.container, { theme: true, darkTheme: darkTheme.value }])
        },
        [
          installedDetails.value && installedDetails.value.reason === "install" ? (openBlock(), createBlock(Onboarding, {
            key: 0,
            onExit: removeInstalledDetails
          })) : (openBlock(), createElementBlock(
            Fragment,
            { key: 1 },
            [
              createVNode(Header, {
                onOpenSettings: _cache[0] || (_cache[0] = ($event) => showSettings.value = true),
                onOpenSupport: _cache[1] || (_cache[1] = ($event) => showSupport.value = true)
              }),
              createVNode(settingsComponent),
              showSettings.value ? (openBlock(), createBlock(MoreSettings, {
                key: 0,
                onClose: _cache[2] || (_cache[2] = ($event) => showSettings.value = false)
              })) : createCommentVNode("v-if", true)
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

var css_248z = "\n.page-vue-vue-type-style-index-0-lang-module_container__4I13E {\n  --gradient: linear-gradient(to right, var(--theme), hsl(24deg 100% 67%));\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  font-family: \"Sora\", sans-serif;\n}\n";
var style0 = {"container":"page-vue-vue-type-style-index-0-lang-module_container__4I13E"};
styleInject(css_248z);

const cssModules = {
  "$style": style0
};
var Page = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__cssModules", cssModules], ["__file", "/home/runner/work/scratchaddons-rewrite/scratchaddons-rewrite/src/settings/page.vue"]]);

var _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Suspense, null, {
        default: withCtx(() => [
          createVNode(Page)
        ]),
        _: 1
        /* STABLE */
      });
    };
  }
});

var App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/home/runner/work/scratchaddons-rewrite/scratchaddons-rewrite/src/settings/index.vue"]]);

createApp(App).mount(document.body);
