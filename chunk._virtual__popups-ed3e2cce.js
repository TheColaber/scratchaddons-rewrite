import { d as definePopupManifest } from './chunk._virtual__addons-19cb23e2.js';
import { a as styleInject, _ as _export_sfc, c as createVueComponent, d as defineComponent, r as ref, o as openBlock, b as createElementBlock, u as unref, n as normalizeClass, e as createTextVNode, f as createBaseVNode, g as normalizeStyle, h as createCommentVNode, i as createVNode, w as withCtx, j as withAsyncContext, t as toDisplayString, F as Fragment, k as renderList, m as withDirectives, v as vShow, I as Icon, p as renderSlot } from './chunk.createVueComponent-bde6c1e7.js';

var _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "section",
  props: {
    noRowGap: { type: Boolean, required: false },
    length: { type: Number, required: true },
    icon: { type: String, required: true },
    title: { type: String, required: true }
  },
  setup(__props) {
    const extended = ref(false);
    return (_ctx, _cache) => {
      return withDirectives((openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass(_ctx.$style["message-type"])
        },
        [
          createBaseVNode(
            "div",
            {
              class: normalizeClass([_ctx.$style.title]),
              onClick: _cache[0] || (_cache[0] = ($event) => extended.value = !extended.value)
            },
            [
              createVNode(unref(Icon), {
                class: normalizeClass(_ctx.$style.dropdown),
                icon: extended.value ? "uil:angle-up" : "uil:angle-down"
              }, null, 8, ["class", "icon"]),
              createBaseVNode(
                "span",
                {
                  class: normalizeClass(_ctx.$style.text)
                },
                toDisplayString(_ctx.title),
                3
                /* TEXT, CLASS */
              ),
              createBaseVNode(
                "span",
                {
                  class: normalizeClass(_ctx.$style.right)
                },
                [
                  createVNode(unref(Icon), {
                    class: normalizeClass(_ctx.$style.icon),
                    icon: "uil:" + _ctx.icon
                  }, null, 8, ["class", "icon"]),
                  createTextVNode(
                    " " + toDisplayString(_ctx.length),
                    1
                    /* TEXT */
                  )
                ],
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          ),
          withDirectives(createBaseVNode(
            "div",
            {
              class: normalizeClass([_ctx.$style.list, { [_ctx.$style.noRowGap]: _ctx.noRowGap }])
            },
            [
              renderSlot(_ctx.$slots, "default")
            ],
            2
            /* CLASS */
          ), [
            [vShow, extended.value]
          ])
        ],
        2
        /* CLASS */
      )), [
        [vShow, _ctx.length]
      ]);
    };
  }
});

