<script lang="ts">
	// === Components ===
	import { Text } from '$lib/components';
	import { Flex, Frame, Button } from 'sk-clib';
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components';
</script>

<form method="POST" autocomplete="off" use:enhance class="box-border flex size-full flex-col ">
	<Frame class="mb-4">
		<Input type="text" id="name_input" name="name" label="Name" value={form?.user?.name ?? ''} />
	</Frame>
	<Frame class="mb-4">
		<Input type="email" id="email_input" name="email" label="Email" value={form?.user?.email ?? ''} />
	</Frame>
	<Frame class="mb-7">
		<Input type="password" class="mb-[12px]" id="password_input" label="Password" name="password" />
	</Frame>
	

	<!-- Submit Button -->
	<Button class="bg-primary mb-4 h-12 cursor-pointer rounded-xl text-white">Register</Button>

	<!-- Sign In Link -->
	<Flex row center class="gap-2">
		<Text lg class="opacity-80">Already have an account?</Text>
		<a href="/login" class="text-primary font-bold underline">Sign In</a>
	</Flex>
</form>