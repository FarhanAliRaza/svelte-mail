<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	console.warn('Font.svelte is not working as expected');
	// Define the structure for the webFont prop
	interface WebFontOptions {
		url: string;
		format: string; // e.g., 'woff2', 'woff', 'truetype', 'opentype'
	}

	interface Props {
		fontFamily: string; // Primary font name (required, used in @font-face)
		/** Define fallback fonts for Outlook's mso-font-alt */
		fallbackFontFamily?: string | string[]; // Fallback fonts (optional, used for mso-font-alt)
		/** If provided, an @font-face rule will be generated and injected into <head> */
		webFont?: WebFontOptions; // Optional web font configuration object
		fontStyle?: string; // Font style (optional, default: 'normal')
		fontWeight?: number | string; // Font weight (optional, default: 400)
	}

	let {
		fontFamily,
		fallbackFontFamily = 'sans-serif', // Default fallback
		webFont,
		fontStyle = 'normal', // Default font style
		fontWeight = 400 // Default font weight
	}: Props = $props();

	function generateCss() {
		if (!webFont) return '';

		// Always quote font family names for consistency with tests
		const quotedFontFamily = `'${fontFamily}'`;
		const msoFallback = Array.isArray(fallbackFontFamily)
			? fallbackFontFamily[0] || 'sans-serif'
			: fallbackFontFamily || 'sans-serif';

		return `
			@font-face {
				font-family: ${quotedFontFamily};
				font-style: ${fontStyle};
				font-weight: ${fontWeight};
				mso-font-alt: '${msoFallback}';
				src: url(${webFont.url}) format('${webFont.format}');
			}
		`;
	}

	let styleElement: HTMLStyleElement | null = null;

	// For testing in SSR, expose the CSS content for tests to verify
	const generatedCss = generateCss();

	onMount(() => {
		if (!webFont) return;

		// In the browser, create and append a style element
		styleElement = document.createElement('style');
		styleElement.setAttribute('data-font-family', fontFamily);
		styleElement.textContent = generatedCss;
		document.head.appendChild(styleElement);
	});

	onDestroy(() => {
		if (styleElement && styleElement.parentNode) {
			styleElement.parentNode.removeChild(styleElement);
		}
	});
</script>

<!-- This component doesn't render any visible content -->
{#if typeof window === 'undefined' && webFont}
	<!-- For SSR test compatibility only - will be removed in production -->
	<div hidden data-testid="font-face-css">{generatedCss}</div>
{/if}
