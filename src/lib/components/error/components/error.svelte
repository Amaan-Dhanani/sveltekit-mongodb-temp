<script lang="ts">
	import RoundError from '~icons/ic/round-error';
	import type { Props } from '..';
	import { cn } from '$lib/utils';

	let { error, big, onclick, btnText, divClass = $bindable('flex justify-center'), class: className, }: Props = $props();

	// svelte-ignore state_referenced_locally
		let divCls = $state(cn(divClass, className));
    $effect(() => {
        divCls = cn(divClass, className)
    })
</script>

{#if error}
	{#if big}
		<!-- Big error layout -->
		<div class={divCls}>
			<div class="w-full max-w-[290px] overflow-hidden rounded-lg bg-white shadow-lg">
				<div class="p-5 text-center">
					<div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
						<RoundError class="h-6 w-6 text-red-600" />
					</div>

					<h3 class="mt-3 text-base font-semibold text-gray-900">Oops, this sucks!</h3>
					<p class="mt-2 text-sm text-gray-500">{error}</p>

					<button
						class="mt-4 w-full rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm"
						type="button" onclick={onclick}
					>
						{btnText}
					</button>
				</div>
			</div>
		</div>
	{:else}
		<!-- Small error layout -->
		<div class="relative flex items-center gap-2 rounded-lg border border-red-400 bg-red-100 px-2 py-1 text-[12px] text-red-700">
			<RoundError class="inline h-5 w-5" />
			{error}
		</div>
	{/if}
{/if}
