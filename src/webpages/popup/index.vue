<template>
  <div class="container" :darkTheme="false">
    <div class="header">
      <div class="title">
        <img src="@/images/icon.svg" class="logo" />
        <span class="text">
          Scratch Addons
          <a
            href="https://scratchaddons.com/changelog"
            target="_blank"
            title="View changelog"
          >
            v2.0.0
          </a>
        </span>
      </div>
      <button class="settings">
        <Icon icon="uil:cog" />
      </button>
    </div>
    <div class="popups">
      <div class="tabs">
        <button class="tab sel">
          <Icon icon="uil:envelope" />
          <span>Messaging</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Icon } from "@iconify/vue";

const { darkTheme } = await chrome.storage.sync.get("darkTheme");

export default {
  components: { Icon },
  data() {
    return {
      darkTheme: !!darkTheme,
    };
  },
};
</script>

<style lang="scss">
:root {
  --theme: 255, 123, 38;
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
  background-color: rgb(var(--theme));
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
    border: none;
    background: none;
    color: inherit;

    svg {
      font-size: 24px;
    }
  }

  button:focus-visible,
  a:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px #fff;
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
        background-color: rgb(var(--theme));
        color: #fff;
      }

      svg {
        font-size: 18px;
      }

      span {
        padding: 0px 0px 0px 5px;
      }
    }
  }

  button {
    font-family: inherit;
  }

  button:focus-visible,
  a:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(var(--theme), 0.35);
  }
}
</style>
