<template>
  <div :class="[$style.popups, { theme: true, darkTheme }]">
    <div :class="$style.sticky">
      <div :class="$style.tabs">
        <button
          :class="[$style.tab, { [$style.sel]: id === selectedTab }]"
          @click="switchTab(id)"
          v-for="id of ORDER"
        >
        <component
          :class="$style.icon"
          width="18px"
          :is="enabledPopups[id].icon"
        />
          <span :class="$style.name">{{ enabledPopups[id].name }}</span>
          <Suspense>
            <component
              :class="$style.badge"
              v-show="enabledPopups[id].badge"
              :is="enabledPopups[id].badge"
              :addon="instances[id]"
            />
          </Suspense>
          <a
            :class="$style.link"
            target="_blank"
            :href="'fullscreen.html?id=' + id"
            v-if="id !== 'settings-page'"
          >
            <IconExternalLink :class="$style.popout" height="10px" width="10px" />
          </a>
        </button>
      </div>
    </div>
    <component
      v-for="(popup, id) in enabledPopups"
      v-show="id === selectedTab"
      :is="popup.component"
      :addon="instances[id]"
    />
  </div>
</template>

<script setup lang="ts">
import { syncStorage, localStorage } from "../background/storage";
import { ref } from "vue";
import * as popups from "#popups";
import settingsComponent from "../settings/content.vue";
import PopupAddon from "../addon-api/popup";
import { IconTool, IconExternalLink } from "@tabler/icons-vue"

let darkTheme = ref(false);

syncStorage.valueStream.subscribe((values) => {
  if ("darkTheme" in values) {
    darkTheme.value = values.darkTheme;
  }
});

const ORDER = ["scratch-messaging", "settings-page"];
let selectedTab = ref(ORDER[0]);

function switchTab(id) {
  if (id === selectedTab.value) return;
  localStorage.set({ lastSelectedPopup: id });
  console.log(id);

  selectedTab.value = id;
}

const { lastSelectedPopup } = await localStorage.get("lastSelectedPopup");
console.log(lastSelectedPopup);

if (lastSelectedPopup) {
  const selectedId = ORDER.find((id) => id === lastSelectedPopup);
  if (selectedId) {
    selectedTab.value = selectedId;
  }
}

const { addonsEnabled = {} } = await syncStorage.get("addonsEnabled");

const enabledPopups = Object.keys(popups)
  .map((id) => {
    if (!addonsEnabled[id]) return {};
    return { [id]: popups[id].popup };
  })
  .reduce((prev, curr) => ({ ...prev, ...curr }), {});

enabledPopups["settings-page"] = {
  name: "Addons",
  icon: IconTool,
  component: settingsComponent,
};

const instances = {};
Object.keys(enabledPopups).forEach((id) => {
  instances[id] = new PopupAddon(id);
});
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
    padding: 10px 10px 0px 10px;
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
          box-shadow: inset 0 0 0 3px var(--content-text);
        }
        &.sel {
          padding: 0px 8px;
          background-image: var(--gradient);
          color: #fff;
        }
        .name {
          padding: 0px 0px 0px 5px;
        }
        .badge {
          background-color: #00000044;
          padding: 4px;
          border-radius: 4px;
          margin-left: 4px;
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
            margin-left: 1px;
            padding: 2px;
            border-radius: 2px;
          }
          &:hover .popout {
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
