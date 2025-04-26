<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

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

	function marginToStyle({
		m,
		mx,
		my,
		mt,
		mr,
		mb,
		ml
	}: Partial<Props>): Record<string, string | number> {
		const s: Record<string, string | number> = {};
		if (m !== undefined) s['margin'] = addPx(m);
		if (mx !== undefined) {
			s['margin-left'] = addPx(mx);
			s['margin-right'] = addPx(mx);
		}
		if (my !== undefined) {
			s['margin-top'] = addPx(my);
			s['margin-bottom'] = addPx(my);
		}
		if (mt !== undefined) s['margin-top'] = addPx(mt);
		if (mr !== undefined) s['margin-right'] = addPx(mr);
		if (mb !== undefined) s['margin-bottom'] = addPx(mb);
		if (ml !== undefined) s['margin-left'] = addPx(ml);
		return s;
	}
	function addPx(val: string | number) {
		return typeof val === 'number' ? `${val}px` : val;
	}
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
	const mergedStyleObj = { ...marginToStyle({ m, mx, my, mt, mr, mb, ml }), ...mergeStyle(style) };
	const mergedStyle = Object.entries(mergedStyleObj)
		.map(([k, v]) => `${k.replace(/([A-Z])/g, '-$1').toLowerCase()}:${v}`)
		.join(';');
</script>

<svelte:element this={as} style={mergedStyle} {...rest}>
	{#if children}
		{@render children()}
	{/if}
</svelte:element>
