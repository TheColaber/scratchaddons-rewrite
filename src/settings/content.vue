<template>
    <div :class="[$style.main, { theme: true, darkTheme }]">hello</div>

</template>

<script lang="ts" setup>
import storage from "../background/storage";
import { ref } from "vue";

let darkTheme = ref(false);

storage.valueStream.subscribe((values) => {
  if ("darkTheme" in values) {
    darkTheme.value = values.darkTheme;
  }
});
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
