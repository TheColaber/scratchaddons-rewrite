<template>
  <div
    :class="[
      $style.container,
      { [colors.darkTheme]: darkTheme, [colors.lightTheme]: !darkTheme },
    ]"
  >
    <div :class="$style.header">
      <div :class="$style.title">
        <img :src="'../../images/icon.svg'" :class="$style.logo" />
        <span :class="$style.text"> Scratch Addons </span>
      </div>
      <button :class="$style.themeSwitcher" @click="switchMode">
        <Icon :icon="darkTheme ? 'uil:moon' : 'uil:sun'" />
      </button>
    </div>
    <div :class="$style.main">hello</div>
  </div>
</template>

<script lang="ts">
import { Icon } from "@iconify/vue";

import colors from "../css/colors.module.scss";
import "../css/sora.scss";

let { darkTheme = false, addonsEnabled = {} } = await chrome.storage.sync.get([
  "darkTheme",
  "addonsEnabled",
]);

export default {
  components: { Icon },
  data() {
    return {
      colors,
      darkTheme: !!darkTheme,
    };
  },
  methods: {
    switchMode() {
      darkTheme = !darkTheme;
      this.darkTheme = darkTheme;
      chrome.storage.sync.set({ darkTheme: this.darkTheme });
    },
  },
};
</script>

<style lang="scss" module>
.container {
  --gradient: linear-gradient(to right, var(--theme), hsl(24deg 100% 67%));
  height: inherit;
  display: flex;
  flex-direction: column;
  font-family: "Sora", sans-serif;
}
.header {
  background-image: var(--gradient);
  display: flex;
  height: 60px;
  width: 100%;
  color: #fff;
  .title {
    flex-grow: 1;
    display: flex;
    align-items: center;
    padding: 0 20px;
    .text {
      font-size: 18px;
      font-weight: 400;
    }
    .logo {
      height: 30px;
      margin-inline-end: 20px;
    }
  }
  .themeSwitcher {
    padding: 0 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    color: inherit;

    &:focus-visible {
      outline: none;
      box-shadow: inset 0 0 0 3px #fff;
    }

    svg {
      font-size: 24px;
    }
  }
}
.main {
  background-color: var(--background-primary);
  flex: 1;
  display: flex;
  flex-direction: column;
  color: var(--content-text);
}
</style>
