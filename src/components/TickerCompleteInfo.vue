<template>
	<section
		v-if="ticker"
		class="ticker-complete-info"
	>
		<header class="ticker-complete-info__header">
			<img
				alt="Ticker logo"
				class="ticker-complete-info__logo"
				:src="ticker.logoUrl"
			/>
			<div class="ticker-complete-info__title">
				{{ ticker.title }}
			</div>
			<div class="ticker-complete-info__text">
				{{ ticker.description }}
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
			:description="ticker.fullDescription"
			:is-open="isDescriptionModalOpen"
			@close="isDescriptionModalOpen = false"
		/>
	</section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTickerInfoTitles } from "../composables/useTickerInfoTitles";

import FullDescriptionModal from "./modals/FullDescriptionModal.vue";

import type { Ticker } from "../types/Ticker";

type Props = {
	ticker: Ticker;
}

const props = defineProps<Props>();

const isDescriptionModalOpen = ref(false);

const { titles } = useTickerInfoTitles(props.ticker);
</script>
