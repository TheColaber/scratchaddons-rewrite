<template>
  <div>test</div>
</template>

<script lang="ts">
const { addonSettings = {} } = await chrome.storage.sync.get("addonSettings");

export default {
  props: ["manifest"],
};
</script>
