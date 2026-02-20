<script lang="ts">
	import { Frame, Flex, Text, Button } from 'sk-clib';
	import { Dropdown, Input, Error } from '$lib/components';
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';

	let { form }: { form: ActionData } = $props();
	const dbData = (form?.databaseContents || {}) as Record<string, any[]>;
	const collectionNames = Object.keys(dbData);

	let selectedCollection = $state(collectionNames[0] || '');
	let currentDocs = $derived(dbData[selectedCollection] || []);
</script>

{#if !form?.viewData}
	<form method="POST" action="?/access" class="text-on-surface box-border flex size-full flex-col gap-4" use:enhance>
		<Text bold class="text-center">ADMIN ACCESS ONLY</Text>
		<Text class="text-center text-sm">This page is not intended for general access. Please navigate away from this page.</Text>
		<Input type="password" class="mb-7" label="Password" name="password" />
		<Button class="bg-seed mx-auto mb-4 h-10 w-fit cursor-pointer text-white">Enter</Button>
	</form>
	<Error duration={3000} error={form?.error} />
{/if}

{#if form?.viewData}
	<Frame class="bg-surface min-h-screen p-4 font-sans text-white">
		<Frame class="mx-auto max-w-full">
			<Flex class="border-outline-variant mb-4 items-center justify-between border-b pb-2">
				<Text lg bold class=" text-primary font-bold">Database Explorer</Text>

				<Flex class="bg-secondary-container items-center gap-2 rounded-full px-3 py-1 text-xs">
					<Dropdown.Menu>
						<Dropdown.Trigger>
							<Button class="text-secondary font-medium tracking-wider">COLLECTION</Button>
						</Dropdown.Trigger>
						<Dropdown.Content class="!w-auto !bg-transparent">
							{#each collectionNames as name}
								<Button
									class="!p-0"
									onclick={() => {
										selectedCollection = name;
									}}
								>
									{name}
								</Button>
							{/each}
						</Dropdown.Content>
					</Dropdown.Menu>

					<span class="text-outline border-outline-variant border-l pl-2">{currentDocs.length} docs</span>
				</Flex>
			</Flex>

			{#if currentDocs.length > 0}
				<Frame class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
					{#each currentDocs as doc}
						<Frame
							class="bg-secondary-container/30 border-outline-variant hover:border-primary/50 flex flex-col overflow-hidden rounded-lg border transition-colors"
						>
				

							<Frame class="bg-secondary-container flex items-center justify-between px-2 py-1">
								<Text class="text-secondary font-mono text-[9px] tracking-tighter uppercase">ID: {doc._id}</Text>
							</Frame>


							<Frame class="flex-grow space-y-1.5 overflow-hidden p-2">
								{#each Object.entries(doc) as [key, value]}
									{#if key !== '_id'}
										<Frame class="flex flex-col text-[10px] leading-tight">
											<Text class="text-tertiary font-bold lowercase opacity-80">{key}</Text>
											<Text class="bg-surface-variant/40 truncate rounded px-1 font-mono text-white">
												{typeof value === 'object' ? JSON.stringify(value) : value}
											</Text>
										</Frame>
									{/if}
								{/each}
							</Frame>
						</Frame>
					{/each}
				</Frame>
			{:else}
				<Frame class="bg-surface-variant/20 border-outline-variant rounded-xl border border-dashed py-20 text-center">
					<p class="text-outline italic">No documents available.</p>
				</Frame>
			{/if}
		</Frame>
	</Frame>
{/if}
