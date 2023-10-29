<template>
	<ul class="ticker-list">
		<li
			v-for="ticker of tickersStore"
			:key="`${ticker.id}-${ticker.priceInUSD}`"
			class="ticker-list__item"
		>
			<a href="/ticker">
				<BaseTicker :ticker="ticker" />
			</a>
		</li>
	</ul>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useStore } from "@nanostores/vue";
import { $tickers } from "../stores/tickers";
import { $tickersCounter } from "../stores/tickers-counter";
import { TickersDispatcher, TickersActions } from "../stores/tickers/actions";
import { subscribeToUpdatesOf } from "../pub-sub";
import BaseTicker from "./BaseTicker.vue";

const tickersStore = useStore($tickers);
const tickersCounterStore = useStore($tickersCounter);

watch(tickersCounterStore, () => {
	const ticker = tickersStore.value[tickersCounterStore.value];

	subscribeToUpdatesOf(ticker, (newPriceDto) => {
		TickersDispatcher.dispatch(TickersActions.UpdateTickerPrice, tickersCounterStore.value, newPriceDto);
	});
});
</script>

<style>
.ticker-list {
	padding-inline-start: 0;
	display: flex;
	column-gap: 5%;
	list-style-type: none;
}
</style>
