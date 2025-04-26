<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLAttributes<HTMLHRElement>, 'style'> {
		style?: string | Record<string, string | number>;
		[key: string]: any;
	}

	let { style = {}, ...rest }: Props = $props();

	const defaultStyleObj = {
		width: '100%',
		border: 'none',
		borderTop: '1px solid #eaeaea'
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

<hr style={mergedStyle} {...rest} />
