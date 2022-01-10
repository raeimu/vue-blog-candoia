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
	padding: 0.4rem 0.4rem;
	padding-right: 2rem;
	cursor: pointer;
	display: inline-flex;
	position: relative;
	align-items: center;
	background: $primary-color;
	border: none;
	border-radius: 5px;
	color: white;
	box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15);
	&:hover {
		background-color: lighten($color: $primary-color, $amount: 5%);
		.scrap__text {
			opacity: 0;
		}
		.scrap__icon {
			right: 50%;
			transform: translateX(50%);
		}
	}
	& * {
		transition: all 0.25s cubic-bezier(0.68, -0.55, 0.27, 1.55);
	}
	&__text {
		// transform: translateX(35px);
		color: white;
		font-weight: bold;
	}
	&__icon {
		// fill: white;
		&__cha {
			font-size: 12px !important;
		}
		position: absolute;
		right: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}

button,
button span {
	transition: 200ms;
}

button .text {
	transform: translateX(35px);
	color: white;
	font-weight: bold;
}

button:hover .icon {
	width: 150px;
	border-left: none;
	transform: translateX(0);
}

button:focus {
	outline: none;
}

button:active .icon svg {
	transform: scale(0.8);
}
</style>