<template>
  <div :class="$style.container">
    <div v-if="loading">Loading Messages...</div>
    <Section
      :length="follows.length"
      title="Follows"
      icon="user-plus"
      :no-row-gap="true"
    >
      <a
        target="_blank"
        v-for="item of follows"
        :href="'https://scratch.mit.edu/users/' + item.actor_username"
        :class="$style.link"
      >
        {{ item.actor_username }}
      </a>
    </Section>
    <Section
      :length="studioInvites.length"
      title="Studio Invites"
      icon="envelope-add"
    >
      <span v-for="item of studioInvites">
        <a
          target="_blank"
          :href="'https://scratch.mit.edu/users/' + item.actor_username"
          :class="$style.link"
        >
          {{ item.actor_username }}
        </a>
        invited you to curate
        <a
          target="_blank"
          :href="'https://scratch.mit.edu/studios/' + item.gallery_id"
          :class="$style.link"
        >
          {{ item.title }}
        </a>
      </span>
    </Section>
    <Section
      :length="studioPromotions.length"
      title="Studio promotions"
      icon="shield-plus"
    >
      <span v-for="item of studioPromotions">
        <a
          target="_blank"
          :href="'https://scratch.mit.edu/users/' + item.actor_username"
          :class="$style.link"
        >
          {{ item.actor_username }}
        </a>
        promoted you to manager for the studio
        <a
          target="_blank"
          :href="'https://scratch.mit.edu/studios/' + item.gallery_id"
          :class="$style.link"
        >
          {{ item.gallery_title }}
        </a>
      </span>
    </Section>
    <Section
      :length="studioPromotions.length"
      title="Studio host transfers"
      icon="users-alt"
    >
      <span v-for="item of studioHostTransfers">
        <span v-if="item.admin_actor">A Scratch Team member</span>
        <a
          v-else
          target="_blank"
          :href="'https://scratch.mit.edu/users/' + item.actor_username"
          :class="$style.link"
        >
          {{ item.actor_username }}
        </a>
        made you the host of the studio
        <a
          target="_blank"
          :href="'https://scratch.mit.edu/studios/' + item.gallery_id"
          :class="$style.link"
        >
          {{ item.gallery_title }}
        </a>
      </span>
    </Section>
    <Section
      :length="forumActivity.length"
      title="Forum activity"
      icon="comments-alt"
    >
      <span v-for="item of forumActivity">
        There are new posts in the forum thread
        <a
          target="_blank"
          :href="
            'https://scratch.mit.edu/discuss/topic/' + item.topic_id + '/unread'
          "
          :class="$style.link"
        >
          {{ item.topic_title }}
        </a>
      </span>
    </Section>
    <Section
      :length="studioActivity.length"
      title="Studio activity"
      icon="folder-exclamation"
    >
      <span v-for="item of studioActivity">
        There was new activity in
        <a
          target="_blank"
          :href="
            'https://scratch.mit.edu/studios/' + item.gallery_id
          "
          :class="$style.link"
        >
          {{ item.title }}
        </a>
      </span>
    </Section>
    <Section
      :length="remixes.length"
      title="Remixes"
      icon="arrow-random"
    >
      <span v-for="item of remixes">
        <a
          target="_blank"
          :href="'https://scratch.mit.edu/users/' + item.actor_username"
          :class="$style.link"
        >
          {{ item.actor_username }}
        </a>
        remixed your project "{{ item.parent_title }}" as
        "<a
          target="_blank"
          :href="
            'https://scratch.mit.edu/projects/' + item.project_id
          "
          :class="$style.link"
        >
          {{ item.title }}
        </a>"
      </span>
    </Section>
  </div>
</template>

<script setup lang="ts">
import Section from "./section.vue";
import { ref } from "vue";
import {
  followuser,
  becomeownerstudio,
  curatorinvite,
  becomehoststudio,
  forumpost,
  studioactivity,
  remixproject
} from "./worker";
import PopupAddon from "../../src/addon-api/popup";

const follows = ref<followuser[]>([]);
const studioInvites = ref<curatorinvite[]>([]);
const studioPromotions = ref<becomeownerstudio[]>([]);
const studioHostTransfers = ref<becomehoststudio[]>([]);
const forumActivity = ref<forumpost[]>([]);
const studioActivity = ref<studioactivity[]>([]);
const remixes = ref<remixproject[]>([]);
const profiles = [];
const studios = [];
const projects = [];
let loading = true;

const { addon } = defineProps<{ addon: PopupAddon }>()
addon.port.postMessage("sendMessages")
addon.port.onMessage.addListener(({ messages }) => {  
  if (messages) {
    loading = false;
  for (const message of messages) {
    if (message.type === "followuser") {
      follows.value.push(message);
    } else if (message.type === "curatorinvite") {
      studioInvites.value.push(message);
    } else if (message.type === "becomeownerstudio") {
      studioPromotions.value.push(message);
    } else if (message.type === "becomehoststudio") {
      studioHostTransfers.value.push(message);
    } else if (message.type === "forumpost") {
      forumActivity.value.push(message);
    } else if (message.type === "studioactivity") {
      studioActivity.value.push(message)
    } else if (message.type === "remixproject") {
      remixes.value.push(message)
    }
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

.link {
  color: var(--blue-text);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>
