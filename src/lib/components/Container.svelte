<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLTableAttributes } from 'svelte/elements';

	interface Props extends HTMLTableAttributes {
		children: Snippet;
		[key: string]: any;
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
	<tbody>
		<tr style="width: 100%">
			<td>
				{@render children()}
			</td>
		</tr>
	</tbody>
</table>
