<template>
	<Teleport v-if="isOpen" to="#modals">
		<div
			class="base-modal"
			@click="emit('close')"
		>
			<div
				class="base-modal__content"
				@click.stop
			>
				<slot />
			</div>
		</div>
	</Teleport>
</template>

<script setup lang="ts">
import { Teleport } from "vue";

defineProps<{
	isOpen: boolean;
}>();

const emit = defineEmits<{
	"close": [];
}>();
</script>
