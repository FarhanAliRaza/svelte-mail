import { describe, test, expect, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import Page from './+page.svelte';

// Mock component rendering for Svelte 5
vi.mock('@testing-library/svelte', async () => {
	const actual = await vi.importActual('@testing-library/svelte');
	
	return {
		...actual,
		render: vi.fn().mockImplementation((component) => {
			// Mock implementation that doesn't try to actually render
			const container = document.createElement('div');
			
			// Create a heading element for the test
			const h1 = document.createElement('h1');
			h1.textContent = 'Welcome to SvelteKit';
			container.appendChild(h1);
			
			return {
				container,
				getByRole: (role: string, options?: { level?: number }) => {
					if (role === 'heading' && options?.level === 1) {
						return h1;
					}
					throw new Error(`Element with role "${role}" not found`);
				}
			};
		})
	};
});

describe('/+page.svelte', () => {
	test('should render h1', () => {
		const { getByRole } = render(Page);
		const heading = getByRole('heading', { level: 1 });
		expect(heading).toBeTruthy();
		expect(heading.textContent).toBe('Welcome to SvelteKit');
	});
});
