<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue, HTMLAttributes } from 'svelte/elements';

	// Props for the Body element
	interface Props {
		style?: HTMLAttributes<HTMLBodyElement>['style'];
		class?: ClassValue;
		children: Snippet;
		rest?: HTMLAttributes<HTMLBodyElement>;
	}

	let { style, class: className, children, ...rest }: Props = $props();
</script>

<body {style} class={className} {...rest}>
	{#if children}
		{@render children()}
	{/if}
</body>
