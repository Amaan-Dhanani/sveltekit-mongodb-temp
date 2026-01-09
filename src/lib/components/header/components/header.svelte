<script lang="ts">

    // --- Logic ---
    import { cn } from '$lib/components/utils';
    import type { Props } from "..";
	import { Header } from 'sk-clib';
    
    let {
        children,
        class: className,
        headerClass = $bindable('dark:text-white'),
        ...rest
    }: Props = $props();


    // Setup Header's class
    let headerCls = $state(cn(headerClass, className));
    $effect(() => {
        headerCls = cn(headerClass, className)
    })

</script>

<Header class={ headerCls } {...rest}>
    {@render children?.()}
</Header>

<!--@component
@status
<br>
    KEEP FOR NOW

@history
<br>
    - This is literally a component that already exist on npm package `sk-clib` by GitHub user `TreltaSev`
    - Slightly modifed to add additional styles automatically
    - Made entirely by GitHub user `TreltaSev`
-->

