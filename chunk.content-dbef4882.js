import { a as styleInject, c as createVueComponent, _ as _export_sfc, d as defineComponent, o as openBlock, b as createElementBlock, f as createBaseVNode, i as createVNode, n as normalizeClass, u as unref, F as Fragment, k as renderList, r as ref, I as Icon, e as createTextVNode, t as toDisplayString } from './chunk.createVueComponent-bde6c1e7.js';
import { a as addons } from './chunk._virtual__addons-19cb23e2.js';

/**
 * @tabler/icons-vue v2.20.0 - MIT
 */


var IconChevronDown = createVueComponent("chevron-down", "IconChevronDown", [
  ["path", { d: "M6 9l6 6l6 -6", key: "svg-0" }]
]);

/**
 * @tabler/icons-vue v2.20.0 - MIT
 */


var IconSearch = createVueComponent("search", "IconSearch", [
  ["path", { d: "M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0", key: "svg-0" }],
  ["path", { d: "M21 21l-6 -6", key: "svg-1" }]
]);

/**
 * @tabler/icons-vue v2.20.0 - MIT
 */


var IconTool = createVueComponent("tool", "IconTool", [
  [
    "path",
    {
      d: "M7 10h3v-3l-3.5 -3.5a6 6 0 0 1 8 8l6 6a2 2 0 0 1 -3 3l-6 -6a6 6 0 0 1 -8 -8l3.5 3.5",
      key: "svg-0"
    }
  ]
]);

