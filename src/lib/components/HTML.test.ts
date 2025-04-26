// @vitest-environment node
import { describe, it, expect } from 'vitest';
import Html from './Html.svelte';
import type { Snippet } from 'svelte';
import { render } from '../render';

// Create a mock snippet function
const createSnippet = (text: string): Snippet => {
  return (() => text) as unknown as Snippet;
};

describe('Html component (SSR)', () => {
  it('renders children correctly', async () => {
    const testMessage = 'Test message';
    const result = await render(Html, undefined, {
      children: createSnippet(testMessage)
    });
    
    const html = typeof result === 'string' ? result : result.html;
    expect(html).toContain('lang="en"');
    expect(html).toContain('dir="ltr"');
    expect(html).toMatchSnapshot();
  });

  it('passes props correctly', async () => {
    const result = await render(Html, undefined, {
      'data-testid': 'html-test',
      dir: 'rtl',
      lang: 'fr',
      children: createSnippet('Content')
    });
    
    const html = typeof result === 'string' ? result : result.html;
    expect(html).toContain('lang="fr"');
    expect(html).toContain('dir="rtl"');
    expect(html).toContain('data-testid="html-test"');
    expect(html).toMatchSnapshot();
  });

  it('renders correctly with default props', async () => {
    const result = await render(Html, undefined, {
      children: createSnippet('')
    });
    
    const html = typeof result === 'string' ? result : result.html;
    expect(html).toContain('html');
    expect(html).toMatchSnapshot();
  });
});
