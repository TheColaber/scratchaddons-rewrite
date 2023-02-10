<template>
  <div>{{ messageCount }}</div>
</template>

<script setup lang="ts">
import PopupAddon from "../../src/addon-api/popup";

const { addon } = defineProps<{ addon: PopupAddon }>();
const messageCount = await addon.auth.getMessageCount();
</script>
