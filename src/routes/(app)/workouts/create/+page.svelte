<script lang="ts">
	import type { Database } from '$lib/database.types';
	import type { PageData } from './$types';
	import { Autocomplete, popup } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption, PopupSettings } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	export let data: PageData;
	const { exercises } = data;

	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};
	let inputExercise: string = '';

	let isInputInFocus: boolean = false;

	let exerciseOptions: AutocompleteOption[];

	let workoutName = '';

	let workoutExercises: Database['public']['Tables']['exercises']['Row'][] = [];

	$: denyList = workoutExercises.map((we) => we.name);

	onMount(() => {
		exerciseOptions = exercises.map((exercise) => {
			return {
				label: `${exercise.name as string} | ${exercise.targetMuscleGroup as string}`,
				value: exercise.id,
				keywords: exercise.name,
				meta: { exercise: exercise }
			};
		});
		exerciseOptions.push({
			label: '0123456789012345678901234567890123456789',
			value: 'asd',
			keywords: 'asd',
			meta: { exercise: { name: 'asd', targetMuscleGroup: 'asd' } }
		});
	});

	function onExerciseSelection(event: any): void {
		workoutExercises = [...workoutExercises, event.detail.meta.exercise];
		inputExercise = '';
	}

	function formatAutoCompleteOption(obj: any): AutocompleteOption {
		return {
			label: obj.name,
			value: obj.id,
			keywords: obj.name,
			meta: { exercise: obj }
		};
	}

	async function createWorkout(): Promise<void> {
		await fetch('/api/workouts/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(workoutExercises)
		});
	}
</script>

<button
	type="button"
	on:click={async () => {
		const perm = await Notification.requestPermission();
		if (perm === 'granted') {
			// Wait 45 seconds
			setTimeout(() => {
				new Notification('Hello world!');
			}, 3000);
		}
	}}
>
	Rest
</button>

<div class="mt-3 flex mx-auto container justify-center">
	<h1 class="text-lg">Create a Workout</h1>
</div>

<section class="container mx-auto flex justify-center w-96 mt-3">
	<input
		class="input autocomplete"
		type="search"
		name="autocomplete-search"
		bind:value={inputExercise}
		placeholder="Search..."
		use:popup={popupSettings}
		on:focusin={() => {
			isInputInFocus = true;
		}}
		on:focusout={() => {
			isInputInFocus = false;
		}}
	/>
	<div
		class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto"
		tabindex="-1"
		data-popup="popupAutocomplete"
	>
		<Autocomplete
			bind:input={inputExercise}
			options={exerciseOptions}
			on:selection={onExerciseSelection}
			denylist={denyList}
		/>
	</div>
</section>
<section class="flex justify-center {isInputInFocus ? 'mt-52' : 'mt-3'} grid">
	<ul>
		{#each workoutExercises as we}
			<div class="card p-2">
				<div>
					<span>✅</span><span>{we.name} | {we.targetMuscleGroup}</span>
				</div>
			</div>
		{/each}
	</ul>
	<button type="button" class="btn variant-filled-primary">Create</button>

	<!-- <div class="grid grid-cols-2 gap-4">
		<div class="col-span-2">
			<form class="card">
				<div class="flex justify-between">
					<input class="input" type="text" placeholder="Workout Name" bind:value={workoutName} />
					<button type="button" class="btn variant-filled">Save</button>
				</div>
				<div class="flex justify-between">
					<div class="flex flex-col">
						<label for="workout-name">Workout Name</label>
						<input type="text" id="workout-name" class="input" />
					</div>
					<div class="flex flex-col">
						<label for="workout-name">Workout Name</label>
						<input type="text" id="workout-name" class="input" />
					</div>
				</div>
				<div class="flex justify-between">
					<div class="flex flex-col">
						<label for="workout-name">Workout Name</label>
						<input type="text" id="workout-name" class="input" />
					</div>
					<div class="flex flex-col">
						<label for="workout-name">Workout Name</label>
						<input type="text" id="workout-name" class="input" />
					</div>
				</div>
				<div class="flex justify-between">
					<div class="flex flex-col">
						<label for="workout-name">Workout Name</label>
						<input type="text" id="workout-name" class="input" />
					</div>
					<div class="flex flex-col">
						<label for="workout-name">Workout Name</label>
						<input type="text" id="workout-name" class="input" />
					</div>
				</div>
				<div class="flex justify-between">
					<div class="flex flex-col">
						<label for="workout-name">Workout Name</label>
						<input type="text" id="workout-name" class="input" />
					</div>
					<div class="flex flex-col">
						<label for="workout-name">Workout Name</label>
						<input type="text" id="workout-name" class="input" />
					</div>
				</div>
				<div class="flex justify-between">
					<div class="flex flex-col">
						<label for="workout-name">Workout Name</label>
						<input type="text" id="workout-name" class="input" />
					</div>
					<div class="flex flex-col">
						<label for="workout-name">Workout Name</label>
						<input type="text" id="workout-name" class="input" />
					</div>
				</div>
			</form>
		</div>
	</div> -->
</section>
