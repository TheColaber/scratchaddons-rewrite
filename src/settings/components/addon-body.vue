<template>
  <div :class="$style.container">
    <div :class="$style['title-bar']">
      <div :class="$style['clickable-area']" @click="showing = !showing">
        <div :class="$style.dropdown">
          <Icon
            icon="uil:angle-down"
            :class="[$style['dropdown-icon'], { [$style.reverted]: showing }]"
          ></Icon>
        </div>
        <Icon icon="uil:puzzle-piece" :class="$style.icon"></Icon>
        {{ addon.name }}
      </div>
      <div :class="$style.description">
        Hides the sprite properties panel by default, like in Scratch 2.0. Use
        the info button on the currently selected sprite or double-click a
        sprite to show the properties panel again. To re-hide it, use the
        collapse button in the properties panel or double-click a sprite.
      </div>
      <div :class="$style.buttons">
        <div
          :class="$style['switch-background']"
          :state="enabled ? 'on' : 'off'"
        >
          <div :class="$style.switch" @click="enabled = !enabled"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { AddonManifest } from "../../../types/helpers/addon-manifest";

const { addon, id } = defineProps<{
  addon: AddonManifest;
  id: string | number;
}>();

const showing = ref(true);
const enabled = ref(true);
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
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    padding: 0px 10px;
    .clickable-area {
      cursor: pointer;
      display: flex;
      align-self: stretch;
      align-items: center;
      user-select: none;
      .dropdown {
        .dropdown-icon {
          font-size: 24px;
          transition: 0.2s ease transform;
          &.reverted {
            transform: scaleY(-1);
          }
        }
        display: flex;
        align-items: center;
        padding: 4px;
        border-radius: 4px;
        transition: 0.2s ease background-color;
      }
      &:hover .dropdown {
        background-color: rgba(255, 255, 255, 0.05);
      }
      .icon {
        font-size: 16px;
      }
    }

    .description {
      margin-inline: 15px;
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
