<script lang="ts">
	import RoundError from '~icons/ic/round-error';
	import type { Props } from '..';
	let { children }: Props = $props();
</script>

<div class="relative flex items-center gap-2 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
	<RoundError class="inline h-5 w-5" />
	{@render children?.()}
</div>
