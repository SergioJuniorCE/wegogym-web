<script lang="ts">
	import type { Exercise } from '$lib/types';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	export let exercise: Exercise;

	let showVideoHelp = false;

	let isDone = false;

	const popUpClickTarget = `helpPopupClick${exercise.name}`;

	const popupClick: PopupSettings = {
		event: 'click',
		target: popUpClickTarget,
		placement: 'right'
	};

	function toggleVideoHelp() {
		showVideoHelp = !showVideoHelp;
	}
</script>

<div class="card mt-3 w-96 pb-1">
	<header class="card-header mb-3">
		<label class="flex items-center space-x-2">
			<input class="checkbox" type="checkbox" bind:checked={isDone} />
			<p>{exercise.name}</p>
		</label>
	</header>
	{#if !isDone}
		<section class="px-4">
			<div class="flex justify-between">
				<div class="flex flex-col">
					<span class="text-sm">Sets</span>
					<span class="text-2xl">{exercise.sets}</span>
				</div>
				<div class="flex flex-col">
					<span class="text-sm">Reps</span>
					<span class="text-2xl">{exercise.reps}</span>
				</div>
			</div>
			<button class="w-12 m-0" use:popup={popupClick}>
				<i class="fa-solid fa-question my-3" /> <span>Help</span>
			</button>
			{#if showVideoHelp}
				<div class="">
					<button
						type="button"
						class="btn btn-sm variant-filled mb-2"
						on:click={toggleVideoHelp}
						on:keypress={toggleVideoHelp}>Hide video help</button
					>
					<iframe
						title={exercise.name}
						class="w-full"
						height="315"
						src={"https://www.youtube.com/embed/" + exercise.video}
						frameborder="0"
						allowfullscreen
					/>
				</div>
			{/if}
		</section>
	{/if}
	<!-- <footer class="card-footer">(footer)</footer> -->
</div>

<div data-popup={popUpClickTarget}>
	<div class="btn-group-vertical variant-filled-secondary">
		<button on:click={toggleVideoHelp} on:keypress={toggleVideoHelp}>Video</button>
		<button>Gif</button>
	</div>
	<div class="arrow variant-filled-secondary" />
</div>
