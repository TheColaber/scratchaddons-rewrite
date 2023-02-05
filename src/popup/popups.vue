<template>
  <div :class="[$style.popups, { theme: true, darkTheme }]">
    <div :class="$style.sticky">
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
    </div>
    <component
      v-for="(popup, id) in enabledPopups"
      v-show="id === selectedTab"
      :is="popup.component"
    />
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import storage from "../background/storage";
import { ref } from "vue";
import * as popups from "#popups";
import settingsComponent from "../settings/content.vue";

let darkTheme = ref(false);

storage.valueStream.subscribe((values) => {
  if ("darkTheme" in values) {
    darkTheme.value = values.darkTheme;
  }
});

const ORDER = ["scratch-messaging", "settings-page"];
let selectedTab = ref(ORDER[0]);

const { addonsEnabled = {} } = await storage.get("addonsEnabled");

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
  overflow: auto;
  .sticky {
    background-color: var(--background-primary);
    padding: 10px;
    position: sticky;
    top: 0;
    display: flex;
    flex: 0 0 50px;
    .tabs {
      border-radius: 4px;
      border: 1px solid var(--background-tertiary);
      background: var(--background-secondary);
      box-shadow: var(--content-shadow);
      padding: 8px;
      display: flex;
      gap: 8px;
      width: 100%;
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
        .icon,
        .popout {
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
  }
}

/* width */
::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}

/* hide track */
::-webkit-scrollbar-track,
::-webkit-scrollbar-corner {
  background: none;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: gray;
  border-radius: 4px;
}
</style>
