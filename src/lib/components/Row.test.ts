// @vitest-environment node
import { describe, it, expect } from 'vitest';
import Row from './Row.svelte';
import { render } from '../render';
import { createSnippet } from '../utils/snippet';



describe('Row component (SSR)', () => {
  it('renders children correctly', async () => {
    const testMessage = 'Test message';
    const result = await render(Row, undefined, {
      children: createSnippet(testMessage)
    });
    
    const html = typeof result === 'string' ? result : result.html;
    expect(html).toContain('align="center"');
    expect(html).toContain('width="100%"');
    expect(html).toContain('role="presentation"');
    expect(html).toMatchSnapshot();
  });

  it('passes style and other props correctly', async () => {
    const result = await render(Row, undefined, {
      style: 'background-color:red;',
      'data-testid': 'row-test',
      children: createSnippet('Test')
    });
    
    const html = typeof result === 'string' ? result : result.html;
    expect(html).toContain('background-color: red;');
    expect(html).toContain('data-testid="row-test"');
    expect(html).toMatchSnapshot();
  });

  it('renders correctly with no children', async () => {
    const result = await render(Row, undefined, {
      children: undefined
    });
    
    const html = typeof result === 'string' ? result : result.html;
    expect(html).toContain('<table');
    expect(html).toContain('<tbody');
    expect(html).toContain('<tr');
    expect(html).toMatchSnapshot();
  });
}); 