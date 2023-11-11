<template>
	<ul class="ticker-list">
		<li
			v-for="ticker of tickersStore"
			:key="ticker.id"
			class="ticker-list__item"
		>
			<a href="/ticker">
				<BaseTicker
					:ticker-price="ticker.priceInUSD"
					:ticker-title="ticker.title"
				/>
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
		TickersDispatcher.dispatch(TickersActions.UpdateTickerPrice, ticker, newPriceDto);
	});
});
</script>
