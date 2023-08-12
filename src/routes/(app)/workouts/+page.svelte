<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { workouts } = data;
</script>

<section>
	<div class="flex justify-center mt-3">
		<a href="/workouts/create" class="btn btn-sm variant-filled">Create workout</a>
	</div>
	<div class="container grid grid-cols-3 gap-6">
		{#if workouts.length === 0}
			<p>No workouts yet. Add one!</p>
		{:else}
			{#each workouts as workout}
				<a href="/workouts/{workout.id}" class="card">
					<header class="card-header">{workout.name}</header>
					<section class="p-4">{workout.targetMuscleGroup}</section>
					<footer class="card-footer">{workout.day}</footer>
				</a>
			{/each}
		{/if}
	</div>
</section>
