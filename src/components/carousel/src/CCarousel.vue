
<script lang="ts" setup>
import { useProvider } from '../../../utils/core';
import { useRegistry } from './store';

const registry = useProvider(useRegistry)
function leftButtonClick() {
    if (registry)
        registry.unshift(registry.pop())
}
function rightButtonClick() {
    if (registry)
        registry.push(registry.shift())
}
</script>

<template>
    <div class="carousel">
        <span></span>
        <div class="carousel__container">
            <slot></slot>
        </div>
        <div class="carousel__left-button" @click="leftButtonClick">left</div>
        <div class="carousel__right-button" @click="rightButtonClick">right</div>
        <div class="carousel__hover-bar"></div>
    </div>
</template>
<style lang="scss">
.carousel {
    //test
    width: 200px;
    height: 200px;
    overflow: hidden;
    border: 1px solid black;

    position: relative;
    &__container {
        width: 100%;
        height: 100%;
        position: relative;
    }
    &__left-button,
    &__right-button {
        position: absolute;
        width: 3rem;
        height: 3rem;
        background-color: cadetblue;
        top: 0;
    }
    &__left-button{
        left: 0;
    }
    &__right-button{
        right: 0;
    }
}
</style>