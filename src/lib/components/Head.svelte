<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLHeadElement> {
		children?: Snippet;
		[key: string]: any;
	}

	let { children, ...rest }: Props = $props();
</script>

<head {...rest}>
	<meta content="text/html; charset=UTF-8" http-equiv="content-type" />
	<meta name="x-apple-disable-message-reformatting" />
	{#if children}
		{@render children()}
	{/if}
</head>