const _hoisted_1 = ["state"];
var _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "addon-body",
  props: {
    addon: { type: Object, required: true },
    id: { type: [String, Number], required: true }
  },
  setup(__props) {
    const showing = ref(true);
    const enabled = ref(false);
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
                    "button",
                    {
                      class: normalizeClass(_ctx.$style.dropdown)
                    },
                    [
                      createVNode(unref(IconChevronDown), {
                        class: normalizeClass([_ctx.$style["dropdown-icon"], { [_ctx.$style.reverted]: showing.value }])
                      }, null, 8, ["class"])
                    ],
                    2
                    /* CLASS */
                  ),
                  createBaseVNode(
                    "div",
                    {
                      class: normalizeClass(_ctx.$style.name)
                    },
                    [
                      createVNode(unref(Icon), {
                        icon: "tabler:puzzle",
                        class: normalizeClass(_ctx.$style.icon)
                      }, null, 8, ["class"]),
                      createTextVNode(
                        " " + toDisplayString(_ctx.addon.name),
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
              createBaseVNode(
                "div",
                {
                  class: normalizeClass(_ctx.$style.description)
                },
                toDisplayString(_ctx.addon.description),
                3
                /* TEXT, CLASS */
              ),
              createBaseVNode(
                "div",
                {
                  class: normalizeClass(_ctx.$style.buttons)
                },
                [
                  createBaseVNode("button", {
                    class: normalizeClass(_ctx.$style["switch-background"]),
                    state: enabled.value ? "on" : "off",
                    onClick: _cache[1] || (_cache[1] = ($event) => enabled.value = !enabled.value)
                  }, [
                    createBaseVNode(
                      "div",
                      {
                        class: normalizeClass(_ctx.$style.switch)
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

var css_248z$1 = ".addon-body-vue-vue-type-style-index-0-lang-module_container__w15Ze {\n  margin: 10px;\n  background-color: var(--background-secondary);\n  border: 1px solid var(--background-tertiary);\n  border-radius: 4px;\n  box-shadow: var(--content-shadow);\n  display: flex;\n  width: 100%;\n  box-sizing: border-box;\n}\n.addon-body-vue-vue-type-style-index-0-lang-module_container__w15Ze .addon-body-vue-vue-type-style-index-0-lang-module_title-bar__1AkBG {\n  height: 52px;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0px 10px;\n  gap: 15px;\n  overflow: hidden;\n}\n.addon-body-vue-vue-type-style-index-0-lang-module_container__w15Ze .addon-body-vue-vue-type-style-index-0-lang-module_title-bar__1AkBG .addon-body-vue-vue-type-style-index-0-lang-module_clickable-area__OvKH9 {\n  cursor: pointer;\n  display: flex;\n  align-self: stretch;\n  align-items: center;\n  gap: 10px;\n  user-select: none;\n}\n.addon-body-vue-vue-type-style-index-0-lang-module_container__w15Ze .addon-body-vue-vue-type-style-index-0-lang-module_title-bar__1AkBG .addon-body-vue-vue-type-style-index-0-lang-module_clickable-area__OvKH9 .addon-body-vue-vue-type-style-index-0-lang-module_dropdown__gbF0r {\n  display: flex;\n  align-items: center;\n  padding: 4px;\n  border-radius: 4px;\n  transition: 0.2s ease background-color;\n  cursor: pointer;\n  border: none;\n  background: none;\n  color: inherit;\n}\n.addon-body-vue-vue-type-style-index-0-lang-module_container__w15Ze .addon-body-vue-vue-type-style-index-0-lang-module_title-bar__1AkBG .addon-body-vue-vue-type-style-index-0-lang-module_clickable-area__OvKH9 .addon-body-vue-vue-type-style-index-0-lang-module_dropdown__gbF0r:focus-visible {\n  outline: none;\n  box-shadow: inset 0 0 0 3px var(--content-text);\n}\n.addon-body-vue-vue-type-style-index-0-lang-module_container__w15Ze .addon-body-vue-vue-type-style-index-0-lang-module_title-bar__1AkBG .addon-body-vue-vue-type-style-index-0-lang-module_clickable-area__OvKH9 .addon-body-vue-vue-type-style-index-0-lang-module_dropdown__gbF0r .addon-body-vue-vue-type-style-index-0-lang-module_dropdown-icon__TqU0- {\n  transition: 0.2s ease transform;\n}\n.addon-body-vue-vue-type-style-index-0-lang-module_container__w15Ze .addon-body-vue-vue-type-style-index-0-lang-module_title-bar__1AkBG .addon-body-vue-vue-type-style-index-0-lang-module_clickable-area__OvKH9 .addon-body-vue-vue-type-style-index-0-lang-module_dropdown__gbF0r .addon-body-vue-vue-type-style-index-0-lang-module_dropdown-icon__TqU0-.addon-body-vue-vue-type-style-index-0-lang-module_reverted__33Ame {\n  transform: scaleY(-1);\n}\n.addon-body-vue-vue-type-style-index-0-lang-module_container__w15Ze .addon-body-vue-vue-type-style-index-0-lang-module_title-bar__1AkBG .addon-body-vue-vue-type-style-index-0-lang-module_clickable-area__OvKH9:hover .addon-body-vue-vue-type-style-index-0-lang-module_dropdown__gbF0r {\n  background-color: var(--hover-highlight);\n}\n.addon-body-vue-vue-type-style-index-0-lang-module_container__w15Ze .addon-body-vue-vue-type-style-index-0-lang-module_title-bar__1AkBG .addon-body-vue-vue-type-style-index-0-lang-module_clickable-area__OvKH9 .addon-body-vue-vue-type-style-index-0-lang-module_name__Yi3pD {\n  display: flex;\n  flex-direction: row;\n  gap: 8px;\n}\n.addon-body-vue-vue-type-style-index-0-lang-module_container__w15Ze .addon-body-vue-vue-type-style-index-0-lang-module_title-bar__1AkBG .addon-body-vue-vue-type-style-index-0-lang-module_clickable-area__OvKH9 .addon-body-vue-vue-type-style-index-0-lang-module_name__Yi3pD .addon-body-vue-vue-type-style-index-0-lang-module_icon__-rowR {\n  font-size: 16px;\n}\n.addon-body-vue-vue-type-style-index-0-lang-module_container__w15Ze .addon-body-vue-vue-type-style-index-0-lang-module_title-bar__1AkBG .addon-body-vue-vue-type-style-index-0-lang-module_description__sus1J {\n  flex: 1;\n  color: var(--gray-text);\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.addon-body-vue-vue-type-style-index-0-lang-module_container__w15Ze .addon-body-vue-vue-type-style-index-0-lang-module_title-bar__1AkBG .addon-body-vue-vue-type-style-index-0-lang-module_buttons__GCt7D {\n  justify-self: end;\n  display: flex;\n  justify-content: flex-end;\n}\n.addon-body-vue-vue-type-style-index-0-lang-module_container__w15Ze .addon-body-vue-vue-type-style-index-0-lang-module_title-bar__1AkBG .addon-body-vue-vue-type-style-index-0-lang-module_buttons__GCt7D .addon-body-vue-vue-type-style-index-0-lang-module_switch-background__c9YWk {\n  background-color: var(--switch-background);\n  border-radius: 10px;\n  overflow: hidden;\n  cursor: pointer;\n  border: none;\n  color: inherit;\n  padding: 0px;\n}\n.addon-body-vue-vue-type-style-index-0-lang-module_container__w15Ze .addon-body-vue-vue-type-style-index-0-lang-module_title-bar__1AkBG .addon-body-vue-vue-type-style-index-0-lang-module_buttons__GCt7D .addon-body-vue-vue-type-style-index-0-lang-module_switch-background__c9YWk:focus-visible {\n  outline: none;\n  box-shadow: 0 0 0 3px var(--content-text);\n}\n.addon-body-vue-vue-type-style-index-0-lang-module_container__w15Ze .addon-body-vue-vue-type-style-index-0-lang-module_title-bar__1AkBG .addon-body-vue-vue-type-style-index-0-lang-module_buttons__GCt7D .addon-body-vue-vue-type-style-index-0-lang-module_switch-background__c9YWk[state=on] .addon-body-vue-vue-type-style-index-0-lang-module_switch__OUsQl {\n  background-image: var(--gradient);\n}\n.addon-body-vue-vue-type-style-index-0-lang-module_container__w15Ze .addon-body-vue-vue-type-style-index-0-lang-module_title-bar__1AkBG .addon-body-vue-vue-type-style-index-0-lang-module_buttons__GCt7D .addon-body-vue-vue-type-style-index-0-lang-module_switch-background__c9YWk[state=on] .addon-body-vue-vue-type-style-index-0-lang-module_switch__OUsQl::before {\n  background-color: #fff;\n  left: 25px;\n}\n.addon-body-vue-vue-type-style-index-0-lang-module_container__w15Ze .addon-body-vue-vue-type-style-index-0-lang-module_title-bar__1AkBG .addon-body-vue-vue-type-style-index-0-lang-module_buttons__GCt7D .addon-body-vue-vue-type-style-index-0-lang-module_switch__OUsQl {\n  display: flex;\n  background-color: transparent;\n  width: 40px;\n  height: 20px;\n  position: relative;\n  cursor: pointer;\n  transition: all 0.25s ease;\n}\n.addon-body-vue-vue-type-style-index-0-lang-module_container__w15Ze .addon-body-vue-vue-type-style-index-0-lang-module_title-bar__1AkBG .addon-body-vue-vue-type-style-index-0-lang-module_buttons__GCt7D .addon-body-vue-vue-type-style-index-0-lang-module_switch__OUsQl::before {\n  content: \"\";\n  position: absolute;\n  display: block;\n  width: 10px;\n  height: 10px;\n  background-color: var(--switch-inner-background);\n  border-radius: 5px;\n  top: 5px;\n  left: 5px;\n  transition: left 0.25s ease;\n}";
var style0$1 = {"container":"addon-body-vue-vue-type-style-index-0-lang-module_container__w15Ze","title-bar":"addon-body-vue-vue-type-style-index-0-lang-module_title-bar__1AkBG","clickable-area":"addon-body-vue-vue-type-style-index-0-lang-module_clickable-area__OvKH9","dropdown":"addon-body-vue-vue-type-style-index-0-lang-module_dropdown__gbF0r","dropdown-icon":"addon-body-vue-vue-type-style-index-0-lang-module_dropdown-icon__TqU0-","reverted":"addon-body-vue-vue-type-style-index-0-lang-module_reverted__33Ame","name":"addon-body-vue-vue-type-style-index-0-lang-module_name__Yi3pD","icon":"addon-body-vue-vue-type-style-index-0-lang-module_icon__-rowR","description":"addon-body-vue-vue-type-style-index-0-lang-module_description__sus1J","buttons":"addon-body-vue-vue-type-style-index-0-lang-module_buttons__GCt7D","switch-background":"addon-body-vue-vue-type-style-index-0-lang-module_switch-background__c9YWk","switch":"addon-body-vue-vue-type-style-index-0-lang-module_switch__OUsQl"};
styleInject(css_248z$1);

const cssModules$1 = {
  "$style": style0$1
};
var addonBody = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__cssModules", cssModules$1], ["__file", "/home/runner/work/scratchaddons-rewrite/scratchaddons-rewrite/src/settings/components/addon-body.vue"]]);

var _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "content",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass(_ctx.$style.main)
        },
        [
          createBaseVNode(
            "div",
            {
              class: normalizeClass(_ctx.$style.search)
            },
            [
              createVNode(unref(IconSearch), {
                class: normalizeClass(_ctx.$style.icon)
              }, null, 8, ["class"]),
              createBaseVNode(
                "input",
                {
                  class: normalizeClass(_ctx.$style.input),
                  placeholder: "Search for addons, themes, creators..."
                },
                null,
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          ),
          (openBlock(), createElementBlock(
            Fragment,
            null,
            renderList(addons, (addon, id) => {
              return createVNode(addonBody, {
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

var css_248z = ".content-vue-vue-type-style-index-0-lang-module_main__ALCry {\n  background-color: var(--background-primary);\n  flex: 1;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  color: var(--content-text);\n  padding: 10px;\n}\n.content-vue-vue-type-style-index-0-lang-module_main__ALCry .content-vue-vue-type-style-index-0-lang-module_search__T6ShB {\n  display: flex;\n  align-items: center;\n  background-color: var(--background-secondary);\n  border: 1px solid var(--background-tertiary);\n  border-radius: 4px;\n  box-shadow: var(--content-shadow);\n  width: min-content;\n  padding: 8px;\n  gap: 5px;\n  box-sizing: border-box;\n}\n.content-vue-vue-type-style-index-0-lang-module_main__ALCry .content-vue-vue-type-style-index-0-lang-module_search__T6ShB .content-vue-vue-type-style-index-0-lang-module_icon__ghp26 {\n  padding: 4px;\n}\n.content-vue-vue-type-style-index-0-lang-module_main__ALCry .content-vue-vue-type-style-index-0-lang-module_search__T6ShB .content-vue-vue-type-style-index-0-lang-module_input__Q78LR {\n  background: transparent;\n  border: none;\n  font-size: 14px;\n  color: var(--content-text);\n  padding: 4px;\n  outline: none;\n  width: 50vw;\n  font-family: \"Sora\", sans-serif;\n}\n@media (max-width: 500px) {\n  .content-vue-vue-type-style-index-0-lang-module_main__ALCry .content-vue-vue-type-style-index-0-lang-module_search__T6ShB {\n    width: 100%;\n  }\n  .content-vue-vue-type-style-index-0-lang-module_main__ALCry .content-vue-vue-type-style-index-0-lang-module_search__T6ShB .content-vue-vue-type-style-index-0-lang-module_input__Q78LR {\n    width: 100%;\n  }\n}";
var style0 = {"main":"content-vue-vue-type-style-index-0-lang-module_main__ALCry","search":"content-vue-vue-type-style-index-0-lang-module_search__T6ShB","icon":"content-vue-vue-type-style-index-0-lang-module_icon__ghp26","input":"content-vue-vue-type-style-index-0-lang-module_input__Q78LR"};
styleInject(css_248z);

const cssModules = {
  "$style": style0
};
var settingsComponent = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules], ["__file", "/home/runner/work/scratchaddons-rewrite/scratchaddons-rewrite/src/settings/content.vue"]]);

export { IconTool as I, settingsComponent as s };
