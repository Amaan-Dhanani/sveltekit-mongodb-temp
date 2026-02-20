<script lang="ts">
	// CSS
	import '../app.css';


	import { Flex } from 'sk-clib';
	import { ThemeInit } from 'sk-clib/theme';
	
	let { children } = $props();

</script>

<ThemeInit defaults={{ defaultSeedColor: '#3d5cff', defaultMode: 'dark', defaultVariant: 'vibrant' }} />

<Flex fill class="bg-surface overflow-y-auto">
	<Flex col class="animate mx-auto w-full max-w-full sm:max-w-3/4 md:max-w-3/5 lg:max-w-3/4">
		{@render children()}
	</Flex>
</Flex>
