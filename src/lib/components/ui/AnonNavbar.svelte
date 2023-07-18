<script lang="ts">
	import { onMount } from 'svelte';
	import Logo from './icons/Logo.svelte';

	onMount(() => {
		const navbar = document.getElementById('navbar');
		window.onscroll = () => {
			if (!navbar) return;
			if (window.scrollY > 10) {
				navbar.classList.remove('bg-transparent');
				navbar.classList.add('bg-white');
				navbar.classList.add('shadow');
			} else {
				navbar.classList.remove('bg-white');
				navbar.classList.remove('shadow');
				navbar.classList.add('bg-transparent');
			}
		};
	});
</script>

<nav
	id="navbar"
	class="fixed w-full z-30 top-0 text-white bg-transparent transition-all duration-500 ease-in-out"
>
	<div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
		<div class="pl-4 flex items-center">
			<a
				class="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
				href="/"
			>
				<Logo />
			</a>
		</div>

		<div class="block lg:hidden pr-4">
			<a
				href="/auth/login"
				id="nav-toggle"
				class="flex items-center p-1 text-White hover:text-gray-900"
			>
				Login
			</a>
		</div>

		<div
			class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-transparent z-20"
			id="nav-content"
		>
			<ul class="list-reset lg:flex justify-center flex-1 items-center">
				<li class="mr-3">
					<a class="inline-block py-2 px-4 text-white no-underline" href="/">Active</a>
				</li>
				<li class="mr-3">
					<a
						class="inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-2 px-4"
						href="/">link</a
					>
				</li>
				<li class="mr-3">
					<a
						class="inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-2 px-4"
						href="/">link</a
					>
				</li>
			</ul>
			<a href="/auth/login" class="ml-auto lg:mr-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
				Login
			</a>
		</div>
	</div>
</nav>
