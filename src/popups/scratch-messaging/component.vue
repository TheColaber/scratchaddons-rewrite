<template>
  <div :class="$style.container">
    test

    {{ storage }}
  </div>
</template>

<script lang="ts">
const storagePromise = chrome.storage.sync.get("addonSettings");

export default {
  props: ["manifest"],
  data() {
    return {
      storage: {},
    };
  },
  async created() {
    const { addonSettings = {} } = await storagePromise;
    this.storage = addonSettings;
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
