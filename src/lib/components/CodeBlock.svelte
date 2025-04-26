<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	// Props for the CodeBlock element
	interface Props {
		language?: string;
		code?: string;
		style?: string;
		class?: ClassValue;
		children?: Snippet;
	}

	let { language, code, style, class: className, children }: Props = $props();

	// Default styles for code blocks
	const defaultStyle = `
		background-color: #f6f8fa;
		border-radius: 3px;
		padding: 16px;
		overflow: auto;
		font-family: monospace;
		font-size: 14px;
		line-height: 1.45;
		white-space: pre;
	`;

	// Combine default and custom styles
	const combinedStyle = style ? `${defaultStyle} ${style}` : defaultStyle;

	// Extract content from children if provided and no direct code prop
	let childContent = $state('');
	$effect(() => {
		if (!code && children) {
			try {
				// This is a workaround to extract text content from children
				const temp = document.createElement('div');
				temp.innerHTML = children().toString();
				childContent = temp.textContent || '';
			} catch (e) {
				console.error('Error extracting content from children in CodeBlock component', e);
				childContent = '';
			}
		}
	});

	// Get the final code to display
	let finalCode = $state('');
	$effect(() => {
		finalCode = code || childContent;
	});
</script>

<pre style={combinedStyle} class={className}>
	<code class={language ? `language-${language}` : undefined}>
		{finalCode}
	</code>
</pre>
