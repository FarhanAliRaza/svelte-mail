<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLTableAttributes } from 'svelte/elements';
	import { styleToString } from '../utils';

	interface Props extends HTMLTableAttributes {
		children: Snippet;
		style?: string;
		[key: string]: any;
	}

	let { style, class: className, children, ...rest }: Props = $props();

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
	class={className}
	{...rest}
>
	<tbody>
		<tr style="width: 100%">
			<td>
				{@render children()}
			</td>
		</tr>
	</tbody>
</table>
