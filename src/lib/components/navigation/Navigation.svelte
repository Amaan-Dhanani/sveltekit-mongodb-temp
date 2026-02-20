<script lang="ts">
	import { Flex, Frame } from "sk-clib";
	let { children } = $props();
</script>

<Frame class="fixed right-0 bottom-0 left-0 z-10 w-full">
	<Flex row class="h-[118px] w-full items-end justify-around">
		<!-- svelte-ignore element_invalid_self_closing_tag -->
		<div class="absolute -z-100 h-[95px] w-full rounded-t-[30px] bg-outline" />
		{@render children()}
	</Flex>
</Frame>
