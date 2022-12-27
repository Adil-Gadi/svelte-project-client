<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '@components/Button';
	import TextInput from '@components/TextInput';
	import type { PageData } from './$types';

	export let data: PageData;

	const credentials = {
		email: '',
		password: ''
	};

	function handleSubmit() {
		console.log(credentials);
		document.cookie = 'userId=543';
		goto('/');
	}
</script>

{#if data.logged_out}
	<div>Successfully Logged Out!</div>
{/if}

<h1 class="my-3">Login</h1>

<form on:submit|preventDefault={handleSubmit}>
	<TextInput bind:value={credentials.email} class="mt-2" placeholder="Email" type="email" /><br />
	<TextInput
		bind:value={credentials.password}
		class="mt-2"
		placeholder="Password"
		type="password"
		minlength={8}
	/><br />
	<Button class="mt-2" type="submit">Login</Button>
</form>
