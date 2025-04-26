<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { styleToString } from '../utils';

	interface Props extends Omit<HTMLAttributes<HTMLHRElement>, 'style'> {
		style?: string | Record<string, string | number>;
		[key: string]: any;
	}

	let { style = {}, ...rest }: Props = $props();

	const defaultStyle = 'width: 100%; border: none; border-top: 1px solid #eaeaea;';

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

<hr style={combinedStyle} {...rest} />
