<script lang="ts">
	// === Components ===
	import { Input, Error } from '$lib/components';
	import { Flex, Frame, Button, Header, Text } from 'sk-clib';
	import Logo from '$lib/images/Logo.png';

	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { loginSchema } from '$lib/validation';
	import { zod4 } from 'sveltekit-superforms/adapters';

	let { data }: { data: PageData } = $props();

	const { form, enhance, errors } = superForm(data?.form, {
		validators: zod4(loginSchema),
	});
</script>

<Flex col fill class="mt-20">

	<Header bold class="ml-4 !text-3xl sm:ml-0 text-on-surface">Sign In</Header>
	<Text lg class="ml-4 opacity-80 sm:ml-0 text-on-surface">Welcome Back!</Text>
	<Flex col fill class="bg-surface-variant mt-2 box-border rounded-t-2xl p-6">
		<Flex row fill>
			<form method="POST" autocomplete="off" use:enhance class="box-border flex w-full flex-col">
				<Input type="text" class="mb-4" name="email" label="Email" bind:value={$form.email} />
				<Input type="password" class="mb-7" label="Password" name="password" bind:value={$form.password} />
				
					<Button class="bg-seed mb-4 h-12 w-full cursor-pointer rounded-xl text-white">Sign In</Button>

				<Flex row center class="gap-2">
					<Text lg class="text-inverse-surface">Don't have an account?</Text>
					<a href="/register" class="text-primary font-bold underline">Sign Up</a>
				</Flex>
				<Flex row center class="gap-2">
					<Text lg class="text-on-surface">Wanna delete or modify your account?</Text>
					<a href="/modify-delete" class="text-primary font-bold underline">Click here</a>
				</Flex>
			</form>

			<Frame class="mt-[8%] hidden lg:ml-4 lg:block lg:w-full">
				<img src={Logo} alt="Logo" />
			</Frame>
		</Flex>

		<Error duration={3000} error={$errors.email}/>
		<Error duration={3000} error={$errors.password}/>
		<img src={Logo} alt="Logo" class="block w-full object-contain lg:hidden" />
	</Flex>
</Flex>
