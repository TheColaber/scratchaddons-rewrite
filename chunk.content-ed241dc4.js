import { a as styleInject, d as defineComponent, r as ref, s as storage$1, c as createElementBlock, n as normalizeClass, u as unref, o as openBlock } from './chunk.style-inject.es-d8193a81.js';

var script = /* @__PURE__ */ defineComponent({
  __name: "content",
  setup(__props) {
    let darkTheme = ref(false);
    storage$1.valueStream.subscribe((values) => {
      if ("darkTheme" in values) {
        darkTheme.value = values.darkTheme;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass([_ctx.$style.main, { theme: true, darkTheme: unref(darkTheme) }])
        },
        "hello",
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
