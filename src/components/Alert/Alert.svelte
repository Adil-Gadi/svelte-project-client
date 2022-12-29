<script lang="ts">
	let className = '';

	export { className as class };
</script>

<div class={className}>
	<slot />
</div>

<style>
	div {
		@apply border-[1px] rounded-md border-red-700 p-2 text-red-700 bg-red-100;
	}
</style>
