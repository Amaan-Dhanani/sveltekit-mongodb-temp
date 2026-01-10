<script lang="ts">
	// === Components ===
	import { Header, Text } from '$lib/components';
	import { Flex, Frame } from 'sk-clib';
	import CredentialForm from './steps/CredentialForm.svelte';
    import Logo from '$lib/images/Logo.png'
</script>

<Flex col fill class="mt-20">
    <Header bold class="ml-4 sm:ml-0 !text-3xl">Sign In</Header> <!--The size don't work-->
	<Text lg class="ml-4 opacity-80 sm:ml-0">Welcome Back!</Text>
	<Frame flex col fill class="dark:bg-secondary mt-2 box-border rounded-t-2xl bg-white p-6">
        <Flex row fill>
                <CredentialForm/>
            <Frame class="lg:w-full hidden lg:block mt-[8%] lg:ml-4">
                <img src={Logo} alt="Logo"/>
            </Frame>
        </Flex>
		<img src={Logo} alt="Logo" class="w-full block object-contain lg:hidden" />
	</Frame>
</Flex>
