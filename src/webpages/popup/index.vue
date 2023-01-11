<template>
  <div class="container" :class="{ darkTheme: darkTheme }">
    <div class="header">
      <div class="title">
        <img :src="'../../images/icon.svg'" class="logo" />
        <span class="text">
          Scratch Addons
          <a
            href="https://scratchaddons.com/changelog"
            target="_blank"
            title="View changelog"
          >
            v2.0.0
          </a>
        </span>
      </div>
      <button class="settings" @click="openSettingsPage()">
        <Icon icon="uil:cog" />
      </button>
    </div>
    <div class="popups">
      <div class="tabs">
        <button
          class="tab"
          :class="{ sel: id === selectedTab }"
          @click="selectedTab = id"
          v-for="id of ORDER"
        >
          <Icon :icon="'uil:' + popups[id].icon" />
          <span>{{ popups[id].name }}</span>
          <a target="_blank" :href="'fullscreen.html?id=' + id" v-if="id !== 'settings-page'">
            <Icon icon="uil:external-link-alt" />
          </a>
        </button>
      </div>
      <component :is="selectedTab" />
    </div>
  </div>
</template>

<script lang="ts">
import { Icon } from "@iconify/vue";
import * as popups from "#popups";
import * as components from "#popup-components";
import settingsComponent from "../settings/index.vue"

const { darkTheme = false, addonsEnabled = {} } = await chrome.storage.sync.get(
  ["darkTheme", "addonsEnabled"]
);

const enabledPopups = {}
for (const id in popups) {
  if (addonsEnabled[id]) {
  /* @ts-ignore */
  enabledPopups[id] = popups[id].popup
  }
}

/* @ts-ignore */
enabledPopups["settings-page"] = {name: "Addons", icon: "wrench"}

export default {
  components: { Icon, ...components, "settings-page": settingsComponent },
  data() {
    return {
      ORDER: ["scratch-messaging", "settings-page"],
      popups: enabledPopups,
      darkTheme: !!darkTheme,
      selectedTab: "",
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

<style lang="scss">
.container {
  --content-background: #f7f7f7;
  --control-border: #aaa;

  /* Button */
  --button-background: #ecebeb;
  --button-hover-background: #d4d3d3;
  
  --content-text: #000;

  &.darkTheme {
    --content-background: #2a2a2a;
    --control-border: #000;
    /* Button */
    --button-background: #222;
    --button-hover-background: #1a1a1a;

    --content-text: #fff;
  }
}

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

      a {
        color: inherit;
        margin: 5px;
        text-decoration: none;
        opacity: 0.75;
        font-size: 12px;
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

    svg {
      font-size: 24px;
    }
  }

  button:focus-visible,
  a:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px #fff;
  }
}

.popups {
  background-color: var(--content-background);
  flex: 1;

  .tabs {
    padding: 10px;
    padding-bottom: 0px;
    display: flex;
    border-bottom: 1px solid var(--control-border);
    height: 35px;
    overflow: hidden;

    .tab {
      display: flex;
      align-items: center;
      padding: 0px 12px;
      font-size: 12px;
      color: var(--content-text);
      background-color: var(--button-background);
      border: 1px solid var(--control-border);
      border-bottom: none;
      border-radius: 12px 12px 0 0;
      transition: 0.2s ease;

      &:hover {
        background-color: var(--button-hover-background);
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

      span {
        padding: 0px 0px 0px 5px;
      }

      a {
        height: 100%;
        display: flex;
        align-items: center;
        
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

  button {
    font-family: inherit; 
  }

  button:focus-visible,
  a:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--content-text);
  }
}
</style>
