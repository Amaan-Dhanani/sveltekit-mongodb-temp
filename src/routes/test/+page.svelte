<script lang="ts">
	let selection = $state('');
	import { Dropdown } from '$lib/components';
</script>

<Dropdown.Menu>
	<Dropdown.Trigger>
		<Dropdown.Button>Options</Dropdown.Button>
	</Dropdown.Trigger>
	<Dropdown.Content>
		<Dropdown.Button onclick={() => (selection = 'Email Address')}>Change Email</Dropdown.Button>
		<Dropdown.Divider />
		<Dropdown.Button onclick={() => (selection = 'Password')}>Change Password</Dropdown.Button>
	</Dropdown.Content>
</Dropdown.Menu>
