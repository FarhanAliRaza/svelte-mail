<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue, HTMLAttributes } from 'svelte/elements';
	import { styleToString } from '../utils'; // Import the utility

	// Props for the Column element
	interface Props extends HTMLAttributes<HTMLTableCellElement> {
		class?: ClassValue;
		width?: string;
		style?: string; // Explicitly type style
		children: Snippet;
	}

	let { style, class: className, width, children, ...rest }: Props = $props();

	// Prepare width style if width is provided
	const widthStyle = width ? `width: ${width};` : '';

	// Combine width style and passed style using the utility
	const combinedStyle = styleToString(widthStyle, style);
</script>

<td style={combinedStyle} class={className} {...rest}>
	{@render children()}
</td>
