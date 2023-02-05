<template>
  <div :class="$style.container">
    <Suspense>
    <Header></Header>
  </Suspense>
    <Suspense>
      <Content></Content>
    </Suspense>
  </div>

</template>

<script setup lang="ts">
import Header from './header.vue';
import Content from "./content.vue";
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