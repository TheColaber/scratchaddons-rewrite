<template>
  <div :class="[$style.container, { theme: true, darkTheme }]">
    <Onboarding
      v-if="installedDetails && installedDetails.reason === 'install'"
      @exit="removeInstalledDetails"
    ></Onboarding>
    <template v-else>
      <Header
        @open-settings="showSettings = true"
        @open-support="showSupport = true"
      ></Header>
      <Content></Content>
      <MoreSettings v-if="showSettings"></MoreSettings>
    </template>
  </div>
</template>

<script setup lang="ts">
import Header from "./header.vue";
import Content from "./content.vue";
import { syncStorage, localStorage } from "../background/storage";
import Onboarding from "./components/onboarding.vue";
import { ref } from "vue";
import MoreSettings from "./components/more-settings.vue";

const data = await syncStorage.get(["darkTheme", "addonsEnabled"]);
const localData = await localStorage.get("installedDetails");
const darkTheme = ref(data.darkTheme);

const installedDetails = ref(localData.installedDetails);
if (installedDetails.value && installedDetails.value.reason === "install") {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  syncStorage.set({ darkTheme: prefersDark });
  darkTheme.value = prefersDark;
}
syncStorage.valueStream.subscribe(
  (values) => (darkTheme.value = values.darkTheme)
);

function removeInstalledDetails() {
  localStorage.set({ installedDetails: null });
  installedDetails.value = null;
}

const showSettings = ref(false);
const showSupport = ref(false);
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
