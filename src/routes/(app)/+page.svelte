<script lang="ts">
	import type { PageData } from './$types';

	import type { Exercise, Routines } from '$lib/types';
	import { capitalize } from '$lib/utils';
	import ExcerciseCard from '$lib/components/ExcerciseCard.svelte';
	import { onMount } from 'svelte';
	import AnonUserLandingPage from '$lib/pages/AnonUserLandingPage.svelte';

	export let data: PageData;
	export const excercises = data.exercises;

	let routines: Routines = {
		chest: [
			{
				name: 'Barbell Bench Press',
				sets: 4,
				reps: '8-10',
				video: 'tuwHzzPdaGc'
			},
			{
				name: 'Dumbbell Flys',
				sets: 4,
				reps: '12-15',
				video: '-lcbvOddoi8'
			},
			{
				name: 'Incline Dumbbell Press',
				sets: 4,
				reps: 10,
				video: '8nNi8jbbUPE'
			},
			{
				name: 'Chest Cable Press',
				sets: 4,
				reps: '10-12',
				video: 'n4CEULDvATA'
			},
			{
				name: 'Cable Crossovers',
				sets: 4,
				reps: 10,
				video: 'DumkKcC_nHI'
			}
		]
	};
	
	onMount(() => {
		console.log(excercises);
	});

	let currentRoutine: Exercise[] = routines.chest;
</script>

{#if data.session}
	<div class="container mx-auto flex justify-center items-center">
		<div class="my-5">
			<div class="btn-group variant-filled">
				{#each Object.keys(routines) as routineName}
					<button on:click={() => (currentRoutine = routines[routineName])}>
						{capitalize(routineName)}
					</button>
				{/each}
			</div>
		</div>
		<div>
			<a href="/exercises/create">create ➕</a>
		</div>
	</div>
	<div class="flex items-center justify-center mb-3">
		<ul>
			{#each excercises as exercise}
				<li>
					<ExcerciseCard {exercise} />
				</li>
			{/each}
		</ul>
	</div>
{:else}
	<AnonUserLandingPage />
{/if}
