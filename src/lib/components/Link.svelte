<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { styleToString } from '../utils';

	interface Props extends Omit<HTMLAttributes<HTMLAnchorElement>, 'style' | 'target'> {
		href: string;
		target?: string;
		style?: string | Record<string, string | number>;
		children?: Snippet;
		[key: string]: any;
	}

	let { href, target = '_blank', style = {}, children, ...rest }: Props = $props();

	const defaultStyle = 'color: #067df7; text-decoration-line: none;';

	function normalizeStyleProp(styleProp: Props['style']): string | undefined {
		if (typeof styleProp === 'string') {
			return styleProp;
		} else if (typeof styleProp === 'object' && styleProp !== null) {
			return Object.entries(styleProp)
				.map(([key, value]) => `${key}:${value};`)
				.join(' ');
		}
		return undefined;
	}

	const normalizedPassedStyle = normalizeStyleProp(style);

	const combinedStyle = styleToString(defaultStyle, normalizedPassedStyle);
</script>

<a {href} {target} style={combinedStyle} {...rest}>
	{#if children}
		{@render children()}
	{/if}
</a>
