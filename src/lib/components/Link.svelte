<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLAttributes<HTMLAnchorElement>, 'style' | 'target'> {
		href: string;
		target?: string;
		style?: string | Record<string, string | number>;
		children?: Snippet;
		[key: string]: any;
	}

	let { href, target = '_blank', style = {}, children, ...rest }: Props = $props();

	const defaultStyleObj = {
		color: '#067df7',
		textDecorationLine: 'none'
	};

	function mergeStyle(style: Props['style']): Record<string, string | number> {
		if (typeof style === 'string') {
			return style.split(';').reduce(
				(acc, item) => {
					const [key, value] = item.split(':').map((s) => s.trim());
					if (key && value) acc[key] = value;
					return acc;
				},
				{} as Record<string, string | number>
			);
		}
		return { ...style };
	}

	const mergedStyleObj = { ...defaultStyleObj, ...mergeStyle(style) };
	const mergedStyle = Object.entries(mergedStyleObj)
		.map(([k, v]) => `${k.replace(/([A-Z])/g, '-$1').toLowerCase()}:${v}`)
		.join(';');
</script>

<a {href} {target} style={mergedStyle} {...rest}>
	{#if children}
		{@render children()}
	{/if}
</a>
