<script lang="ts">
	import { WorkoutService } from '$lib/services/Workout.service';
	import { ProgressRadial, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { ExerciseService } from '$lib/services/Exercise.service';
	import type { Exercise } from '$lib/types';
	import { onMount } from 'svelte';
	import { toastStore } from '@skeletonlabs/skeleton';

	export let data: PageData;

	const workout = data.workout;
	let exercises: Exercise[] | null = [];
	let workoutExercises: Exercise[] = [];

	const exerciseAlreadyAdded: ToastSettings = {
		message: 'Exercise already added to workout'
	};

	onMount(async () => {
		exercises = await ExerciseService.getExercises();
	});
</script>

<section class="mt-3 mx-3">
	{#if workout?.exercises && workout.exercises.length > 0}
		{#each workout.exercises as exerciseId}
			{#await WorkoutService.getExercise(exerciseId)}
				<ProgressRadial value={undefined} />
			{:then exercise}
				<pre>{JSON.stringify(exercise)}</pre>
			{/await}
		{/each}
	{:else}
		<div class="mb-3">
			<h1>No exercises found</h1>
			<p>Add more to complete your workout</p>
		</div>

		<div class="mb-3">
			<input class="input" type="text" placeholder="Exercise name" />

			<!-- Filters -->
			<p class="text-gray-400 text-xs">Filters comming soon...</p>
		</div>
		<!-- <div>
			<span>Select</span>
			<select class="select">
				<option value="1">Option 1</option>
				<option value="2">Option 2</option>
				<option value="3">Option 3</option>
				<option value="4">Option 4</option>
				<option value="5">Option 5</option>
			</select>
		</div> -->
		<div class="mb-3">
			<p>Selected exercises</p>
			{#each workoutExercises as exercise}
				<div class="card p-1 mb-1 flex justify-between">
					<span>{exercise.name} - {exercise.targetMuscleGroup}</span>
					<button
						on:click={() => {
							workoutExercises = workoutExercises.filter((e) => e.id !== exercise.id);
						}}
						on:keypress={() => {
							workoutExercises = workoutExercises.filter((e) => e.id !== exercise.id);
						}}
					>
						<i class="fa-solid fa-ban text-red-600" />
					</button>
				</div>
			{/each}
			{#if workoutExercises.length > 0}
				<div class="flex justify-center mt-3">
					<button type="button" class="btn btn-sm variant-filled-primary w-full">Save</button>
				</div>
			{/if}
		</div>

		<hr class="mb-3" />

		<div class="max-w-xs">
			{#if exercises}
				{#each exercises as exercise}
					<button
						class="card py-2 mb-2 w-full"
						on:click={() => {
							if (!workoutExercises.find((e) => e.id === exercise.id)) {
								workoutExercises = [...workoutExercises, exercise];
							} else {
								toastStore.trigger(exerciseAlreadyAdded);
							}
						}}>{exercise.name} - {exercise.targetMuscleGroup}</button
					>
				{/each}
			{:else}
				<div class="flex justify-center">
					<p>No exercises found</p>
				</div>
			{/if}
		</div>
	{/if}
</section>
