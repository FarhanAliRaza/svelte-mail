<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { styleToString } from '../utils';

	interface Props extends HTMLAttributes<HTMLParagraphElement> {
		as?: string;
		children?: Snippet;
		style?: string;
		[key: string]: any;
	}

	let { as = 'p', style, children, ...rest }: Props = $props();

	const defaultStyle = 'font-size: 14px; line-height: 24px; margin: 16px 0;';

	const combinedStyle = styleToString(defaultStyle, style);
</script>

<svelte:element this={as} style={combinedStyle} {...rest}>
	{#if children}
		{@render children()}
	{/if}
</svelte:element>
