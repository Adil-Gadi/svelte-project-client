<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import Button from '@components/Button/Button.svelte';
	import TextInput from '@components/TextInput/TextInput.svelte';
	import getCookie from '@lib/getCookie';
	import sendGQL from '@lib/sendGQL';

	export let data: PageData;

	let loading = false;

	const handleSubmit = async () => {
		loading = true;

		const mutation: string = `
            mutation {
                editPost(title: "${data.title}", content: "${data.content}", postId: "${data.postId}") {
                    ok
                    value
                }
            }
	    `;

		const token = getCookie('access_token');
		const res = await sendGQL(mutation, token);

		if (res) {
			if (res.data.editPost.ok) {
				goto('/?posted=true');
			}
		}

		loading = false;
	};
</script>

<div>
	<a href="/">&lt; Back to Home</a>
</div>

<h1 class="my-3">Edit Post</h1>

<form on:submit|preventDefault={handleSubmit}>
	<TextInput bind:value={data.title} required placeholder="Title" />

	<div class="mt-3">(Content Rendered as Markdown)</div>

	<textarea
		bind:value={data.content}
		required
		class="mt-1"
		placeholder="Content"
		cols="30"
		rows="10"
	/>

	<Button disabled={loading} class="mt-3" type="submit">Update</Button>
</form>

<style>
	textarea {
		@apply w-full border-b-2 border-gray-700 p-2;
	}
</style>
