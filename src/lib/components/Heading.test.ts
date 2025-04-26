// @vitest-environment node
import { describe, it, expect } from 'vitest';
import Heading from './Heading.svelte';
import { render } from '../render';
import { createSnippet } from '../utils/snippet';

describe('Heading component (SSR)', () => {
	it('renders with default tag h1', async () => {
		const testMessage = 'Test message';
		const result = await render(Heading, undefined, {
			children: createSnippet(testMessage)
		});

		const html = typeof result === 'string' ? result : result.html;
		// Only verify component structure via snapshot
		expect(html).toMatchSnapshot();
	});

	it('passes style and other props correctly', async () => {
		const style = { backgroundColor: 'red' };
		const result = await render(Heading, undefined, {
			style,
			'data-testid': 'heading-test',
			children: createSnippet('Test')
		});

		const html = typeof result === 'string' ? result : result.html;
		expect(html).toContain('background-color: red;');
		expect(html).toContain('data-testid="heading-test"');
		// Content verification via snapshot
		expect(html).toMatchSnapshot();
	});

	it('renders with as and margin props', async () => {
		const result = await render(Heading, undefined, {
			as: 'h2',
			mx: 4,
			children: createSnippet('Lorem ipsum')
		});

		const html = typeof result === 'string' ? result : result.html;
		// Structural verification via snapshot
		expect(html).toMatchSnapshot();
	});
});
