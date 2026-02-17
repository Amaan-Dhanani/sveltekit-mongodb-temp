<script lang="ts">
	import RoundSuccess from '~icons/ic/baseline-check-circle';
	import type { Props } from '..';
	import { cn } from '$lib/utils';
	import { fade } from 'svelte/transition'; // Added for smooth "fade"

	let { 
		success = $bindable(), 
		big, 
		onclick, 
		btnText, 
		duration,
		divClass = $bindable('w-full'), 
		class: className 
	}: Props = $props();

	let divCls = $state(cn(divClass, className));
	
	$effect(() => {
		divCls = cn(divClass, className);
	});

	// Only runs if success is present AND duration is provided
	$effect(() => {
		if (success && duration && duration > 0) {
			const timer = setTimeout(() => {
				success = ""; 
			}, duration);

			return () => clearTimeout(timer);
		}
	});
</script>

{#if success}
	<!-- transition:fade makes it disappear smoothly -->
	<div transition:fade={{ duration: 500 }}>
		{#if big}
			<div class={divCls}>
				<div class="w-full mx-auto max-w-[290px] overflow-hidden rounded-lg bg-white shadow-lg">
					<div class="p-5 text-center">
						<div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
							<RoundSuccess class="h-6 w-6 text-teal-600" />
						</div>
						<h3 class="mt-3 text-base font-semibold text-gray-900">Yay, you did it!</h3>
						<p class="mt-2 text-sm text-gray-500">{success}</p>
						{#if btnText}
							<button class="mt-4 w-full cursor-pointer rounded-md bg-teal-600 px-4 py-2 text-base font-medium text-white" onclick={onclick}>
								{btnText}
							</button>
						{/if}
					</div>
				</div>
			</div>
		{:else}
			<div class="relative flex items-center gap-2 rounded-lg border border-teal-400 bg-teal-100 px-2 py-1 text-[12px] text-teal-700">
				<RoundSuccess class="inline h-[16px] w-[16px]" />
				{success}
			</div>
		{/if}
	</div>
{/if}
