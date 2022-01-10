<script lang="ts" setup>
import CIcon from '@/components/icon/src/CIcon.vue';
import { computed } from 'vue';
const props = defineProps<{
    title:string,
    icon:string,
    align:'center'|'start'
}>()
const titleStyle = computed(()=>{
    return{
        textAlign:props.align
    }
})
</script>
<template>
<div class="title-card">
    <div :style="titleStyle" class="title-card__title">
        <CIcon :icon-name="icon"></CIcon>
        {{title}}
    </div>
    <div class="title-card__content">
        <slot></slot>
    </div>
</div>

</template>

<style lang="scss">
@import '@style/base';
    .title-card{
        @include card-style;
        padding-left: 1rem;
        padding-right: 1rem;
        padding-bottom: 1rem;
        width: px-to-rem(300px);
        background-color: var(--cont-back);
        display: inline-block;
        &__title{
            padding: 0.5rem;
            font-weight: 600;
            font-size: 1.1rem;
        }
    }
</style>