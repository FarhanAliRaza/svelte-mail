// @vitest-environment node
import { describe, it, expect } from 'vitest';
import Font from './Font.svelte'; // Adjust path if needed
import { render } from '../render'; // Adjust path to your render function

describe('Font component (SSR)', () => {
	it('renders font CSS when webFont prop is provided', async () => {
		const props = {
			fontFamily: 'Roboto',
			fallbackFontFamily: ['Helvetica', 'Arial', 'sans-serif'],
			webFont: {
				url: 'https://fonts.googleapis.com/css2?family=Roboto',
				format: 'woff2'
			},
			fontWeight: 700,
			fontStyle: 'italic'
		};

		// Get the SSR result
		const result = await render(Font, undefined, props);
		console.log(result, 'result');

		// Convert result to string if it's not already
		const html =
			typeof result === 'string'
				? result
				: result && typeof result === 'object' && 'html' in result
					? result.html
					: JSON.stringify(result);

		// Check for the test div that contains the CSS
		expect(html).toContain('data-testid="font-face-css"');

		// Check for expected CSS content
		expect(html).toContain('@font-face');
		expect(html).toContain("font-family: 'Roboto'");
		expect(html).toContain('font-style: italic');
		expect(html).toContain('font-weight: 700');
		expect(html).toContain(
			"src: url(https://fonts.googleapis.com/css2?family=Roboto) format('woff2')"
		);
		expect(html).toContain("mso-font-alt: 'Helvetica'");

		// Snapshot the HTML
		expect(html).toMatchSnapshot();
	});

	it('does not render font CSS when webFont prop is omitted', async () => {
		const props = {
			fontFamily: 'Arial',
			fallbackFontFamily: 'sans-serif' // Single string fallback
		};

		const result = await render(Font, undefined, props);
		const html =
			typeof result === 'string'
				? result
				: result && typeof result === 'object' && 'html' in result
					? result.html
					: JSON.stringify(result);

		// Should NOT contain the font-face CSS test div
		expect(html).not.toContain('data-testid="font-face-css"');
		expect(html).not.toContain('@font-face');

		// Snapshot will show an effectively empty component
		expect(html).toMatchSnapshot();
	});

	it('renders font CSS with defaults and single string fallback', async () => {
		const props = {
			fontFamily: 'Lato',
			fallbackFontFamily: 'Verdana', // Single string fallback
			webFont: {
				url: 'https://example.com/lato.woff2',
				format: 'woff2'
			}
			// fontWeight and fontStyle will use defaults (400, normal)
		};

		const result = await render(Font, undefined, props);
		const html =
			typeof result === 'string'
				? result
				: result && typeof result === 'object' && 'html' in result
					? result.html
					: JSON.stringify(result);

		expect(html).toContain('data-testid="font-face-css"');
		expect(html).toContain('@font-face');
		expect(html).toContain("font-family: 'Lato'");
		expect(html).toContain('font-style: normal'); // Default
		expect(html).toContain('font-weight: 400'); // Default
		expect(html).toContain("src: url(https://example.com/lato.woff2) format('woff2')");
		expect(html).toContain("mso-font-alt: 'Verdana'"); // Check mso-font-alt with string fallback
		expect(html).toMatchSnapshot();
	});

	it('renders font CSS correctly when fontFamily contains spaces', async () => {
		const props = {
			fontFamily: 'Times New Roman', // Font name with spaces
			fallbackFontFamily: 'serif',
			webFont: {
				url: 'https://example.com/times.woff2',
				format: 'woff2'
			}
		};

		const result = await render(Font, undefined, props);
		const html =
			typeof result === 'string'
				? result
				: result && typeof result === 'object' && 'html' in result
					? result.html
					: JSON.stringify(result);

		expect(html).toContain('data-testid="font-face-css"');
		expect(html).toContain('@font-face');
		// Crucially, check that the font-family name is quoted in the CSS
		expect(html).toContain("font-family: 'Times New Roman'");
		expect(html).toContain("mso-font-alt: 'serif'");
		expect(html).toMatchSnapshot();
	});

	it('renders font CSS with minimal props (uses defaults)', async () => {
		const props = {
			fontFamily: 'Open Sans',
			webFont: {
				url: 'https://example.com/opensans.woff2',
				format: 'woff2'
			}
			// No fallbackFontFamily, fontStyle, fontWeight provided
		};

		const result = await render(Font, undefined, props);
		const html =
			typeof result === 'string'
				? result
				: result && typeof result === 'object' && 'html' in result
					? result.html
					: JSON.stringify(result);

		expect(html).toContain('data-testid="font-face-css"');
		expect(html).toContain('@font-face');
		expect(html).toContain("font-family: 'Open Sans'");
		expect(html).toContain('font-style: normal'); // Default
		expect(html).toContain('font-weight: 400'); // Default
		expect(html).toContain("src: url(https://example.com/opensans.woff2) format('woff2')");
		// Check that mso-font-alt uses a generic fallback when none is specified
		expect(html).toContain("mso-font-alt: 'sans-serif'");

		expect(html).toMatchSnapshot();
	});
});
