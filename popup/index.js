import { a as styleInject, q as createApp, _ as _export_sfc, d as defineComponent, o as openBlock, b as createElementBlock, i as createVNode, x as createBlock, w as withCtx, S as Suspense, n as normalizeClass, f as createBaseVNode, e as createTextVNode, u as unref, c as createVueComponent, r as ref, s as syncStorage, j as withAsyncContext, l as localStorage, F as Fragment, k as renderList, z as resolveDynamicComponent, t as toDisplayString, m as withDirectives, v as vShow, h as createCommentVNode } from '../chunk.createVueComponent-bde6c1e7.js';
import { p as popups } from '../chunk._virtual__popups-ed3e2cce.js';
import { I as IconTool, s as settingsComponent } from '../chunk.content-dbef4882.js';
import { A as Addon } from '../chunk.index-b6ece9ed.js';
import '../chunk._virtual__addons-19cb23e2.js';

/**
 * @tabler/icons-vue v2.20.0 - MIT
 */


var IconExternalLink = createVueComponent("external-link", "IconExternalLink", [
  [
    "path",
    {
      d: "M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6",
      key: "svg-0"
    }
  ],
  ["path", { d: "M11 13l9 -9", key: "svg-1" }],
  ["path", { d: "M15 4h5v5", key: "svg-2" }]
]);

/**
 * @tabler/icons-vue v2.20.0 - MIT
 */


var IconSettings = createVueComponent("settings", "IconSettings", [
  [
    "path",
    {
      d: "M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z",
      key: "svg-0"
    }
  ],
  ["path", { d: "M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0", key: "svg-1" }]
]);

