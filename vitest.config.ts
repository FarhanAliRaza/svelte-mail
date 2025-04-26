import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [svelte({ hot: !process.env.VITEST })],
	test: {
		globals: true,
		environment: 'jsdom', // Changed from happy-dom to jsdom
		setupFiles: ['./vitest-setup.ts'], // Optional setup file
		include: ['src/**/*.{test,spec}.{js,ts}'],
		// Add server configuration
		server: {
			deps: {
				inline: ['@testing-library/svelte', 'svelte']
			}
		}
	}
});
