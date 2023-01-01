<script lang="ts">
	import type { PageData } from './$types';
	import Post from '@partials/post.svelte';
	import Button from '@components/Button/Button.svelte';
	import loadLatestsPosts from '@lib/loadLatestPosts';
	import getCookie from '@lib/getCookie';
	import renderLatestPosts from '@lib/renderLatestPosts';

	let since = Date.now();

	export let data: PageData;
	$: getLatestPosts = data.getLatestPosts;
	$: secondToLast = getLatestPosts[getLatestPosts.length - 2];

	async function handleIntersecting(event: { detail: string }) {
		if (data.next) {
			if (event.detail === secondToLast.id) {
				console.log('load more');
				const { next, getLatestPosts: newPosts } = await loadLatestsPosts(
					data.step,
					since,
					getCookie('access_token')
				);
				data.step += 1;
				data.next = next;
				data.getLatestPosts.push(...renderLatestPosts(newPosts));
				data = data;
				console.log(data);
			}
		}
	}
</script>

<Button on:click={() => location.reload()}>Refresh</Button>

{#each getLatestPosts as item (item.id)}
	<Post on:intersecting={handleIntersecting} data={item} />
{/each}
