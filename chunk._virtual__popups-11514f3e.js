import { d as definePopupManifest } from './chunk._virtual__addons-19cb23e2.js';
import { a as styleInject, d as defineComponent, r as ref, w as withDirectives, v as vShow, c as createElementBlock, b as createBaseVNode, e as createVNode, n as normalizeClass, u as unref, t as toDisplayString, f as createTextVNode, g as renderSlot, h as normalizeStyle, i as createCommentVNode, j as withCtx, k as withAsyncContext, o as openBlock, I as Icon, F as Fragment, l as renderList } from './chunk.style-inject.es-cbd22147.js';

var script$2 = /* @__PURE__ */ defineComponent({
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
                toDisplayString(__props.title),
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
                    icon: "uil:" + __props.icon
                  }, null, 8, ["class", "icon"]),
                  createTextVNode(
                    " " + toDisplayString(__props.length),
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
              class: normalizeClass([_ctx.$style.list, { [_ctx.$style.noRowGap]: __props.noRowGap }])
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
        [vShow, __props.length]
      ]);
    };
  }
});

var css_248z$1 = "._message-type_16sfz_2 {\n  border-radius: 4px;\n  border: 1px solid var(--background-tertiary);\n  background: var(--background-secondary);\n  margin: 0px 10px;\n  box-shadow: var(--content-shadow);\n}\n._message-type_16sfz_2 ._title_16sfz_9 {\n  font-size: 12px;\n  color: var(--content-text);\n  padding: 6px;\n  padding-inline-end: 9px;\n  cursor: default;\n  display: flex;\n  align-items: center;\n  user-select: none;\n}\n._message-type_16sfz_2 ._title_16sfz_9 ._text_16sfz_19 {\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  flex: 1;\n  margin-left: 6px;\n}\n._message-type_16sfz_2 ._title_16sfz_9 ._right_16sfz_27 {\n  white-space: nowrap;\n  font-size: 12px;\n}\n._message-type_16sfz_2 ._title_16sfz_9 ._right_16sfz_27 ._icon_16sfz_30 {\n  font-size: 14px;\n  vertical-align: text-bottom;\n}\n._message-type_16sfz_2 ._title_16sfz_9 ._dropdown_16sfz_36 {\n  transition: background 0.2s;\n  padding: 4px;\n  border-radius: 4px;\n  font-size: 24px;\n}\n._message-type_16sfz_2 ._title_16sfz_9:hover ._dropdown_16sfz_36 {\n  background: var(--hover-highlight);\n}\n._message-type_16sfz_2 ._list_16sfz_48 {\n  color: var(--description-text);\n  font-size: 12px;\n  padding: 5px 16px 16px 16px;\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n._message-type_16sfz_2 ._list_16sfz_48._noRowGap_16sfz_55 {\n  gap: 0px 10px;\n}";
styleInject(css_248z$1);

var style0$1 = { "message-type": "_message-type_16sfz_2", "title": "_title_16sfz_9", "text": "_text_16sfz_19", "right": "_right_16sfz_27", "icon": "_icon_16sfz_30", "dropdown": "_dropdown_16sfz_36", "list": "_list_16sfz_48", "noRowGap": "_noRowGap_16sfz_55" };

const cssModules$1 = script$2.__cssModules = {};
cssModules$1["$style"] = style0$1;


script$2.__file = "src/popup/popups/scratch-messaging/section.vue";

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
var script$1 = /* @__PURE__ */ defineComponent({
  __name: "component",
  props: {
    addon: { type: null, required: true }
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
          createVNode(script$2, {
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
          createVNode(script$2, {
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
          createVNode(script$2, {
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
          createVNode(script$2, {
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
          createVNode(script$2, {
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
          createVNode(script$2, {
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
          createVNode(script$2, {
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

var css_248z = "._container_1hq45_2 {\n  flex: 1;\n  display: flex;\n  gap: 10px;\n  flex-direction: column;\n  background: var(--background-primary);\n  color: var(--content-text);\n  padding-bottom: 10px;\n}\n\n._link_1hq45_12 {\n  color: var(--blue-text);\n  text-decoration: none;\n}\n._link_1hq45_12:hover {\n  text-decoration: underline;\n}\n\n._loader_1hq45_21 {\n  position: absolute;\n  left: 50%;\n  transform: translate(-50%, 10%);\n  padding: 15px 20px;\n  overflow: hidden;\n  background-color: var(--button-hover-background);\n  border-radius: 8px;\n  box-shadow: var(--large-shadow);\n  font-weight: 600;\n}\n._loader_1hq45_21 ._bar_1hq45_31 {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 0;\n  height: 4px;\n  background-image: var(--gradient);\n}";
styleInject(css_248z);

var style0 = { "container": "_container_1hq45_2", "link": "_link_1hq45_12", "loader": "_loader_1hq45_21", "bar": "_bar_1hq45_31" };

const cssModules = script$1.__cssModules = {};
cssModules["$style"] = style0;


script$1.__file = "src/popup/popups/scratch-messaging/component.vue";

const _hoisted_1 = { key: 0 };
var script = /* @__PURE__ */ defineComponent({
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

script.__file = "src/popup/popups/scratch-messaging/badge.vue";

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
    component: script$1,
    name: "Messages",
    icon: "mail",
    badge: script
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
