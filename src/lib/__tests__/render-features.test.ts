import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '../render.js';
import type {  SvelteComponent } from 'svelte';
import juice from 'juice';
import { convert } from 'html-to-text';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import { render as svelteRender } from 'svelte/server'; // Import to mock
import type { HtmlToTextOptions, SelectorDefinition } from 'html-to-text'; // Import necessary types

// Mock external modules
vi.mock('juice');
vi.mock('postcss');
vi.mock('tailwindcss');

// Mock @tailwindcss/postcss (optional dependency)
const mockTailwindPostcss = vi.fn().mockImplementation(() => 'tailwindcss-postcss-mock-plugin');
vi.mock('@tailwindcss/postcss', () => mockTailwindPostcss);

// Mock html-to-text convert function with smarter logic
vi.mock('html-to-text', async () => {
	const originalModule = await vi.importActual<typeof import('html-to-text')>('html-to-text');
	return {
		...originalModule, // Keep other exports if any
		convert: vi.fn().mockImplementation((html: string, options?: HtmlToTextOptions) => {
			let processedHtml = html;
			// Check if options include skipping the head
			const skipHead = options?.selectors?.some(
				(s: SelectorDefinition) => s.selector === 'head' && s.format === 'skip' // Type s
			);
			
			if (skipHead) {
				// Basic simulation: remove content between <head> tags before stripping all tags
				processedHtml = processedHtml.replace(/<head[^>]*>.*?<\/head>/is, '');
			}
			
			// Simple tag stripping for the rest (or remaining parts)
			return processedHtml.replace(/<[^>]*>/g, '').replace(/\n\s*\n/g, '\n').trim();
		})
	};
});

// Define the expected function signature for the mocked Svelte 5 render
type MockedSvelteRender = (_component: SvelteComponent<any>, _options?: { props?: any }) => { head: string; body: string };

// Mock svelte/server render
vi.mock('svelte/server', () => {
	return {
		render: vi.fn().mockImplementation(
			(_component: SvelteComponent<any>, _options?: { props?: any }): { head: string; body: string } => {
				// Default mock implementation, returns head and body
				return {
					body: '<body>Mock Body <div class="text-red-500">Content</div></body>', // Added a class for tailwind test
					head: '<head><title>Mock Head</title></head>',
				};
			}
		)
	};
});

// Mock component placeholder
const MockComponentPlaceholder = {} as SvelteComponent<any>;

describe('render function extended features', () => {
	const mockTailwindCssOutput = '.text-red-500 { color: red; }';

	beforeEach(() => {
		vi.clearAllMocks();

		// Setup mock implementations for external libs
		vi.mocked(juice).mockImplementation((html, _options) => `<!-- juiced -->${html}`);
		vi.mocked(postcss).mockImplementation(() => ({
			process: vi.fn().mockResolvedValue({ css: mockTailwindCssOutput })
		}));
		vi.mocked(tailwindcss).mockImplementation(() => 'tailwindcss-mock-plugin');
		// No need to create MockComponent here anymore
	});

	it('processes Tailwind CSS when tailwindConfig is provided', async () => {
		// Calling with a tailwind config
		await render(MockComponentPlaceholder, { // Use placeholder
			tailwindConfig: {} // Dummy config to trigger the logic
		});

		// Check if postcss was called (indicating Tailwind processing was attempted)
		expect(postcss).toHaveBeenCalled();

		// Check that juice was called with the generated Tailwind CSS
		expect(juice).toHaveBeenCalledWith(
			expect.stringContaining('<body>Mock Body'), // Check HTML input contains body
			expect.objectContaining({
				extraCss: mockTailwindCssOutput // Check Tailwind CSS was passed
			})
		);
	});

	it('generates plain text version when plainText option is true', async () => {
		const result = await render(MockComponentPlaceholder, { // Use placeholder
			plainText: true
		});

		// Verify that the result is an object with html and text properties
		expect(result).toEqual(
			expect.objectContaining({
				html: expect.any(String),
				text: expect.any(String)
			})
		);

		// Convert function should have been called
		expect(convert).toHaveBeenCalled();

		// The text should have HTML tags removed and contain body content
		if (typeof result !== 'string') {
			expect(result.text).not.toContain('<');
			expect(result.text).not.toContain('>');
			expect(result.text).toContain('Mock Body Content');
			expect(result.text).not.toContain('Mock Head'); // Ensure head content is excluded
		}
	});

	it('applies pretty printing when pretty option is true', async () => {
		const result = await render(MockComponentPlaceholder, { // Use placeholder
			pretty: true
		});

		// Should be a string with newlines (basic check)
		expect(typeof result).toBe('string');
		if (typeof result === 'string') {
			expect(result).toContain('\n');
		}
	});

	it('passes juiceOptions to juice', async () => {
		await render(MockComponentPlaceholder, { // Use placeholder
			juiceOptions: {
				removeStyleTags: false,
				applyStyleTags: true
			}
		});

		// Check that juice was called with the provided options
		expect(juice).toHaveBeenCalledWith(
			expect.any(String),
			expect.objectContaining({
				removeStyleTags: false,
				applyStyleTags: true
			})
		);
	});

	it('passes htmlToTextOptions to html-to-text', async () => {
		const customOptions = {
			wordwrap: 120,
			preserveNewlines: true
		};

		await render(MockComponentPlaceholder, { // Use placeholder
			plainText: true,
			htmlToTextOptions: customOptions
		});

		// Check that convert was called with the provided options
		expect(convert).toHaveBeenCalledWith(
			expect.stringContaining('<!-- juiced -->'), // Check it receives the juiced HTML
			expect.objectContaining(customOptions)
		);
	});
}); 