<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	const PREVIEW_MAX_LENGTH = 150;
	const whiteSpaceCodes = '\xa0\u200C\u200B\u200D\u200E\u200F\uFEFF';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'style'> {
		text: string;
		style?: string | Record<string, string | number>;
		[key: string]: any;
	}

	let { text = '', style = {}, ...rest }: Props = $props();
	console.log(text, 'Preview Text Prop');
	const defaultStyleObj = {
		display: 'none',
		overflow: 'hidden',
		lineHeight: '1px',
		opacity: 0,
		maxHeight: 0,
		maxWidth: 0
	};

	function mergeStyle(style: Props['style']): Record<string, string | number> {
		if (typeof style === 'string') {
			return style.split(';').reduce(
				(acc, item) => {
					const [key, value] = item.split(':').map((s) => s.trim());
					if (key && value) acc[key] = value;
					return acc;
				},
				{} as Record<string, string | number>
			);
		}
		return { ...style };
	}

	const mergedStyleObj = { ...defaultStyleObj, ...mergeStyle(style) };
	const mergedStyle = Object.entries(mergedStyleObj)
		.map(([k, v]) => `${k.replace(/([A-Z])/g, '-$1').toLowerCase()}:${v}`)
		.join(';');

	function getPreviewText(textInput: string): string {
		return textInput.substring(0, PREVIEW_MAX_LENGTH);
	}

	function renderWhiteSpace(text: string) {
		if (text.length >= PREVIEW_MAX_LENGTH) return '';
		// Use actual unicode chars, not escaped
		return '\xa0\u200C\u200B\u200D\u200E\u200F\uFEFF'
			.replace(/\\u([0-9A-Fa-f]{4})/g, (_, code) => String.fromCharCode(parseInt(code, 16)))
			.replace(/\\x([0-9A-Fa-f]{2})/g, (_, code) => String.fromCharCode(parseInt(code, 16)))
			.repeat(PREVIEW_MAX_LENGTH - text.length);
	}

	const previewTextContent = getPreviewText(text);
	const whiteSpace = renderWhiteSpace(previewTextContent);
</script>

<div style={mergedStyle} {...rest}>
	{previewTextContent}{whiteSpace}
</div>
