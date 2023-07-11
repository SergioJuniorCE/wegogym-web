<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let msLink = '';
	let isMsLinkInputExpanded = false;
	let exercise: any = {};

	async function handleMsLink() {
		const exerciseData = await fetch('/api/get-data-from-site', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ msLink })
		});
		exercise = await exerciseData.json();
	}

	function handleMsLinkInputToggle() {
		isMsLinkInputExpanded = !isMsLinkInputExpanded;
	}
</script>

<div class="flex justify-center">
	<h1 class="text-lg">Create a woukout</h1>
</div>

<div class="card m-3 p-2">
	{#if isMsLinkInputExpanded}
		<label class="label mb-3">
			<span on:click={handleMsLinkInputToggle} on:keydown={handleMsLinkInputToggle}
				>MuscleStrength Link <i class="fa-solid fa-chevron-up" /></span
			>
			<div class="flex gap-2">
				<input
					class="input"
					type="text"
					placeholder="https://www.muscleandstrength.com/exercises/barbell-bench-press.html"
					bind:value={msLink}
				/>
				<button type="button" class="btn variant-filled-secondary" on:click={handleMsLink}
					>Fill</button
				>
			</div></label
		>
	{:else}
		<span on:click={handleMsLinkInputToggle} on:keydown={handleMsLinkInputToggle}
			>MuscleStrength Link <i class="fa-solid fa-chevron-down" /></span
		>
		<!-- else content here -->
	{/if}
</div>

<form method="POST" class="card m-3 p-2">
	<div class="flex items-center justify-center">
		<button type="submit" class="btn variant-filled-secondary">Create</button>
	</div>
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
			name="secondaryMuscles"
			class="input"
			type="text"
			placeholder="Shoulders, Triceps"
			required
			bind:value={exercise.secondaryMuscles}
		/>
	</label>
</form>
