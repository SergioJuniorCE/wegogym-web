<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;

    const { workouts } = data;
</script>

{#if workouts.length === 0}
    <p>
        No workouts yet. Add one!
    </p>
{:else}
     <!-- else content here -->
{/if}

