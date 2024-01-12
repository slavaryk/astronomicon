<template>
	<Teleport to="#modals">
		<div class="base-modal">
			<div class="base-modal__content">
				<slot/>
			</div>
		</div>
	</Teleport>
</template>

<script setup lang="ts">
defineProps<{
	isOpen: boolean;
}>();
</script>
