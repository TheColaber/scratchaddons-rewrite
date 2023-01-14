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
          <a
            :class="$style.link"
            href="https://scratchaddons.com/changelog"
            target="_blank"
            title="View changelog"
          >
            v2.0.0
          </a>
        </span>
      </div>
      <button :class="$style.settings" @click="openSettingsPage()">
        <Icon icon="uil:cog" />
      </button>
    </div>
    <div :class="$style.popups">
      <div :class="$style.tabs">
        <button
          :class="[$style.tab, { [$style.sel]: id === selectedTab }]"
          @click="selectedTab = id"
          v-for="id of ORDER"
        >
          <Icon :icon="'uil:' + popups[id].icon" />
          <span :class="$style.name">{{ popups[id].name }}</span>
          <a
            :class="$style.link"
            target="_blank"
            :href="'fullscreen.html?id=' + id"
            v-if="id !== 'settings-page'"
          >
            <Icon icon="uil:external-link-alt" />
          </a>
        </button>
      </div>
      <div :class="$style.component">
        <component :is="selectedTab" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Icon } from "@iconify/vue";
import * as popups from "#popups";
import settingsComponent from "../settings/index.vue";

import colors from "../css/colors.module.scss";
import "../css/sora.scss";

const { darkTheme = false, addonsEnabled = {} } = await chrome.storage.sync.get(
  ["darkTheme", "addonsEnabled"]
);

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

const components = Object.keys(enabledPopups)
  .map((id) => ({ [id]: enabledPopups[id].component }))
  .reduce((prev, curr) => ({ ...prev, ...curr }), {});

export default {
  components: { Icon, ...components },
  data() {
    return {
      ORDER: ["scratch-messaging", "settings-page"],
      popups: enabledPopups,
      darkTheme: !!darkTheme,
      selectedTab: "",
      colors,
    };
  },
  created() {
    this.selectedTab = this.ORDER[0];
    chrome.storage.sync.onChanged.addListener((changes) => {
      console.log(changes);
      if (changes.darkTheme) {
        this.darkTheme = changes.darkTheme.newValue;
        console.log(this.darkTheme);
      }
    });
  },
  methods: {
    openSettingsPage() {
      chrome.runtime.openOptionsPage();
    },
  },
};
</script>

<style lang="scss" module>
.container {
  height: inherit;
  display: flex;
  flex-direction: column;
  font-family: "Sora", sans-serif;
}
.header {
  display: flex;
  height: 60px;
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
  .settings {
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
.popups {
  background-color: var(--content-background);
  flex: 1;
  display: flex;
    flex-direction: column;

  .tabs {
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
      transition: 0.2s ease;
      font-family: inherit;

      &:hover {
        background-color: var(--button-hover-background);
      }

      &:focus-visible {
        outline: none;
        box-shadow: inset 0 0 0 3px var(--content-text);
      }
      &.sel {
        background-color: rgb(var(--theme));
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
      }
      &.sel .link, &:focus-visible .link, &:hover .link {
        display: flex;
        height: 100%;
        align-items: center;

        &:focus-visible {
          outline: none;
          box-shadow: inset 0 0 0 3px var(--content-text);
        }

        svg {
          color: var(--content-text);
          font-size: 10px;
          margin-left: 1px;
          padding: 2px;
          &:hover {
            background: #fff;
            color: rgb(var(--theme));
            border-radius: 2px;
          }
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
