<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import ProfileForm from './ProfileForm.svelte';

	export let data: PageData;
	export let form: ActionData;

	const user = data.user;
	const profile = data.profile;

	async function handleLogOut() {
		const res = await fetch('/api/auth/logout', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: user.email })
		});

		if (res.ok) {
			window.location.href = '/';
		}
	}
</script>

<section class="mt-3 mx-3">
	<div class="flex justify-between mb-3">
		<h1 class="text-xl">Profile</h1>
		<button class="text-xl" on:click={handleLogOut} on:keypress={handleLogOut}>Logout</button>
	</div>

	{#if profile}
		<p>Welcome, {profile.name}!</p>
	{:else}
		<ProfileForm form={form} />
	{/if}
</section>
