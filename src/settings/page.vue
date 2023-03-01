<template>
  <div :class="[$style.container, { theme: true, darkTheme }]">
    <Onboarding
      v-if="installedDetails && installedDetails.reason === 'install'"
      @exit="removeInstallDetails"
    ></Onboarding>
    <template v-else>
      <Header></Header>
      <Content></Content>
    </template>
  </div>
</template>

<script setup lang="ts">
import Header from "./header.vue";
import Content from "./content.vue";
import storage from "../background/storage";
import Onboarding from "./components/onboarding.vue";
import { ref } from "vue";

const data = await storage.get([
  "darkTheme",
  "addonsEnabled",
  "installedDetails",
]);
const darkTheme = ref(data.darkTheme);

const installedDetails = ref(data.installedDetails);
if (installedDetails.value && installedDetails.value.reason === "install") {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  storage.set({ darkTheme: prefersDark });
  darkTheme.value = prefersDark;
}
storage.valueStream.subscribe((values) => {
  darkTheme.value = values.darkTheme;
});

function removeInstallDetails() {
  storage.set({ installedDetails: null });
  installedDetails.value = null;
}
</script>

<style module>
.container {
  --gradient: linear-gradient(to right, var(--theme), hsl(24deg 100% 67%));
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: "Sora", sans-serif;
}
</style>
