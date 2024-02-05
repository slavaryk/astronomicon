<template>
	<BaseModal :is-open="isOpen">
		<div
			class="full-description-modal"
			v-html="descriptionHtml"
		>
		</div>
	</BaseModal>
</template>

<script setup lang="ts">
import { useMarkdownParser } from "../../composables/useMarkdownParser";

import BaseModal from "./BaseModal.vue";

const props = defineProps<{
	isOpen: boolean;
	description: string;
}>();

const { parse } = useMarkdownParser();

const descriptionHtml = parse(props.description);
</script>
