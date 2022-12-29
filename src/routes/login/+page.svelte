<script lang="ts">
	import { goto } from '$app/navigation';
	import { Alert, Button, TextInput } from '@components/index';
	import type { PageData } from './$types';
	import sendGQL from '@lib/sendGQL';

	export let data: PageData;

	const credentials = {
		email: '',
		password: ''
	};

	const error = {
		isError: false,
		message: ''
	};

	let loading = false;

	async function handleSubmit() {
		loading = true;
		const { data } = await sendGQL(`
		query {
		    login(email: "${credentials.email}", password: "${credentials.password}") {
				value
				ok
			}
		}	
		`);

		const { login } = data;

		if (login.ok) {
			document.cookie = 'access_token=' + login.value;
			goto('/');
		} else {
			error.message = login.value;
			error.isError = true;
		}

		loading = false;
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
		required
	/><br />

	{#if error.isError}
		<Alert class="mt-3 mb-1">{error.message}</Alert>
	{/if}

	<Button disabled={loading} class="mt-2" type="submit">Login</Button>
</form>
