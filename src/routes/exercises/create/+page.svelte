<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	type ExerciceInput = {};

	let bulkInput = '';
	let isBulkInputExpanded = false;
	let exercise: any = {};

	function handleBulkInput() {
		const lines = bulkInput.split('\n');
		for (let i = 0; i < lines.length; i++) {
			switch (lines[i]) {
				case 'Target Muscle Group':
					exercise.targetMuscleGroup = lines[i + 1];
					break;
				case 'Exercise Type':
					exercise.exerciseType = lines[i + 1];
					break;
				case 'Equipment Required':
					exercise.equipmentRequired = lines[i + 1];
					break;
				case 'Mechanics':
					exercise.mechanics = lines[i + 1];
					break;
				case 'Force Type':
					exercise.forceType = lines[i + 1];
					break;
				case 'Experience Level':
					exercise.experienceLevel = lines[i + 1];
					break;
				case 'Secondary Muscles':
					exercise.secondaryMuscles = lines[i + 1];
					break;
				default:
					break;
			}
		}
		console.log('exercise :>> ', exercise);
	}

	function handleBulkInputToggle() {
		isBulkInputExpanded = !isBulkInputExpanded;
	}
</script>

<div class="flex justify-center">
	<h1 class="text-lg">Create a woukout</h1>
</div>

<div class="card m-3 p-2">
	{#if isBulkInputExpanded}
		<label class="label mb-3">
			<span on:click={handleBulkInputToggle} on:keydown={handleBulkInputToggle}
				>Bulk Input <i class="fa-solid fa-chevron-up" /></span
			>
			<div class="flex gap-2">
				<textarea
					class="textarea"
					rows="4"
					placeholder="Enter some long form content."
					bind:value={bulkInput}
				/>
				<button type="button" class="btn variant-filled-secondary" on:click={handleBulkInput}
					>Fill</button
				>
			</div></label
		>
	{:else}
		<span on:click={handleBulkInputToggle} on:keydown={handleBulkInputToggle}
			>Bulk Input <i class="fa-solid fa-chevron-down" /></span
		>
		<!-- else content here -->
	{/if}
</div>

<form method="POST" class="card m-3 p-2">
	<label class="label mb-3">
		<span>Name *</span>
		<input
			id="name"
            name="name"
			class="input"
			type="text"
			placeholder="Barbell Bench Press"
			bind:value={exercise.name}
			required
		/>
	</label>
	<label class="label mb-3">
		<span>VideoID</span>
		<input
			id="videoId"
            name="videoId"
			class="input"
			type="text"
			placeholder="tuwHzzPdaGc"
			bind:value={exercise.videoId}
		/>
	</label>
	<label class="label mb-3">
		<span>Target Muscle Group *</span>
		<input
			id="targetMuscleGroup"
            name="targetMuscleGroup"
			class="input"
			type="text"
			placeholder="Chest"
			required
			bind:value={exercise.targetMuscleGroup}
		/>
	</label>
	<label class="label mb-3">
		<span>Exercise Type *</span>
		<input
			id="exerciseType"
            name="exerciseType"
			class="input"
			type="text"
			placeholder="Strength"
			required
			bind:value={exercise.exerciseType}
		/>
	</label>
	<label class="label mb-3">
		<span>Equipment Required *</span>
		<input
			id="equipmentRequired"
            name="equipmentRequired"
			class="input"
			type="text"
			placeholder="Barbell"
			required
			bind:value={exercise.equipmentRequired}
		/>
	</label>
	<label class="label mb-3">
		<span>Mechanics *</span>
		<input
			id="mechanics"
            name="mechanics"
			class="input"
			type="text"
			placeholder="Compound"
			required
			bind:value={exercise.mechanics}
		/>
	</label>
	<label class="label mb-3">
		<span>Force Type *</span>
		<input
			id="forceType"
            name="forceType"
			class="input"
			type="text"
			placeholder="Push (Bilateral)"
			required
			bind:value={exercise.forceType}
		/>
	</label>
	<label class="label mb-3">
		<span>Experience Level *</span>
		<input
			id="experienceLevel"
            name="experienceLevel"
			class="input"
			type="text"
			placeholder="Intermediate"
			required
			bind:value={exercise.experienceLevel}
		/>
	</label>
	<label class="label mb-3">
		<span>Secondary Muscles *</span>
		<input
			id="secondaryMuscles"
			class="input"
			type="text"
			placeholder="Shoulders, Triceps"
			required
			bind:value={exercise.secondaryMuscles}
		/>
	</label>
	<div class="flex items-center justify-center mb-3">
		<button type="submit" class="btn variant-filled-secondary">Create</button>
	</div>
</form>
