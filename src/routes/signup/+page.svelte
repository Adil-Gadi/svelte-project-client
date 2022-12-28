<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '@components/Button';
	import TextInput from '@components/TextInput';
	import sendGQL from '@lib/sendGQL';

	const credentials = {
		email: '',
		username: '',
		password: ''
	};

	async function handleSubmit() {
		const { data } = await sendGQL(`
		mutation {
    		signUp(email: "${credentials.email}", password: "${credentials.password}", username: "${credentials.username}")
		}	
		`);
		console.log(data);
		document.cookie = 'access_token=' + data.signUp;
		goto('/');
	}
</script>

<h1 class="my-3">Sign Up</h1>

<form on:submit|preventDefault={handleSubmit}>
	<TextInput bind:value={credentials.email} class="mt-2" placeholder="Email" type="email" /><br />
	<TextInput bind:value={credentials.username} class="mt-2" placeholder="Username" type="text" /><br
	/>
	<TextInput
		bind:value={credentials.password}
		class="mt-2"
		placeholder="Password"
		type="password"
	/><br />
	<Button class="mt-2" type="submit">Sign Up</Button>
</form>
