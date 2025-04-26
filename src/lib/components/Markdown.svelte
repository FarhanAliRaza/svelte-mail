<!-- NOT WORKING -->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';
	import { marked } from 'marked';

	// Props for the Markdown element
	interface Props {
		content?: string;
		style?: string;
		class?: ClassValue;
		children?: Snippet;
	}

	let {
		content,
		style,
		class: className,
		children,
		...rest
	}: Props & Record<string, any> = $props();

	// Get markdown source from content prop or children snippet
	let markdownSource: string = content ?? (children ? children().toString() : '');

	// Synchronously process markdown to HTML for SSR
	let html: string = '';
	if (markdownSource) {
		// Prefer parseSync if available, otherwise assume parse is sync (for SSR)
		if (typeof (marked as any).parseSync === 'function') {
			html = (marked as any).parseSync(markdownSource);
		} else {
			html = marked.parse(markdownSource) as string;
		}
	}
</script>

<!-- Simply output the HTML -->
<div {style} class={className} {...rest}>
	{@html html}
</div>
