<script lang="ts">
	type ButtonType = 'button' | 'submit' | 'reset' | null | undefined;

	let className: string = '';
	let btnType: ButtonType;
	export let disabled: boolean = false;

	export { className as class, btnType as type };
</script>

<button {disabled} type={btnType} class={className} on:click><slot /></button>

<style>
	button {
		@apply px-4 py-2 rounded-md border-2 border-slate-400 text-slate-600 text-sm;
	}
</style>
