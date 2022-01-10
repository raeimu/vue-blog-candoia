<script lang="ts" setup>import { computed, ref } from 'vue';

const props = defineProps<{flag:boolean}>()

</script>

<template>
    <div class="switch">
        <input :checked="flag" class="switch__input" type="checkbox" name="gooey-switch" id="gooey-switch" />
        <span class="switch__label" for="gooey-switch">On/Off</span>
    </div>
</template>

<style lang="scss">
@import "@style/base";
$off-color: $primary-color;
$on-color: #48ea8b;
.switch {
    display: inline-block;
    input[type="checkbox"] {
        height: 0;
        width: 0;
        visibility: hidden;
    }
    &__label {
        cursor: pointer;
        text-indent: -9999px;
        width: 50px;
        height: 25px;
        display: block;
        border-radius: 50px;
        position: relative;


        background: $off-color;
        box-shadow: 0 8px 16px -1px rgba($off-color, 0.8);
        transition: 0.3s ease-in-out;
        transition-delay: 0.2s;
        &:after {
            content: "";
            position: absolute;
            top: 2px;
            left: 2px;
            width: 21px;
            height: 21px;
            background: #fff;
            border-radius: 21px;
            animation: expand-left 0.5s linear forwards;
        }
    }
    &__input:checked + &__label {
        background: $on-color;
        box-shadow: 0 8px 16px -1px rgba($on-color, 0.8);
    }

    &__input:checked + &__label:after {
        background: #fff;
        animation: expand-right 0.5s linear forwards;
    }
}


@-webkit-keyframes expand-right {
    0% {
        left: 2px;
    }
    30%,50%   
 {
        left: 2px;
        width: 46px;
    }

    60% {
        left: 34px;
        width: 14px;
    }
    80% {
        left: 24px;
        width: 24px;
    }
    90% {
        left: 29px;
        width: 19px;
    }
    100% {
        left: 27px;
        width: 21px;
    }
}

@keyframes expand-right {
    0% {
        left: 2px;
    }
    30%,50%   
 {
        left: 2px;
        width: 46px;
    }

    60% {
        left: 34px;
        width: 14px;
    }
    80% {
        left: 24px;
        width: 24px;
    }
    90% {
        left: 29px;
        width: 19px;
    }
    100% {
        left: 27px;
        width: 21px;
    }
}

@-webkit-keyframes expand-left {
    0% {
        left: 27px;
    }
    30%,
    50% {
        left: 2px;
        width: 46px;
    }
    60% {
        right: 34px;
        width: 14px;
    }
    80% {
        right: 24px;
        width: 24px;
    }
    90% {
        right: 29px;
        width: 19px;
    }
    100% {
        left: 2px;
        width: 21px;
    }
}

@keyframes expand-left {
    0% {
        left: 27px;
    }
    30%,
    50% {
        left: 2px;
        width: 46px;
    }
    60% {
        right: 34px;
        width: 14px;
    }
    80% {
        right: 24px;
        width: 24px;
    }
    90% {
        right: 29px;
        width: 19px;
    }
    100% {
        left: 2px;
        width: 21px;
    }
}
</style>

