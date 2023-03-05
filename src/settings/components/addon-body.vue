<template>
  <div :class="$style.container">
    <div :class="$style['title-bar']">
      <div :class="$style['clickable-area']" @click="showing = !showing">
        <button :class="$style.dropdown">
          <IconChevronDown
            :class="[$style['dropdown-icon'], { [$style.reverted]: showing }]"
          />
        </button>
        <div :class="$style.name">
          <Icon icon="tabler:puzzle" :class="$style.icon"></Icon>
          {{ addon.name }}
        </div>
      </div>
      <div :class="$style.description">
        {{ addon.description }}
      </div>
      <div :class="$style.buttons">
        <button
          :class="$style['switch-background']"
          :state="enabled ? 'on' : 'off'"
          @click="enabled = !enabled"
        >
          <div :class="$style.switch"></div>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { IconChevronDown } from "@tabler/icons-vue";
import { ref } from "vue";
import { AddonManifest } from "../../../types/helpers/addon-manifest";

const { addon, id } = defineProps<{
  addon: AddonManifest;
  id: string | number;
}>();

const showing = ref(true);
const enabled = ref(false);
</script>

<style lang="scss" module>
.container {
  margin: 10px;
  background-color: var(--background-secondary);
  border: 1px solid var(--background-tertiary);
  border-radius: 4px;
  box-shadow: var(--content-shadow);
  .title-bar {
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 10px;
    gap: 15px;
    .clickable-area {
      cursor: pointer;
      display: flex;
      align-self: stretch;
      align-items: center;
      gap: 10px;
      user-select: none;
      .dropdown {
        display: flex;
        align-items: center;
        padding: 4px;
        border-radius: 4px;
        transition: 0.2s ease background-color;
        cursor: pointer;
        border: none;
        background: none;
        color: inherit;
        &:focus-visible {
          outline: none;
          box-shadow: inset 0 0 0 3px var(--content-text);
        }

        .dropdown-icon {
          transition: 0.2s ease transform;
          &.reverted {
            transform: scaleY(-1);
          }
        }
      }
      &:hover .dropdown {
        background-color: var(--hover-highlight);
      }
      .name {
        display: flex;
        flex-direction: row;
        gap: 8px;
        .icon {
          font-size: 16px;
        }
      }
    }

    .description {
      flex: 1;
      color: var(--gray-text);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .buttons {
      justify-self: end;
      display: flex;
      justify-content: flex-end;
      .switch-background {
        background-color: var(--switch-background);
        border-radius: 10px;
        overflow: hidden;
        cursor: pointer;
        border: none;
        color: inherit;
        padding: 0px;

        &:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px var(--content-text);
        }

        &[state="on"] {
          .switch {
            background-image: var(--gradient);
          }
          .switch::before {
            background-color: #fff;
            left: 25px;
          }
        }
      }
      .switch {
        display: flex;
        background-color: transparent;
        width: 40px;
        height: 20px;
        position: relative;
        cursor: pointer;
        transition: all 0.25s ease;
        &::before {
          content: "";
          position: absolute;
          display: block;
          width: 10px;
          height: 10px;
          background-color: var(--switch-inner-background);
          border-radius: 5px;
          top: 5px;
          left: 5px;
          transition: left 0.25s ease;
        }
      }
    }
  }
}
</style>
