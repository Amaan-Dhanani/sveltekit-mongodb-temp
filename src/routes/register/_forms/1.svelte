<script lang="ts">
	import { Input, Dropdown, Error, Success } from '$lib/components';
	import { Flex, Button, Text } from 'sk-clib/ui';

	let accountTypeValue = $state('Select an Option');
	const accountTypes = ['Account Type 1', 'Account Type 2'];

	function selectType(type: string) {
		accountTypeValue = type;
	}

	async function onsubmit(event: SubmitEvent) {
		event.preventDefault();
        
		const form = event.currentTarget as HTMLFormElement;

		const response = await fetch('/api/register/create', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(Object.fromEntries(new FormData(form)))
		});

		const data = await response.json();

		if (response.ok) {
			formStep = 2;
			returnedEmail = data.email;
			await setCookie('verify-email', data.email);
			return;
		}

		emailError = '';
		passwordError = '';
		typeError = '';

		emailError = data.emailError ?? '';
		passwordError = data.passwordError ?? '';
		typeError = data.typeError ?? '';
	}
</script>

<form class="box-border flex size-full flex-col" {onsubmit}>
	<Text class="text-secondary text-[14px]!">Type</Text>

	<Dropdown.Menu class="mb-4">
		<Dropdown.Trigger>
			<Button type="button" class="bg-secondary text-on-secondary block w-full cursor-pointer rounded-xl px-4 py-2 text-left text-sm">
				{accountTypeValue}
			</Button>
		</Dropdown.Trigger>

		<Dropdown.Content>
			{#each accountTypes as type, i}
				<Dropdown.Button type="button" onclick={() => selectType(type)}>
					{type}
				</Dropdown.Button>

				{#if i < accountTypes.length - 1}
					<Dropdown.Divider />
				{/if}
			{/each}
		</Dropdown.Content>
	</Dropdown.Menu>

	<Input type="hidden" name="type" bind:value={accountTypeValue} />

	<Input type="text" class="mb-4" name="email" label="Email" />

	<Input type="password" class="mb-7" label="Password" name="password" />

	<Button type="submit" class="bg-seed mb-4 h-12 w-full cursor-pointer rounded-xl text-white">Register</Button>

	<Flex center class="gap-2">
		<Text lg class="text-on-surface">Already have an account?</Text>
		<a href="/login" class="text-primary font-bold underline">Sign In</a>
	</Flex>
</form>
