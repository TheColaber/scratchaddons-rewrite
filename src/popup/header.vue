<template>
  <div :class="$style.header">
    <img :src="'../images/icon.svg'" :class="$style.logo" />
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
    <button :class="$style.settings" @click="openSettingsPage()">
      <Icon :class="$style.icon" icon="uil:cog" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";

function openSettingsPage() {
  chrome.runtime.openOptionsPage();
}
</script>

<style lang="scss" module>
.header {
  background-image: var(--gradient);
  display: flex;
  align-items: center;
  color: #fff;
  .text {
      font-size: 18px;
      font-weight: 400;
      flex: 1;
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
    padding: 15px 20px;
  }
  .settings {
    padding: 15px 20px;
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
    .icon {
      font-size: 24px;
    }
  }
}
</style>
