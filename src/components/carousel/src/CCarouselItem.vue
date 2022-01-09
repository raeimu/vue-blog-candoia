<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useInjector } from "../../../utils/core";
import { useRegistry } from "./store";

export default defineComponent({
    setup(){
        const registry = useInjector(useRegistry,'optional')

        const style = reactive({left:'',zIndex:0})

        registry?.register(style)
        return{
            registry,
            style
        }
    },
})

</script>

<template>
<div class="carousel-item" :style="style">
    <slot></slot>
</div>

</template>

<style>
.carousel-item{
    transition: all 0.25s ease;
    width: 100%;
    height: 100%;
    position: absolute;
}
</style>