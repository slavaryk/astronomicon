<template>
	<ul class="ticker-list">
		<li
			v-for="ticker of tickers"
			:key="ticker.title"
			class="ticker-list__item"
		>
			<a href="/ticker">
				<BaseTicker :ticker="ticker"/>
			</a>
		</li>
	</ul>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { subscribeToUpdatesOf } from "../pub-sub";
import BaseTicker from "./BaseTicker.vue";
import type { Ticker } from "../types/Ticker";

const tickers = ref<Ticker[]>([
	{
		title: "Bitcoin",
		symbol: "BTC",
		priceInUSD: 0,
	},
	{
		title: "Ethereum",
		symbol: "ETH",
		priceInUSD: 0,
	},
	{
		title: "Litecoin",
		symbol: "LTC",
		priceInUSD: 0,
	},
]);

onMounted(() => {
	for (const ticker of tickers.value) {
		subscribeToUpdatesOf(ticker, tickerDTO => {
			ticker.priceInUSD = tickerDTO.newPrice!;
		});
	}
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
