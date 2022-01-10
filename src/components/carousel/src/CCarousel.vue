
<script lang="ts" setup>
import { useProvider } from '../../../utils/core';
import { useRegistry } from './store';
import CIcon from '../../icon/src/CIcon.vue';
import '../style/carousel.scss'
import { onMounted } from 'vue';

const registry = useProvider(useRegistry)

function leftStir() {
    registry.unshift(registry.pop())
    registry.changeActiveTagHelper()
}

function rightStir() {
    registry.push(registry.shift())
    registry.changeActiveTagHelper()
}

function leftButtonClick() {
    clearTimer()
    leftStir()
    autoPlay()
}

function rightButtonClick() {
    clearTimer()
    rightStir()
    autoPlay()
}
function scrollTo(index: number) {
    clearTimer()
    const offset = registry.computedNeedScroll(index)
    if (offset) {
        scroll(offset)
        registry.changeActiveTagHelper()
    }
    autoPlay()
}

function scroll(offset: number) {
    if (offset > 0) {
        while (offset != 0) {
            registry.unshift(registry.pop())
            offset--
        }
    }
    if (offset < 0) {
        while (offset != 0) {
            registry.push(registry.shift())
            offset++
        }
    }
}

let autoPlayTimer: NodeJS.Timer | undefined = undefined

function autoPlay() {
    autoPlayTimer = setInterval(() => {
        rightStir()
    }, 3000)
}

function clearTimer() {
    if (autoPlayTimer) {
        clearInterval(autoPlayTimer)
    }
}
//life
onMounted(() => {
    registry.changeActiveTagHelper()
    autoPlay()
})
</script>

<template>
    <div class="carousel">
        <span></span>
        <div class="carousel__container">
            <slot></slot>
        </div>
        <div class="carousel__left-button" @click="leftButtonClick">
            <CIcon icon-name="jian-tou-zuo"></CIcon>
        </div>
        <div class="carousel__right-button" @click="rightButtonClick">
            <CIcon icon-name="jian-tou-you"></CIcon>
        </div>
        <div class="carousel__hover-bar">
            <span
                v-for="back,index in registry.backups"
                class="carousel__hover-bar__item"
                :class="{ 'carousel__hover-bar__item--active': back.active }"
                @mouseenter="scrollTo(index)"
            ></span>
        </div>
    </div>
</template>
<style lang="scss">
@import "@style/base";

.carousel {
    z-index: 1;
    position: relative;
    width: 400px;
    height: 300px;
    @extend %flex-vertical-center;

    overflow: hidden;

    &__container {
        width: 100%;
        height: 100%;
        position: relative;
    }
    &__left-button,
    &__right-button {
        cursor: pointer;
        position: absolute;
    }
    &__left-button {
        left: 0;
    }
    &__right-button {
        right: 0;
    }
    &__hover-bar {
        width: 100%;
        position: absolute;
        bottom: 5px;
        @include flex-mixin();
        gap: 0.25rem;
        &__item {
            width: 16px;
            height: 5px;
            background-color: rgb(54, 54, 54);

            transition: all 0.5s ease;
        }
        &__item--active {
            width: 10px;
            background-color: white;
        }
    }
}
</style>

