// @vitest-environment node
import { describe, it, expect } from 'vitest';
import Img from './Img.svelte';
import { render } from '../render';

describe('Img component (SSR)', () => {
  it('passes style and other props correctly', async () => {
    const style = { backgroundColor: 'red', border: 'solid 1px black' };
    const result = await render(Img, undefined, {
      alt: 'Cat',
      'data-testid': 'img-test',
      height: '300',
      src: 'cat.jpg',
      style,
      width: '300',
    });
    
    const html = typeof result === 'string' ? result : result.html;
    expect(html).toContain('background-color: red;');
    expect(html).toContain('border: solid 1px black;');
    expect(html).toContain('data-testid="img-test"');
    expect(html).toContain('src="cat.jpg"');
    expect(html).toContain('alt="Cat"');
    expect(html).toMatchSnapshot();
  });

  it('renders correctly with default styles and props', async () => {
    const result = await render(Img, undefined, {
      alt: 'Cat',
      height: '300',
      src: 'cat.jpg',
      width: '300',
    });
    
    const html = typeof result === 'string' ? result : result.html;
    expect(html).toContain('display: block;');
    // expect(html).toContain('outline: none;'); // outline is not supported in email clients
    expect(html).toContain('border: none;');
    expect(html).toContain('text-decoration: none;');
    expect(html).toContain('alt="Cat"');
    expect(html).toContain('src="cat.jpg"');
    expect(html).toContain('height="300"');
    expect(html).toContain('width="300"');
    expect(html).toMatchSnapshot();
  });
}); 