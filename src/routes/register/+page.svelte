<script lang="ts">
	import { LightDark, Error, Success } from '$lib/components';
	import { Flex, Frame, Text } from 'sk-clib/ui';
	import { goto } from '$app/navigation';
	import Logo from '$lib/images/Logo.png';
	
</script>

<Flex col fill class="mt-8">
	<Flex class="sticky mr-4 h-16 justify-end">
		<LightDark />
	</Flex>
	<Text bold class="text-on-surface ml-4 text-3xl! sm:ml-0">Sign Up</Text>
	<Text lg class="text-on-surface ml-4 opacity-80 sm:ml-0">Enter your details below to start your journey!</Text>
	<Flex col fill surfaceVariant class="mt-2 box-border rounded-t-2xl p-6">
		<Flex fill>

			{#if formStep == 1}
				// display first form
			{/if}

			{#if formStep == 2 && !go_back_btn}
				// display second form
			{/if}

			{#if formStep == 3}
				<Success big success="You've been successfully registered." btnText="Continue to Login" onclick={() => goto('/login')} />
			{/if}
			<Frame class="mt-[8%] hidden lg:ml-4 lg:block lg:w-full">
				<img src={Logo} alt="Logo" />
			</Frame>
		</Flex>

		<!-- ERRORS -->
		<Error duration={3000} error={passwordError} />
		<Error duration={3000} error={emailError} />
		<Error duration={3000} error={typeError} />
		{#if !go_back_btn}
			<Error error={codeError} />
		{/if}
		<img src={Logo} alt="Logo" class="block w-full object-contain lg:hidden" />
	</Flex>
</Flex>
