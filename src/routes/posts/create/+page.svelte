<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '@components/Button/Button.svelte';
	import TextInput from '@components/TextInput/TextInput.svelte';
	import getCookie from '@lib/getCookie';
	import sendGQL from '@lib/sendGQL';

	let title = '';
	let content = '';

	let loading = false;

	async function handleSubmit() {
		loading = true;

		const mutation = `
            mutation {
                createPost(title: "${title}", content: "${content}") {
                    ok
                    value
                }
            } 
        `;

		const token = getCookie('access_token');
		const data = await sendGQL(mutation, token);

		if (data) {
			console.log(data);
			if (data.data.createPost.ok) {
				goto('/?posted=true');
			}
		}

		loading = false;
	}
</script>

<div>
	<a href="/">&lt; Back to Home</a>
</div>

<h1 class="my-3">Create Post</h1>

<form on:submit|preventDefault={handleSubmit}>
	<TextInput bind:value={title} required placeholder="Title" />

	<div class="mt-3">(Content Rendered as Markdown)</div>

	<textarea bind:value={content} required class="mt-1" placeholder="Content" cols="30" rows="10" />

	<Button disabled={loading} class="mt-3" type="submit">Post</Button>
</form>

<style>
	textarea {
		@apply w-full border-b-2 border-gray-700 p-2;
	}
</style>
