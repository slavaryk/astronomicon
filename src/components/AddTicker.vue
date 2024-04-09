<template>
	<div>
		<label class="add-ticker">
			<h4 class="add-ticker__label">
				Add new ticker
			</h4>
			<input
				class="add-ticker__input"
				type="text"
				placeholder="BTC for example"
				v-model="newTickerSym"
				@keyup.enter="handleNewTickerEnter"
			/>
		</label>
		<BaseSelect
			:options="topSymbols"
			v-model="newTickerSym"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { TickersDispatcher, TickersActions } from "../stores/tickers/actions";
import { getTopSymbols } from "../api";
import { CoinListDTO } from "../dto";

import BaseSelect from "./BaseSelect.vue";

import type { TickerSymbol, TickerShort } from "../types/Ticker";

const newTickerSym = ref("");
const topSymbols = ref<TickerSymbol[]>([]);

async function handleNewTickerEnter() {
	const newTicker: TickerShort = {
		symbol: newTickerSym.value.toUpperCase(),
		price: null,
	};

	TickersDispatcher.dispatch(TickersActions.AddNewTicker, newTicker);
	newTickerSym.value = "";
}


onMounted(() => {
	getTopSymbols().then(response => {
		topSymbols.value = CoinListDTO(response);
	});
});
</script>

<style>
.add-ticker {
	max-width: 250px;
	position: relative;
	display: flex;
	flex-direction: column;
	row-gap: 0.5rem;
}

.add-ticker__label {
	margin: 0;
	font-size: 1.1rem;
}

.add-ticker__input {
	min-height: calc(1rem + 3px);
	margin: 0;
	padding: 7px 17px;
	border: 1px solid #999;
	border-radius: 4px;
	font-size: 1rem;
	font-family: monospace;
	letter-spacing: 0.2em;
	transition: border-color 0.15s, box-shadow 0.15s;
}

.add-ticker__input:focus-visible,
.add-ticker__input:focus-within {
	border-color: hsl(224, 100%, 37%);
	box-shadow: 0 0 0 1px hsl(224, 100%, 37%);
	outline: none;
}

.add-ticker__input:placeholder-shown {
	font-size: 0.8rem;
}
</style>
