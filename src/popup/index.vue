<template>
  <div :class="$style.container">
    <Header></Header>
    <Suspense>
    <Content></Content>
  </Suspense>
  </div>
</template>

<script setup lang="ts">
import Header from './header.vue';
import Content from "./content.vue";
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