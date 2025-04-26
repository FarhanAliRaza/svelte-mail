// @vitest-environment node
import { describe, it, expect } from 'vitest';
import Preview from './Preview.svelte';
import { render } from '../render';

describe('Preview component (SSR)', () => {
  it('renders preview text correctly', async () => {
    const result = await render(Preview, undefined, {
      children: 'Email preview text'
    });
    
    const html = typeof result === 'string' ? result : result.html;
    expect(html).toContain('display:none');
    expect(html).toContain('opacity:0');
    expect(html).toContain('max-height:0');
    expect(html).toContain('max-width:0');
    expect(html).toMatchSnapshot();
  });

  it('renders preview text with array children', async () => {
    const result = await render(Preview, undefined, {
      children: ['Email', ' ', 'preview', ' ', 'text']
    });
    
    const html = typeof result === 'string' ? result : result.html;
    expect(html).toContain('display:none');
    expect(html).toMatchSnapshot();
  });

  it('forwards additional attributes', async () => {
    const result = await render(Preview, undefined, {
      'data-testid': 'preview-test',
      children: 'Preview content'
    });
    
    const html = typeof result === 'string' ? result : result.html;
    expect(html).toContain('data-testid="preview-test"');
    expect(html).toMatchSnapshot();
  });
}); 