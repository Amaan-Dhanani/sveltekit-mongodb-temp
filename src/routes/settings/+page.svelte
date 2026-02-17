<script lang="ts">
	import { Frame, Flex, Button } from 'sk-clib';
	import { Header, Text, Error, Input, Success } from '$lib/components';
	import Logo from '$lib/images/Logo.png';
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';
	let { data, form }: { data: PageData; form: ActionData } = $props();
	import { goto } from '$app/navigation';

	const preventReset = () => {
		return async ({ update }: { update: any }) => {
			await update({ reset: false });
		};
	};
</script>

<Flex col fill class="mt-20">
	<Header bold class="ml-4 !text-3xl sm:ml-0">Settings</Header>
	<Text lg class="ml-4 opacity-80 sm:ml-0">Adjust your simple settings here!</Text>
	<Flex col fill class="dark:bg-secondary mt-2 box-border gap-4 rounded-t-2xl bg-white p-6">
		<form action="?/name" method="POST" autocomplete="off" use:enhance={preventReset} class="flex w-full flex-row items-end gap-4">
			<Flex col fill>
				<Input type="text" id="name_input" name="name" label="Change Name" value={data.name} />
			</Flex>
			<Button class="bg-primary h-10 rounded-md px-4 text-sm whitespace-nowrap text-white">Update</Button>
		</form>
		<Button onclick={() => goto('/modify-delete')} class="bg-orange-500 h-12 w-full cursor-pointer rounded-xl text-white">Change Email/Password <Text semibold class="underline">OR</Text> Delete Account</Button>
		<Button onclick={() => goto('/dashboard')} class="bg-primary h-12 mt-10 w-full cursor-pointer rounded-xl text-white">Back to Dashboard</Button>
		<Button onclick={() => goto('/logout')} class="bg-red-500 h-12 w-full cursor-pointer rounded-xl text-white">Logout</Button>

		<Frame class="sticky bottom-0 h-8 pb-15">
			<Success duration={3000} success={form?.success} />
			<Error duration={3000} error={form?.error} />
			<Error duration={3000} error={data.error} />
		</Frame>
		<img src={Logo} alt="Logo" class="mx-[5%] mt-7 block object-contain" />
		
	</Flex>
</Flex>
