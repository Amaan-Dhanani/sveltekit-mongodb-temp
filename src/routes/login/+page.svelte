<script lang="ts">
	// === Components ===
	import { Header, Text } from '$lib/components';
	import { Flex, Frame } from 'sk-clib';
	import CredentialForm from './steps/CredentialForm.svelte';
	import Logo from '$lib/images/Logo.png';
</script>

<Flex col fill class="mt-20">
	<Header bold class="ml-4 !text-3xl sm:ml-0">Sign In</Header>
	<Text lg class="ml-4 opacity-80 sm:ml-0">Welcome Back!</Text>
	<Frame flex col fill class="dark:bg-secondary mt-2 box-border rounded-t-2xl bg-white p-6">
		<Flex row fill>
			<CredentialForm />
			<Frame class="mt-[8%] hidden lg:ml-4 lg:block lg:w-full">
				<img src={Logo} alt="Logo" />
			</Frame>
		</Flex>
		{#if form?.error}
			<Error class="">{form?.error}</Error>
		{:else}
			<Error class=""></Error>
		{/if}
		<img src={Logo} alt="Logo" class="block w-full object-contain lg:hidden" />
	</Frame>
</Flex>
