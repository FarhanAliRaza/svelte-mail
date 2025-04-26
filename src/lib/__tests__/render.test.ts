import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render as renderFunction } from '../render.js';
import type { SvelteComponent } from 'svelte';
import juice from 'juice';
import { render as svelteRender } from 'svelte/server'; // Import the actual function to mock it
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';

// Mock juice for testing
vi.mock('juice', () => {
	return {
		default: vi.fn().mockImplementation((html: string, options: any) => {
			// Simple mock that returns the HTML with a marker indicating it was processed
			// Also save the options for testing
			(juice as any).lastOptions = options;
			return `<!-- juice-processed -->${html}`;
		})
	};
});

// Mock postcss
vi.mock('postcss', () => {
	return {
		default: vi.fn().mockImplementation(() => {
			return {
				process: vi.fn().mockResolvedValue({
					css: '.test-class{color:blue;}'
				})
			};
		})
	};
});

// Define the expected function signature for the mocked Svelte 5 render
type MockedSvelteRender = (
	_component: SvelteComponent<any>,
	_options?: { props?: any }
) => { head: string; body: string };

// Mock svelte/server render
vi.mock('svelte/server', () => {
	return {
		render: vi
			.fn()
			.mockImplementation(
				(_component: any, _options?: { props?: any }): { head: string; body: string } => {
					// Use the return type directly here
					// Default mock implementation, returns head and body
					return {
						body: '<body>Test content</body>',
						head: '<head></head>'
					};
				}
			)
	};
});

// Mock component placeholder (doesn't need to be a real component now)
const MockComponentPlaceholder = {} as SvelteComponent<any>; // Or even just undefined

describe('render function', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		// Clear any saved options
		if ((juice as any).lastOptions) {
			delete (juice as any).lastOptions;
		}
	});

	it('renders a component to HTML', async () => {
		const result = await renderFunction(MockComponentPlaceholder);

		// Should have called the mocked svelteRender
		expect(svelteRender).toHaveBeenCalled();

		// Check if juice was called
		expect(juice).toHaveBeenCalled();

		// Result should include DOCTYPE declaration
		expect(result).toContain('<!DOCTYPE html>');

		// Result should include the processed marker from our juice mock
		expect(result).toContain('<!-- juice-processed -->');
		// Check the basic structure includes head and body from mock svelteRender
		expect(result).toContain('<head></head>');
		expect(result).toContain('<body>Test content</body>');
	});

	it('applies the pretty option', async () => {
		// Override the svelteRender mock for this test only
		vi.mocked(svelteRender).mockImplementationOnce((): any => ({
			body: '<body><div><p>Test content</p></div></body>',
			head: '<head><title>Test</title><meta charset="utf-8"></head>'
		}));

		const result = await renderFunction(MockComponentPlaceholder, { pretty: true });

		// The result should have line breaks and indentation (approximate check)
		expect(result).toContain('\n<head>');
		expect(result).toContain('\n<body>');
		expect(result).toContain('\n<p>');
	});

	it('processes Tailwind CSS when tailwindConfig is provided', async () => {
		// Setup HTML with tailwind classes
		vi.mocked(svelteRender).mockImplementationOnce((): any => ({
			body: '<body><div class="bg-blue-500 text-white p-4">Tailwind styled content</div></body>',
			head: '<head></head>'
		}));

		// Create a simple tailwind config
		const mockTailwindConfig = {
			content: ['./src/**/*.{html,js,svelte,ts}'],
			theme: {
				extend: {}
			}
		};

		await renderFunction(MockComponentPlaceholder, { tailwindConfig: mockTailwindConfig });

		// Verify postcss was called (which means Tailwind processing was attempted)
		expect(postcss).toHaveBeenCalled();

		// Verify the juice function received the generated CSS in extraCss option
		expect((juice as any).lastOptions).toBeDefined();
		expect((juice as any).lastOptions.extraCss).toBeDefined();
		expect((juice as any).lastOptions.extraCss).toBe('.test-class{color:blue;}');
	});

	it('applies CSS inlining via juice options', async () => {
		// Mock svelteRender for this test only
		vi.mocked(svelteRender).mockImplementationOnce((): any => ({
			body: '<body><p>Styled text</p></body>',
			head: '<head></head>'
		}));

		await renderFunction(MockComponentPlaceholder, { tailwindConfig: './tailwind.config.js' });

		// Check if juice was called (basic check)
		expect(juice).toHaveBeenCalled();
	});

	it('combines head and body content correctly', async () => {
		const headContent = '<head><title>Test Email</title><meta charset="utf-8"></head>';
		const bodyContent = '<body><div>Email content</div></body>';

		// Override the svelteRender mock for this test only
		vi.mocked(svelteRender).mockImplementationOnce((): any => ({
			body: bodyContent,
			head: headContent
		}));

		const result = await renderFunction(MockComponentPlaceholder);

		// Result should include the head content from the mocked svelteRender
		expect(result).toContain(headContent);

		// Result should include the body content from the mocked svelteRender
		expect(result).toContain(bodyContent);
	});
});
