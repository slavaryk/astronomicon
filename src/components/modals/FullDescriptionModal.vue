<template>
	<BaseModal
		:is-open="true"
	>
		<div
			class="full-description-modal"
			v-html="descriptionHtml"
		>
		</div>
	</BaseModal>
</template>

<script setup lang="ts">
// TODO: Should be incapsulated inside the composable
import markdownit from "markdown-it";

import BaseModal from "./BaseModal.vue";

const props = defineProps<{
	description: string;
}>();

const md = markdownit();
const descriptionHtml = md.render(props.description);
</script>
