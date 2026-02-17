<script lang="ts">
	// CSS
	import '../app.css';

	// PAGE STATE (SvelteKit + Svelte 5)
	import { page } from '$app/state';

	// REACTIVE PATHNAME
	const pageName = $derived(page.url.pathname);

	// COMPONENTS
	import { onMount } from 'svelte';
	import { global_mode$ } from '$lib/components/lightdark/mode';
	import Speedial from '$lib/components/speedial/speedial.svelte';
	import { Flex } from 'sk-clib';
	let { children } = $props();

	// THEME
	const mode$ = global_mode$.mode$;

	onMount(() => {
		const unsub = mode$.subscribe((v) => {
			localStorage.theme = v;
			document.documentElement.classList.toggle('dark', v === 'dark');
		});

		return unsub;
	});
</script>

{#if ['/dashboard', '/settings'].includes(pageName)}
	<Flex fill class="bg-primary overflow-y-auto">
		<Flex col class="animate mx-auto w-full max-w-full sm:max-w-3/4 md:max-w-3/5 lg:max-w-3/4">
			{@render children()}
			<Speedial />
		</Flex>
	</Flex>

{:else if ['/login', '/register', '/test', '/modify-delete', '/', '/logout'].includes(pageName)}
	<Flex fill class="bg-backdrop-light dark:bg-backdrop overflow-y-auto">
		<Flex col class="animate mx-auto w-full max-w-full sm:max-w-3/4 md:max-w-3/5 lg:max-w-3/4">
			{@render children()}
			<Speedial />
		</Flex>
	</Flex>

{:else}
	<div class="-z-10000 w-full bg-backdrop-light dark:bg-backdrop">
		<main class="size-full">
			{@render children()}
			<Speedial />
		</main>
	</div>
{/if}

<style>
	main {
		max-width: 30rem;
		margin-inline: auto;
	}
</style>
