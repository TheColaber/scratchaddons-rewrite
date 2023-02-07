import { a as definePopupManifest } from './chunk.index-e4c60ce4.js';
import { a as styleInject, d as defineComponent, r as ref, w as withDirectives, v as vShow, c as createElementBlock, b as createBaseVNode, e as createVNode, n as normalizeClass, u as unref, t as toDisplayString, f as createTextVNode, g as renderSlot, h as createCommentVNode, i as withCtx, o as openBlock, I as Icon, F as Fragment, j as renderList } from './chunk.style-inject.es-d8193a81.js';

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


script$2.__file = "popups/scratch-messaging/section.vue";

const _hoisted_1 = { key: 0 };
const _hoisted_2 = ["href"];
const _hoisted_3 = ["href"];
const _hoisted_4 = ["href"];
const _hoisted_5 = ["href"];
const _hoisted_6 = ["href"];
const _hoisted_7 = { key: 0 };
const _hoisted_8 = ["href"];
const _hoisted_9 = ["href"];
const _hoisted_10 = ["href"];
const _hoisted_11 = ["href"];
const _hoisted_12 = ["href"];
const _hoisted_13 = ["href"];
var script$1 = /* @__PURE__ */ defineComponent({
  __name: "component",
  props: {
    addon: { type: null, required: true }
  },
  setup(__props) {
    const { addon } = __props;
    const follows = ref([]);
    const studioInvites = ref([]);
    const studioPromotions = ref([]);
    const studioHostTransfers = ref([]);
    const forumActivity = ref([]);
    const studioActivity = ref([]);
    const remixes = ref([]);
    let loading = true;
    addon.port.postMessage("sendMessages");
    addon.port.onMessage.addListener(({ messages }) => {
      if (messages) {
        loading = false;
        for (const message of messages) {
          if (message.type === "followuser") {
            follows.value.push(message);
          } else if (message.type === "curatorinvite") {
            studioInvites.value.push(message);
          } else if (message.type === "becomeownerstudio") {
            studioPromotions.value.push(message);
          } else if (message.type === "becomehoststudio") {
            studioHostTransfers.value.push(message);
          } else if (message.type === "forumpost") {
            forumActivity.value.push(message);
          } else if (message.type === "studioactivity") {
            studioActivity.value.push(message);
          } else if (message.type === "remixproject") {
            remixes.value.push(message);
          }
        }
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass(_ctx.$style.container)
        },
        [
          unref(loading) ? (openBlock(), createElementBlock("div", _hoisted_1, "Loading Messages...")) : createCommentVNode("v-if", true),
          createVNode(script$2, {
            length: follows.value.length,
            title: "Follows",
            icon: "user-plus",
            "no-row-gap": true
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(follows.value, (item) => {
                  return openBlock(), createElementBlock("a", {
                    target: "_blank",
                    href: "https://scratch.mit.edu/users/" + item.actor_username,
                    class: normalizeClass(_ctx.$style.link)
                  }, toDisplayString(item.actor_username), 11, _hoisted_2);
                }),
                256
                /* UNKEYED_FRAGMENT */
              ))
            ]),
            _: 1
            /* STABLE */
          }, 8, ["length"]),
          createVNode(script$2, {
            length: studioInvites.value.length,
            title: "Studio Invites",
            icon: "envelope-add"
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(studioInvites.value, (item) => {
                  return openBlock(), createElementBlock("span", null, [
                    createBaseVNode("a", {
                      target: "_blank",
                      href: "https://scratch.mit.edu/users/" + item.actor_username,
                      class: normalizeClass(_ctx.$style.link)
                    }, toDisplayString(item.actor_username), 11, _hoisted_3),
                    createTextVNode(" invited you to curate "),
                    createBaseVNode("a", {
                      target: "_blank",
                      href: "https://scratch.mit.edu/studios/" + item.gallery_id,
                      class: normalizeClass(_ctx.$style.link)
                    }, toDisplayString(item.title), 11, _hoisted_4)
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
            length: studioPromotions.value.length,
            title: "Studio promotions",
            icon: "shield-plus"
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(studioPromotions.value, (item) => {
                  return openBlock(), createElementBlock("span", null, [
                    createBaseVNode("a", {
                      target: "_blank",
                      href: "https://scratch.mit.edu/users/" + item.actor_username,
                      class: normalizeClass(_ctx.$style.link)
                    }, toDisplayString(item.actor_username), 11, _hoisted_5),
                    createTextVNode(" promoted you to manager for the studio "),
                    createBaseVNode("a", {
                      target: "_blank",
                      href: "https://scratch.mit.edu/studios/" + item.gallery_id,
                      class: normalizeClass(_ctx.$style.link)
                    }, toDisplayString(item.gallery_title), 11, _hoisted_6)
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
            length: studioPromotions.value.length,
            title: "Studio host transfers",
            icon: "users-alt"
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(studioHostTransfers.value, (item) => {
                  return openBlock(), createElementBlock("span", null, [
                    item.admin_actor ? (openBlock(), createElementBlock("span", _hoisted_7, "A Scratch Team member")) : (openBlock(), createElementBlock("a", {
                      key: 1,
                      target: "_blank",
                      href: "https://scratch.mit.edu/users/" + item.actor_username,
                      class: normalizeClass(_ctx.$style.link)
                    }, toDisplayString(item.actor_username), 11, _hoisted_8)),
                    createTextVNode(" made you the host of the studio "),
                    createBaseVNode("a", {
                      target: "_blank",
                      href: "https://scratch.mit.edu/studios/" + item.gallery_id,
                      class: normalizeClass(_ctx.$style.link)
                    }, toDisplayString(item.gallery_title), 11, _hoisted_9)
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
            length: forumActivity.value.length,
            title: "Forum activity",
            icon: "comments-alt"
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(forumActivity.value, (item) => {
                  return openBlock(), createElementBlock("span", null, [
                    createTextVNode(" There are new posts in the forum thread "),
                    createBaseVNode("a", {
                      target: "_blank",
                      href: "https://scratch.mit.edu/discuss/topic/" + item.topic_id + "/unread",
                      class: normalizeClass(_ctx.$style.link)
                    }, toDisplayString(item.topic_title), 11, _hoisted_10)
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
            length: studioActivity.value.length,
            title: "Studio activity",
            icon: "folder-exclamation"
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(studioActivity.value, (item) => {
                  return openBlock(), createElementBlock("span", null, [
                    createTextVNode(" There was new activity in "),
                    createBaseVNode("a", {
                      target: "_blank",
                      href: "https://scratch.mit.edu/studios/" + item.gallery_id,
                      class: normalizeClass(_ctx.$style.link)
                    }, toDisplayString(item.title), 11, _hoisted_11)
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
            length: remixes.value.length,
            title: "Remixes",
            icon: "arrow-random"
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(remixes.value, (item) => {
                  return openBlock(), createElementBlock("span", null, [
                    createBaseVNode("a", {
                      target: "_blank",
                      href: "https://scratch.mit.edu/users/" + item.actor_username,
                      class: normalizeClass(_ctx.$style.link)
                    }, toDisplayString(item.actor_username), 11, _hoisted_12),
                    createTextVNode(
                      ' remixed your project "' + toDisplayString(item.parent_title) + '" as "',
                      1
                      /* TEXT */
                    ),
                    createBaseVNode("a", {
                      target: "_blank",
                      href: "https://scratch.mit.edu/projects/" + item.project_id,
                      class: normalizeClass(_ctx.$style.link)
                    }, toDisplayString(item.title), 11, _hoisted_13),
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

var css_248z = "._container_185b5_2 {\n  flex: 1;\n  display: flex;\n  gap: 10px;\n  flex-direction: column;\n  background: var(--background-primary);\n  color: var(--content-text);\n  padding-bottom: 10px;\n}\n\n._link_185b5_12 {\n  color: var(--blue-text);\n  text-decoration: none;\n}\n._link_185b5_12:hover {\n  text-decoration: underline;\n}";
styleInject(css_248z);

var style0 = { "container": "_container_185b5_2", "link": "_link_185b5_12" };

const cssModules = script$1.__cssModules = {};
cssModules["$style"] = style0;


script$1.__file = "popups/scratch-messaging/component.vue";

var worker = async (addon) => {
  chrome.runtime.onConnect.addListener(async (port) => {
    if (port.name !== "scratch-messaging")
      return;
    port.onMessage.addListener(async (message) => {
      if (message === "sendMessages") {
        const messages = await addon.auth.getMessages();
        port.postMessage({ messages });
      }
      if (message === "sendCount") {
        console.log("got it!");
        const count = await addon.auth.getMessageCount();
        console.log("sent");
        port.postMessage({ count });
      }
    });
  });
};

var script = /* @__PURE__ */ defineComponent({
  __name: "badge",
  props: {
    addon: { type: null, required: true }
  },
  setup(__props) {
    const { addon } = __props;
    let messageCount = ref();
    addon.port.postMessage("sendCount");
    console.log("SENT COuNt");
    addon.port.onMessage.addListener(({ count }) => {
      console.log(count);
      if (count) {
        messageCount.value = count;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        null,
        toDisplayString(unref(messageCount)),
        1
        /* TEXT */
      );
    };
  }
});

script.__file = "popups/scratch-messaging/badge.vue";

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
    icon: "envelope",
    badge: script
  },
  worker,
  versionAdded: "1.0.0",
  tags: ["recommended"],
  enabledByDefault: true
});

var popups = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'scratch-messaging': addon
});

export { popups as p };
