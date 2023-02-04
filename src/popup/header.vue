<template>
  <div :class="$style.header">
    <div :class="$style.title">
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
    </div>
    <button :class="$style.settings" @click="openSettingsPage()">
      <Icon icon="uil:cog" />
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
</style>
