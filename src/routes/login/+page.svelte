<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button, TextInput } from '@components/index';
	import type { PageData } from './$types';
	import sendGQL from '@lib/sendGQL';

	export let data: PageData;

	const credentials = {
		email: '',
		password: ''
	};

	async function handleSubmit() {
		const { data } = await sendGQL(`
		query {
		    login(email: "${credentials.email}", password: "${credentials.password}")
		}	
		`);
		document.cookie = 'access_token=' + data.login;
		goto('/');
	}
</script>

{#if data.logged_out}
	<div>Successfully Logged Out!</div>
{/if}

<h1 class="my-3">Login</h1>

<form on:submit|preventDefault={handleSubmit}>
	<TextInput
		bind:value={credentials.email}
		class="mt-2"
		placeholder="Email"
		type="email"
		required
	/><br />
	<TextInput
		bind:value={credentials.password}
		class="mt-2"
		placeholder="Password"
		type="password"
		minlength={8}
		required
	/><br />
	<Button class="mt-2" type="submit">Login</Button>
</form>
