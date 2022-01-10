<script lang="ts" setup>import { useInjector, useProvider } from '@/utils/core';
import { useUserData } from '@/utils/store/data';
import { computed } from 'vue';
import CIcon from '@/components/icon/src/CIcon.vue';
import '../style/index.scss'

const user = useInjector(useUserData, 'root')
const theAvatarStyle = computed(() => {
    return {
        backgroundImage: `url(${user?.avatar})`
    }
})
</script>

<template>
    <div class="business-card">
        <div :style="theAvatarStyle" class="business-card__user-avatar"></div>
        <div class="business-card__user-name">{{ user?.name }}</div>
        <div class="business-card__user-contact">
            <CIcon icon-name="wei-xin"></CIcon>
            <CIcon icon-name="you-xiang"></CIcon>
            <CIcon icon-name="github"></CIcon>
        </div>
        <div class="business-card__user-sign">
            {{user?.sign}}
        </div>
    </div>
</template>