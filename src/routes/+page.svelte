<script lang="ts">
	import { Flex, Button } from 'sk-clib';
	import Logo from '$lib/images/Logo.png';
	import { goto } from '$app/navigation';
</script>

<Flex col fill class="mt-20">
	<img src={Logo} alt="Logo" class="block object-contain mx-[15%] mb-7" />
	<Flex col fill class="bg-surface-variant mt-2 box-border rounded-t-2xl p-6 gap-8">
		<Button onclick={() => goto('/register')} class="bg-seed cursor-pointer h-16 w-full rounded-2xl text-lg text-white">Register</Button>
		<Button onclick={() => goto('/login')} class="bg-seed cursor-pointer h-16 w-full rounded-2xl text-lg text-white">Login</Button>
		<Button onclick={() => goto('/modify-delete')} class="bg-seed h-16 w-full cursor-pointer rounded-xl text-white">Modify or Delete Account</Button>
	</Flex>
</Flex>
