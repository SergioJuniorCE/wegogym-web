<script lang="ts">
	import type { Exercise, Routines } from '$lib/types';
	import { capitalize } from '$lib/utils';
	import ExcerciseCard from './ExcerciseCard.svelte';

	let routines: Routines = {
		chest: [
			{
				name: 'Barbell Bench Press',
				sets: 4,
				reps: 10,
				help: 'tuwHzzPdaGc'
			},
			{
				name: 'Dumbbell Flys',
				sets: 4,
				reps: 10,
				help: '-lcbvOddoi8'
			},
			{
				name: "Incline Dumbbell Press",
				sets: 4,
				reps: 10,
				help: '8nNi8jbbUPE'
			},
			{
				name: 'Chest Cable Press',
				sets: 4,
				reps: 10,
				help: 'n4CEULDvATA'
			},
			{
				name: 'Cable Crossovers',
				sets: 4,
				reps: 10,
				help: 'DumkKcC_nHI'
			},
		]
	};

	let currentRoutine: Exercise[] = routines.chest;
</script>

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
</div>
<div class="flex items-center justify-center mb-3">
	<ul>
		{#each currentRoutine as exercise}
			<li>
				<ExcerciseCard {exercise} />
			</li>
		{/each}
	</ul>
</div>
