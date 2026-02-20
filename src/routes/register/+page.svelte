<script lang="ts">
	import { Error, Input, TextRedactor, CodeInput, Dropdown } from '$lib/components';
	import { Flex, Frame, Button, Header, Text } from 'sk-clib';
	import Logo from '$lib/images/Logo.png';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData, ActionData } from './$types';
	import { registerSchema } from '$lib/validation';
	import { zod4 } from 'sveltekit-superforms/adapters';

	let { data, form: codeForm }: { data: PageData; form: ActionData } = $props();

	let showSecondForm = $state(false);
	let returnedEmail = $state('');

	const {
		form,
		enhance: formEnhance,
		errors
		} = superForm(data.form, {
		validators: zod4(registerSchema),
		applyAction: false,
		onResult({ result }) {
			if (result.type === 'success' && result.data) {
				showSecondForm = true;
				returnedEmail = result.data.form.data.email; //Get email from successful registration step
			}
		}
	});
</script>

<Flex col fill class="mt-20">
	<Header bold class="ml-4 !text-3xl sm:ml-0 text-on-surface">Sign Up</Header>
	<Text lg class="ml-4 opacity-80 sm:ml-0 text-on-surface">Enter your details below to start your journey!</Text>
	<Flex col fill class="bg-surface-variant mt-2 box-border rounded-t-2xl p-6">
		<Flex row fill>
			{#if !showSecondForm}
				<form method="POST" action="?/register" autocomplete="off" class="box-border flex size-full flex-col" use:formEnhance>
					<Text class="text-secondary !text-[14px]">Type</Text>
					<Dropdown.Menu class="mb-4">
						<Dropdown.Trigger>
							<Button class="bg-secondary hover:text-white dark:hover:text-black cursor-pointer block px-4 py-2 text-sm text-gray-700 w-full text-left" form="">{$form.type || 'Select an Option'}</Button>
						</Dropdown.Trigger>
						<Dropdown.Content>
							<Dropdown.Button
								onclick={() => {
									$form.type = 'Account Type 1';
								}}>Account Type 1</Dropdown.Button
							>
							<Dropdown.Divider />
							<Dropdown.Button
								onclick={() => {
									$form.type = 'Account Type 2';
								}}>Account Type 2</Dropdown.Button
							>
						</Dropdown.Content>
					</Dropdown.Menu>
					<Input type="hidden" name="type" bind:value={$form.type} />

					<Input type="text" class="mb-4" name="email" label="Email" bind:value={$form.email} />
					<Input type="password" class="mb-7" label="Password" name="password" bind:value={$form.password} />

					<Button class="bg-seed mb-4 h-12 w-full cursor-pointer rounded-xl text-white">Register</Button>

					<Flex row center class="gap-2">
						<Text lg class="text-on-surface">Already have an account?</Text>
						<a href="/login" class="text-primary font-bold underline">Sign In</a>
					</Flex>
				</form>
			{/if}

			{#if showSecondForm && !codeForm?.go_back_btn}
				<form method="POST" action="?/code" class="box-border flex size-full flex-col gap-4 text-on-surface" use:enhance>
					<Text bold class="text-center">Verify Code</Text>
					<Text class="text-center text-sm">
						We just emailed a verification code to <TextRedactor class="text-primary" text={returnedEmail} />. Please check your inbox. If you don’t
						see it, check your spam folder. The code expires in 10 minutes. If it expires, you will need to refresh the page and start the
						registration process again.
					</Text>
					<CodeInput classWrapper="pb-[3px]" name="code" />
					<Button class="bg-seed mx-auto mb-4 h-10 w-fit cursor-pointer text-white">Verify</Button>
				</form>
			{/if}

			{#if codeForm?.go_back_btn}
				<Error big error={codeForm?.error} onclick={() => goto('/')} btnText="Back to Home" class="" />
			{/if}

			<Frame class="mt-[8%] hidden lg:ml-4 lg:block lg:w-full">
				<img src={Logo} alt="Logo" />
			</Frame>
		</Flex>

		<Error duration={3000} error={$errors.email} />
		<Error duration={3000} error={$errors.password} />
		<Error duration={3000} error={$errors.type} />
		{#if !codeForm?.go_back_btn}
			<Error duration={3000} error={codeForm?.error} />
		{/if}

		<img src={Logo} alt="Logo" class="block w-full object-contain lg:hidden" />
	</Flex>
</Flex>
