<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { workouts } = data;
</script>

<section class="container grid grid-cols-3 gap-6">
	{#if workouts.length === 0}
		<p>No workouts yet. Add one!</p>
	{:else}
		{#each workouts as workout}
			<div>
				<h2>
					{workout.name}
				</h2>
				<p>
					{workout.targetMuscleGroup}
				</p>
			</div>
		{/each}
	{/if}
</section>
