<template>
	<article class="base-ticker">
		<div class="base-ticker__info">
			<p class="base-ticker__title">
				{{ tickerTitle }} - USD
			</p>
			<p class="base-ticker__price">
				{{ price }}
			</p>
		</div>
		<div class="base-ticker__controls">
			<button
				class="base-ticker__delete-button"
				@click.prevent="$emit('delete')"
			>
				<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M15.3941 8.60579L12 11.9999M12 11.9999L8.60588 15.394M12 11.9999L15.3941 15.394M12 11.9999L8.60588 8.60579M21.6 5.9999L21.6 18C21.6 19.9882 19.9882 21.6 18 21.6H5.99999C4.01177 21.6 2.39999 19.9882 2.39999 18V5.9999C2.39999 4.01168 4.01177 2.3999 5.99999 2.3999H18C19.9882 2.3999 21.6 4.01168 21.6 5.9999Z"
						stroke="#ccc"
						stroke-width="1"
						stroke-linecap="round"
						class="base-ticker__delete-icon"
					/>
				</svg>
			</button>
		</div>
	</article>
</template>

<script setup lang="ts">
import { computed } from "vue";

type Props = {
	tickerPrice: number | null;
	tickerTitle: string;
}

const props = defineProps<Props>();

defineEmits<{
	'delete': [];
}>();

const PRECISION = 10;

const price = computed(() => props.tickerPrice?.toPrecision(PRECISION) ?? "---");
</script>
