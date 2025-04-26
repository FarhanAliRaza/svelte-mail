// @vitest-environment node
import { describe, it, expect } from 'vitest';
import Hr from './Hr.svelte';
import { render } from '../render';

describe('Hr component (SSR)', () => {
	it('passes styles and other props correctly', async () => {
		const style = {
			width: '50%',
			borderColor: 'black'
		};
		const result = await render(Hr, undefined, {
			style,
			'data-testid': 'hr-test'
		});

		const html = typeof result === 'string' ? result : result.html;
		expect(html).toContain('width: 50%;');
		expect(html).toContain('border-color: black;');
		expect(html).toContain('data-testid="hr-test"');
		expect(html).toMatchSnapshot();
	});

	it('renders correctly with default styles', async () => {
		const result = await render(Hr, undefined, {});

		const html = typeof result === 'string' ? result : result.html;
		expect(html).toContain('width: 100%;');
		expect(html).toContain('border: none;');
		expect(html).toContain('border-top: 1px solid #eaeaea;');
		expect(html).toMatchSnapshot();
	});
});
