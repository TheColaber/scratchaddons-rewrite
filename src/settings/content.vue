<template>
  <div :class="$style.main">
    <div :class="$style.search">
      <IconSearch :class="$style.icon"></IconSearch>
      <input :class="$style.input" placeholder="Search for addons, themes, creators...">
    </div>
    <addon-body
      v-for="(addon, id) of addons"
      :id="id"
      :addon="addon"
    ></addon-body>
  </div>
</template>

<script lang="ts" setup>
import * as addons from "#addons";
import * as popups from "#popups";
import addonBody from "./components/addon-body.vue";
import { IconSearch } from "@tabler/icons-vue";
</script>

<style lang="scss" module>
.main {
  background-color: var(--background-primary);
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: var(--content-text);
  padding: 10px;

  .search {
    display: flex;
    align-items: center;
    background-color: var(--background-secondary);
    border: 1px solid var(--background-tertiary);
    border-radius: 4px;
    box-shadow: var(--content-shadow);
    width: min-content;
    padding: 8px;
    gap: 5px;
    box-sizing: border-box;

    .icon {
      padding: 4px;
    }

    .input {
      background: transparent;
      border: none;
      font-size: 14px;
      color: var(--content-text);
      padding: 4px;
      outline: none;
      width: 50vw;
      font-family: "Sora", sans-serif;
    }

    @media (max-width: 500px) {
      width: 100%;
      .input {
        width: 100%;
      }
    }
  }
}
</style>
