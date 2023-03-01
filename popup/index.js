import { a as styleInject, m as createApp, d as defineComponent, c as createElementBlock, b as createBaseVNode, n as normalizeClass, f as createTextVNode, e as createVNode, u as unref, r as ref, s as storage$1, k as withAsyncContext, F as Fragment, l as renderList, p as createBlock, j as withCtx, S as Suspense, o as openBlock, I as Icon, q as isRef, t as toDisplayString, w as withDirectives, v as vShow, x as resolveDynamicComponent, i as createCommentVNode } from '../chunk.style-inject.es-cbd22147.js';
import { p as popups } from '../chunk._virtual__popups-11514f3e.js';
import { s as script$3 } from '../chunk.content-54072954.js';
import { A as Addon } from '../chunk.index-b6ece9ed.js';
import '../chunk._virtual__addons-19cb23e2.js';

const _hoisted_1$1 = ["src"];
var script$2 = /* @__PURE__ */ defineComponent({
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
              createVNode(unref(Icon), {
                class: normalizeClass(_ctx.$style.icon),
                icon: "uil:cog"
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

var css_248z$2 = "._header_ao8zp_2 {\n  background-image: var(--gradient);\n  display: flex;\n  align-items: center;\n  color: #fff;\n}\n._header_ao8zp_2 ._text_ao8zp_7 {\n  font-size: 18px;\n  font-weight: 400;\n  flex: 1;\n}\n._header_ao8zp_2 ._text_ao8zp_7 ._link_ao8zp_11 {\n  color: inherit;\n  margin: 5px;\n  text-decoration: none;\n  opacity: 0.75;\n  font-size: 12px;\n  border-radius: 4px;\n}\n._header_ao8zp_2 ._text_ao8zp_7 ._link_ao8zp_11:focus-visible {\n  outline: none;\n  box-shadow: 0 0 0 3px #fff;\n}\n._header_ao8zp_2 ._logo_ao8zp_24 {\n  height: 30px;\n  padding: 15px 20px;\n}\n._header_ao8zp_2 ._settings_ao8zp_28 {\n  height: 100%;\n  padding: 0px 20px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  background: none;\n  color: inherit;\n}\n._header_ao8zp_2 ._settings_ao8zp_28:focus-visible {\n  outline: none;\n  box-shadow: inset 0 0 0 3px #fff;\n}\n._header_ao8zp_2 ._settings_ao8zp_28 ._icon_ao8zp_42 {\n  font-size: 24px;\n}";
styleInject(css_248z$2);

var style0$2 = { "header": "_header_ao8zp_2", "text": "_text_ao8zp_7", "link": "_link_ao8zp_11", "logo": "_logo_ao8zp_24", "settings": "_settings_ao8zp_28", "icon": "_icon_ao8zp_42" };

const cssModules$2 = script$2.__cssModules = {};
cssModules$2["$style"] = style0$2;


script$2.__file = "src/popup/header.vue";

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
var script$1 = /* @__PURE__ */ defineComponent({
  __name: "popups",
  async setup(__props) {
    let __temp, __restore;
    let darkTheme = ref(false);
    storage$1.valueStream.subscribe((values) => {
      if ("darkTheme" in values) {
        darkTheme.value = values.darkTheme;
      }
    });
    const ORDER = ["scratch-messaging", "settings-page"];
    let selectedTab = ref(ORDER[0]);
    const { addonsEnabled = {} } = ([__temp, __restore] = withAsyncContext(() => storage$1.get("addonsEnabled")), __temp = await __temp, __restore(), __temp);
    const enabledPopups = Object.keys(popups).map((id) => {
      if (!addonsEnabled[id])
        return {};
      return { [id]: popups[id].popup };
    }).reduce((prev, curr) => ({ ...prev, ...curr }), {});
    enabledPopups["settings-page"] = {
      name: "Addons",
      icon: "tool",
      component: script$3
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
                        onClick: ($event) => isRef(selectedTab) ? selectedTab.value = id : selectedTab = id
                      }, [
                        createVNode(unref(Icon), {
                          class: normalizeClass(_ctx.$style.icon),
                          icon: "tabler:" + unref(enabledPopups)[id].icon
                        }, null, 8, ["class", "icon"]),
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
                          createVNode(unref(Icon), {
                            class: normalizeClass(_ctx.$style.popout),
                            icon: "uil:external-link-alt"
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

var css_248z$1 = "._container_k97y6_2 {\n  height: inherit;\n  display: flex;\n  flex-direction: column;\n  font-family: \"Sora\", sans-serif;\n  width: 400px;\n  height: 600px;\n}\n\n._popups_k97y6_11 {\n  background-color: var(--background-primary);\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  overflow: auto;\n}\n._popups_k97y6_11 ._sticky_k97y6_17 {\n  background-color: var(--background-primary);\n  padding: 10px;\n  position: sticky;\n  top: 0;\n  display: flex;\n  flex: 0 0 50px;\n}\n._popups_k97y6_11 ._sticky_k97y6_17 ._tabs_k97y6_24 {\n  border-radius: 4px;\n  border: 1px solid var(--background-tertiary);\n  background: var(--background-secondary);\n  box-shadow: var(--content-shadow);\n  padding: 8px;\n  display: flex;\n  gap: 8px;\n  width: 100%;\n  overflow: hidden;\n}\n._popups_k97y6_11 ._sticky_k97y6_17 ._tabs_k97y6_24 ._tab_k97y6_24 {\n  display: flex;\n  align-items: center;\n  padding: 0px 8px;\n  font-size: 12px;\n  color: var(--content-text);\n  background: none;\n  border: none;\n  border-radius: 8px;\n  transition: 0.2s ease background;\n  font-family: inherit;\n}\n._popups_k97y6_11 ._sticky_k97y6_17 ._tabs_k97y6_24 ._tab_k97y6_24:has(._link_k97y6_45) {\n  padding: 0px 15.5px;\n}\n._popups_k97y6_11 ._sticky_k97y6_17 ._tabs_k97y6_24 ._tab_k97y6_24:hover {\n  background-color: var(--button-hover-background);\n  padding: 0px 8px;\n}\n._popups_k97y6_11 ._sticky_k97y6_17 ._tabs_k97y6_24 ._tab_k97y6_24:focus-visible {\n  padding: 0px 8px;\n  outline: none;\n  box-shadow: inset 0 0 0 3px var(--content-text);\n}\n._popups_k97y6_11 ._sticky_k97y6_17 ._tabs_k97y6_24 ._tab_k97y6_24._sel_k97y6_57 {\n  padding: 0px 8px;\n  background-image: var(--gradient);\n  color: #fff;\n}\n._popups_k97y6_11 ._sticky_k97y6_17 ._tabs_k97y6_24 ._tab_k97y6_24 ._icon_k97y6_62 {\n  font-size: 18px;\n}\n._popups_k97y6_11 ._sticky_k97y6_17 ._tabs_k97y6_24 ._tab_k97y6_24 ._name_k97y6_65 {\n  padding: 0px 0px 0px 5px;\n}\n._popups_k97y6_11 ._sticky_k97y6_17 ._tabs_k97y6_24 ._tab_k97y6_24 ._badge_k97y6_68 {\n  background-color: rgba(0, 0, 0, 0.2666666667);\n  padding: 4px;\n  border-radius: 4px;\n  margin-left: 4px;\n}\n._popups_k97y6_11 ._sticky_k97y6_17 ._tabs_k97y6_24 ._tab_k97y6_24 ._link_k97y6_45 {\n  display: none;\n  outline: none;\n  color: inherit;\n}\n._popups_k97y6_11 ._sticky_k97y6_17 ._tabs_k97y6_24 ._tab_k97y6_24._sel_k97y6_57 ._link_k97y6_45, ._popups_k97y6_11 ._sticky_k97y6_17 ._tabs_k97y6_24 ._tab_k97y6_24:focus-visible ._link_k97y6_45, ._popups_k97y6_11 ._sticky_k97y6_17 ._tabs_k97y6_24 ._tab_k97y6_24:hover ._link_k97y6_45 {\n  display: flex;\n  height: 100%;\n  align-items: center;\n}\n._popups_k97y6_11 ._sticky_k97y6_17 ._tabs_k97y6_24 ._tab_k97y6_24._sel_k97y6_57 ._link_k97y6_45 ._popout_k97y6_85, ._popups_k97y6_11 ._sticky_k97y6_17 ._tabs_k97y6_24 ._tab_k97y6_24:focus-visible ._link_k97y6_45 ._popout_k97y6_85, ._popups_k97y6_11 ._sticky_k97y6_17 ._tabs_k97y6_24 ._tab_k97y6_24:hover ._link_k97y6_45 ._popout_k97y6_85 {\n  font-size: 10px;\n  margin-left: 1px;\n  padding: 2px;\n  border-radius: 2px;\n}\n._popups_k97y6_11 ._sticky_k97y6_17 ._tabs_k97y6_24 ._tab_k97y6_24._sel_k97y6_57 ._link_k97y6_45:hover ._popout_k97y6_85, ._popups_k97y6_11 ._sticky_k97y6_17 ._tabs_k97y6_24 ._tab_k97y6_24:focus-visible ._link_k97y6_45:hover ._popout_k97y6_85, ._popups_k97y6_11 ._sticky_k97y6_17 ._tabs_k97y6_24 ._tab_k97y6_24:hover ._link_k97y6_45:hover ._popout_k97y6_85 {\n  background: #fff;\n  color: var(--theme);\n}\n\n/* width */\n::-webkit-scrollbar {\n  width: 7px;\n  height: 7px;\n}\n\n/* hide track */\n::-webkit-scrollbar-track,\n::-webkit-scrollbar-corner {\n  background: none;\n}\n\n/* Handle */\n::-webkit-scrollbar-thumb {\n  background: gray;\n  border-radius: 4px;\n}";
styleInject(css_248z$1);

var style0$1 = { "container": "_container_k97y6_2", "popups": "_popups_k97y6_11", "sticky": "_sticky_k97y6_17", "tabs": "_tabs_k97y6_24", "tab": "_tab_k97y6_24", "link": "_link_k97y6_45", "sel": "_sel_k97y6_57", "icon": "_icon_k97y6_62", "name": "_name_k97y6_65", "badge": "_badge_k97y6_68", "popout": "_popout_k97y6_85" };

const cssModules$1 = script$1.__cssModules = {};
cssModules$1["$style"] = style0$1;


script$1.__file = "src/popup/popups.vue";

var script = /* @__PURE__ */ defineComponent({
  __name: "index",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass(_ctx.$style.container)
        },
        [
          createVNode(script$2),
          (openBlock(), createBlock(Suspense, null, {
            default: withCtx(() => [
              createVNode(script$1)
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

var css_248z = "._container_1mz44_2 {\n  display: flex;\n  flex-direction: column;\n  font-family: \"Sora\", sans-serif;\n  width: 400px;\n  height: 600px;\n}";
styleInject(css_248z);

var style0 = { "container": "_container_1mz44_2" };

const cssModules = script.__cssModules = {};
cssModules["$style"] = style0;


script.__file = "src/popup/index.vue";

createApp(script).mount(document.body);