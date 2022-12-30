<script lang="ts">
	import type { PageData } from './$types';
	import Post from '@partials/post.svelte';

	export let data: PageData;
	let { getLatestPosts } = data;
</script>

{#each getLatestPosts as item (item.id)}
	<Post data={item} />
{/each}
