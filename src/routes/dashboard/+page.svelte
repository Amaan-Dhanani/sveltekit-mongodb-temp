<script lang="ts">
	import { Flex, Button, Header, Text } from 'sk-clib';
	import { Error, Navigation } from '$lib/components';
	import { type Component } from 'svelte';
	import IconSettings from '~icons/ic/baseline-settings';
	import Logo from '$lib/images/Logo.png';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	import { goto } from '$app/navigation';
</script>

{#snippet widgetButton(text: string, Icon: Component, callback?: () => void)}
	<Flex col class="mb-2 items-center gap-1">
		<Button onclick={callback} class="cursor-pointer rounded-full bg-(--color-seed)/80 p-3 hover:bg-(--color-seed)/100">
			<Icon class="text-white size-6" />
		</Button>
		<Text class="select-none" lg>{text}</Text>
	</Flex>
{/snippet}

<Flex col fill class="mt-20">
	<Header bold class="text-on-surface ml-4 !text-3xl sm:ml-0">{data.greeting}</Header>
	<Text lg class="text-on-surface ml-4 opacity-80 sm:ml-0">Here is your dashboard!</Text>
	<Flex col fill class="bg-surface-variant mt-2 box-border gap-4 rounded-t-2xl p-6">
		<Text class="text-on-surface">
			I am a mostly empty dashboard. This is placeholder text.<br /><br />Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
			tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
			commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
			occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</Text>
		<Button onclick={() => goto('/logout')} class="mb-4 h-12 w-full cursor-pointer rounded-xl bg-red-500 text-white">Logout</Button>
		<Error class="" duration={3000} error={data.error} />
		<img src={Logo} alt="Logo" class="mx-[5%] block object-contain mb-35" />
		<Navigation>
			{@render widgetButton('Edit', IconSettings)}
			{@render widgetButton('Edit', IconSettings)}
			{@render widgetButton('Edit', IconSettings)}
			{@render widgetButton('Settings', IconSettings, () => goto('/settings'))}
		</Navigation>
	</Flex>
</Flex>
