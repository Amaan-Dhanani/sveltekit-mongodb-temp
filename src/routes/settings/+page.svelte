<script lang="ts">
	import { Frame, Flex, Button, Header, Text } from 'sk-clib';
	import { Error, Input, Success } from '$lib/components';
	import Logo from '$lib/images/Logo.png';
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';
	let { data, form }: { data: PageData; form: ActionData } = $props();
	import { goto } from '$app/navigation';


	import { theme } from 'sk-clib/theme';
	import type { Component } from 'svelte';
	import IconDarkMode from '~icons/material-symbols/dark-mode-outline';
	import IconLightMode from '~icons/material-symbols/light-mode-outline';

	function toggle_theme() {
		console.log(theme.mode);
		theme.mode = (theme.mode ?? 'light') == 'light' ? 'dark' : 'light';
	}

	const preventReset = () => {
		return async ({ update }: { update: any }) => {
			await update({ reset: false });
		};
	};
</script>

{#snippet widgetButton(text: string, Icon: Component, callback?: () => void)}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<Flex class="items-center gap-2">
				<button
					onclick={callback}
					class="flex cursor-pointer flex-col items-center justify-center rounded-full bg-(--color-on-surface-variant)/80 p-3 hover:bg-(--color-on-surface-variant)"
				>
					<Icon class="text-surface size-6" />
				</button>
				<Text sm class="mx-center select-none !text-(--color-on-surface)">{text}</Text>
			</Flex>
		{/snippet}


<Flex col fill class="mt-20">
	<Header bold class="text-on-surface ml-4 !text-3xl sm:ml-0">Settings</Header>
	<Text lg class="text-on-surface ml-4 opacity-80 sm:ml-0">Adjust your simple settings here!</Text>
	<Flex col fill class="bg-surface-variant mt-2 box-border gap-4 rounded-t-2xl p-6">
		<form action="?/name" method="POST" autocomplete="off" use:enhance={preventReset} class="flex w-full flex-row items-end gap-4">
			<Flex col fill>
				<Input type="text" id="name_input" name="name" label="Change Name" value={data.name} />
			</Flex>
			<Button class="bg-seed h-10 rounded-md px-4 text-sm whitespace-nowrap text-white">Update</Button>
		</form>

		<Frame class="w-full justify-center gap-10">
			{@render widgetButton(
				(theme.mode || "").charAt(0).toUpperCase() + (theme.mode || "").slice(1) || '',
				theme.mode == 'dark' ? IconDarkMode : IconLightMode,
				toggle_theme
			)}
		</Frame>

		<Button onclick={() => goto('/modify-delete')} class="h-12 w-full cursor-pointer rounded-xl bg-orange-500 text-white"
			>Change Email/Password <Text semibold class="underline">OR</Text> Delete Account</Button
		>
		<Button onclick={() => goto('/dashboard')} class="bg-seed mt-10 h-12 w-full cursor-pointer rounded-xl text-white">Back to Dashboard</Button>
		<Button onclick={() => goto('/logout')} class="h-12 w-full cursor-pointer rounded-xl bg-red-500 text-white">Logout</Button>

		<Frame class="sticky bottom-0 h-8 pb-15">
			<Success duration={3000} success={form?.success} />
			<Error duration={3000} error={form?.error} />
			<Error duration={3000} error={data.error} />
		</Frame>
		<img src={Logo} alt="Logo" class="mx-[5%] mt-7 block object-contain" />
	</Flex>
</Flex>
