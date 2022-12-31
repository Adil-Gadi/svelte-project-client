<script lang="ts">
	import { goto } from '$app/navigation';
	import '../app.css';
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';

	export let data: LayoutData;

	page.subscribe((value) => {
		if (value.data.userInfo) {
			data = value.data.userInfo;
		}
	});

	function logout() {
		data.loggedIn = false;
		goto('/login?logged_out=true');
	}
</script>

<div
	class="w-full items-center pr-4 justify-end flex top-0 left-0 right-0 fixed h-[4rem] bg-gray-700"
>
	{#if data.loggedIn}
		<div>
			<a href="/posts/create">Create Post</a>
		</div>

		<div class="text-white ml-3">{data.username}</div>

		<div class="ml-3">
			<a href="/login?logged_out=true" on:click|preventDefault={logout}>Logout</a>
		</div>
	{:else}
		<a class="ml-3" href="/signup">Sign Up</a>
		<a class="ml-3" href="/login">Login</a>
	{/if}
</div>

<div class="container px-4 mx-auto mt-[6rem]">
	<slot />
</div>

<style>
	a {
		@apply text-blue-200;
	}
</style>
