<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue, HTMLAttributes, HTMLTableAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLTableAttributes, 'style'> {
		style?: HTMLAttributes<HTMLTableElement>['style'];
		class?: ClassValue;
		children?: Snippet;
	}

	let { style, class: className, children, ...rest }: Props = $props();
</script>

<table
	align="center"
	width="100%"
	border="0"
	cellpadding="0"
	cellspacing="0"
	role="presentation"
	{style}
	class={className}
	{...rest}
>
	<tbody style="width: 100%">
		<tr style="width: 100%">
			{#if children}
				{@render children()}
			{/if}
		</tr>
	</tbody>
</table>