var css_248z$1 = ".section-vue-vue-type-style-index-0-lang-module_message-type__Xkta9 {\n  border-radius: 4px;\n  border: 1px solid var(--background-tertiary);\n  background: var(--background-secondary);\n  margin: 0px 10px;\n  box-shadow: var(--content-shadow);\n}\n.section-vue-vue-type-style-index-0-lang-module_message-type__Xkta9 .section-vue-vue-type-style-index-0-lang-module_title__zdmLO {\n  font-size: 12px;\n  color: var(--content-text);\n  padding: 6px;\n  padding-inline-end: 9px;\n  cursor: default;\n  display: flex;\n  align-items: center;\n  user-select: none;\n}\n.section-vue-vue-type-style-index-0-lang-module_message-type__Xkta9 .section-vue-vue-type-style-index-0-lang-module_title__zdmLO .section-vue-vue-type-style-index-0-lang-module_text__TY55C {\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  flex: 1;\n  margin-left: 6px;\n}\n.section-vue-vue-type-style-index-0-lang-module_message-type__Xkta9 .section-vue-vue-type-style-index-0-lang-module_title__zdmLO .section-vue-vue-type-style-index-0-lang-module_right__VVitn {\n  white-space: nowrap;\n  font-size: 12px;\n}\n.section-vue-vue-type-style-index-0-lang-module_message-type__Xkta9 .section-vue-vue-type-style-index-0-lang-module_title__zdmLO .section-vue-vue-type-style-index-0-lang-module_right__VVitn .section-vue-vue-type-style-index-0-lang-module_icon__GDsdT {\n  font-size: 14px;\n  vertical-align: text-bottom;\n}\n.section-vue-vue-type-style-index-0-lang-module_message-type__Xkta9 .section-vue-vue-type-style-index-0-lang-module_title__zdmLO .section-vue-vue-type-style-index-0-lang-module_dropdown__7us8c {\n  transition: background 0.2s;\n  padding: 4px;\n  border-radius: 4px;\n  font-size: 24px;\n}\n.section-vue-vue-type-style-index-0-lang-module_message-type__Xkta9 .section-vue-vue-type-style-index-0-lang-module_title__zdmLO:hover .section-vue-vue-type-style-index-0-lang-module_dropdown__7us8c {\n  background: var(--hover-highlight);\n}\n.section-vue-vue-type-style-index-0-lang-module_message-type__Xkta9 .section-vue-vue-type-style-index-0-lang-module_list__z5Nei {\n  color: var(--description-text);\n  font-size: 12px;\n  padding: 5px 16px 16px 16px;\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n.section-vue-vue-type-style-index-0-lang-module_message-type__Xkta9 .section-vue-vue-type-style-index-0-lang-module_list__z5Nei.section-vue-vue-type-style-index-0-lang-module_noRowGap__h3WcD {\n  gap: 0px 10px;\n}";
var style0$1 = {"message-type":"section-vue-vue-type-style-index-0-lang-module_message-type__Xkta9","title":"section-vue-vue-type-style-index-0-lang-module_title__zdmLO","text":"section-vue-vue-type-style-index-0-lang-module_text__TY55C","right":"section-vue-vue-type-style-index-0-lang-module_right__VVitn","icon":"section-vue-vue-type-style-index-0-lang-module_icon__GDsdT","dropdown":"section-vue-vue-type-style-index-0-lang-module_dropdown__7us8c","list":"section-vue-vue-type-style-index-0-lang-module_list__z5Nei","noRowGap":"section-vue-vue-type-style-index-0-lang-module_noRowGap__h3WcD"};
styleInject(css_248z$1);

const cssModules$1 = {
  "$style": style0$1
};
var Section = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__cssModules", cssModules$1], ["__file", "/home/runner/work/scratchaddons-rewrite/scratchaddons-rewrite/src/popup/popups/scratch-messaging/section.vue"]]);

