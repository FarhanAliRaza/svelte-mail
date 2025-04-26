import { svelteTesting } from '@testing-library/svelte/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],

	// --- Build/SSR Configuration ---
	optimizeDeps: {
		// Exclude native dependencies from Vite's dependency pre-bundling.
		exclude: ['@tailwindcss/oxide', 'lightningcss']
	},
	ssr: {
		// Ensure these packages are processed by Vite during SSR
		noExternal: [/^@fontsource\/.*/, '@testing-library/svelte'], 
		// Ensure native dependencies are NOT bundled by Vite for SSR
		external: ['@tailwindcss/oxide', 'lightningcss']
	},
	// Optional, but recommended: Explicitly externalize in Rollup options too
	build: {
		rollupOptions: {
			external: ['@tailwindcss/oxide', 'lightningcss']
		}
	},
	// --- Testing Configuration (Vitest) ---
	test: {
		workspace: [
			{
				extends: './vite.config.ts',
				plugins: [svelteTesting()],
				test: {
					name: 'client',
					environment: 'jsdom',
					clearMocks: true,
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**'],
					setupFiles: ['./vitest-setup-client.ts']
				}
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
