<template>
	<div v-html="html"></div>
</template>

<script setup lang="ts">
import MarkdownIt from "markdown-it"

const props = defineProps<{
	markdownString: string;
}>();

const markdownIt = new MarkdownIt();

const html = markdownIt.render(props.markdownString);
</script>
