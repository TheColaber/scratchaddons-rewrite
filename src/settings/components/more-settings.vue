<template>
  <div :class="$style.container">
    <button :class="$style.themeSwitcher" @click="switchTheme">
      <component :is="darkTheme ? IconMoon : IconSun" />
    </button>
    <button @click="$emit('close')">
      <IconX />
    </button>
  </div>
</template>

<script setup lang="ts">
import { IconMoon, IconSun, IconX } from "@tabler/icons-vue";
import { ref } from "vue";
import { syncStorage } from "../../background/storage";
const data = await syncStorage.get(["darkTheme"]);
const darkTheme = ref(data.darkTheme);

function switchTheme() {
  darkTheme.value = !darkTheme.value;
  syncStorage.set({ darkTheme: darkTheme.value });
}
</script>

<style module lang="scss">
.container {
  position: fixed;
  background: #ddd;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .themeSwitcher {
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
  }
}
</style>
