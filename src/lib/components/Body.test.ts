// @vitest-environment node
import { describe, it, expect } from 'vitest';
import Body from './Body.svelte';
import { render } from '../render';
import { createSnippet } from '../utils/snippet';



describe('Body component (SSR)', () => {
	it('renders children correctly', async () => {
		const testMessage = 'Test message';
		const result = await render(Body, undefined, {
			children: createSnippet(testMessage)
		});

		const html = typeof result === 'string' ? result : result.html;
		expect(html).toContain(testMessage);
		expect(html).toMatchSnapshot();
	});

	it('passes style and other props correctly', async () => {
		// Body.svelte expects style as a string
		const styleString = 'background-color:red';
		const result = await render(Body, undefined, {
			'data-testid': 'body-test',
			style: styleString,
			children: createSnippet('Test')
		});

		const html = typeof result === 'string' ? result : result.html;
		// Check for exact string match as component expects string
		expect(html).toContain(`style="${styleString}"`);
		expect(html).toContain('data-testid="body-test"');
		expect(html).toMatchSnapshot();
	});

	it('renders correctly', async () => {
		const result = await render(Body, undefined, {
			children: createSnippet('Lorem ipsum')
		});
		const html = typeof result === 'string' ? result : result.html;
		console.log(html);
		// Basic check and snapshot
		expect(html).toContain('Lorem ipsum');
		expect(html).toMatchSnapshot();
	});
});
