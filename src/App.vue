<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import { useDark } from './utils/core';
</script>

<template>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />

</template>

<style>
#app {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  background-color: var(--app-background-color);
  color: var(--primary-text-color);
}
</style>
