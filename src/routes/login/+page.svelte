<script lang="ts">
	// === Components ===
	import { Header, Text, Input, Error } from '$lib/components';
	import { Flex, Frame, Button } from 'sk-clib';
	import Logo from '$lib/images/Logo.png';

	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { loginSchema } from '$lib/validation';
	import { zod4 } from 'sveltekit-superforms/adapters';

	let { data }: { data: PageData } = $props();

	// svelte-ignore state_referenced_locally
	const { form, enhance, errors } = superForm(data.form, {
		validators: zod4(loginSchema),
	});
</script>

<Flex col fill class="mt-20">
	<Header bold class="ml-4 !text-3xl sm:ml-0">Sign In</Header>
	<Text lg class="ml-4 opacity-80 sm:ml-0">Welcome Back!</Text>
	<Frame flex col fill class="dark:bg-secondary mt-2 box-border rounded-t-2xl bg-white p-6">
		<Flex row fill>
			<form method="POST" autocomplete="off" use:enhance class="box-border flex w-full flex-col">
				<Frame class="mb-4">
					<Input type="text" name="email" label="Email" bind:value={$form.email} />
				</Frame>
				<Frame class="mb-7">
					<Input type="password" label="Password" name="password" bind:value={$form.password} />
				</Frame>
				<Button class="bg-primary mb-4 h-12 w-full cursor-pointer rounded-xl text-white">Sign In</Button>

				<!-- Sign In Link -->
				<Flex row center class="gap-2">
					<Text lg class="opacity-80">Don't have an account?</Text>
					<a href="/register" class="text-primary font-bold underline">Sign Up</a>
				</Flex>
				<Flex row center class="gap-2">
					<Text lg class="opacity-80">Forgot Password?</Text>
					<a href="/forget" class="text-primary font-bold underline">Click here</a>
				</Flex>
			</form>

			<Frame class="mt-[8%] hidden lg:ml-4 lg:block lg:w-full">
				<img src={Logo} alt="Logo" />
			</Frame>
		</Flex>
		<!--Errors-->
		<Error error={$errors.email}/>
		<Error error={$errors.password}/>
		<img src={Logo} alt="Logo" class="block w-full object-contain lg:hidden" />
	</Frame>
</Flex>
