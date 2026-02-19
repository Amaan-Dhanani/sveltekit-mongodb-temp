<script lang="ts">
	import { Flex, Button, Header, Text } from 'sk-clib';
	import { Error } from '$lib/components';
	import Logo from '$lib/images/Logo.png';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	import { goto } from '$app/navigation';
</script>

<Flex col fill class="mt-20">
	<Header bold class="ml-4 !text-3xl sm:ml-0 text-on-surface">{data.greeting}</Header>
	<Text lg class="ml-4 opacity-80 sm:ml-0 text-on-surface">Here is your dashboard!</Text>
	<Flex col fill class="bg-surface-variant mt-2 box-border gap-4 rounded-t-2xl p-6">
		<Text class="text-on-surface">
			I am a mostly empty dashboard. This is placeholder text.<br><br>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
			aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
			proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</Text>
		<Button onclick={() => goto('/settings')} class="bg-seed h-12 w-full cursor-pointer rounded-xl text-white">Settings</Button>
		<Button onclick={() => goto('/logout')} class="bg-red-500 mb-4 h-12 w-full cursor-pointer rounded-xl text-white">Logout</Button>
		<img src={Logo} alt="Logo" class="mx-[5%] block object-contain" />
		<Error duration={3000} error={data.error} />
	</Flex>
</Flex>
