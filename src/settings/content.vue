<template>
  <div :class="$style.main">
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
</script>

<style lang="scss" module>
.main {
  background-color: var(--background-primary);
  flex: 1;
  display: flex;
  flex-direction: column;
  color: var(--content-text);
}
</style>
