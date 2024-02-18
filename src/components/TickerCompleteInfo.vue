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
			<button
				class="ticker-complete-info__button"
				@click="isDescriptionModalOpen = true"
			>
				Show full description
			</button>
		</header>
		<article class="ticker-complete-info__list-box">
			<ul class="ticker-complete-info__list">
				<li
					v-for="tuple of titles"
					:key="tuple[0]"
					class="ticker-complete-info__info"
				>
					<div class="ticker-complete-info__info-title">{{ tuple[0] }}: </div>
					<div>
						<a
							v-if="tuple[2]"
							class="ticker-complete-info__link"
							:href="tuple[1]"
						>
							{{ tuple[1] }}
						</a>
						<template v-else>
							{{ tuple[1] }}
						</template>
					</div>
				</li>
			</ul>
		</article>
		<FullDescriptionModal
			:description="currentTicker.fullDescription"
			:is-open="isDescriptionModalOpen"
			@close="isDescriptionModalOpen = false"
		/>
	</section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "@nanostores/vue";
import { $tickers } from "../stores/tickers";
import { useTickerInfoTitles } from "../composables/useTickerInfoTitles";

import FullDescriptionModal from "./modals/FullDescriptionModal.vue";

type Props = {
	tickerId: string;
}

const props = defineProps<Props>();

const tickersStore = useStore($tickers);

const isDescriptionModalOpen = ref(false);

const currentTicker = computed(() => tickersStore.value.find(_ => _.id === +props.tickerId));

const { titles } = useTickerInfoTitles(currentTicker.value);
console.log(currentTicker.value);
</script>
