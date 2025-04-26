<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue, HTMLAttributes } from 'svelte/elements';

	// Props for the Column element
	interface Props extends HTMLAttributes<HTMLTableCellElement> {
		class?: ClassValue;
		width?: string;
		children: Snippet;
	}

	let { style, class: className, width, children, ...rest }: Props = $props();

	// Combine width with style if provided
	const combinedStyle = width ? `width: ${width};${style ? ' ' + style : ''}` : style;
</script>

<td style={combinedStyle} class={className} {...rest}>
	{@render children()}
</td>
