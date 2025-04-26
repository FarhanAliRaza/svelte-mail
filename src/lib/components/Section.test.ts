// @vitest-environment node
import { describe, it, expect } from 'vitest';
import Section from './Section.svelte';
import { render } from '../render';

describe('Section component (SSR)', () => {
	// Note: The Section component uses <slot /> instead of {@render children()},
	// which causes the warning but still works for now

	it('renders correctly', async () => {
		const result = await render(Section, undefined, {});

		const html = typeof result === 'string' ? result : result.html;
		expect(html).toContain('align="center"');
		expect(html).toContain('width="100%"');
		expect(html).toContain('role="presentation"');
		expect(html).toMatchSnapshot();
	});

	it('applies custom styles and classes', async () => {
		const customStyle = 'background-color: #f0f0f0;';
		const customClass = 'custom-section';
		const result = await render(Section, undefined, {
			style: customStyle,
			class: customClass
		});

		const html = typeof result === 'string' ? result : result.html;
		expect(html).toContain('background-color: #f0f0f0;');
		expect(html).toContain('class="custom-section"');
		expect(html).toMatchSnapshot();
	});

	it('forwards additional HTML attributes', async () => {
		const result = await render(Section, undefined, {
			'data-testid': 'section-test',
			title: 'Section Title'
		});

		const html = typeof result === 'string' ? result : result.html;
		expect(html).toContain('data-testid="section-test"');
		expect(html).toContain('title="Section Title"');
		expect(html).toMatchSnapshot();
	});
});
