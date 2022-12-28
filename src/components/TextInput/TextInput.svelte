<script lang="ts">
	export let placeholder: string = '';
	export let value: string = '';
	export let minlength: number | undefined = undefined;
	export let maxlength: number | undefined = undefined;
	export let min: string | undefined = undefined;
	export let max: string | undefined = undefined;
	export let required = false;
	export let type: 'email' | 'password' | 'text' = 'text';
	let className: string = '';

	export { className as class };
</script>

{#if type === 'email'}
	<input
		{minlength}
		{maxlength}
		{min}
		{max}
		class={className}
		{placeholder}
		bind:value
		type="email"
		{required}
	/>
{:else if type === 'password'}
	<input
		{minlength}
		{maxlength}
		{min}
		{max}
		class={className}
		{placeholder}
		bind:value
		type="password"
		{required}
	/>
{:else}
	<input
		{minlength}
		{maxlength}
		{min}
		{max}
		class={className}
		{placeholder}
		bind:value
		type="text"
		{required}
	/>
{/if}

<style>
	input {
		@apply border-2 border-slate-400 p-2 rounded-md w-full;
	}

	input:focus {
		@apply border-slate-600 outline-none;
	}
</style>
