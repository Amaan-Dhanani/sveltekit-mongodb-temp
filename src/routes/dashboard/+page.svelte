<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { Navigation } from '$lib/components';
</script>

<!-- Full screen container -->
<div class="bg-primary fixed inset-0 -z-[100] mt-[100vh] h-[300vh] w-screen overflow-hidden"></div>
<div class="bg-primary mr-[1rem] ml-[1rem] flex min-h-screen flex-col">
	<!-- Header -->
	<h1 class="mb-0 ml-[5px] pt-[86px] text-[32px] font-bold text-white">Hi, {data.name.split(' ')[0]}</h1>
	<p class="mt-0 mb-[10px] ml-[5px] text-[14px] text-white">Welcome back to QuestOwl!</p>
	<!-- Form Section -->
	<div class="dark:bg-secondary mb-[95px] box-border flex flex-grow flex-col gap-4 rounded-t-2xl bg-white px-6 py-8">
		<div class="gap-0 dark:text-white">
			<div class="dark:bg-secondary box-border flex flex-grow flex-col rounded-t-2xl bg-white px-6 py-8">
				<button class="bg-primary mt-[20px] h-12 w-full rounded-xl text-center text-white hover:cursor-pointer"> My Quests </button>
				<button class="bg-primary mt-[20px] h-12 w-full rounded-xl text-center text-white hover:cursor-pointer"> My Classes </button>
				<button class="bg-primary mt-[20px] h-12 w-full rounded-xl text-center text-white hover:cursor-pointer"> Quest Library </button>
				<button class="bg-primary mt-[20px] h-12 w-full rounded-xl text-center text-white hover:cursor-pointer"> Notifications </button>
			</div>
		</div>
	</div>
	<Navigation />
</div>
