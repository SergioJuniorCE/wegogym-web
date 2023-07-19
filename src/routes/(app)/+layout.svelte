<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '/src/app.postcss';

	import { AppShell } from '@skeletonlabs/skeleton';
	import Navbar from '$lib/components/ui/Navbar.svelte';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	import { storePopup } from '@skeletonlabs/skeleton';
	import { invalidate } from '$app/navigation';

	import type { LayoutData } from '../$types';
	import { onMount } from 'svelte';
	import AnonNavbar from '$lib/components/ui/AnonNavbar.svelte';
	import BottomNavigation from '$lib/components/ui/BottomNavigation.svelte';

	export let data: LayoutData;

	$: ({ supabase, session } = data);

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	let isMobile = false;

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		isMobile = window.innerWidth < 768; // Adjust the threshold according to your needs

		return () => subscription.unsubscribe();
	});
</script>

<AppShell>
	<svelte:fragment slot="header">
		{#if isMobile}
			<BottomNavigation />
		{:else if session}
			<Navbar />
		{:else}
			<AnonNavbar />
		{/if}
	</svelte:fragment>
	<!-- (sidebarLeft) -->
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<!-- (footer) -->
</AppShell>
