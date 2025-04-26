// Type declarations for third-party modules

declare module 'postcss' {
	export default function postcss(plugins?: any[]): any;
}

declare module 'tailwindcss' {
	export default function tailwindcss(config?: any): any;
	export interface Config {
		content?: (string | { raw: string; extension: string })[];
		[key: string]: any;
	}
}

// Add any other module type declarations as needed
