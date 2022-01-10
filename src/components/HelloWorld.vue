<script setup lang="ts">
import { ref } from 'vue'
import {CCarousel,CCarouselItem} from '.'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
  <p><span class="icon-font">&#xe609;</span></p>
  <button class="button button--rounded button--primary button--border button--glow">hello</button>
    <CCarousel>
    <CCarouselItem style="background-color: cadetblue;">item1</CCarouselItem>
    <CCarouselItem style="background-color: coral;">item2</CCarouselItem>
    <CCarouselItem style="background-color: crimson;">item3</CCarouselItem>
    <CCarouselItem style="background-color: tomato;">item4</CCarouselItem>
    <CCarouselItem style="background-color: green;">item5</CCarouselItem>
  </CCarousel>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
