import { createRawSnippet, type Snippet } from 'svelte';

// Correctly use createRawSnippet for static text
export const createSnippet = (text: string): Snippet => {
	return createRawSnippet(() => {
		// Factory function (takes no args here)
		return {
			render: () => text // Render method returns the captured text
			// setup is optional for basic SSR mocking
		};
	});
};
