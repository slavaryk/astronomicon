<template>
	<section class="ticker-complete-info">
		<header class="ticker-complete-info__header">
			<img
				alt="Ticker logo"
				class="ticker-complete-info__logo"
				:src="currentTicker.logoUrl"
			/>
			<div class="ticker-complete-info__title">
				{{ currentTicker.title }}
			</div>
			<div class="ticker-complete-info__text">
				{{ currentTicker.description }}
			</div>
		</header>
		<article class="ticker-complete-info__list-box">
			<ul class="ticker-complete-info__list">
				<li
					v-for="tuple of titles"
					:key="tuple[0]"
					class="ticker-complete-info__info"
				>
					<div class="ticker-complete-info__info-title">{{ tuple[1] }}: </div>
					<div>
						<a
							v-if="tuple[2]"
							class="ticker-complete-info__link"
							:href="`${currentTicker[tuple[0]]}`"
						>
							{{ currentTicker[tuple[0]] }}
						</a>
						<template v-else>
							{{ currentTicker[tuple[0]] }}
						</template>
					</div>
				</li>
			</ul>
		</article>
	</section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "@nanostores/vue";
import { $tickers } from "../stores/tickers";
import { useTickerInfoTitles } from "../composables/useTickerInfoTitles";

type Props = {
	tickerId: string;
}

const props = defineProps<Props>();

const tickersStore = useStore($tickers);

const currentTicker = computed(() => tickersStore.value.find(_ => _.id === +props.tickerId));

const { titles } = useTickerInfoTitles(currentTicker.value);
console.log(currentTicker.value);
</script>
