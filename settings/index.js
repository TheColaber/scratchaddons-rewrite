import { a as styleInject, k as createApp, d as defineComponent, l as withAsyncContext, r as ref, c as createElementBlock, b as createBaseVNode, n as normalizeClass, e as createVNode, u as unref, m as createBlock, i as withCtx, S as Suspense, s as storage$1, o as openBlock, I as Icon } from '../chunk.style-inject.es-d8193a81.js';
import { s as script$2 } from '../chunk.content-ed241dc4.js';

const _hoisted_1 = ["src"];
var script$1 = /* @__PURE__ */ defineComponent({
  __name: "header",
  async setup(__props) {
    let __temp, __restore;
    const data = ([__temp, __restore] = withAsyncContext(() => storage$1.get(["darkTheme"])), __temp = await __temp, __restore(), __temp);
    const darkTheme = ref(data.darkTheme);
    function switchMode() {
      darkTheme.value = !darkTheme.value;
      storage$1.set({ darkTheme: darkTheme.value });
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
              }, null, 10, _hoisted_1),
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
            "button",
            {
              class: normalizeClass(_ctx.$style.themeSwitcher),
              onClick: switchMode
            },
            [
              createVNode(unref(Icon), {
                icon: darkTheme.value ? "uil:moon" : "uil:sun"
              }, null, 8, ["icon"])
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

var css_248z$1 = "._header_5vpal_2 {\n  background-image: var(--gradient);\n  display: flex;\n  height: 60px;\n  width: 100%;\n  color: #fff;\n}\n._header_5vpal_2 ._title_5vpal_8 {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n  padding: 0 20px;\n}\n._header_5vpal_2 ._title_5vpal_8 ._text_5vpal_13 {\n  font-size: 18px;\n  font-weight: 400;\n}\n._header_5vpal_2 ._title_5vpal_8 ._logo_5vpal_17 {\n  height: 30px;\n  margin-inline-end: 20px;\n}\n._header_5vpal_2 ._themeSwitcher_5vpal_22 {\n  padding: 0 20px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  background: none;\n  color: inherit;\n}\n._header_5vpal_2 ._themeSwitcher_5vpal_22:focus-visible {\n  outline: none;\n  box-shadow: inset 0 0 0 3px #fff;\n}\n._header_5vpal_2 ._themeSwitcher_5vpal_22 svg {\n  font-size: 24px;\n}";
styleInject(css_248z$1);

var style0$1 = { "header": "_header_5vpal_2", "title": "_title_5vpal_8", "text": "_text_5vpal_13", "logo": "_logo_5vpal_17", "themeSwitcher": "_themeSwitcher_5vpal_22" };

const cssModules$1 = script$1.__cssModules = {};
cssModules$1["$style"] = style0$1;


script$1.__file = "src/settings/header.vue";

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
          (openBlock(), createBlock(Suspense, null, {
            default: withCtx(() => [
              createVNode(script$1)
            ]),
            _: 1
            /* STABLE */
          })),
          (openBlock(), createBlock(Suspense, null, {
            default: withCtx(() => [
              createVNode(script$2)
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

var css_248z = "\n._container_19wj0_2 {\n  --gradient: linear-gradient(to right, var(--theme), hsl(24deg 100% 67%));\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  font-family: \"Sora\", sans-serif;\n}\n";
styleInject(css_248z);

var style0 = { "container": "_container_19wj0_2" };

const cssModules = script.__cssModules = {};
cssModules["$style"] = style0;


script.__file = "src/settings/index.vue";

createApp(script).mount(document.body);
