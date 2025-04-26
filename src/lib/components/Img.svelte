<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { styleToString } from '../utils';

	interface Props
		extends Omit<HTMLAttributes<HTMLImageElement>, 'style' | 'src' | 'alt' | 'width' | 'height'> {
		src: string;
		alt?: string;
		width?: string | number;
		height?: string | number;
		style?: string | Record<string, string | number>;
		[key: string]: any;
	}

	let { src, alt = '', width, height, style = {}, ...rest }: Props = $props();

	const defaultStyle = 'display: block; outline: none; border: none; text-decoration: none;';

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

<img {src} {alt} {width} {height} style={combinedStyle} {...rest} />
