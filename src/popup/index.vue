<template>
  <div :class="$style.container">
    <Header></Header>
    <Suspense>
      <Popups></Popups>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import Header from "./header.vue";
import Popups from "./popups.vue";
</script>

<style lang="scss" module>
.container {
  height: inherit;
  display: flex;
  flex-direction: column;
  font-family: "Sora", sans-serif;
  width: 400px;
  height: 600px;
}
</style>
