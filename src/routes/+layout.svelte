<script lang="ts">
	import { goto } from '$app/navigation';
	import '../app.css';

	function handleLogout() {
		goto('/login?logged_out=true');
	}
</script>

<div
	class="w-full items-center pr-4 justify-end flex top-0 left-0 right-0 fixed h-[4rem] bg-gray-700"
>
	<a href="/">Home</a>
	<a href="#" on:click={handleLogout}>Logout</a>
	<a class="ml-3" href="/signup">Sign Up</a>
	<a class="ml-3" href="/login">Login</a>
</div>

<div class="container px-4 mx-auto mt-[6rem]">
	<slot />
</div>

<style>
	a {
		@apply text-white;
	}
</style>
