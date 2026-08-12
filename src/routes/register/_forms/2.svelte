<script lang="ts">
	import { Input, TextRedactor, CodeInput, Error, Success } from '$lib/components';
	import { Flex, Button, Text } from 'sk-clib/ui';
	import Back from '~icons/mdi/arrow-back';

	let returnedEmail = $state(''); // email field to transfer data b/t users
	let formStep = $state(1);
	let go_back_btn = $state(false);
	let codeError = $state('');

	async function onsubmit(event: Event) {
		event.preventDefault(); // no refresh

		const form = event.currentTarget as HTMLFormElement;

		const response = await fetch('/api/register/verify', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(Object.fromEntries(new FormData(form)) as any)
		});

		const data = await response.json();

		if (response.ok) {
			formStep = 3;
		} else {
			codeError = ''; // reset state so previous errors can appear again
			codeError = data.codeError;
			go_back_btn = data.go_back_btn;
		}
	}
</script>

{#if !go_back_btn}
	<form class="text-on-surface box-border flex size-full flex-col gap-4" {onsubmit}>
		<Flex centerx class="relative">
			<!--specify type so when users presses enter to submit form it doesn't redirect-->
			<Button type="button" href="/" class="flex cursor-pointer rounded-full bg-red-700 p-3">
				<Back class="size-6" />
			</Button>
			<Text bold class="absolute left-1/2 -translate-x-1/2 transform text-center">Verify Code</Text>
		</Flex>
		<Text class="text-center text-sm">
			We just emailed a verification code to <TextRedactor class="text-primary" text={returnedEmail} />. Please check your inbox. If you don’t see it,
			check your spam folder. The code expires in 10 minutes. If it expires, you will need to refresh the page and start the registration process
			again.
		</Text>
		<CodeInput classWrapper="pb-[3px]" name="code" />
		<Input class="hidden" name="email" value={returnedEmail} />
		<Button class="bg-seed mx-auto mb-4 h-10 cursor-pointer text-white">Verify</Button>
	</form>
{:else}
	<Error big error={codeError} btnText="Back to Home" onclick={() => goto('/')} />
{/if}
