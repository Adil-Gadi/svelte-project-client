<script lang="ts">
	import Button from '@components/Button';
	import TextInput from '@components/TextInput';
</script>

<h1 class="my-3">Sign Up</h1>

<form>
	<TextInput class="mt-2" placeholder="Email" type="email" /><br />
	<TextInput class="mt-2" placeholder="Username" type="text" /><br />
	<TextInput class="mt-2" placeholder="Password" type="password" /><br />
	<Button class="mt-2" type="submit">Sign Up</Button>
</form>
