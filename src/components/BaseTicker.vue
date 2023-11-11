<template>
	<article class="base-ticker">
		<p class="base-ticker__title">
			{{ tickerTitle }} - USD
		</p>
		<p class="base-ticker__price">
			{{ price }}
		</p>
	</article>
</template>

<script setup lang="ts">
import { computed } from "vue";

type Props = {
	tickerPrice: number;
	tickerTitle: string;
}

const props = defineProps<Props>();

const PRECISION = 10;

const price = computed(() => props.tickerPrice.toPrecision(PRECISION));
</script>