const _hoisted_1$1 = { key: 0 };
const _hoisted_2 = { key: 1 };
const _hoisted_3 = ["href"];
const _hoisted_4 = ["href"];
const _hoisted_5 = ["href"];
const _hoisted_6 = ["href"];
const _hoisted_7 = ["href"];
const _hoisted_8 = { key: 0 };
const _hoisted_9 = ["href"];
const _hoisted_10 = ["href"];
const _hoisted_11 = ["href"];
const _hoisted_12 = ["href"];
const _hoisted_13 = ["href"];
const _hoisted_14 = ["href"];
var _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "component",
  props: {
    addon: { type: Object, required: true }
  },
  setup(__props) {
    const { addon } = __props;
    let follows = ref([]);
    let studioInvites = ref([]);
    let studioPromotions = ref([]);
    let studioHostTransfers = ref([]);
    let forumActivity = ref([]);
    let studioActivity = ref([]);
    let remixes = ref([]);
    const projects = ref([]);
    let loading = ref(0);
    async function loadMessages() {
      const session = await addon.auth.getSession();
      if (!session.user) {
        loading.value = "notloggedin";
        return;
      }
      const messageCount = await addon.auth.getMessageCount();
      const maxPages = Math.min(Math.ceil(messageCount / 40) + 1, 25);
      for (let i = 0; i < maxPages; i++, loading.value = 100 * i / maxPages) {
        const page = await (await fetch(
          `https://api.scratch.mit.edu/users/${session.user.username}/messages?limit=40&offset=${40 * i}`,
          {
            headers: {
              "x-token": session.user.token
            }
          }
        )).json();
        for (const message of page) {
          switch (message.type) {
            case "followuser":
              follows.value.push(message);
              break;
            case "curatorinvite":
              studioInvites.value.push(message);
              break;
            case "becomeownerstudio":
              studioPromotions.value.push(message);
              break;
            case "becomehoststudio":
              studioHostTransfers.value.push(message);
              break;
            case "forumpost":
              forumActivity.value.push(message);
              break;
            case "studioactivity":
              studioActivity.value.push(message);
              break;
            case "remixproject":
              remixes.value.push(message);
              break;
            case "loveproject": {
              const project = getProject(message.project_id, message.title);
              project.loveCount++;
              const findLover = project.loversAndFavers.find(
                (obj) => obj.username === message.actor_username
              );
              if (findLover)
                findLover.loved = true;
              else
                project.loversAndFavers.push({
                  username: message.actor_username,
                  loved: true,
                  faved: false
                });
              break;
            }
            case "favoriteproject": {
              const project = getProject(message.project_id, message.project_title);
              project.favoriteCount++;
              const findFaver = project.loversAndFavers.find(
                (obj) => obj.username === message.actor_username
              );
              if (findFaver)
                findFaver.faved = true;
              else
                project.loversAndFavers.push({
                  username: message.actor_username,
                  loved: false,
                  faved: true
                });
              break;
            }
          }
        }
      }
      console.log(projects.value);
    }
    loadMessages();
    function getProject(projectId, title) {
      const search = projects.value.find((project2) => project2.id === projectId);
      if (search)
        return search;
      const project = {
        id: projectId,
        title,
        unreadComments: 0,
        commentChains: [],
        loveCount: 0,
        favoriteCount: 0,
        loversAndFavers: [],
        loadedComments: false
      };
      projects.value.push(project);
      return project;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass(_ctx.$style.container)
        },
        [
          unref(loading) !== 100 ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: normalizeClass(_ctx.$style.loader)
            },
            [
              unref(loading) === "notloggedin" ? (openBlock(), createElementBlock("div", _hoisted_1$1, "Not logged in.")) : (openBlock(), createElementBlock("div", _hoisted_2, [
                createTextVNode(" Loading... "),
                createBaseVNode(
                  "div",
                  {
                    class: normalizeClass(_ctx.$style.bar),
                    style: normalizeStyle({ width: unref(loading) + "%" })
                  },
                  null,
                  6
                  /* CLASS, STYLE */
                )
              ]))
            ],
            2
            /* CLASS */
          )) : createCommentVNode("v-if", true),
          createVNode(Section, {
            length: unref(follows).length,
            title: "Follows",
            icon: "user-plus",
            "no-row-gap": true
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(unref(follows), (item) => {
                  return openBlock(), createElementBlock("a", {
                    target: "_blank",
                    href: "https://scratch.mit.edu/users/" + item.actor_username,
                    class: normalizeClass(_ctx.$style.link)
                  }, toDisplayString(item.actor_username), 11, _hoisted_3);
                }),
                256
                /* UNKEYED_FRAGMENT */
              ))
            ]),
            _: 1
            /* STABLE */
          }, 8, ["length"]),
          createVNode(Section, {
            length: unref(studioInvites).length,
            title: "Studio Invites",
            icon: "envelope-add"
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(unref(studioInvites), (item) => {
                  return openBlock(), createElementBlock("span", null, [
                    createBaseVNode("a", {
                      target: "_blank",
                      href: "https://scratch.mit.edu/users/" + item.actor_username,
                      class: normalizeClass(_ctx.$style.link)
                    }, toDisplayString(item.actor_username), 11, _hoisted_4),
                    createTextVNode(" invited you to curate "),
                    createBaseVNode("a", {
                      target: "_blank",
                      href: "https://scratch.mit.edu/studios/" + item.gallery_id,
                      class: normalizeClass(_ctx.$style.link)
                    }, toDisplayString(item.title), 11, _hoisted_5)
                  ]);
                }),
                256
                /* UNKEYED_FRAGMENT */
              ))
            ]),
            _: 1
            /* STABLE */
          }, 8, ["length"]),
          createVNode(Section, {
            length: unref(studioPromotions).length,
            title: "Studio promotions",
            icon: "shield-plus"
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(unref(studioPromotions), (item) => {
                  return openBlock(), createElementBlock("span", null, [
                    createBaseVNode("a", {
                      target: "_blank",
                      href: "https://scratch.mit.edu/users/" + item.actor_username,
                      class: normalizeClass(_ctx.$style.link)
                    }, toDisplayString(item.actor_username), 11, _hoisted_6),
                    createTextVNode(" promoted you to manager for the studio "),
                    createBaseVNode("a", {
                      target: "_blank",
                      href: "https://scratch.mit.edu/studios/" + item.gallery_id,
                      class: normalizeClass(_ctx.$style.link)
                    }, toDisplayString(item.gallery_title), 11, _hoisted_7)
                  ]);
                }),
                256
                /* UNKEYED_FRAGMENT */
              ))
            ]),
            _: 1
            /* STABLE */
          }, 8, ["length"]),
          createVNode(Section, {
            length: unref(studioPromotions).length,
            title: "Studio host transfers",
            icon: "users-alt"
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(unref(studioHostTransfers), (item) => {
                  return openBlock(), createElementBlock("span", null, [
                    item.admin_actor ? (openBlock(), createElementBlock("span", _hoisted_8, "A Scratch Team member")) : (openBlock(), createElementBlock("a", {
                      key: 1,
                      target: "_blank",
                      href: "https://scratch.mit.edu/users/" + item.actor_username,
                      class: normalizeClass(_ctx.$style.link)
                    }, toDisplayString(item.actor_username), 11, _hoisted_9)),
                    createTextVNode(" made you the host of the studio "),
                    createBaseVNode("a", {
                      target: "_blank",
                      href: "https://scratch.mit.edu/studios/" + item.gallery_id,
                      class: normalizeClass(_ctx.$style.link)
                    }, toDisplayString(item.gallery_title), 11, _hoisted_10)
                  ]);
                }),
                256
                /* UNKEYED_FRAGMENT */
              ))
            ]),
            _: 1
            /* STABLE */
          }, 8, ["length"]),
          createVNode(Section, {
            length: unref(forumActivity).length,
            title: "Forum activity",
            icon: "comments-alt"
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(unref(forumActivity), (item) => {
                  return openBlock(), createElementBlock("span", null, [
                    createTextVNode(" There are new posts in the forum thread "),
                    createBaseVNode("a", {
                      target: "_blank",
                      href: "https://scratch.mit.edu/discuss/topic/" + item.topic_id + "/unread",
                      class: normalizeClass(_ctx.$style.link)
                    }, toDisplayString(item.topic_title), 11, _hoisted_11)
                  ]);
                }),
                256
                /* UNKEYED_FRAGMENT */
              ))
            ]),
            _: 1
            /* STABLE */
          }, 8, ["length"]),
          createVNode(Section, {
            length: unref(studioActivity).length,
            title: "Studio activity",
            icon: "folder-exclamation"
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(unref(studioActivity), (item) => {
                  return openBlock(), createElementBlock("span", null, [
                    createTextVNode(" There was new activity in "),
                    createBaseVNode("a", {
                      target: "_blank",
                      href: "https://scratch.mit.edu/studios/" + item.gallery_id,
                      class: normalizeClass(_ctx.$style.link)
                    }, toDisplayString(item.title), 11, _hoisted_12)
                  ]);
                }),
                256
                /* UNKEYED_FRAGMENT */
              ))
            ]),
            _: 1
            /* STABLE */
          }, 8, ["length"]),
          createVNode(Section, {
            length: unref(remixes).length,
            title: "Remixes",
            icon: "arrow-random"
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(unref(remixes), (item) => {
                  return openBlock(), createElementBlock("span", null, [
                    createBaseVNode("a", {
                      target: "_blank",
                      href: "https://scratch.mit.edu/users/" + item.actor_username,
                      class: normalizeClass(_ctx.$style.link)
                    }, toDisplayString(item.actor_username), 11, _hoisted_13),
                    createTextVNode(
                      ' remixed your project "' + toDisplayString(item.parent_title) + '" as "',
                      1
                      /* TEXT */
                    ),
                    createBaseVNode("a", {
                      target: "_blank",
                      href: "https://scratch.mit.edu/projects/" + item.project_id,
                      class: normalizeClass(_ctx.$style.link)
                    }, toDisplayString(item.title), 11, _hoisted_14),
                    createTextVNode('" ')
                  ]);
                }),
                256
                /* UNKEYED_FRAGMENT */
              ))
            ]),
            _: 1
            /* STABLE */
          }, 8, ["length"])
        ],
        2
        /* CLASS */
      );
    };
  }
});

