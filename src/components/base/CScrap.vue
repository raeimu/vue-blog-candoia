<script lang="ts" setup>
import { useInjector } from '@/utils/core';
import { useArrDataStore } from '@/utils/store/data';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import CIcon from '../icon/src/CIcon.vue';
const props = defineProps({
	value: {
		type: String,
		required: false
	}
})
const live = ref(true)
const store = useInjector(useArrDataStore, 'optional')

onMounted(() => {
	if (store && props.value) {
		store.register(props.value)
	}
})
watch(live, (v) => {
	if (!v) {
		if (store && props.value) {
			store.cancellation(props.value)
		}
	}
})
</script>

<template>
	<Transition name="fade">
		<span @click="live = false" class="scrap" v-if="live">
			<span class="scrap__text">
				<slot></slot>
			</span>
			<span class="scrap__icon">
				<CIcon icon-name="cha" class="scrap__icon__cha"></CIcon>
			</span>
		</span>
	</Transition>
</template>

<style lang="scss">
@import "@style/base";
.scrap {
	padding: 0.2rem 0.2rem;
	padding-right: 2rem;
	cursor: pointer;
	display: inline-flex;
	position: relative;
	align-items: center;
	border: none;
	border-radius: 6px;
	color:  var(--primary-color);

	@include mimicry;
	&:hover {
		background-color: var(--primary-lighten5-color);
		.scrap__text {
			opacity: 0;
		}
		.scrap__icon {
			&__cha{
				color: #fff !important;
			}
			right: 50%;
			transform: translateX(50%);
		}
	}
	& * {
		transition: right 200ms cubic-bezier(0.68, -0.55, 0.27, 1.55);
	}
	&__text {
		transition: opacity 200ms cubic-bezier(0.68, -0.55, 0.27, 1.55);
		color: var(--primary-color);
		font-weight: normal;
	}
	&__icon {
		&__cha {
			font-size: 12px !important;
			transform: scale(0.8);
		}
		position: absolute;
		right: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>