<script lang='ts'>
	import type { ActionData } from "./$types";

  export let form: ActionData;
</script>

{#if form?.status === 400}
  <div class="alert alert-danger" role="alert">El nombre es necesario</div>
{/if}

<form method="post">
	<div class="flex justify-center items-center">
		<p class="text-lg">Looks like you dont have a profile.</p>
	</div>
	<div class="flex justify-center items-center">
		<p>Let's create one.</p>
	</div>
	<label for="name">Enter your name</label>
	<input class="input" type="text" placeholder="Jane Doe" />
	<div class="flex justify-center mt-3">
		<button class="btn variant-filled-primary" type="submit">Save</button>
	</div>
</form>
