<template>
	<label class="add-ticker">
		<h4 class="add-ticker__label">
			Add new ticker
		</h4>
		<input
			class="add-ticker__input"
			type="text"
			placeholder="BTC for example"
			:class="[{ 'add-ticker__input--loading': isLoading }]"
			:disabled="isLoading"
			v-model="newTickerSym"
			@keyup.enter="handleNewTickerEnter"
		/>
		<div
			v-if="isLoading"
			class="add-ticker__status-bar"
		>
			<div class="add-ticker__status-bar-worm"></div>
		</div>
	</label>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getTickerAssets } from "../api";
import { TickersDispatcher, TickersActions } from "../stores/tickers/actions";
import { TickerAssetDTO } from "../dto";
import type { Ticker, TickerAssetResponse } from "../types/Ticker";

const newTickerSym = ref("");
const isLoading = ref(false);

async function handleNewTickerEnter() {
	try {
		isLoading.value = true;
		const response = await getTickerAssets(newTickerSym.value);
		handleTickerAssetResponse(response);
	} catch (error) {
		console.error(error);
	} finally {
		newTickerSym.value = "";
		isLoading.value = false;
	}
}

function handleTickerAssetResponse(response: TickerAssetResponse) {
	const dto = TickerAssetDTO(response);
	const newTicker: Ticker = {
		id: dto.id,
		symbol: dto.symbol,
		title: dto.title.toUpperCase(),
		logoUrl: dto.logoUrl || "#",
		description: dto.description,
		websiteUrl: dto.websiteUrl,
		priceInUSD: dto.priceInUSD,
		priceInUSDUpdatedOn: dto.priceInUSDUpdatedOn,
		createdOn: dto.createdOn,
		launchDate: dto.launchDate,
		fullDescription: dto.fullDescription,
	};

	TickersDispatcher.dispatch(TickersActions.AddNewTicker, newTicker);
}
</script>

<style>
.add-ticker {
	--worm-width: 30%;
	--worm-height: 3px;

	max-width: 250px;
	padding-bottom: calc(5px + var(--worm-height));
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

.add-ticker__input:disabled {
	background-color: #f0f0f0;
	cursor: not-allowed;
}

.add-ticker__input:disabled.add-ticker__input::placeholder {
	color: #dadada;
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

.add-ticker__status-bar {
	width: 100%;
	position: absolute;
	bottom: 0;
	animation: slide 1s ease-in-out infinite;
}

.add-ticker__status-bar-worm {
	width: var(--worm-width);
	height: var(--worm-height);
	background-color: hsl(224, 100%, 37%);
}

@keyframes slide {
	0% {
		transform: translateX(0)
	}

	50% {
		transform: translateX(calc(100% - var(--worm-width)));
	}
}
</style>
