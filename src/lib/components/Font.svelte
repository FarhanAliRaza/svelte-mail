<script lang="ts">
	// Props for the Font element
	interface WebFont {
		url: string;
		format: string;
	}

	interface Props {
		fontFamily: string;
		fallbackFontFamily?: string | string[];
		webFont?: WebFont;
		fontStyle?: string;
		fontWeight?: string | number;
	}

	let {
		fontFamily,
		fallbackFontFamily = 'sans-serif',
		webFont,
		fontStyle = 'normal',
		fontWeight = 400
	}: Props = $props();

	// Build fallback font family string if provided
	const fallbackFonts = Array.isArray(fallbackFontFamily)
		? fallbackFontFamily.join(', ')
		: fallbackFontFamily;
	const altFallbackFont = Array.isArray(fallbackFontFamily)
		? fallbackFontFamily[0]
		: fallbackFontFamily;
	const fullFontFamily = fallbackFonts ? `${fontFamily}, ${fallbackFonts}` : fontFamily;

	// Prepare CSS text for @font-face and global font rule
	const styleText = `
		@font-face {
			font-family: '${fontFamily}';
			font-style: ${fontStyle};
			font-weight: ${fontWeight};
			mso-font-alt: '${altFallbackFont}';
			${webFont ? `src: url('${webFont.url}') format('${webFont.format}');` : ''}
		}
		* {
			font-family: '${fontFamily}', ${fallbackFonts};
		}
	`;
</script>

<!-- <svelte:head>
	<style>
		{styleText}
	</style>
</svelte:head> -->

<!-- <span style="font-family: {fullFontFamily}"></span> -->

{@html `<style>${styleText}</style>`}
