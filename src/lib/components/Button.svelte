<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue, HTMLAnchorAttributes } from 'svelte/elements';

	/**
	 * Computes optimal font width and space count for MSO padding simulation
	 */
	function computeFontWidthAndSpaceCount(expectedWidth: number) {
		if (expectedWidth === 0) return [0, 0];

		let smallestSpaceCount = 0;
		const maxFontWidth = 5;

		const computeRequiredFontWidth = () => {
			if (smallestSpaceCount > 0) {
				return expectedWidth / smallestSpaceCount / 2;
			}
			return Number.POSITIVE_INFINITY;
		};

		while (computeRequiredFontWidth() > maxFontWidth) {
			smallestSpaceCount++;
		}

		return [computeRequiredFontWidth(), smallestSpaceCount];
	}

	type PaddingType = string | number | undefined;
	function convertToPx(value: PaddingType) {
		if (!value) return 0;
		if (typeof value === 'number') return value;
		const matches = /^([\d.]+)(px|em|rem|%)$/.exec(value);
		if (matches && matches.length === 3) {
			const numValue = Number.parseFloat(matches[1]);
			switch (matches[2]) {
				case 'px':
					return numValue;
				case 'em':
				case 'rem':
					return numValue * 16;
				case '%':
					return (numValue / 100) * 600;
				default:
					return numValue;
			}
		}
		return 0;
	}
	function parsePadding(props: any) {
		let pt = 0,
			pr = 0,
			pb = 0,
			pl = 0;
		let { padding = '', paddingTop, paddingRight, paddingBottom, paddingLeft } = props || {};
		if (typeof padding === 'number') {
			pt = pr = pb = pl = padding;
		} else if (typeof padding === 'string') {
			const values = padding.split(/\s+/);
			switch (values.length) {
				case 1:
					pt = pr = pb = pl = convertToPx(values[0]);
					break;
				case 2:
					pt = pb = convertToPx(values[0]);
					pr = pl = convertToPx(values[1]);
					break;
				case 3:
					pt = convertToPx(values[0]);
					pr = pl = convertToPx(values[1]);
					pb = convertToPx(values[2]);
					break;
				case 4:
					pt = convertToPx(values[0]);
					pr = convertToPx(values[1]);
					pb = convertToPx(values[2]);
					pl = convertToPx(values[3]);
					break;
			}
		}
		return {
			pt: paddingTop ? convertToPx(paddingTop) : pt,
			pr: paddingRight ? convertToPx(paddingRight) : pr,
			pb: paddingBottom ? convertToPx(paddingBottom) : pb,
			pl: paddingLeft ? convertToPx(paddingLeft) : pl
		};
	}

	// Parse padding from style string if present
	function parsePaddingFromStyle(style: string | undefined) {
		if (!style || typeof style !== 'string') return {};
		const result: Record<string, string> = {};
		const regex = /padding(-top|-right|-bottom|-left)?:\s*([^;]+);?/gi;
		let match;
		while ((match = regex.exec(style))) {
			const key = match[1]
				? 'padding' + match[1].replace(/-([a-z])/, (_, c) => c.toUpperCase())
				: 'padding';
			result[key] = match[2].trim();
		}
		return result;
	}

	interface Props extends HTMLAnchorAttributes {
		class?: ClassValue;
		children: Snippet;
		padding?: string | number;
		paddingLeft?: string | number;
		paddingRight?: string | number;
		paddingTop?: string | number;
		paddingBottom?: string | number;
		[key: string]: any;
	}

	let {
		href = '',
		target = '_blank',
		style,
		class: className,
		children,
		padding = 0,
		paddingLeft,
		paddingRight,
		paddingTop,
		paddingBottom,
		...restProps
	}: Props = $props();

	// Parse padding from style string if present
	const stylePadding = parsePaddingFromStyle(style as string | undefined);

	// Use explicit props if provided, otherwise fallback to style-derived values
	const paddingObj = parsePadding({
		padding: padding ?? stylePadding.padding,
		paddingLeft: paddingLeft ?? stylePadding.paddingLeft,
		paddingRight: paddingRight ?? stylePadding.paddingRight,
		paddingTop: paddingTop ?? stylePadding.paddingTop,
		paddingBottom: paddingBottom ?? stylePadding.paddingBottom
	});

	// Individual padding values override the shorthand if provided
	const pt = paddingObj.pt;
	const pr = paddingObj.pr;
	const pb = paddingObj.pb;
	const pl = paddingObj.pl;

	// Calculate vertical spacing for MSO text raise
	const y = pt + pb;
	const pxToPt = (px: number) => Math.floor(px * 0.75);

	const textRaise = pxToPt(y);
	// Calculate font width and space count for MSO padding simulation
	const [plFontWidth, plSpaceCount] = computeFontWidthAndSpaceCount(pl);
	const [prFontWidth, prSpaceCount] = computeFontWidthAndSpaceCount(pr);

	// Build the final style object

	const buttonStyle =
		'line-height: 100%; text-decoration: none; display: inline-block; max-width: 100%; padding: 0px 0px 0px 0px; mso-padding-alt: 0px;';

	// Ensure target="_blank" links are secure
	const rel = target === '_blank' ? 'noopener noreferrer' : undefined;

	// For MSO hack, use unicode 8202 (hair space) for spacing
	const zeroWidthSpace = '&#8202;';
</script>

<a {href} {target} {rel} style="{buttonStyle} {style}" class={className} {...restProps}>
	<span>
		{@html `<!--[if mso]><i style="mso-font-width:${plFontWidth * 100}%;mso-text-raise:${textRaise}" hidden>${zeroWidthSpace.repeat(plSpaceCount)}</i><![endif]-->`}
	</span>
	<span
		style="max-width: 100%; display: inline-block; line-height: 120%; mso-padding-alt: 0px; mso-text-raise: {textRaise}px;"
	>
		{@render children()}
	</span>
	<span>
		{@html `<!--[if mso]><i style="mso-font-width:${prFontWidth * 100}%" hidden>${zeroWidthSpace.repeat(prSpaceCount)}&#8203;</i><![endif]-->`}
	</span>
</a>
