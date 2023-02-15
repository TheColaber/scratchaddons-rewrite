<template>
  <div :class="$style.container">
    <div :class="$style.loader" v-if="loading !== 100">
      <div v-if="loading === 'notloggedin'">
        Not logged in.
      </div>
      <div v-else>
        Loading...
        <div :class="$style.bar" :style="{ width: loading + '%'}"></div>
      </div>
    </div>
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
          :href="'https://scratch.mit.edu/studios/' + item.gallery_id"
          :class="$style.link"
        >
          {{ item.title }}
        </a>
      </span>
    </Section>
    <Section :length="remixes.length" title="Remixes" icon="arrow-random">
      <span v-for="item of remixes">
        <a
          target="_blank"
          :href="'https://scratch.mit.edu/users/' + item.actor_username"
          :class="$style.link"
        >
          {{ item.actor_username }}
        </a>
        remixed your project "{{ item.parent_title }}" as "<a
          target="_blank"
          :href="'https://scratch.mit.edu/projects/' + item.project_id"
          :class="$style.link"
        >
          {{ item.title }} </a
        >"
      </span>
    </Section>
  </div>
</template>

<script setup lang="ts">
import Section from "./section.vue";
import PopupAddon from "../../src/addon-api/popup";
import { ref } from "vue";

const { addon } = defineProps<{ addon: PopupAddon }>();

let follows = ref<followuser[]>([]);
let studioInvites = ref<curatorinvite[]>([])
let studioPromotions = ref<becomeownerstudio[]>([])
let studioHostTransfers = ref<becomehoststudio[]>([])
let forumActivity = ref<forumpost[]>([])
let studioActivity = ref<studioactivity[]>([])
let remixes = ref<remixproject[]>([])
const profiles = [];
const studios = [];
const projects = ref<{
  id: number;
  title: string;
  unreadComments: number;
  commentChains: string[],
  loveCount: number;
  favoriteCount: number;
  loversAndFavers: { username: string, loved: boolean, faved: boolean }[],
  loadedComments: boolean,
}[]>([]);

let loading = ref<number | string>(0);

async function loadMessages() {
  const session = await addon.auth.getSession();
  if (!session.user) {
    loading.value = "notloggedin"
    return
  };
  const messageCount = await addon.auth.getMessageCount();
  const maxPages = Math.min(Math.ceil(messageCount / 40) + 1, 25);
  for (let i = 0; i < maxPages; i++, loading.value = 100 * i / maxPages) {    
    const page: 
      (
        | followuser
        | curatorinvite
        | becomeownerstudio
        | becomehoststudio
        | forumpost
        | studioactivity
        | remixproject
        | loveproject
        | favoriteproject
      )[]
     = await (
      await fetch(
        `https://api.scratch.mit.edu/users/${
          session.user.username
        }/messages?limit=40&offset=${40 * i}`,
        {
          headers: {
            "x-token": session.user.token,
          },
        }
      )
    ).json();
    for (const message of page) {
      switch (message.type) {
        case "followuser":
          follows.value.push(message);
          break;
        case "curatorinvite":
          studioInvites.value.push(message);
          break;
        case "becomeownerstudio":
          studioPromotions.value.push(message);
          break;
        case "becomehoststudio":
          studioHostTransfers.value.push(message);
          break;
        case "forumpost":
          forumActivity.value.push(message);
          break;
        case "studioactivity":
          studioActivity.value.push(message);
          break;
        case "remixproject":
          remixes.value.push(message);
          break;
        case "loveproject": {     
          const project = getProject(message.project_id, message.title);
          project.loveCount++;
          const findLover = project.loversAndFavers.find((obj) => obj.username === message.actor_username);
          if (findLover) findLover.loved = true;
          else project.loversAndFavers.push({ username: message.actor_username, loved: true, faved: false });
          break;
        }
        case "favoriteproject": {          
          const project = getProject(message.project_id, message.project_title);
          project.favoriteCount++;
          const findFaver = project.loversAndFavers.find((obj) => obj.username === message.actor_username);
          if (findFaver) findFaver.faved = true;
          else project.loversAndFavers.push({ username: message.actor_username, loved: false, faved: true });
          break;
        }
        default:
          // console.error("UNKNOWN MESSAGE! Please send to SA Devs:", message);
          break;
      }
    }        
  }
  console.log(projects.value);
}
loadMessages();


function getProject(projectId: number, title: string) {
  const search = projects.value.find((project) => project.id === projectId);
  if (search) return search;
  const project = {
    id: projectId,
    title,
    unreadComments: 0,
    commentChains: [],
    loveCount: 0,
    favoriteCount: 0,
    loversAndFavers: [],
    loadedComments: false,
  };
  projects.value.push(project);
  return project;
}
//   // //         } else if (message.type === "addcomment") {
//   // //           const resourceId = message.comment_type === 1 ? message.comment_obj_title : message.comment_obj_id;
//   // //           let location = commentLocations[message.comment_type].find((obj) => obj.resourceId === resourceId);
//   // //           if (!location) {
//   // //             location = { resourceId, commentIds: [] };
//   // //             commentLocations[message.comment_type].push(location);
//   // //           }
//   // //           location.commentIds.push(message.comment_id);
//   // //           let resourceObject;
//   // //           if (message.comment_type === 0)
//   // //             resourceObject = this.getProjectObject(resourceId, message.comment_obj_title);
//   // //           else if (message.comment_type === 1) resourceObject = this.getProfileObject(resourceId);
//   // //           else if (message.comment_type === 2)
//   // //             resourceObject = this.getStudioObject(resourceId, message.comment_obj_title);
//   // //           resourceObject.unreadComments++;
//   // //         }

type followuser = {
  type: "followuser";
  actor_username: string;
};
type curatorinvite = {
  type: "curatorinvite";
  actor_username: string;
  gallery_id: string;
  title: string;
};
type becomeownerstudio = {
  type: "becomeownerstudio";
  actor_username: string;
  gallery_id: string;
  gallery_title: string;
};
type becomehoststudio = {
  type: "becomehoststudio";
  admin_actor: boolean;
  actor_username: string;
  gallery_id: string;
  gallery_title: string;
};
type forumpost = {
  type: "forumpost";
  topic_id: string;
  topic_title: string;
};
type studioactivity = {
  type: "studioactivity";
  gallery_id: string;
  title: string;
};
type remixproject = {
  type: "remixproject";
  actor_username: string;
  parent_title: string;
  title: string;
  project_id: string;
};
type loveproject = {
  type: "loveproject";
  project_id: number;
  title: string;
  actor_username: string;
}
type favoriteproject = {
  type: "favoriteproject";
  project_id: number;
  project_title: string;
  actor_username: string;
}
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

.loader {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 10%);
  padding: 15px 20px;
  overflow: hidden;
  background-color: var(--button-hover-background);
  border-radius: 8px;
  box-shadow: var(--large-shadow);
  font-weight: 600;
  .bar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 4px;
    background-image: var(--gradient);
  }
}
</style>
