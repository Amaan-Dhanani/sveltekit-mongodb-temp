<script lang="ts">
	import { Text } from '$lib/components';
	import { Button } from 'sk-clib';
	import { TextRedactor, CodeInput } from '$lib/components';
</script>

<form action="?/code" class="box-border flex size-full flex-col gap-4">
	<Text bold class="text-center">Verify Code</Text>
	<Text class="text-center text-sm">
		We just emailed a verification code to <TextRedactor class="text-primary"/>. Please check your inbox. If it isn't found, it could be in your
		spam folder.
	</Text>
	<CodeInput classWrapper="pb-[3px]" name="code" />

	<Button class="bg-primary mx-auto mb-4 h-10 w-fit cursor-pointer text-white">Verify</Button>
</form>
