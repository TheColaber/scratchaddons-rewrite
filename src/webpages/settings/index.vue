<template>
  <div class="container">
    <div class="navbar">
      <img :src="'../../images/icon.svg'" class="logo" />
      <div class="title">Settings</div>
      <button class="themeSwitcher" @click="switchMode">
        <Icon :icon="darkTheme ? 'uil:moon' : 'uil:sun'" />
      </button>
    </div>
    <div class="main"></div>
  </div>
</template>

<script lang="ts">
import { Icon } from "@iconify/vue";

const { darkTheme = false, addonsEnabled = {} } = await chrome.storage.sync.get(
  ["darkTheme", "addonsEnabled"]
);

export default {
  components: { Icon },
  data() {
    return {
      darkTheme: !!darkTheme,
    };
  },
  methods: {
    async switchMode() {
      this.darkTheme = !this.darkTheme;
      await chrome.storage.sync.set({ darkTheme: this.darkTheme });
    },
  },
};
</script>

<style lang="scss">
.logo {
  height: 30px;
  margin-inline-end: 20px;
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
}
</style>
