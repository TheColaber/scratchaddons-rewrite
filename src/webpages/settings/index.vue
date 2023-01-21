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
        <span :class="$style.text">
          Scratch Addons
        </span>
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

const { darkTheme = false, addonsEnabled = {} } = await chrome.storage.sync.get(
  ["darkTheme", "addonsEnabled"]
);

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
      this.darkTheme = !this.darkTheme;
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
      .link {
        color: inherit;
        margin: 5px;
        text-decoration: none;
        opacity: 0.75;
        font-size: 12px;
        border-radius: 4px;

        &:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px #fff;
        }
      }
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
  background-color: var(--page-background);
  flex: 1;
  display: flex;
  flex-direction: column;

  .tabs {
    margin: 10px;
    background-color: var(--content-background);
    border-radius: 12px;

    padding: 10px;
    display: flex;
    gap: 8px;
    height: 35px;
    overflow: hidden;
    .tab {
      display: flex;
      align-items: center;
      padding: 0px 8px;
      font-size: 12px;
      color: var(--content-text);
      background: none;
      border: none;
      border-radius: 12px;
      transition: 0.2s ease background;
      font-family: inherit;

      &:has(.link) {
        padding: 0px 15.5px;
      }

      &:hover {
        background-color: var(--button-hover-background);
        padding: 0px 8px;
      }

      &:focus-visible {
        padding: 0px 8px;
        outline: none;
        box-shadow: inset 0 0 0 3px var(--content-text);
      }
      &.sel {
        padding: 0px 8px;
        background-image: var(--gradient);
        color: #fff;
        a svg {
          color: #fff;
        }
      }
      svg {
        font-size: 18px;
      }
      .name {
        padding: 0px 0px 0px 5px;
      }

      .link {
        display: none;
        outline: none;
      }
      &.sel .link,
      &:focus-visible .link,
      &:hover .link {
        display: flex;
        height: 100%;
        align-items: center;

        svg {
          color: var(--content-text);
          font-size: 10px;
          margin-left: 1px;
          padding: 2px;
          border-radius: 2px;

          &:hover {
            background: #fff;
            color: var(--theme);
          }
        }

        &:focus-visible svg {
          background: #fff;
          color: var(--theme);
        }
      }
    }
  }

  .component {
    display: flex;
    flex: 1;
  }
}
</style>
