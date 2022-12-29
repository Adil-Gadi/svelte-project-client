<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button, TextInput, Alert } from '@components/index';
	import sendGQL from '@lib/sendGQL';

	const credentials = {
		email: '',
		username: '',
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
		mutation {
    		signUp(email: "${credentials.email}", password: "${credentials.password}", username: "${credentials.username}") {
				ok
				value
			}
		}	
		`);

		const { signUp } = data;

		if (signUp.ok) {
			document.cookie = 'access_token=' + signUp.value;
			goto('/');
		} else {
			error.message = signUp.value;
			error.isError = true;
		}

		loading = false;
	}
</script>

<h1 class="my-3">Sign Up</h1>

<form on:submit|preventDefault={handleSubmit}>
	<TextInput
		bind:value={credentials.email}
		class="mt-2"
		required
		placeholder="Email"
		type="email"
	/><br />
	<TextInput
		bind:value={credentials.username}
		class="mt-2"
		required
		placeholder="Username"
		type="text"
	/><br />
	<TextInput
		bind:value={credentials.password}
		class="mt-2"
		placeholder="Password"
		type="password"
		required
		minlength={8}
	/><br />

	{#if error.isError}
		<Alert class="mt-3 mb-1">{error.message}</Alert>
	{/if}

	<Button disabled={loading} class="mt-2" type="submit">Sign Up</Button>
</form>
