// @vitest-environment node
import { describe, it, expect } from 'vitest';
import Link from './Link.svelte';
import { render } from '../render';
import { createSnippet } from '../utils/snippet';

describe('Link component (SSR)', () => {
	it('renders children correctly', async () => {
		const testMessage = 'Test message';
		const result = await render(Link, undefined, {
			href: 'https://example.com',
			children: createSnippet(testMessage)
		});

		const html = typeof result === 'string' ? result : result.html;
		expect(html).toContain('href="https://example.com"');
		expect(html).toMatchSnapshot();
	});

	it('passes style and other props correctly', async () => {
		const style = { color: 'red' };
		const result = await render(Link, undefined, {
			href: 'https://example.com',
			style,
			'data-testid': 'link-test',
			children: createSnippet('Test')
		});

		const html = typeof result === 'string' ? result : result.html;
		expect(html).toContain('color: red;');
		expect(html).toContain('data-testid="link-test"');
		expect(html).toMatchSnapshot();
	});

	it('opens in a new tab by default', async () => {
		const result = await render(Link, undefined, {
			href: 'https://example.com',
			children: createSnippet('Test')
		});

		const html = typeof result === 'string' ? result : result.html;
		expect(html).toContain('target="_blank"');
		expect(html).toMatchSnapshot();
	});

	it('renders correctly with all props', async () => {
		const result = await render(Link, undefined, {
			href: 'https://example.com',
			style: { color: 'green' },
			target: '_self',
			children: createSnippet('Example')
		});

		const html = typeof result === 'string' ? result : result.html;
		expect(html).toContain('href="https://example.com"');
		expect(html).toContain('color: green;');
		expect(html).toContain('target="_self"');
		expect(html).toMatchSnapshot();
	});
});
