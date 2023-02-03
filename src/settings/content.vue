<template>
  <div>Hello Settings Reason: {{ openedSettingsReason }}</div>
</template>

<script setup lang="ts">
import storage from "../background/storage";

const {openedSettingsReason} = await storage.get("openedSettingsReason")
</script>
