<script lang="ts">
	import '$lib/css/app.css';

	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { global_mode$ } from '$lib/components/lightdark/mode';
	import Speedial from '$lib/components/speedial/speedial.svelte';
	import { Flex, Frame } from 'sk-clib';
	let { children } = $props();

	onMount(() => {
		mode$.subscribe((v) => {
			localStorage.theme = v;
			document.documentElement.classList.toggle('dark', v === 'dark');
		});
	});

	let pageName = page.url.pathname;

	let mode$ = global_mode$.mode$;
</script>

{#if pageName === '/dashboard'}
	<div class="-z-10000 w-full bg-primary">
		{@render children()}
		<Speedial />
	</div>
{:else if pageName === '/login/test'}
	<Flex fill class=" bg-backdrop-light dark:bg-backdrop overflow-y-auto">
		<Frame flex col class="animate mx-auto w-full max-w-full sm:max-w-3/4 md:max-w-3/5 lg:max-w-3/4 ">
			{@render children()}
		</Frame>
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
