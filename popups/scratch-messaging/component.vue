<template>
  <div :class="$style.container">
    <Section :section="follows" title="Follows" v-slot="{ item, itemClass }">
      <a :href="'https://scratch.mit.edu/users/' + item" :class="itemClass">
        {{ item }}
      </a>
    </Section>
    <Section
      :section="studioInvites"
      title="Studio Invites"
      v-slot="{ item, itemClass }"
    >
      <a
        :href="'https://scratch.mit.edu/users/' + item.actor"
        :class="itemClass"
      >
        {{ item.actor }}
      </a>
      invited you to curate
      <a
        :href="'https://scratch.mit.edu/studios/' + item.studioId"
        :class="itemClass"
      >
        {{ item.studioTitle }}
      </a>
    </Section>
  </div>
</template>

<script setup lang="ts">
import Section from "./section.vue";
import { ref } from "vue";
import { sendRequest, dataStream } from "./worker";
const follows = ref([]);
const studioInvites = ref([]);
const studioPromotions = ref([]);
sendRequest("requestData");
console.log("hi", Date.now());

dataStream.subscribe(([messages]) => {
  console.log(messages, Date.now());

  for (const message of messages) {
    if (message.type === "followuser") {
      follows.value.push(message.actor_username);
    } else if (message.type === "curatorinvite") {
      studioInvites.value.push({
        actor: message.actor_username,
        studioId: message.gallery_id,
        studioTitle: message.title,
      });
    } else if (message.type === "becomeownerstudio") {
      studioPromotions.value.push({
        actor: message.actor_username,
        studioId: message.gallery_id,
        studioTitle: message.gallery_title,
      });
    }
  }
});
</script>

<style lang="scss" module>
.container {
  flex: 1;
  display: flex;
  gap: 10px;
  flex-direction: column;
  background: var(--background-primary);
  color: var(--content-text);
  padding-bottom: 10px;
}
</style>
