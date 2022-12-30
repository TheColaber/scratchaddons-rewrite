<template>
  <div class="container">
    <div class="header">
      <div class="title">
        <img src="@/images/icon.svg" class="logo" />
        <span class="text">
          Scratch Addons
          <a href="https://scratchaddons.com/changelog" title="View changelog">
            v2.0.0
          </a>
        </span>
      </div>
      <div class="settings">
        <Icon icon="uil:cog" />
      </div>
    </div>
    <div class="popups">
      <div class="tabs">
        <div class="tab sel">
          <Icon icon="uil:envelope" />
          <a>Messaging</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Icon } from "@iconify/vue";

export default {
  components: {
    Icon,
  },
};
</script>

<style lang="scss">
:root {
  --theme: #ff7b26;
  --content-background: #fff;
}

@font-face {
  font-family: "Sora";
  src: url("../Sora.tff") format("truetype");
}

body {
  margin: 0px;
  width: 400px;
  height: 600px;
  background-color: var(--theme);
}

.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  color: #fff;
  font-family: "Sora", sans-serif;
}

.header {
  display: flex;
  height: 60px;

  .title {
    flex-grow: 1;
    display: flex;
    align-items: center;
    padding: 0 20px;

    .text {
      font-size: 18px;
      font-weight: 400;

      a {
        color: #fff;
        margin: 5px;
        text-decoration: none;
        opacity: 0.75;
        font-size: 12px;
      }
    }

    .logo {
      height: 30px;
      margin-inline-end: 20px;
    }
  }

  .settings {
    padding: 0 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      font-size: 24px;
    }
  }
}

.popups {
  background-color: var(--content-background);
  flex: 1;

  .tabs {
    padding: 10px;
    padding-bottom: 0px;
    display: flex;
    border-bottom: 1px solid var(--control-border);
    color: var(--content-text);
    height: 35px;
    overflow: hidden;

    .tab {
      display: flex;
      align-items: center;
      padding: 0px 12px;
      font-size: 12px;
      background-color: var(--button-background);
      border: 1px solid var(--control-border);
      border-bottom: none;
      border-radius: 12px 12px 0 0;
      transition: 0.2s ease;

      &.sel {
        background-color: var(--theme);
        color: #fff;
      }
    }
  }
}
</style>
