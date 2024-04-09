<template>
	<div>
		<button
			v-for="option of normalizedOptions"
			:key="option.key"
		>
			{{ option.label }}
		</button>
	</div>
</template>

<script setup lang="ts" generic="Option extends string | number | object">
import { computed } from "vue";
import { uniqueId } from "lodash";

type NormalizedOption = {
	value: Option;
	key: string;
	label: string;
}

const props = defineProps<{
	options: Option[];
	modelValue: Option;
	optionKey?: string;
}>();

const normalizedOptions = computed<NormalizedOption[]>(() => {
	return props.options.map(opt => ({
		value: opt,
		key: uniqueId("_"),
		label: getOptionLabel(opt),
	}));
});

function getOptionLabel(opt: Option) {
	if (typeof opt === "object") return opt[props.optionKey];
	return opt;
}
</script>
