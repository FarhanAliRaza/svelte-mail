// @vitest-environment node
import { describe, it, expect } from 'vitest';
import Button from './Button.svelte';
import type { Snippet } from 'svelte';
import { render } from '../render';

// Create a mock snippet function
const createSnippet = (text: string): Snippet => {
	return (() => text) as unknown as Snippet;
};

describe('Button component (SSR)', () => {
	it('renders with default props', async () => {
		const result = await render(Button, undefined, {
			href: 'https://example.com',
			children: createSnippet('Click me')
		});
		const html = typeof result === 'string' ? result : result.html;
		expect(html).toContain('href="https://example.com"');
		expect(html).toContain('target="_blank"');
		expect(html).toContain('rel="noopener noreferrer"');
		expect(html).toMatchSnapshot();
	});

	it('applies custom styles and props', async () => {
		const customStyle = 'background-color: #ff0000; color: #ffffff;';
		const result = await render(Button, undefined, {
			href: 'https://example.com',
			children: createSnippet('Click me'),
			backgroundColor: '#ff0000',
			color: '#ffffff',
			borderRadius: '8px',
			width: '200px',
			style: customStyle
		});
		const html = typeof result === 'string' ? result : result.html;
		expect(html).toContain('background-color: #ff0000');
		expect(html).toContain('color: #ffffff');
		expect(html).toContain('width="200px"');
		expect(html).toMatchSnapshot();
	});

	it('forwards additional HTML attributes', async () => {
		const result = await render(Button, undefined, {
			href: 'https://example.com',
			children: createSnippet('Click me'),
			'aria-label': 'Click this button',
			'data-testid': 'test-button',
			title: 'Button Title'
		});
		const html = typeof result === 'string' ? result : result.html;
		expect(html).toContain('aria-label="Click this button"');
		expect(html).toContain('data-testid="test-button"');
		expect(html).toContain('title="Button Title"');
		expect(html).toMatchSnapshot();
	});

	it('renders correctly with padding values from padding prop', async () => {
		const result = await render(Button, undefined, {
			href: 'https://example.com',
			padding: '12px 20px',
			children: createSnippet('Click me')
		});
		const html = typeof result === 'string' ? result : result.html;
		expect(html).toContain('padding: 12px 20px 12px 20px');
		expect(html).toContain('[if mso]');
		expect(html).toContain('mso-text-raise:18');
		expect(html).toMatchSnapshot();
	});

	it('renders correctly with explicit padding values', async () => {
		const result = await render(Button, undefined, {
			href: 'https://example.com',
			paddingTop: '10px',
			paddingRight: '15px',
			paddingBottom: '10px',
			paddingLeft: '15px',
			children: createSnippet('Click me')
		});
		const html = typeof result === 'string' ? result : result.html;
		expect(html).toContain('padding: 10px 15px 10px 15px');
		expect(html).toContain('mso-text-raise:15');
		expect(html).toMatchSnapshot();
	});

	it('renders with no padding when not specified', async () => {
		const result = await render(Button, undefined, {
			href: 'https://example.com',
			children: createSnippet('Click me')
		});
		const html = typeof result === 'string' ? result : result.html;
		expect(html).toContain('padding: 0px 0px 0px 0px');
		expect(html).toContain('mso-font-width:0%');
		expect(html).toMatchSnapshot();
	});

	it('allows overriding default style properties', async () => {
		const overridingStyle = `
      line-height: 150%;
      display: block;
      text-decoration: underline;
      max-width: 50%;
    `;
		const result = await render(Button, undefined, {
			href: 'https://example.com',
			style: overridingStyle,
			children: createSnippet('Click me')
		});
		const html = typeof result === 'string' ? result : result.html;
		expect(html).toContain('line-height: 150%');
		expect(html).toContain('display: block');
		expect(html).toContain('text-decoration: underline');
		expect(html).toContain('max-width: 50%');
		expect(html).toMatchSnapshot();
	});
});
