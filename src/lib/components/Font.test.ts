// @vitest-environment node
import { describe, it, expect } from 'vitest';
import Font from './Font.svelte';
import { render } from '../render';

describe('Font component (SSR)', () => {
  it('renders with fontFamily and single fallbackFontFamily', async () => {
    const props = {
      fontFamily: 'Arial',
      fallbackFontFamily: 'Helvetica'
    };
    const result = await render(Font, undefined, props);
    const html = typeof result === 'string' ? result : result.html;

    expect(html).toContain(`style="font-family: Arial, Helvetica"`);
    // Note: font-style and font-weight from @font-face are not tested via SSR
    // as the Svelte component injects them client-side.
    expect(html).toMatchSnapshot();
  });

  it('renders with webFont prop (checks font-family span)', async () => {
    const props = {
      fontFamily: 'Example',
      fallbackFontFamily: 'Helvetica',
      webFont: {
        url: 'example.com/font.woff',
        format: 'woff'
      }
    };

    const result = await render(Font, undefined, props);
    const html = typeof result === 'string' ? result : result.html;

    expect(html).toContain(`style="font-family: Example, Helvetica"`);
    // Note: The @font-face rule itself is not present in SSR output.
    expect(html).toMatchSnapshot();
  });

  it('renders with only fontFamily', async () => {
    const props = {
      fontFamily: 'Arial'
    };
    const result = await render(Font, undefined, props);
    const html = typeof result === 'string' ? result : result.html;

    expect(html).toContain(`style="font-family: Arial"`);
    expect(html).toMatchSnapshot();
  });

  // Note: The Svelte component currently doesn't process an array fallbackFontFamily
  // the same way the React version might expect. This test reflects current behavior.
  it('renders with array fallbackFontFamily (current behavior)', async () => {
    const props = {
      fontFamily: 'Arial',
      fallbackFontFamily: ['Helvetica', 'Verdana'] as any // Test current coercion
    };
    const result = await render(Font, undefined, props);
    const html = typeof result === 'string' ? result : result.html;

    // Svelte component coerces array to comma-separated string in current implementation
    expect(html).toContain(`style="font-family: Arial, Helvetica,Verdana"`);
    expect(html).toMatchSnapshot();
  });

  it('renders correctly snapshot', async () => {
    const props = {
      fontFamily: 'Roboto',
      fallbackFontFamily: 'Verdana'
    };
    const result = await render(Font, undefined, props);
    const html = typeof result === 'string' ? result : result.html;
    expect(html).toMatchSnapshot();
  });
});
