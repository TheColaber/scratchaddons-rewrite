<template>
  <div class="container">
    <div class="navbar">
      <img :src="'../../images/icon.svg'" class="logo" />
      <div class="title">Settings</div>
      <Icon icon="uil:moon" />
      <Icon icon="uil:sun" />
    </div>
    <div class="main"></div>
  </div>
</template>

<script lang="ts">
import { Icon } from "@iconify/vue";
export default {
  components: { Icon },
};
</script>

<style lang="scss">
.logo {
  height: 30px;
  margin-inline-end: 20px;
}
</style>
