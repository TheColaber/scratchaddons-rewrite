<template>
  <div
    :class="[
      $style.container,
      { theme: true, darkTheme },
    ]"
  >
    <div :class="$style.header">
      <div :class="$style.title">
        <img :src="'../../images/icon.svg'" :class="$style.logo" />
        <span :class="$style.text"> Scratch Addons </span>
      </div>
      <button :class="$style.themeSwitcher" @click="switchMode">
        <Icon :icon="darkTheme ? 'uil:moon' : 'uil:sun'" />
      </button>
    </div>
    <div :class="$style.main">hello</div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import storage from "../background/storage";

const data = await storage.get(["darkTheme", "installedDetails", "addonsEnabled"]);
const darkTheme = ref(data.darkTheme);
console.log(data.installedDetails);

function switchMode() {
  darkTheme.value = !darkTheme.value;
  storage.set({ darkTheme: darkTheme.value });
}
</script>

<style lang="scss" module>
.container {
  --gradient: linear-gradient(to right, var(--theme), hsl(24deg 100% 67%));
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: "Sora", sans-serif;
}
.header {
  background-image: var(--gradient);
  display: flex;
  height: 60px;
  width: 100%;
  color: #fff;
  .title {
    flex-grow: 1;
    display: flex;
    align-items: center;
    padding: 0 20px;
    .text {
      font-size: 18px;
      font-weight: 400;
    }
    .logo {
      height: 30px;
      margin-inline-end: 20px;
    }
  }
  .themeSwitcher {
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
.main {
  background-color: var(--background-primary);
  flex: 1;
  display: flex;
  flex-direction: column;
  color: var(--content-text);
}
</style>
