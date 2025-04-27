import type { Component } from 'svelte';
import { render as svelteRender } from 'svelte/server';
import juice from 'juice';
import { convert, type HtmlToTextOptions } from 'html-to-text';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
// Try to import @tailwindcss/postcss if available (for Tailwind v4+)
let tailwindPostcss: any;
try {
	// Using dynamic import to handle optional dependency
	tailwindPostcss = require('@tailwindcss/postcss');
} catch (e) {
	// Will use default tailwindcss if @tailwindcss/postcss is not available
}
import type { Config as TailwindConfig } from 'tailwindcss';
import path from 'path';
import fs from 'fs';
// import { marked } from 'marked'; // Import if/when needed

/**
 * Represents the options for the render function.
 */
export interface RenderOptions {
	pretty?: boolean; // Format output HTML
	plainText?: boolean; // Generate plain text version
	tailwindConfig?: string | TailwindConfig; // Path or object for Tailwind configuration
	globalStyles?: string; // Add option for global styles (e.g., fonts)
	htmlToTextOptions?: HtmlToTextOptions; // Options for html-to-text
	juiceOptions?: juice.Options; // Options for juice
}

/**
 * Process HTML with Tailwind CSS.
 * Extracts classes, runs them through Tailwind JIT, and returns the generated CSS.
 *
 * @param html The HTML to process
 * @param tailwindConfig Path to tailwind config or config object
 * @returns The generated CSS
 */
async function processTailwind(
	html: string,
	tailwindConfig?: string | TailwindConfig
): Promise<string> {
	// 1. Extract classes from HTML
	const classRegex = /class="([^"]*)"/g;
	const matches = html.matchAll(classRegex);
	const classSet = new Set<string>();

	for (const match of matches) {
		const classes = match[1].split(/\s+/).filter(Boolean);
		classes.forEach((cls) => classSet.add(cls));
	}

	if (classSet.size === 0) {
		return ''; // No Tailwind classes found
	}

	// 2. Create a temporary CSS file that uses the extracted classes
	const safelist = [...classSet];
	const tempCss = safelist.map((cls) => `.${cls} {}`).join('\n');

	// 3. Load the Tailwind config
	let resolvedConfig: Partial<TailwindConfig> = {};

	if (typeof tailwindConfig === 'string') {
		const configPath = path.resolve(process.cwd(), tailwindConfig);

		if (fs.existsSync(configPath)) {
			try {
				// eslint-disable-next-line @typescript-eslint/no-var-requires
				resolvedConfig = require(configPath);
			} catch (error) {
				console.warn(`Failed to load Tailwind config from ${configPath}:`, error);
			}
		} else {
			console.warn(`Tailwind config file not found at ${configPath}`);
		}
	} else if (tailwindConfig) {
		resolvedConfig = tailwindConfig;
	}

	// 4. Process with Tailwind
	try {
		let postcssPlugins;

		// Use @tailwindcss/postcss if available (for Tailwind v4+), otherwise use direct tailwindcss
		if (tailwindPostcss) {
			postcssPlugins = [
				tailwindPostcss({
					content: [{ raw: html, extension: 'html' }],
					...resolvedConfig
				})
			];
		} else {
			postcssPlugins = [
				tailwindcss({
					content: [{ raw: html, extension: 'html' }],
					...resolvedConfig
				} as any)
			];
		}

		// Process the CSS through postcss
		const result = await postcss(postcssPlugins).process(tempCss, { from: undefined });

		return result.css;
	} catch (error) {
		console.error('Failed to process Tailwind CSS:', error);
		return '';
	}
}

/**
 * Generate plain text version from HTML.
 *
 * @param html The HTML to convert
 * @param options Options for html-to-text
 * @returns The plain text version
 */
function generatePlainText(html: string, options?: HtmlToTextOptions): string {
	const defaultOptions: HtmlToTextOptions = {
		selectors: [
			{ selector: 'head', format: 'skip' },
			{ selector: 'img', format: 'skip' },
			{ selector: 'a', options: { hideLinkHrefIfSameAsText: true } }
		],
		wordwrap: 80
	};

	return convert(html, { ...defaultOptions, ...options });
}

// Remove Svelte/React SSR comments from HTML
function removeSsrComments(html: string): string {
	return html
		.replace(/<!---->/g, '')
		.replace(/<!--\[-->/g, '')
		.replace(/<!--\]-->/g, '');
}

// Remove Svelte/React SSR comments from HTML and other artifacts
function cleanupHtml(html: string): string {
	return html
		.replace(/<!---->/g, '') // Svelte empty comment
		.replace(/<!--\[-->/g, '') // Svelte block start comment
		.replace(/<!--\]-->/g, '') // Svelte block end comment
		.replace(/<!--\[!-->/g, '') // Other potential comment artifacts
		.replace(/\s+onload="this\.__e=event"/g, '') // Remove onload handlers
		.replace(/\s+onerror="this\.__e=event"/g, '') // Remove onerror handlers
		.replace(/\s+class(?=\s|>)/g, '') // Remove empty class attributes (like class or class="")
		.replace(/;\s*undefined/g, ''); // Remove trailing undefined in styles
}

/**
 * Renders a Svelte email component to an HTML string.
 *
 * @param component The root Svelte component to render (e.g., Html).
 * @param options Optional rendering configuration.
 * @param props Props to pass to the component
 * @returns The rendered HTML string or an object with html and text properties if plainText is true.
 */
export async function render<Props extends Record<string, any>>(
	component: Component<any>,
	options?: RenderOptions,
	props?: Props
): Promise<string | { html: string; text: string }> {
	// 1. Render the component using Svelte 5 SSR
	// Svelte 5 returns { head, body }
	const { head, body } = svelteRender(component as any, { props });

	// 2. Combine head and body - Assume the component provides <html> tag
	let combinedHtml = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n${head}\n${body}`;

	// 3. Process Tailwind CSS if option is provided
	let tailwindGeneratedCss = '';
	if (options?.tailwindConfig) {
		try {
			tailwindGeneratedCss = await processTailwind(combinedHtml, options.tailwindConfig);
		} catch (error) {
			console.warn('Failed to process Tailwind CSS:', error);
		}
	}

	// Combine Tailwind CSS with other global styles (like fonts)
	const allExtraCss = [options?.globalStyles, tailwindGeneratedCss].filter(Boolean).join('\n');

	// 4. Inline CSS using juice
	const juiceOptions: juice.Options = {
		extraCss: allExtraCss, // Use combined global and Tailwind CSS
		removeStyleTags: true, // Remove other style tags potentially added by Svelte
		...options?.juiceOptions
	};

	const inlinedHtml = juice(combinedHtml, juiceOptions);

	// 5. Apply pretty printing if requested
	let finalHtml = inlinedHtml;
	if (options?.pretty) {
		try {
			// Basic pretty printing (consider a more robust library like prettier if needed)
			finalHtml = inlinedHtml
				.replace(/</g, '\n<')
				.replace(/>/g, '>\n')
				.split('\n')
				.map((line) => line.trim())
				.filter(Boolean)
				.join('\n');
		} catch (error) {
			console.warn('Pretty printing failed:', error);
		}
	}

	// Remove Svelte/React SSR comments
	finalHtml = removeSsrComments(finalHtml);

	// Cleanup HTML artifacts
	finalHtml = cleanupHtml(finalHtml);

	// 6. Generate plain text version if requested
	if (options?.plainText) {
		const plainText = generatePlainText(finalHtml, options.htmlToTextOptions);
		return { html: finalHtml, text: plainText };
	}

	return finalHtml;
}

