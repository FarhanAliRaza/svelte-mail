import { describe, it, expect } from 'vitest';
import {
	convertToCss,
	generateMediaQueries,
	extractMediaQueriesFromElement,
	parseCssString,
	breakpoints
} from '../media-queries.js';

describe('Media query utilities', () => {
	describe('convertToCss', () => {
		it('converts a CSS properties object to a CSS string', () => {
			const css = {
				backgroundColor: '#ffffff',
				color: '#000000',
				fontSize: '14px'
			};

			const result = convertToCss(css);

			expect(result).toContain('background-color: #ffffff;');
			expect(result).toContain('color: #000000;');
			expect(result).toContain('font-size: 14px;');
		});

		it('returns an empty string for empty or undefined input', () => {
			expect(convertToCss(undefined)).toBe('');
			expect(convertToCss({})).toBe('');
		});
	});

	describe('generateMediaQueries', () => {
		it('generates mobile media query', () => {
			const selector = '.test';
			const options = {
				mobile: {
					width: '100%',
					padding: '10px'
				}
			};

			const result = generateMediaQueries(selector, options);

			expect(result).toContain(`@media (max-width: ${breakpoints.mobile}px)`);
			expect(result).toContain('.test {');
			expect(result).toContain('width: 100%;');
			expect(result).toContain('padding: 10px;');
		});

		it('generates tablet media query', () => {
			const selector = '.test';
			const options = {
				tablet: {
					width: '90%',
					margin: '0 auto'
				}
			};

			const result = generateMediaQueries(selector, options);

			expect(result).toContain(
				`@media (min-width: ${breakpoints.mobile + 1}px) and (max-width: ${breakpoints.tablet}px)`
			);
			expect(result).toContain('.test {');
			expect(result).toContain('width: 90%;');
			expect(result).toContain('margin: 0 auto;');
		});

		it('generates desktop media query', () => {
			const selector = '.test';
			const options = {
				desktop: {
					width: '80%',
					maxWidth: '1200px'
				}
			};

			const result = generateMediaQueries(selector, options);

			expect(result).toContain(`@media (min-width: ${breakpoints.tablet + 1}px)`);
			expect(result).toContain('.test {');
			expect(result).toContain('width: 80%;');
			expect(result).toContain('max-width: 1200px;');
		});

		it('generates dark mode media query', () => {
			const selector = '.test';
			const options = {
				darkMode: {
					backgroundColor: '#121212',
					color: '#ffffff'
				}
			};

			const result = generateMediaQueries(selector, options);

			expect(result).toContain('@media (prefers-color-scheme: dark)');
			expect(result).toContain('.test {');
			expect(result).toContain('background-color: #121212;');
			expect(result).toContain('color: #ffffff;');
		});

		it('generates multiple media queries', () => {
			const selector = '.test';
			const options = {
				mobile: { width: '100%' },
				tablet: { width: '90%' },
				desktop: { width: '80%' },
				darkMode: { backgroundColor: '#121212' }
			};

			const result = generateMediaQueries(selector, options);

			expect(result).toContain(`@media (max-width: ${breakpoints.mobile}px)`);
			expect(result).toContain(
				`@media (min-width: ${breakpoints.mobile + 1}px) and (max-width: ${breakpoints.tablet}px)`
			);
			expect(result).toContain(`@media (min-width: ${breakpoints.tablet + 1}px)`);
			expect(result).toContain('@media (prefers-color-scheme: dark)');
		});
	});

	describe('parseCssString', () => {
		it('parses a CSS string to a CSS properties object', () => {
			const cssString = 'width: 100%; color: red; font-size: 14px;';

			const result = parseCssString(cssString);

			expect(result).toEqual({
				width: '100%',
				color: 'red',
				fontSize: '14px'
			});
		});

		it('handles kebab-case property names', () => {
			const cssString = 'background-color: #ffffff; font-family: Arial, sans-serif;';

			const result = parseCssString(cssString);

			expect(result).toEqual({
				backgroundColor: '#ffffff',
				fontFamily: 'Arial, sans-serif'
			});
		});
	});

	describe('extractMediaQueriesFromElement', () => {
		it('extracts media queries from element attributes', () => {
			const element = document.createElement('div');
			element.setAttribute('data-mq-mobile', 'width: 100%;');
			element.setAttribute('data-mq-dark', 'background-color: #121212;');

			const uniqueId = 'test-id';
			const result = extractMediaQueriesFromElement(element, uniqueId);

			expect(result).toContain(`@media (max-width: ${breakpoints.mobile}px)`);
			expect(result).toContain('#test-id {');
			expect(result).toContain('width: 100%;');

			expect(result).toContain('@media (prefers-color-scheme: dark)');
			expect(result).toContain('background-color: #121212;');

			// Attributes should be removed
			expect(element.hasAttribute('data-mq-mobile')).toBe(false);
			expect(element.hasAttribute('data-mq-dark')).toBe(false);
		});
	});
});
