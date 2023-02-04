<template>
  <div :class="$style.container">
  {{ follows }}
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { sendRequest, dataStream } from "./worker"
const follows = ref([]);
sendRequest("requestData");
dataStream.subscribe(([messages]) => {
  for (const message of messages) {
  if (message.type === "followuser") {
    follows.value.push(message.actor_username);
  }  
}
})
</script>

<style lang="scss" module>
.container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--background-primary);
  color: var(--content-text)
}
</style>