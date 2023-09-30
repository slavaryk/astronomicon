<template>
	<article class="base-ticker">
		<p class="base-ticker__title">
			{{ ticker.title }} - USD
		</p>
		<p class="base-ticker__price">
			{{ ticker.priceInUSD.toPrecision(PRECISION) }}
		</p>
	</article>
</template>

<script setup lang="ts">
import type { Ticker } from "../types/Ticker";

type Props = {
	ticker: Ticker;
}

defineProps<Props>();

const PRECISION = 10;
</script>
