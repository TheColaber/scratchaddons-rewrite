import { a as styleInject, m as createApp, d as defineComponent, k as withAsyncContext, r as ref, c as createElementBlock, b as createBaseVNode, n as normalizeClass, e as createVNode, u as unref, s as storage$1, p as createBlock, F as Fragment, j as withCtx, S as Suspense, o as openBlock, I as Icon, f as createTextVNode } from '../chunk.style-inject.es-35aae750.js';
import { s as script$4 } from '../chunk.content-2ea5b3c2.js';
import '../chunk._virtual__addons-19cb23e2.js';

const _hoisted_1$1 = ["src"];
var script$3 = /* @__PURE__ */ defineComponent({
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

var css_248z$2 = "._header_5vpal_2 {\n  background-image: var(--gradient);\n  display: flex;\n  height: 60px;\n  width: 100%;\n  color: #fff;\n}\n._header_5vpal_2 ._title_5vpal_8 {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n  padding: 0 20px;\n}\n._header_5vpal_2 ._title_5vpal_8 ._text_5vpal_13 {\n  font-size: 18px;\n  font-weight: 400;\n}\n._header_5vpal_2 ._title_5vpal_8 ._logo_5vpal_17 {\n  height: 30px;\n  margin-inline-end: 20px;\n}\n._header_5vpal_2 ._themeSwitcher_5vpal_22 {\n  padding: 0 20px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  background: none;\n  color: inherit;\n}\n._header_5vpal_2 ._themeSwitcher_5vpal_22:focus-visible {\n  outline: none;\n  box-shadow: inset 0 0 0 3px #fff;\n}\n._header_5vpal_2 ._themeSwitcher_5vpal_22 svg {\n  font-size: 24px;\n}";
styleInject(css_248z$2);

var style0$2 = { "header": "_header_5vpal_2", "title": "_title_5vpal_8", "text": "_text_5vpal_13", "logo": "_logo_5vpal_17", "themeSwitcher": "_themeSwitcher_5vpal_22" };

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

var css_248z$1 = "._overlay_16lz1_2 {\n  display: flex;\n  flex: 1;\n  background-image: var(--gradient);\n}\n._overlay_16lz1_2 ._container_16lz1_7 {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  color: #fff;\n  background-color: var(--background-secondary);\n  border: 1px solid var(--background-tertiary);\n  padding: 20px;\n  border-radius: 10px;\n  width: -webkit-fill-available;\n  box-sizing: border-box;\n  flex: 1;\n  margin: 40px;\n}\n._overlay_16lz1_2 ._container_16lz1_7 ._logo_16lz1_21 {\n  height: 192px;\n}\n._overlay_16lz1_2 ._container_16lz1_7 ._title_16lz1_24 {\n  font-size: 32px;\n}\n._overlay_16lz1_2 ._container_16lz1_7 ._description_16lz1_27 {\n  font-size: 12px;\n}\n._overlay_16lz1_2 ._container_16lz1_7 ._options_16lz1_30 {\n  margin-top: 10px;\n  display: flex;\n  gap: 5px;\n  flex-direction: row;\n}\n._overlay_16lz1_2 ._container_16lz1_7 ._options_16lz1_30 ._other-option_16lz1_35 {\n  display: flex;\n  flex-wrap: wrap;\n  align-content: center;\n}\n._overlay_16lz1_2 ._container_16lz1_7 ._options_16lz1_30 ._other-option_16lz1_35 ._exit_16lz1_39 {\n  text-decoration: underline;\n  cursor: pointer;\n}\n._overlay_16lz1_2 ._container_16lz1_7 button {\n  color: var(--content-text);\n  background: var(--background-primary);\n  border: 1px solid var(--button-border);\n  padding: 0 12px;\n  border-radius: 4px;\n  transition: 0.2s ease;\n  height: 32px;\n  box-sizing: border-box;\n  font-family: inherit;\n  font-size: 12px;\n}";
styleInject(css_248z$1);

var style0$1 = { "overlay": "_overlay_16lz1_2", "container": "_container_16lz1_7", "logo": "_logo_16lz1_21", "title": "_title_16lz1_24", "description": "_description_16lz1_27", "options": "_options_16lz1_30", "other-option": "_other-option_16lz1_35", "exit": "_exit_16lz1_39" };

const script$2 = {};

const cssModules$1 = script$2.__cssModules = {};
cssModules$1["$style"] = style0$1;

script$2.render = render;
script$2.__file = "src/settings/components/onboarding.vue";

var script$1 = /* @__PURE__ */ defineComponent({
  __name: "page",
  async setup(__props) {
    let __temp, __restore;
    const data = ([__temp, __restore] = withAsyncContext(() => storage$1.get(["darkTheme", "addonsEnabled", "installedDetails"])), __temp = await __temp, __restore(), __temp);
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
