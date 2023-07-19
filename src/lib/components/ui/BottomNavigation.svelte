<script lang="ts">
	const routes = [
		{ name: 'Home', href: '/', icon: 'fa-solid fa-house mb-1' },
		{ name: 'Workouts', href: '/workouts', icon: 'fa-solid fa-list-ul mb-1' },
		{ name: 'Exercises', href: '/exercises', icon: 'fa-solid fa-dumbbell mb-1' },
		{ name: 'Profile', href: '/profile', icon: 'fa-solid fa-user mb-1' }
	];
</script>

<div
	class="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600"
>
	<div class="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
		{#each routes as route}
			<a
				type="button"
				class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
				href={route.href}
			>
				<i class="{route.icon} group-hover:text-blue-600 dark:group-hover:text-blue-500" />
				<span
					class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
					>{route.name}</span
				>
			</a>
		{/each}
	</div>
</div>
