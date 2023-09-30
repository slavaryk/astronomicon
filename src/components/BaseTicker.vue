<template>
	<article class="base-ticker">
		<p class="base-ticker__title">
			{{ ticker.title }} - USD
		</p>
		<p class="base-ticker__price">
			{{ ticker.priceInUSD }}
		</p>
	</article>
</template>

<script setup lang="ts">
import type { Ticker } from "../types/Ticker";

type Props = {
	ticker: Ticker;
}

defineProps<Props>();
</script>
