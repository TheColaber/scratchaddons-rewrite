<template>
  <div :class="[$style.popups, { theme: true, darkTheme }]">
    <div :class="$style.tabs">
      <button
        :class="[$style.tab, { [$style.sel]: id === selectedTab }]"
        @click="selectedTab = id"
        v-for="id of ORDER"
      >
        <Icon :class="$style.icon" :icon="'uil:' + enabledPopups[id].icon" />
        <span :class="$style.name">{{ enabledPopups[id].name }}</span>
        <a
          :class="$style.link"
          target="_blank"
          :href="'fullscreen.html?id=' + id"
          v-if="id !== 'settings-page'"
        >
          <Icon :class="$style.popout" icon="uil:external-link-alt" />
        </a>
      </button>
    </div>
    <div :class="$style.component">
      <component :is="enabledPopups[selectedTab].component" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import storage from "../background/storage";
import { ref } from "vue";
import * as popups from "#popups";
import settingsComponent from "../settings/index.vue";

let darkTheme = ref(false);

storage.valueStream.subscribe((values) => {
  if ("darkTheme" in values) {
    darkTheme.value = values.darkTheme;
  }
});

const ORDER = ["scratch-messaging", "settings-page"];
let selectedTab = ref(ORDER[0]);

const {addonsEnabled = {}} = await storage.get("addonsEnabled");

const enabledPopups = Object.keys(popups)
  .map((id) => {
    if (!addonsEnabled[id]) return {};
    return { [id]: popups[id].popup };
  })
  .reduce((prev, curr) => ({ ...prev, ...curr }), {});  

enabledPopups["settings-page"] = {
  name: "Addons",
  icon: "wrench",
  component: settingsComponent,
};
</script>

<style lang="scss" module>
.container {
  height: inherit;
  display: flex;
  flex-direction: column;
  font-family: "Sora", sans-serif;
  width: 400px;
  height: 600px;
}

.popups {
  background-color: var(--background-primary);
  flex: 1;
  display: flex;
  flex-direction: column;
  .tabs {
    margin: 10px;
    background-color: var(--background-secondary);
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
      }
      .icon, .popout {
        font-size: 18px;
      }
      .name {
        padding: 0px 0px 0px 5px;
      }
      .link {
        display: none;
        outline: none;
        color: inherit;
      }
      &.sel .link,
      &:focus-visible .link,
      &:hover .link {
        display: flex;
        height: 100%;
        align-items: center;
        .popout {
          font-size: 10px;
          margin-left: 1px;
          padding: 2px;
          border-radius: 2px;
          &:hover {
            background: #fff;
            color: var(--theme);
          }
        }
        &:focus-visible .popout {
          background: #fff;
          color: var(--theme);
        }
      }
    }
  }
  .component {
    flex: 1;
  }
}
</style>
