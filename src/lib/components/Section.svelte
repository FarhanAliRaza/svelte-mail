<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { styleToString } from '../utils';

	interface Props extends Omit<HTMLAttributes<HTMLTableElement>, 'style' | 'children'> {
		style?: HTMLAttributes<HTMLTableElement>['style'];
		children?: Snippet;
	}

	let { style, children, ...rest }: Props = $props();

	const processedStyle = styleToString(style);
</script>

<table
	align="center"
	width="100%"
	border="0"
	cellpadding="0"
	cellspacing="0"
	role="presentation"
	style={processedStyle}
	{...rest}
>
	<tbody>
		<tr>
			<td>
				{#if children}
					{@render children()}
				{/if}
			</td>
		</tr>
	</tbody>
</table>
