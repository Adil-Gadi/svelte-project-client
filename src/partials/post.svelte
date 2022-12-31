<script lang="ts">
	import Button from '@components/Button';
	import getCookie from '@lib/getCookie';
	import sendGQL from '@lib/sendGQL';

	export let data = {
		title: '',
		content: '',
		author: '',
		createdAt: '',
		edited: false,
		isAuthor: false,
		likes: 0,
		hasLiked: false,
		id: ''
	};

	let loading = false;

	async function likePost() {
		loading = true;
		const mutation: string = `
			mutation {
				likePost(postId: "${data.id}")
			}	
		`;
		const token = getCookie('access_token');
		const res = await sendGQL(mutation, token);

		if (res) {
			data.hasLiked = true;
			data.likes = res.data.likePost;
		}
		loading = false;
	}

	async function unlikePost() {
		loading = true;
		const mutation: string = `
			mutation {
				unlikePost(postId: "${data.id}")
			}	
		`;
		const token = getCookie('access_token');
		const res = await sendGQL(mutation, token);

		if (res) {
			data.hasLiked = false;
			data.likes = res.data.unlikePost;
		}
		loading = false;
	}
</script>

<div class="border-[1px] border-gray-300 my-2 p-2">
	<div class="flex justify-between items-center">
		<h2 class="h1">{data.title}</h2>
		{#if data.isAuthor}
			<a class="mr-2" href="/posts/{data.id}/edit">Edit</a>
		{/if}
	</div>
	<div class="mt-3">
		{data.author} | {data.createdAt}
		{@html data.edited ? ' | <i>Edited</i>' : ''}
	</div>

	<div class="my-2">
		{@html data.content}
	</div>

	<hr />

	<div class="mt-2 flex items-center">
		{#if data.hasLiked}
			<Button disabled={loading} on:click={unlikePost}>Unlike</Button>
		{:else}
			<Button disabled={loading} on:click={likePost}>Like</Button>
		{/if}
		<div class="ml-2">
			{data.likes}
			{data.likes === 1 ? 'person has' : 'people have'} liked this post.
		</div>
	</div>
</div>

<style>
</style>
