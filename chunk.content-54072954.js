import { a as addons } from './chunk._virtual__addons-19cb23e2.js';
import { a as styleInject, d as defineComponent, r as ref, c as createElementBlock, b as createBaseVNode, n as normalizeClass, e as createVNode, u as unref, f as createTextVNode, t as toDisplayString, F as Fragment, l as renderList, o as openBlock, I as Icon } from './chunk.style-inject.es-cbd22147.js';

const _hoisted_1 = ["state"];
var script$1 = /* @__PURE__ */ defineComponent({
  __name: "addon-body",
  props: {
    addon: { type: null, required: true },
    id: { type: [String, Number], required: true }
  },
  setup(__props) {
    const showing = ref(true);
    const enabled = ref(true);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass(_ctx.$style.container)
        },
        [
          createBaseVNode(
            "div",
            {
              class: normalizeClass(_ctx.$style["title-bar"])
            },
            [
              createBaseVNode(
                "div",
                {
                  class: normalizeClass(_ctx.$style["clickable-area"]),
                  onClick: _cache[0] || (_cache[0] = ($event) => showing.value = !showing.value)
                },
                [
                  createBaseVNode(
                    "div",
                    {
                      class: normalizeClass(_ctx.$style.dropdown)
                    },
                    [
                      createVNode(unref(Icon), {
                        icon: "uil:angle-down",
                        class: normalizeClass([_ctx.$style["dropdown-icon"], { [_ctx.$style.reverted]: showing.value }])
                      }, null, 8, ["class"])
                    ],
                    2
                    /* CLASS */
                  ),
                  createVNode(unref(Icon), {
                    icon: "uil:puzzle-piece",
                    class: normalizeClass(_ctx.$style.icon)
                  }, null, 8, ["class"]),
                  createTextVNode(
                    " " + toDisplayString(__props.addon.name),
                    1
                    /* TEXT */
                  )
                ],
                2
                /* CLASS */
              ),
              createBaseVNode(
                "div",
                {
                  class: normalizeClass(_ctx.$style.description)
                },
                " Hides the sprite properties panel by default, like in Scratch 2.0. Use the info button on the currently selected sprite or double-click a sprite to show the properties panel again. To re-hide it, use the collapse button in the properties panel or double-click a sprite. ",
                2
                /* CLASS */
              ),
              createBaseVNode(
                "div",
                {
                  class: normalizeClass(_ctx.$style.buttons)
                },
                [
                  createBaseVNode("div", {
                    class: normalizeClass(_ctx.$style["switch-background"]),
                    state: enabled.value ? "on" : "off"
                  }, [
                    createBaseVNode(
                      "div",
                      {
                        class: normalizeClass(_ctx.$style.switch),
                        onClick: _cache[1] || (_cache[1] = ($event) => enabled.value = !enabled.value)
                      },
                      null,
                      2
                      /* CLASS */
                    )
                  ], 10, _hoisted_1)
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

var css_248z$1 = "._container_1ulyp_2 {\n  margin: 10px;\n  background-color: var(--background-secondary);\n  border: 1px solid var(--background-tertiary);\n  border-radius: 4px;\n  box-shadow: var(--content-shadow);\n}\n._container_1ulyp_2 ._title-bar_1ulyp_8 {\n  height: 52px;\n  display: grid;\n  grid-auto-flow: column;\n  align-items: center;\n  padding: 0px 10px;\n}\n._container_1ulyp_2 ._title-bar_1ulyp_8 ._clickable-area_1ulyp_14 {\n  cursor: pointer;\n  display: flex;\n  align-self: stretch;\n  align-items: center;\n  user-select: none;\n}\n._container_1ulyp_2 ._title-bar_1ulyp_8 ._clickable-area_1ulyp_14 ._dropdown_1ulyp_20 {\n  display: flex;\n  align-items: center;\n  padding: 4px;\n  border-radius: 4px;\n  transition: 0.2s ease background-color;\n}\n._container_1ulyp_2 ._title-bar_1ulyp_8 ._clickable-area_1ulyp_14 ._dropdown_1ulyp_20 ._dropdown-icon_1ulyp_21 {\n  font-size: 24px;\n  transition: 0.2s ease transform;\n}\n._container_1ulyp_2 ._title-bar_1ulyp_8 ._clickable-area_1ulyp_14 ._dropdown_1ulyp_20 ._dropdown-icon_1ulyp_21._reverted_1ulyp_24 {\n  transform: scaleY(-1);\n}\n._container_1ulyp_2 ._title-bar_1ulyp_8 ._clickable-area_1ulyp_14:hover ._dropdown_1ulyp_20 {\n  background-color: rgba(255, 255, 255, 0.05);\n}\n._container_1ulyp_2 ._title-bar_1ulyp_8 ._clickable-area_1ulyp_14 ._icon_1ulyp_37 {\n  font-size: 16px;\n}\n._container_1ulyp_2 ._title-bar_1ulyp_8 ._description_1ulyp_42 {\n  margin-inline: 15px;\n  color: var(--gray-text);\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n._container_1ulyp_2 ._title-bar_1ulyp_8 ._buttons_1ulyp_50 {\n  justify-self: end;\n  display: flex;\n  justify-content: flex-end;\n}\n._container_1ulyp_2 ._title-bar_1ulyp_8 ._buttons_1ulyp_50 ._switch-background_1ulyp_54 {\n  background-color: var(--switch-background);\n  border-radius: 10px;\n  overflow: hidden;\n}\n._container_1ulyp_2 ._title-bar_1ulyp_8 ._buttons_1ulyp_50 ._switch-background_1ulyp_54[state=on] ._switch_1ulyp_54 {\n  background-image: var(--gradient);\n}\n._container_1ulyp_2 ._title-bar_1ulyp_8 ._buttons_1ulyp_50 ._switch-background_1ulyp_54[state=on] ._switch_1ulyp_54::before {\n  background-color: #fff;\n  left: 25px;\n}\n._container_1ulyp_2 ._title-bar_1ulyp_8 ._buttons_1ulyp_50 ._switch_1ulyp_54 {\n  display: flex;\n  background-color: transparent;\n  width: 40px;\n  height: 20px;\n  position: relative;\n  cursor: pointer;\n  transition: all 0.25s ease;\n}\n._container_1ulyp_2 ._title-bar_1ulyp_8 ._buttons_1ulyp_50 ._switch_1ulyp_54::before {\n  content: \"\";\n  position: absolute;\n  display: block;\n  width: 10px;\n  height: 10px;\n  background-color: var(--switch-inner-background);\n  border-radius: 5px;\n  top: 5px;\n  left: 5px;\n  transition: left 0.25s ease;\n}";
styleInject(css_248z$1);

var style0$1 = { "container": "_container_1ulyp_2", "title-bar": "_title-bar_1ulyp_8", "clickable-area": "_clickable-area_1ulyp_14", "dropdown": "_dropdown_1ulyp_20", "dropdown-icon": "_dropdown-icon_1ulyp_21", "reverted": "_reverted_1ulyp_24", "icon": "_icon_1ulyp_37", "description": "_description_1ulyp_42", "buttons": "_buttons_1ulyp_50", "switch-background": "_switch-background_1ulyp_54", "switch": "_switch_1ulyp_54" };

const cssModules$1 = script$1.__cssModules = {};
cssModules$1["$style"] = style0$1;


script$1.__file = "src/settings/components/addon-body.vue";

var script = /* @__PURE__ */ defineComponent({
  __name: "content",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass(_ctx.$style.main)
        },
        [
          (openBlock(), createElementBlock(
            Fragment,
            null,
            renderList(addons, (addon, id) => {
              return createVNode(script$1, {
                id,
                addon
              }, null, 8, ["id", "addon"]);
            }),
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

var css_248z = "._main_1ps6z_2 {\n  background-color: var(--background-primary);\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  color: var(--content-text);\n}";
styleInject(css_248z);

var style0 = { "main": "_main_1ps6z_2" };

const cssModules = script.__cssModules = {};
cssModules["$style"] = style0;


script.__file = "src/settings/content.vue";

export { script as s };
