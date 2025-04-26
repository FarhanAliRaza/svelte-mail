<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	// Props for the HTML element
	let {
		lang = 'en',
		dir = 'ltr',
		children,
		...rest
	} = $props<{
		lang?: string;
		dir?: 'ltr' | 'rtl';
		children: Snippet;
		rest?: HTMLAttributes<HTMLHtmlElement>;
	}>();
</script>

<html {lang} {dir} {...rest}>
	{@render children()}
</html>
