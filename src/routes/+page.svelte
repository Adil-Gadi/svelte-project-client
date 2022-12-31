<script lang="ts">
	import type { PageData } from './$types';
	import Post from '@partials/post.svelte';
	import Button from '@components/Button/Button.svelte';

	export let data: PageData;
	let { getLatestPosts } = data;
</script>

<Button on:click={() => location.reload()}>Refresh</Button>

{#each getLatestPosts as item (item.id)}
	<Post data={item} />
{/each}
