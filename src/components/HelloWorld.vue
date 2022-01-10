<script setup lang="ts">
import { useProvider } from '@/utils/core';
import { useArrDataStore } from '@/utils/store/data';
import { ref } from 'vue'
import { CCarousel, CCarouselItem } from '.'
import CScrap from './base/CScrap.vue';
import CSwitch from './base/CSwitch.vue';
import CBusinessCard from '@/views/businessCard/src/CBusinessCard.vue';
import CTitleCard from '@/views/titileCard/CTitleCard.vue';

defineProps<{ msg: string }>()
const scrap = useProvider(useArrDataStore)
const switchFlag = ref(true) 
</script>

<template>
  <h1>{{ msg }}</h1>
  <p>
    <span class="icon-font">&#xe609;</span>
  </p>
  <p>
    <button class="button button--rounded button--primary button--border button--glow">hello</button>
  </p>
  <p>
    {{ scrap.store }}
    <CScrap value="java">java</CScrap>
    <CScrap value="python">python</CScrap>
  </p>
  <p>
    {{ switchFlag }}
    <CSwitch @click="switchFlag = !switchFlag" :flag="switchFlag"></CSwitch>
  </p>
  <p>
    <CBusinessCard></CBusinessCard>
    <CTitleCard title="标签" icon="biao-qian" align="center">
      <div class="col-enum">
        <CScrap value="c++">c++</CScrap>
        <CScrap value="qt">qt</CScrap>
        <CScrap value="name">name</CScrap>
        <CScrap value="other">other</CScrap>
      </div>
    </CTitleCard>
  </p>
  <CCarousel>
    <CCarouselItem class="skeleton">item1</CCarouselItem>
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
