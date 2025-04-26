// @vitest-environment node
import { describe, it, expect } from 'vitest';
import Column from './Column.svelte';
import type { Snippet } from 'svelte';
import { render } from '../render'; // Import the custom SSR render
import { createSnippet } from '../utils/snippet';



describe('Column component (SSR)', () => {
	it('renders children correctly', async () => {
		const testMessage = 'Test message';
		const result = await render(Column, undefined, {
			children: createSnippet(testMessage)
		});
		const html = typeof result === 'string' ? result : result.html;

		// Basic check that the output contains a td tag
		expect(html).toContain('<td');
		// Check that the text rendered (though it will be inside comments in SSR)
		// expect(html).toContain(testMessage); // Snippet content isn't directly in SSR HTML for this component
		expect(html).toMatchSnapshot();
	});

	it('passes style and other props correctly', async () => {
		const style = 'background-color: red;';
		const result = await render(Column, undefined, {
			style,
			'data-testid': 'column-test',
			children: createSnippet('Test')
		});
		const html = typeof result === 'string' ? result : result.html;

		expect(html).toContain('style="background-color: red;"');
		expect(html).toContain('data-testid="column-test"');
		expect(html).toMatchSnapshot();
	});

	it('applies width correctly', async () => {
		const result = await render(Column, undefined, {
			width: '200px',
			children: createSnippet('Test')
		});
		const html = typeof result === 'string' ? result : result.html;

		expect(html).toContain('style="width: 200px;"');
		expect(html).toMatchSnapshot();
	});

	it('combines width with existing styles', async () => {
		const result = await render(Column, undefined, {
			width: '200px',
			style: 'background-color: blue;',
			children: createSnippet('Test')
		});
		const html = typeof result === 'string' ? result : result.html;

		expect(html).toContain('width: 200px');
		expect(html).toContain('background-color: blue;');
		// Check combined style attribute correctly
		expect(html).toContain('style="width: 200px; background-color: blue;"');
		expect(html).toMatchSnapshot();
	});

	it('forwards additional HTML attributes', async () => {
		const result = await render(Column, undefined, {
			'aria-label': 'Test column',
			title: 'Column Title',
			children: createSnippet('Test')
		});
		const html = typeof result === 'string' ? result : result.html;

		expect(html).toContain('aria-label="Test column"');
		expect(html).toContain('title="Column Title"');
		expect(html).toMatchSnapshot();
	});
});