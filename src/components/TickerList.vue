<template>
	<ul class="ticker-list">
		<li
			v-for="(ticker, index) of tickersStore"
			:key="ticker.symbol"
			class="ticker-list__item"
		>
			<a :href="`/${ticker.symbol}`">
				<BaseTicker
					:ticker-price="ticker.price"
					:ticker-title="ticker.symbol"
					@delete="handleTickerDelete(index)"
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
import { subscribeToUpdatesOf, unsubscribeFromUpdatesOf } from "../pub-sub";
import { NewTickerPriceDTO } from "../dto";

import BaseTicker from "./BaseTicker.vue";

const tickersStore = useStore($tickers);
const tickersCounterStore = useStore($tickersCounter);

watch(tickersCounterStore, () => {
	const ticker = tickersStore.value[tickersCounterStore.value];

	if (ticker) {
		subscribeToUpdatesOf(ticker, data => {
			const newPriceDto = NewTickerPriceDTO(data);
			TickersDispatcher.dispatch(TickersActions.UpdateTickerPrice, ticker, newPriceDto);
		});
	}
});

function handleTickerDelete(tickerIndex: number) {
	const ticker = tickersStore.value[tickerIndex];

	if (ticker) {
		unsubscribeFromUpdatesOf(ticker);
		TickersDispatcher.dispatch(TickersActions.DeleteTicker, tickerIndex);
	}
}
</script>
