<script lang="ts" setup>
import { computed } from 'vue'
import {useIconMap} from './map'

const props = defineProps({iconName:{
    type:String,
    required:true
}})
const map = useIconMap()
const unicode = computed(()=>{
    return map.get(props.iconName)
})
</script>
<template>
    <span v-html="unicode" class="icon-font">
        
    </span>
</template>