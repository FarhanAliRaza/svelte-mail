// @vitest-environment node
import { describe, it, expect } from 'vitest';
import Markdown from './Markdown.svelte';
import type { Snippet } from 'svelte';
import { render } from '../render';

// Create a mock snippet function
const createSnippet = (text: string): Snippet => {
  return (() => text) as unknown as Snippet;
};

describe('Markdown component', () => {
  it('renders markdown from content prop', async () => {
    const testMarkdown = '# Heading\nSome **bold** and *italic* text.';
    const result = await render(Markdown, undefined, {
      content: testMarkdown
    });
    const html = typeof result === 'string' ? result : result.html;
    expect(html).toContain('<h1>Heading</h1>');
    expect(html).toContain('<strong>bold</strong>');
    expect(html).toContain('<em>italic</em>');
    expect(html).toMatchSnapshot();
  });

  it('renders markdown from children snippet if no content prop', async () => {
    const testMarkdown = '## Subheading\nA [link](https://example.com).';
    const result = await render(Markdown, undefined, {
      children: createSnippet(testMarkdown)
    });
    const html = typeof result === 'string' ? result : result.html;
    expect(html).toContain('<h2>Subheading</h2>');
    expect(html).toContain('<a href="https://example.com">link</a>');
    expect(html).toMatchSnapshot();
  });

  it('applies style and class props', async () => {
    const styleString = 'color:blue;font-weight:bold;'; // Pass style as string
    const className = 'markdown-class';
    const result = await render(Markdown, undefined, {
      content: 'Text',
      style: styleString, // Use the string here
      class: className
    });
    const html = typeof result === 'string' ? result : result.html;
    expect(html).toContain(`style="${styleString}"`); // Check the exact style string attribute
    expect(html).toContain(`class="${className}"`);
    expect(html).toMatchSnapshot();
  });

  it('forwards additional props', async () => {
    const result = await render(Markdown, undefined, {
      content: 'Text',
      'data-testid': 'markdown-test',
      id: 'markdown-id'
    });
    const html = typeof result === 'string' ? result : result.html;
    expect(html).toContain('data-testid="markdown-test"');
    expect(html).toContain('id="markdown-id"');
    expect(html).toMatchSnapshot();
  });
});