var css_248z = ".component-vue-vue-type-style-index-0-lang-module_container__ND083 {\n  flex: 1;\n  display: flex;\n  gap: 10px;\n  flex-direction: column;\n  background: var(--background-primary);\n  color: var(--content-text);\n  padding-bottom: 10px;\n  margin-top: 10px;\n}\n\n.component-vue-vue-type-style-index-0-lang-module_link__nuOuD {\n  color: var(--blue-text);\n  text-decoration: none;\n}\n.component-vue-vue-type-style-index-0-lang-module_link__nuOuD:hover {\n  text-decoration: underline;\n}\n\n.component-vue-vue-type-style-index-0-lang-module_loader__GkFSv {\n  position: absolute;\n  left: 50%;\n  transform: translate(-50%, 10%);\n  padding: 15px 20px;\n  overflow: hidden;\n  background-color: var(--button-hover-background);\n  border-radius: 8px;\n  box-shadow: var(--large-shadow);\n  font-weight: 600;\n}\n.component-vue-vue-type-style-index-0-lang-module_loader__GkFSv .component-vue-vue-type-style-index-0-lang-module_bar__OH59n {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 0;\n  height: 4px;\n  background-image: var(--gradient);\n}";
var style0 = {"container":"component-vue-vue-type-style-index-0-lang-module_container__ND083","link":"component-vue-vue-type-style-index-0-lang-module_link__nuOuD","loader":"component-vue-vue-type-style-index-0-lang-module_loader__GkFSv","bar":"component-vue-vue-type-style-index-0-lang-module_bar__OH59n"};
styleInject(css_248z);

