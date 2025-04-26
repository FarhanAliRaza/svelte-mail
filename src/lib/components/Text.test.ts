// @vitest-environment node
import { describe, it, expect } from 'vitest';
import Text from './Text.svelte';
import type { Snippet } from 'svelte';
import { render } from '../render';
import { createSnippet } from '../utils/snippet';

describe('Text component (SSR)', () => {
	it('renders children correctly', async () => {
		const testMessage = 'Test message';
		const result = await render(Text, undefined, {
			children: createSnippet(testMessage)
		});

		const html = typeof result === 'string' ? result : result.html;
		expect(html).toContain('<p');
		expect(html).toMatchSnapshot();
	});

	it('passes style and other props correctly', async () => {
		const style = { fontSize: '16px' };
		const result = await render(Text, undefined, {
			style,
			'data-testid': 'text-test',
			children: createSnippet('Test')
		});

		const html = typeof result === 'string' ? result : result.html;
		expect(html).toContain('font-size: 14px');
		expect(html).toContain('data-testid="text-test"');
		expect(html).toMatchSnapshot();
	});

	it('renders as span when as="span" is set', async () => {
		const testMessage = 'Span text';
		const result = await render(Text, undefined, {
			as: 'span',
			children: createSnippet(testMessage)
		});

		const html = typeof result === 'string' ? result : result.html;
		expect(html).toContain('<span');
		expect(html).toMatchSnapshot();
	});
});
