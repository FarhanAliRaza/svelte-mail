<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	// Props for the CodeInline element
	interface Props {
		style?: string;
		class?: ClassValue;
		children: Snippet;
	}

	let { style, class: className, children }: Props = $props();

	// Default styles for inline code
	const defaultStyle = `
		background-color: #f6f8fa;
		border-radius: 3px;
		font-family: monospace;
		font-size: 85%;
		margin: 0;
		padding: 0.2em 0.4em;
	`;

	// Combine default and custom styles
	const combinedStyle = style ? `${defaultStyle} ${style}` : defaultStyle;
</script>

<code style={combinedStyle} class={className}>
	{@render children()}
</code>
