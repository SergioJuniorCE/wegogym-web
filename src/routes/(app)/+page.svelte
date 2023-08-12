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

	let currentWorkout = (workouts && workouts[0]) ?? null;

	onMount(() => {
		console.log(workouts);
	});
</script>

{#if data.session}
	<div class="container mx-auto flex justify-center">
		<div class="my-5">
			<div class="btn-group variant-filled">
				{#if !workouts}
					<p>no workouts</p>
				{:else}
					{#each workouts as workout}
						<!-- <button
							class={workout.name === currentWorkout.name ? 'variant-filled-secondary text-white' : ''}
							on:click={() => {
								if (workout.name !== currentWorkout.name) {
									handleChangeMuscle(category);
								}
							}}
						>
							{capitalize(category)}
						</button> -->
					{/each}
				{/if}
				<a href="/exercises/create" data-sveltekit-preload-data="hover"
					><i class="fa-solid fa-plus" /></a
				>
			</div>
		</div>
	</div>
	<div class="flex items-center justify-center mb-3">
		<!-- <ul>
			{#each exercises as exercise}
				<li>
					<ExcerciseCard {exercise} />
				</li>
			{/each}
		</ul> -->
	</div>
{:else}
	<AnonUserLandingPage />
{/if}
