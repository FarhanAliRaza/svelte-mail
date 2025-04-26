<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLParagraphElement> {
		as?: string;
		children?: Snippet;
		[key: string]: any;
	}

	let { as = 'p', style, children, ...rest }: Props = $props();

	const defaultStyle = 'font-size: 14px; line-height: 24px; margin: 16px 0;';
</script>

<svelte:element this={as} style={`${defaultStyle} ${style}`} {...rest}>
	{#if children}
		{@render children()}
	{/if}
</svelte:element>
