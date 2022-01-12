<script lang="ts" setup>
import { randomID } from '@/utils/random';
import { computed, ref } from 'vue';
import CIcon from '../icon/src/CIcon.vue';

const id = 'checkboxTags-' + randomID()
const checked = ref(undefined)
const icon = computed(() => {
    if (checked.value)
        return 'dui-gou'
    return 'jia'
})
</script>

<template>
    <span class="checkbox-tags">
        <input
            v-model="checked"
            class="checkbox-tags__input"
            v-bind="$attrs"
            type="checkbox"
            :id="id"
        />
        <label class="checkbox-tags__label" :for="id">
            <CIcon :icon-name="icon"></CIcon>
            <slot></slot>
        </label>
    </span>
</template>

<style lang="scss">
@import "@style/base";
.checkbox-tags {
    display: inline-block;
    padding: 0.3rem 0.4rem;
    background-color: var(--app-background-color);
    @include mimicry(8px);
    border-radius: 6px;
    &__input {
        position: absolute;
        z-index: -1;
        &:checked + .checkbox-tags__label {
            font-weight: bolder;
            color: var(--primary-color);
            .icon-font {
                color: var(--primary-color);
                transform: rotate(-360deg);
            }
        }
    }
    &__label {
        cursor: pointer;
        display: inline-block;
        color: var(--secondary-text-color);
        vertical-align: middle;
        .icon-font {
            display: inline-block;
            transition: all 0.35s cubic-bezier(0.68, -0.55, 0.27, 1.55);
            font-size: 1rem;
            color: inherit !important;
            text-shadow: none;
        }
    }
}
</style>