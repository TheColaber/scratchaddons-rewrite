<template>
  <div :class="$style.header">
    <div :class="$style.title">
      <img :src="'../../images/icon.svg'" :class="$style.logo" />
      <span :class="$style.text"> Scratch Addons </span>
    </div>
    <div :class="[$style.tabs, $style.mainTabs]">
      <button
        :class="[$style.tab, { [$style.sel]: tab.id === selectedTab }]"
        @click="selectedTab = tab.id"
        v-for="tab of tabs"
      >
        <component :is="tab.icon" />
        <span :class="$style.name">{{ tab.id }}</span>
      </button>
    </div>
    <div :class="$style.tabs">
      <button :class="$style.tab" @click="$emit('open-support')">
        <IconMessage />
        <span :class="$style.name">Support</span>
      </button>
      <button :class="$style.tab" @click="$emit('open-settings')">
        <IconTool />
        <span :class="$style.name">More Settings</span>
      </button>
    </div>
    <div :class="$style.menu">
      <IconMenu />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconAppWindow, IconWorld, IconFlag, IconKeyboard, IconMessage, IconTool, IconMenu } from "@tabler/icons-vue";
import { ref } from "vue";

let selectedTab = ref("all");

const tabs = [
  {
    id: "popup",
    icon: IconAppWindow,
  },
  {
    id: "website",
    icon: IconWorld,
  },
  {
    id: "editor",
    icon: IconFlag,
  },
  {
    id: "hotkeys",
    icon: IconKeyboard,
  },
];

defineEmits(["open-settings", "open-support"]);
</script>

<style module lang="scss">
.header {
  background-image: var(--gradient);
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 0px 20px;
  box-sizing: border-box;
  height: 60px;
  width: 100%;
  color: #fff;
  .title {
    display: flex;
    align-items: center;
    gap: 10px;
    .text {
      font-size: 18px;
      font-weight: 400;
      @media (max-width: 890px) {
        display: none;
      }
    }
    .logo {
      height: 30px;
    }
  }
  .menu {
    display: none;
  }
  @media (max-width: 730px) {
    .tabs:not(.mainTabs) {
      display: none;
    }
    .menu {
      display: flex;
      align-items: center;
      font-size: 24px;
    }
  }
  .tabs {
    padding: 12px 0px;
    display: flex;
    justify-content: center;
    gap: 8px;

    &.mainTabs {
      flex: 1;
    }
    .tab {
      display: flex;
      align-items: center;
      padding: 0px 8px;
      font-size: 12px;
      color: #fff;
      background: none;
      border: none;
      border-radius: 8px;
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
        box-shadow: inset 0 0 0 3px #fff;
      }
      &.sel {
        padding: 0px 8px;
        background-image: var(--gradient);
        color: #fff;
      }
      .name {
        padding: 0px 0px 0px 5px;
      }
    }
  }
}
</style>
