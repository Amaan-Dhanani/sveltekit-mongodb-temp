<script lang="ts">
	// === Components ===
	import { Text } from '$lib/components';
	import { Flex, Frame, Button } from 'sk-clib';
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components';
</script>

<!-- Form Section -->

<form method="POST" autocomplete="off" use:enhance class="box-border flex w-full flex-col">
	<Frame class="mb-4">
		<Input type="email" id="email_input" name="email" label="Email" value={form?.email ?? ''} />
	</Frame>
	<Frame class="mb-7">
		<Input type="password" id="password_input" label="Password" name="password" />
	</Frame>

	<!-- Submit Button -->
	<Button class="bg-primary mb-4 h-12 cursor-pointer rounded-xl text-white">Sign In</Button>

	<!-- Sign In Link -->
	<Flex row center class="gap-2">
		<Text lg class="opacity-80">Don't have an account?</Text>
		<a href="/register" class="text-primary font-bold underline">Sign Up</a>
	</Flex>
	<Flex row center class="gap-2">
		<Text lg class="opacity-80">Forgot Password?</Text>
		<a href="/forget" class="text-primary font-bold underline">Click here</a>
	</Flex>
	<!-- svelte-ignore a11y_missing_attribute -->
</form>
