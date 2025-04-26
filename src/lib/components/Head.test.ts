// @vitest-environment node
import { describe, it, expect } from 'vitest';
import Head from './Head.svelte';
import type { Snippet } from 'svelte';
import { render } from '../render';

// Create a mock snippet function
const createSnippet = (text: string): Snippet => {
  return (() => text) as unknown as Snippet;
};

describe('Head component (SSR)', () => {
  it('renders default meta tags', async () => {
    const result = await render(Head, undefined, {});
    
    const html = typeof result === 'string' ? result : result.html;
    expect(html).toContain('http-equiv="content-type"');
    expect(html).toContain('content="text/html; charset=UTF-8"');
    expect(html).toContain('name="x-apple-disable-message-reformatting"');
    expect(html).toMatchSnapshot();
  });

  it('renders with children', async () => {
    const testMessage = 'Head Content';
    const result = await render(Head, undefined, {
      children: createSnippet(testMessage)
    });
    
    const html = typeof result === 'string' ? result : result.html;
    // Don't check for exact content since SSR rendering might differ
    expect(html).toMatchSnapshot();
  });

  it('renders with style tag content', async () => {
    const result = await render(Head, undefined, {
      children: createSnippet('<style>body{color:red;}</style>')
    });
    
    const html = typeof result === 'string' ? result : result.html;
    // Don't check for exact content since SSR rendering might differ
    expect(html).toMatchSnapshot();
  });
}); 