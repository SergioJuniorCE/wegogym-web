<script lang="ts">
	import type { PageData } from './$types';

	import type { Exercise, Routines } from '$lib/types';
	import { capitalize } from '$lib/utils';
	import ExcerciseCard from '$lib/components/ExcerciseCard.svelte';
	import { onMount } from 'svelte';
	import AnonUserLandingPage from '$lib/pages/AnonUserLandingPage.svelte';
	import { supabase } from '$lib/supabaseClient';

	export let data: PageData;
	const workouts = data.workouts;

	

	onMount(() => {
		console.log(workouts)
	});
</script>

{#if data.session}
	<!-- <div class="container mx-auto flex justify-center">
		<div class="my-5">
			<div class="btn-group variant-filled">
				{#each categories as category}
					<button
						class={category === currentCategory ? 'variant-filled-secondary text-white' : ''}
						on:click={() => {
							if (category !== currentCategory) {
								handleChangeMuscle(category);
							}
						}}
					>
						{capitalize(category)}
					</button>
				{/each}
				<a href="/exercises/create" data-sveltekit-preload-data="hover"
					><i class="fa-solid fa-plus" /></a
				>
			</div>
		</div>
	</div>
	<div class="flex items-center justify-center mb-3">
		<ul>
			{#each exercises as exercise}
				<li>
					<ExcerciseCard {exercise} />
				</li>
			{/each}
		</ul>
	</div> -->
{:else}
	<AnonUserLandingPage />
{/if}