const cssModules = {
  "$style": style0
};
var component = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__cssModules", cssModules], ["__file", "/home/runner/work/scratchaddons-rewrite/scratchaddons-rewrite/src/popup/popups/scratch-messaging/component.vue"]]);

const _hoisted_1 = { key: 0 };
var _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "badge",
  props: {
    addon: { type: null, required: true }
  },
  async setup(__props) {
    let __temp, __restore;
    const { addon } = __props;
    const session = ([__temp, __restore] = withAsyncContext(() => addon.auth.getSession()), __temp = await __temp, __restore(), __temp);
    const show = !!session.user;
    const messageCount = ([__temp, __restore] = withAsyncContext(() => addon.auth.getMessageCount()), __temp = await __temp, __restore(), __temp);
    return (_ctx, _cache) => {
      return show ? (openBlock(), createElementBlock(
        "div",
        _hoisted_1,
        toDisplayString(unref(messageCount)),
        1
        /* TEXT */
      )) : createCommentVNode("v-if", true);
    };
  }
});

var badge = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/home/runner/work/scratchaddons-rewrite/scratchaddons-rewrite/src/popup/popups/scratch-messaging/badge.vue"]]);

/**
 * @tabler/icons-vue v2.20.0 - MIT
 */


var IconMail = createVueComponent("mail", "IconMail", [
  [
    "path",
    {
      d: "M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z",
      key: "svg-0"
    }
  ],
  ["path", { d: "M3 7l9 6l9 -6", key: "svg-1" }]
]);

var addon = definePopupManifest({
  name: "Scratch Messaging",
  description: "Easy reading and replying to your Scratch messages: groups messages, shows full comment text and context, allows direct comment replying.",
  credits: [
    {
      name: "World_Languages"
    },
    {
      name: "griffpatch"
    }
  ],
  popup: {
    component,
    name: "Messages",
    icon: IconMail,
    badge
  },
  versionAdded: "1.0.0",
  tags: ["recommended"],
  enabledByDefault: true
});

var popups = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'scratch-messaging': addon
});

export { popups as p };
