<script lang="ts">
	import { onMount } from "svelte";

	type LogoType = 'white' | 'black' | 'color';
	export const type: LogoType = 'white';

  let src = '/img/wegogym-logo-white.png';

  onMount(() => {
    if (type === 'white') {
      src = '/img/wegogym-logo-white.png';
    } else if (type === 'black') {
      src = '/img/wegogym-logo-black.png';
    } else if (type === 'color') {
      src = '/img/wegogym-logo-color.png';
    }
  });

</script>

<img class="block h-8 w-auto lg:hidden" {src} alt="Your Company" />
<img class="hidden h-8 w-auto lg:block" {src} alt="Your Company" />
