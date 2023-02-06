<template>
  <div>{{messageCount}}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PopupAddon from '../../src/addon-api/popup';
let messageCount = ref<number>();

const { addon } = defineProps<{ addon: PopupAddon }>();
addon.port.postMessage("sendCount");
console.log("SENT COuNt");

addon.port.onMessage.addListener(({ count }) => { 
  console.log(count);
   
  if (count) {
    messageCount.value = count;
  }
});
</script>