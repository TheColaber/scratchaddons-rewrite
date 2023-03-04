<template>
  <div :class="$style.overlay">
    <div :class="$style.container">
      <img :src="'../../images/icon.svg'" :class="$style.logo" />

      <span :class="$style.title">Welcome to Scratch Addons</span>
      <span :class="$style.description"
        >It's time to completely change Scratch with your full
        configuration.</span
      >
      <div :class="$style.options">
        <button>Get Started</button>
        <span :class="$style['other-option']">
          or&nbsp;
          <span :class="$style.exit" @click="$emit('exit')"
            >view the settings page</span
          >
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(["exit"]);
</script>

<style module lang="scss">
.overlay {
  display: flex;
  flex: 1;
  background-image: var(--gradient);

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: var(--background-secondary);
    border: 1px solid var(--background-tertiary);
    padding: 20px;
    border-radius: 10px;
    width: -webkit-fill-available;
    box-sizing: border-box;
    flex: 1;
    margin: 40px;
    .logo {
      height: 192px;
    }
    .title {
      font-size: 32px;
    }
    .description {
      font-size: 12px;
    }
    .options {
      margin-top: 10px;
      display: flex;
      gap: 5px;
      flex-direction: row;
      .other-option {
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        .exit {
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
    button {
      color: var(--content-text);
      background: var(--background-primary);
      border: 1px solid var(--button-border);
      padding: 0 12px;
      border-radius: 4px;
      transition: 0.2s ease;
      height: 32px;
      box-sizing: border-box;
      font-family: inherit;
      font-size: 12px;
    }
  }
}
</style>