const _hoisted_1$1 = ["src"];
var _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "header",
  setup(__props) {
    function openSettingsPage() {
      chrome.runtime.openOptionsPage();
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass(_ctx.$style.header)
        },
        [
          createBaseVNode("img", {
            src: "../images/icon.svg",
            class: normalizeClass(_ctx.$style.logo)
          }, null, 10, _hoisted_1$1),
          createBaseVNode(
            "span",
            {
              class: normalizeClass(_ctx.$style.text)
            },
            [
              createTextVNode(" Scratch Addons "),
              createBaseVNode(
                "a",
                {
                  class: normalizeClass(_ctx.$style.link),
                  href: "https://scratchaddons.com/changelog",
                  target: "_blank",
                  title: "View changelog"
                },
                " v2.0.0 ",
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
              class: normalizeClass(_ctx.$style.settings),
              onClick: _cache[0] || (_cache[0] = ($event) => openSettingsPage())
            },
            [
              createVNode(unref(IconSettings))
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

var css_248z$2 = ".header-vue-vue-type-style-index-0-lang-module_header__RHOQw {\n  background-image: var(--gradient);\n  display: flex;\n  align-items: center;\n  color: #fff;\n}\n.header-vue-vue-type-style-index-0-lang-module_header__RHOQw .header-vue-vue-type-style-index-0-lang-module_text__oWMFf {\n  font-size: 18px;\n  font-weight: 400;\n  flex: 1;\n}\n.header-vue-vue-type-style-index-0-lang-module_header__RHOQw .header-vue-vue-type-style-index-0-lang-module_text__oWMFf .header-vue-vue-type-style-index-0-lang-module_link__a9BfL {\n  color: inherit;\n  margin: 5px;\n  text-decoration: none;\n  opacity: 0.75;\n  font-size: 12px;\n  border-radius: 4px;\n}\n.header-vue-vue-type-style-index-0-lang-module_header__RHOQw .header-vue-vue-type-style-index-0-lang-module_text__oWMFf .header-vue-vue-type-style-index-0-lang-module_link__a9BfL:focus-visible {\n  outline: none;\n  box-shadow: 0 0 0 3px #fff;\n}\n.header-vue-vue-type-style-index-0-lang-module_header__RHOQw .header-vue-vue-type-style-index-0-lang-module_logo__Hd5Kc {\n  height: 30px;\n  padding: 15px 20px;\n}\n.header-vue-vue-type-style-index-0-lang-module_header__RHOQw .header-vue-vue-type-style-index-0-lang-module_settings__G5oxG {\n  height: 100%;\n  padding: 0px 20px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  background: none;\n  color: inherit;\n}\n.header-vue-vue-type-style-index-0-lang-module_header__RHOQw .header-vue-vue-type-style-index-0-lang-module_settings__G5oxG:focus-visible {\n  outline: none;\n  box-shadow: inset 0 0 0 3px #fff;\n}";
var style0$2 = {"header":"header-vue-vue-type-style-index-0-lang-module_header__RHOQw","text":"header-vue-vue-type-style-index-0-lang-module_text__oWMFf","link":"header-vue-vue-type-style-index-0-lang-module_link__a9BfL","logo":"header-vue-vue-type-style-index-0-lang-module_logo__Hd5Kc","settings":"header-vue-vue-type-style-index-0-lang-module_settings__G5oxG"};
styleInject(css_248z$2);

const cssModules$2 = {
  "$style": style0$2
};
var Header = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__cssModules", cssModules$2], ["__file", "/home/runner/work/scratchaddons-rewrite/scratchaddons-rewrite/src/popup/header.vue"]]);

class Auth extends EventTarget {
  id;
  messageCache;
  sessionCache;
  constructor(id) {
    super();
    this.id = id;
    this.messageCache = { timestamp: 0, value: null };
    this.sessionCache = { timestamp: 0, value: null };
    chrome.cookies.onChanged.addListener(async ({ cookie, removed }) => {
      if (cookie.name === "scratchsessionsid") {
        this.dispatchEvent(new CustomEvent("updatedSession"));
      }
    });
  }
  async getSession() {
    const date = Date.now();
    if (this.sessionCache.value instanceof Promise && date - this.sessionCache.timestamp < 1e3) {
      return await this.sessionCache.value;
    }
    this.sessionCache.timestamp = date;
    this.sessionCache.value = fetch("https://scratch.mit.edu/session/", {
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      }
    }).then((res) => res.json());
    return await this.sessionCache.value;
  }
  async getMessageCount() {
    const date = Date.now();
    if (this.messageCache.value instanceof Promise && date - this.messageCache.timestamp < 1e3) {
      return await this.messageCache.value;
    }
    const session = await this.getSession();
    if (!session.user)
      return 0;
    this.messageCache.timestamp = date;
    this.messageCache.value = fetch(
      `https://api.scratch.mit.edu/users/${session.user.username}/messages/count?timestamp=${date}`
    ).then((res) => res.json()).then((val) => val.count);
    return await this.messageCache.value;
  }
  // async getMessages() {
  //   const session = await this.getSession();
  //   if (!session.user) return [];
  //   const messageCount = await this.getMessageCount();
  //   const maxPages = Math.min(Math.ceil(messageCount / 40) + 1, 25);
  //   const pages: (
  //     | followuser
  //     | curatorinvite
  //     | becomeownerstudio
  //     | becomehoststudio
  //     | forumpost
  //     | studioactivity
  //     | remixproject
  //   )[][] = [];
  //   for (let i = 0; i < maxPages; i++) {
  //     const page = await (
  //       await fetch(
  //         `https://api.scratch.mit.edu/users/${
  //           session.user.username
  //         }/messages?limit=40&offset=${40 * i}`,
  //         {
  //           headers: {
  //             "x-token": session.user.token,
  //           },
  //         }
  //       )
  //     ).json();
  //     pages.push(...page);
  //   }
  //   return pages.flat();
  // }
}

class PopupAddon extends Addon {
  _port;
  auth;
  constructor(id) {
    super(id);
    this.id = id;
    this._port = null;
    this.auth = new Auth(id);
  }
  get port() {
    return this._port || (this._port = chrome.runtime.connect(void 0, { name: this.id }));
  }
}

const _hoisted_1 = ["onClick"];
const _hoisted_2 = ["href"];
var _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "popups",
  async setup(__props) {
    let __temp, __restore;
    let darkTheme = ref(false);
    syncStorage.valueStream.subscribe((values) => {
      if ("darkTheme" in values) {
        darkTheme.value = values.darkTheme;
      }
    });
    const ORDER = ["scratch-messaging", "settings-page"];
    let selectedTab = ref(ORDER[0]);
    function switchTab(id) {
      if (id === selectedTab.value)
        return;
      localStorage.set({ lastSelectedPopup: id });
      console.log(id);
      selectedTab.value = id;
    }
    const { lastSelectedPopup } = ([__temp, __restore] = withAsyncContext(() => localStorage.get("lastSelectedPopup")), __temp = await __temp, __restore(), __temp);
    console.log(lastSelectedPopup);
    if (lastSelectedPopup) {
      const selectedId = ORDER.find((id) => id === lastSelectedPopup);
      if (selectedId) {
        selectedTab.value = selectedId;
      }
    }
    const { addonsEnabled = {} } = ([__temp, __restore] = withAsyncContext(() => syncStorage.get("addonsEnabled")), __temp = await __temp, __restore(), __temp);
    const enabledPopups = Object.keys(popups).map((id) => {
      if (!addonsEnabled[id])
        return {};
      return { [id]: popups[id].popup };
    }).reduce((prev, curr) => ({ ...prev, ...curr }), {});
    enabledPopups["settings-page"] = {
      name: "Addons",
      icon: IconTool,
      component: settingsComponent
    };
    const instances = {};
    Object.keys(enabledPopups).forEach((id) => {
      instances[id] = new PopupAddon(id);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass([_ctx.$style.popups, { theme: true, darkTheme: unref(darkTheme) }])
        },
        [
          createBaseVNode(
            "div",
            {
              class: normalizeClass(_ctx.$style.sticky)
            },
            [
              createBaseVNode(
                "div",
                {
                  class: normalizeClass(_ctx.$style.tabs)
                },
                [
                  (openBlock(), createElementBlock(
                    Fragment,
                    null,
                    renderList(ORDER, (id) => {
                      return createBaseVNode("button", {
                        class: normalizeClass([_ctx.$style.tab, { [_ctx.$style.sel]: id === unref(selectedTab) }]),
                        onClick: ($event) => switchTab(id)
                      }, [
                        (openBlock(), createBlock(resolveDynamicComponent(unref(enabledPopups)[id].icon), {
                          class: normalizeClass(_ctx.$style.icon),
                          width: "18px"
                        }, null, 8, ["class"])),
                        createBaseVNode(
                          "span",
                          {
                            class: normalizeClass(_ctx.$style.name)
                          },
                          toDisplayString(unref(enabledPopups)[id].name),
                          3
                          /* TEXT, CLASS */
                        ),
                        (openBlock(), createBlock(
                          Suspense,
                          null,
                          {
                            default: withCtx(() => [
                              withDirectives((openBlock(), createBlock(resolveDynamicComponent(unref(enabledPopups)[id].badge), {
                                class: normalizeClass(_ctx.$style.badge),
                                addon: instances[id]
                              }, null, 8, ["class", "addon"])), [
                                [vShow, unref(enabledPopups)[id].badge]
                              ])
                            ]),
                            _: 2
                            /* DYNAMIC */
                          },
                          1024
                          /* DYNAMIC_SLOTS */
                        )),
                        id !== "settings-page" ? (openBlock(), createElementBlock("a", {
                          key: 0,
                          class: normalizeClass(_ctx.$style.link),
                          target: "_blank",
                          href: "fullscreen.html?id=" + id
                        }, [
                          createVNode(unref(IconExternalLink), {
                            class: normalizeClass(_ctx.$style.popout),
                            height: "10px",
                            width: "10px"
                          }, null, 8, ["class"])
                        ], 10, _hoisted_2)) : createCommentVNode("v-if", true)
                      ], 10, _hoisted_1);
                    }),
                    64
                    /* STABLE_FRAGMENT */
                  ))
                ],
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          ),
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(unref(enabledPopups), (popup, id) => {
              return withDirectives((openBlock(), createBlock(resolveDynamicComponent(popup.component), {
                addon: instances[id]
              }, null, 8, ["addon"])), [
                [vShow, id === unref(selectedTab)]
              ]);
            }),
            256
            /* UNKEYED_FRAGMENT */
          ))
        ],
        2
        /* CLASS */
      );
    };
  }
});

var css_248z$1 = ".popups-vue-vue-type-style-index-0-lang-module_container__XKCBY {\n  height: inherit;\n  display: flex;\n  flex-direction: column;\n  font-family: \"Sora\", sans-serif;\n  width: 400px;\n  height: 600px;\n}\n\n.popups-vue-vue-type-style-index-0-lang-module_popups__v-ONo {\n  background-color: var(--background-primary);\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  overflow: auto;\n}\n.popups-vue-vue-type-style-index-0-lang-module_popups__v-ONo .popups-vue-vue-type-style-index-0-lang-module_sticky__BYh2q {\n  background-color: var(--background-primary);\n  padding: 10px 10px 0px 10px;\n  position: sticky;\n  top: 0;\n  display: flex;\n  flex: 0 0 50px;\n}\n.popups-vue-vue-type-style-index-0-lang-module_popups__v-ONo .popups-vue-vue-type-style-index-0-lang-module_sticky__BYh2q .popups-vue-vue-type-style-index-0-lang-module_tabs__kEJqz {\n  border-radius: 4px;\n  border: 1px solid var(--background-tertiary);\n  background: var(--background-secondary);\n  box-shadow: var(--content-shadow);\n  padding: 8px;\n  display: flex;\n  gap: 8px;\n  width: 100%;\n  overflow: hidden;\n}\n.popups-vue-vue-type-style-index-0-lang-module_popups__v-ONo .popups-vue-vue-type-style-index-0-lang-module_sticky__BYh2q .popups-vue-vue-type-style-index-0-lang-module_tabs__kEJqz .popups-vue-vue-type-style-index-0-lang-module_tab__e2KqB {\n  display: flex;\n  align-items: center;\n  padding: 0px 8px;\n  font-size: 12px;\n  color: var(--content-text);\n  background: none;\n  border: none;\n  border-radius: 8px;\n  transition: 0.2s ease background;\n  font-family: inherit;\n}\n.popups-vue-vue-type-style-index-0-lang-module_popups__v-ONo .popups-vue-vue-type-style-index-0-lang-module_sticky__BYh2q .popups-vue-vue-type-style-index-0-lang-module_tabs__kEJqz .popups-vue-vue-type-style-index-0-lang-module_tab__e2KqB:has(.popups-vue-vue-type-style-index-0-lang-module_link__KNGSe) {\n  padding: 0px 15.5px;\n}\n.popups-vue-vue-type-style-index-0-lang-module_popups__v-ONo .popups-vue-vue-type-style-index-0-lang-module_sticky__BYh2q .popups-vue-vue-type-style-index-0-lang-module_tabs__kEJqz .popups-vue-vue-type-style-index-0-lang-module_tab__e2KqB:hover {\n  background-color: var(--button-hover-background);\n  padding: 0px 8px;\n}\n.popups-vue-vue-type-style-index-0-lang-module_popups__v-ONo .popups-vue-vue-type-style-index-0-lang-module_sticky__BYh2q .popups-vue-vue-type-style-index-0-lang-module_tabs__kEJqz .popups-vue-vue-type-style-index-0-lang-module_tab__e2KqB:focus-visible {\n  padding: 0px 8px;\n  outline: none;\n  box-shadow: inset 0 0 0 3px var(--content-text);\n}\n.popups-vue-vue-type-style-index-0-lang-module_popups__v-ONo .popups-vue-vue-type-style-index-0-lang-module_sticky__BYh2q .popups-vue-vue-type-style-index-0-lang-module_tabs__kEJqz .popups-vue-vue-type-style-index-0-lang-module_tab__e2KqB.popups-vue-vue-type-style-index-0-lang-module_sel__gxEhb {\n  padding: 0px 8px;\n  background-image: var(--gradient);\n  color: #fff;\n}\n.popups-vue-vue-type-style-index-0-lang-module_popups__v-ONo .popups-vue-vue-type-style-index-0-lang-module_sticky__BYh2q .popups-vue-vue-type-style-index-0-lang-module_tabs__kEJqz .popups-vue-vue-type-style-index-0-lang-module_tab__e2KqB .popups-vue-vue-type-style-index-0-lang-module_name__qEI-i {\n  padding: 0px 0px 0px 5px;\n}\n.popups-vue-vue-type-style-index-0-lang-module_popups__v-ONo .popups-vue-vue-type-style-index-0-lang-module_sticky__BYh2q .popups-vue-vue-type-style-index-0-lang-module_tabs__kEJqz .popups-vue-vue-type-style-index-0-lang-module_tab__e2KqB .popups-vue-vue-type-style-index-0-lang-module_badge__9pvlc {\n  background-color: rgba(0, 0, 0, 0.2666666667);\n  padding: 4px;\n  border-radius: 4px;\n  margin-left: 4px;\n}\n.popups-vue-vue-type-style-index-0-lang-module_popups__v-ONo .popups-vue-vue-type-style-index-0-lang-module_sticky__BYh2q .popups-vue-vue-type-style-index-0-lang-module_tabs__kEJqz .popups-vue-vue-type-style-index-0-lang-module_tab__e2KqB .popups-vue-vue-type-style-index-0-lang-module_link__KNGSe {\n  display: none;\n  outline: none;\n  color: inherit;\n}\n.popups-vue-vue-type-style-index-0-lang-module_popups__v-ONo .popups-vue-vue-type-style-index-0-lang-module_sticky__BYh2q .popups-vue-vue-type-style-index-0-lang-module_tabs__kEJqz .popups-vue-vue-type-style-index-0-lang-module_tab__e2KqB.popups-vue-vue-type-style-index-0-lang-module_sel__gxEhb .popups-vue-vue-type-style-index-0-lang-module_link__KNGSe, .popups-vue-vue-type-style-index-0-lang-module_popups__v-ONo .popups-vue-vue-type-style-index-0-lang-module_sticky__BYh2q .popups-vue-vue-type-style-index-0-lang-module_tabs__kEJqz .popups-vue-vue-type-style-index-0-lang-module_tab__e2KqB:focus-visible .popups-vue-vue-type-style-index-0-lang-module_link__KNGSe, .popups-vue-vue-type-style-index-0-lang-module_popups__v-ONo .popups-vue-vue-type-style-index-0-lang-module_sticky__BYh2q .popups-vue-vue-type-style-index-0-lang-module_tabs__kEJqz .popups-vue-vue-type-style-index-0-lang-module_tab__e2KqB:hover .popups-vue-vue-type-style-index-0-lang-module_link__KNGSe {\n  display: flex;\n  height: 100%;\n  align-items: center;\n}\n.popups-vue-vue-type-style-index-0-lang-module_popups__v-ONo .popups-vue-vue-type-style-index-0-lang-module_sticky__BYh2q .popups-vue-vue-type-style-index-0-lang-module_tabs__kEJqz .popups-vue-vue-type-style-index-0-lang-module_tab__e2KqB.popups-vue-vue-type-style-index-0-lang-module_sel__gxEhb .popups-vue-vue-type-style-index-0-lang-module_link__KNGSe .popups-vue-vue-type-style-index-0-lang-module_popout__U4ifd, .popups-vue-vue-type-style-index-0-lang-module_popups__v-ONo .popups-vue-vue-type-style-index-0-lang-module_sticky__BYh2q .popups-vue-vue-type-style-index-0-lang-module_tabs__kEJqz .popups-vue-vue-type-style-index-0-lang-module_tab__e2KqB:focus-visible .popups-vue-vue-type-style-index-0-lang-module_link__KNGSe .popups-vue-vue-type-style-index-0-lang-module_popout__U4ifd, .popups-vue-vue-type-style-index-0-lang-module_popups__v-ONo .popups-vue-vue-type-style-index-0-lang-module_sticky__BYh2q .popups-vue-vue-type-style-index-0-lang-module_tabs__kEJqz .popups-vue-vue-type-style-index-0-lang-module_tab__e2KqB:hover .popups-vue-vue-type-style-index-0-lang-module_link__KNGSe .popups-vue-vue-type-style-index-0-lang-module_popout__U4ifd {\n  margin-left: 1px;\n  padding: 2px;\n  border-radius: 2px;\n}\n.popups-vue-vue-type-style-index-0-lang-module_popups__v-ONo .popups-vue-vue-type-style-index-0-lang-module_sticky__BYh2q .popups-vue-vue-type-style-index-0-lang-module_tabs__kEJqz .popups-vue-vue-type-style-index-0-lang-module_tab__e2KqB.popups-vue-vue-type-style-index-0-lang-module_sel__gxEhb .popups-vue-vue-type-style-index-0-lang-module_link__KNGSe:hover .popups-vue-vue-type-style-index-0-lang-module_popout__U4ifd, .popups-vue-vue-type-style-index-0-lang-module_popups__v-ONo .popups-vue-vue-type-style-index-0-lang-module_sticky__BYh2q .popups-vue-vue-type-style-index-0-lang-module_tabs__kEJqz .popups-vue-vue-type-style-index-0-lang-module_tab__e2KqB:focus-visible .popups-vue-vue-type-style-index-0-lang-module_link__KNGSe:hover .popups-vue-vue-type-style-index-0-lang-module_popout__U4ifd, .popups-vue-vue-type-style-index-0-lang-module_popups__v-ONo .popups-vue-vue-type-style-index-0-lang-module_sticky__BYh2q .popups-vue-vue-type-style-index-0-lang-module_tabs__kEJqz .popups-vue-vue-type-style-index-0-lang-module_tab__e2KqB:hover .popups-vue-vue-type-style-index-0-lang-module_link__KNGSe:hover .popups-vue-vue-type-style-index-0-lang-module_popout__U4ifd {\n  background: #fff;\n  color: var(--theme);\n}\n\n/* width */\n::-webkit-scrollbar {\n  width: 7px;\n  height: 7px;\n}\n\n/* hide track */\n::-webkit-scrollbar-track,\n::-webkit-scrollbar-corner {\n  background: none;\n}\n\n/* Handle */\n::-webkit-scrollbar-thumb {\n  background: gray;\n  border-radius: 4px;\n}";
var style0$1 = {"container":"popups-vue-vue-type-style-index-0-lang-module_container__XKCBY","popups":"popups-vue-vue-type-style-index-0-lang-module_popups__v-ONo","sticky":"popups-vue-vue-type-style-index-0-lang-module_sticky__BYh2q","tabs":"popups-vue-vue-type-style-index-0-lang-module_tabs__kEJqz","tab":"popups-vue-vue-type-style-index-0-lang-module_tab__e2KqB","link":"popups-vue-vue-type-style-index-0-lang-module_link__KNGSe","sel":"popups-vue-vue-type-style-index-0-lang-module_sel__gxEhb","name":"popups-vue-vue-type-style-index-0-lang-module_name__qEI-i","badge":"popups-vue-vue-type-style-index-0-lang-module_badge__9pvlc","popout":"popups-vue-vue-type-style-index-0-lang-module_popout__U4ifd"};
styleInject(css_248z$1);

const cssModules$1 = {
  "$style": style0$1
};
var Popups = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__cssModules", cssModules$1], ["__file", "/home/runner/work/scratchaddons-rewrite/scratchaddons-rewrite/src/popup/popups.vue"]]);

var _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass(_ctx.$style.container)
        },
        [
          createVNode(Header),
          (openBlock(), createBlock(Suspense, null, {
            default: withCtx(() => [
              createVNode(Popups)
            ]),
            _: 1
            /* STABLE */
          }))
        ],
        2
        /* CLASS */
      );
    };
  }
});

var css_248z = ".index-vue-vue-type-style-index-0-lang-module_container__664jB {\n  display: flex;\n  flex-direction: column;\n  font-family: \"Sora\", sans-serif;\n  width: 400px;\n  height: 600px;\n}";
var style0 = {"container":"index-vue-vue-type-style-index-0-lang-module_container__664jB"};
styleInject(css_248z);

const cssModules = {
  "$style": style0
};
var App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules], ["__file", "/home/runner/work/scratchaddons-rewrite/scratchaddons-rewrite/src/popup/index.vue"]]);

createApp(App).mount(document.body);
