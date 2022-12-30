<script lang="ts">
	type ButtonType = 'button' | 'submit' | 'reset' | null | undefined;

	let className: string = '';
	let btnType: ButtonType = 'button';
	export let disabled: boolean = false;

	export { className as class, btnType as type };
</script>

<button {disabled} type={btnType} class={className} on:click><slot /></button>

<style>
	button {
		@apply px-4 py-2 rounded-md bg-gray-100 text-gray-700 text-sm;
	}
</style>
