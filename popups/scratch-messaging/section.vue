<template>
  <div :class="$style['message-type']" v-show="section.length">
    <div :class="[$style.title]" @click="extended = !extended">
      <Icon
        :class="$style.dropdown"
        :icon="extended ? 'uil:angle-up' : 'uil:angle-down'"
      ></Icon>
      <span :class="$style.text">{{ title }}</span>
      <span :class="$style.right">
        <Icon :class="$style.icon" icon="uil:user-plus"></Icon>
        {{ section.length }}
      </span>
    </div>
    <div v-show="extended" :class="$style.list">
      <slot
        v-for="item of section"
        :item="item"
        :itemClass="$style.item"
      ></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
// https://icon-sets.iconify.design/uil/
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { messages } from "./worker";

defineProps<{ section: messages; title: string }>();

const extended = ref(true);
</script>

<style module lang="scss">
.message-type {
  border-radius: 4px;
  border: 1px solid var(--background-tertiary);
  background: var(--background-secondary);
  margin: 0px 10px;
  box-shadow: var(--content-shadow);

  .title {
    font-size: 12px;
    color: var(--content-text);
    padding: 6px;
    padding-inline-end: 9px;
    cursor: default;
    display: flex;
    align-items: center;
    user-select: none;

    .text {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      flex: 1;
      margin-left: 6px;
    }

    .right {
      white-space: nowrap;
      font-size: 12px;
      .icon {
        font-size: 14px;
        vertical-align: text-bottom;
      }
    }

    .dropdown {
      transition: background 0.2s;
      padding: 4px;
      border-radius: 4px;
      font-size: 24px;
    }

    &:hover .dropdown {
      background: var(--hover-highlight);
    }
  }

  .list {
    color: var(--description-text);
    font-size: 12px;
    padding-inline: 16px;
    padding-bottom: 16px;
    padding-top: 5px;
    display: flex;
    flex-wrap: wrap;
    gap: 0px 10px;

    .item {
      color: var(--blue-text);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
