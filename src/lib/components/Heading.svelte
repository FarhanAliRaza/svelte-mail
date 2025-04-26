<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { styleToString } from '../utils';

	interface Props extends Omit<HTMLAttributes<HTMLHeadingElement>, 'style'> {
		as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
		style?: string | Record<string, string | number>;
		m?: string | number;
		mx?: string | number;
		my?: string | number;
		mt?: string | number;
		mr?: string | number;
		mb?: string | number;
		ml?: string | number;
		children?: Snippet;
		[key: string]: any;
	}

	let { as = 'h1', style = {}, m, mx, my, mt, mr, mb, ml, children, ...rest }: Props = $props();

	function addPx(val: string | number): string {
		return typeof val === 'number' ? `${val}px` : val;
	}

	function getMarginStyles({ m, mx, my, mt, mr, mb, ml }: Partial<Props>): string {
		const styles: string[] = [];
		if (m !== undefined) styles.push(`margin: ${addPx(m)};`);
		if (mx !== undefined) {
			styles.push(`margin-left: ${addPx(mx)};`);
			styles.push(`margin-right: ${addPx(mx)};`);
		}
		if (my !== undefined) {
			styles.push(`margin-top: ${addPx(my)};`);
			styles.push(`margin-bottom: ${addPx(my)};`);
		}
		if (mt !== undefined) styles.push(`margin-top: ${addPx(mt)};`);
		if (mr !== undefined) styles.push(`margin-right: ${addPx(mr)};`);
		if (mb !== undefined) styles.push(`margin-bottom: ${addPx(mb)};`);
		if (ml !== undefined) styles.push(`margin-left: ${addPx(ml)};`);
		return styleToString(...styles);
	}

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

	const marginStyles = getMarginStyles({ m, mx, my, mt, mr, mb, ml });
	const normalizedPassedStyle = normalizeStyleProp(style);

	const combinedStyle = styleToString(marginStyles, normalizedPassedStyle);
</script>

<svelte:element this={as} style={combinedStyle} {...rest}>
	{#if children}
		{@render children()}
	{/if}
</svelte:element>
