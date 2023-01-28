<template>
  <div :class="$style.container">test</div>
</template>

<script lang="ts">
export default {
  props: ["manifest"],
  data() {
    return {};
  },
};
</script>

<style lang="scss" module>
.container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--page-background);
}
</style>
