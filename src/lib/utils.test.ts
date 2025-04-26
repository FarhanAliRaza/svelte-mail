import { describe, it, expect, vi, beforeEach } from 'vitest';
import { styleToString, pxToPt } from './utils';

describe('pxToPt', () => {
	it('should convert pixel string to points', () => {
		expect(pxToPt('16px')).toBe(12);
	});

	it('should convert pixel number to points', () => {
		expect(pxToPt(20)).toBe(15);
	});

	it('should handle zero pixels', () => {
		expect(pxToPt('0px')).toBe(0);
		expect(pxToPt(0)).toBe(0);
	});

	it('should floor the result', () => {
		expect(pxToPt(15)).toBe(11); // 15 * 0.75 = 11.25
	});
});

describe('styleToString', () => {
	const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

	beforeEach(() => {
		consoleWarnSpy.mockClear();
	});

	it('should combine multiple style strings', () => {
		expect(styleToString('color: red;', 'font-size: 16px;')).toBe('color: red; font-size: 16px;');
	});

	it('should handle undefined, null, and false inputs', () => {
		expect(styleToString('color: red;', undefined, 'font-size: 16px;', null, false)).toBe(
			'color: red; font-size: 16px;'
		);
	});

	it('should deduplicate properties, keeping the last one', () => {
		expect(styleToString('color: red; font-size: 12px;', 'color: blue;')).toBe(
			'color: blue; font-size: 12px;'
		);
	});

	it('should normalize camelCase properties to kebab-case', () => {
		expect(styleToString('fontSize: 14px; backgroundColor: white;')).toBe(
			'font-size: 14px; background-color: white;'
		);
	});

	it('should handle mixed casing and deduplication', () => {
		expect(styleToString('fontSize: 14px;', 'font-size: 16px;')).toBe('font-size: 16px;');
	});

	it('should handle empty string inputs', () => {
		expect(styleToString('', 'color: green;', '')).toBe('color: green;');
	});

	it('should return an empty string if all inputs are invalid/empty', () => {
		expect(styleToString('', null, undefined, false)).toBe('');
	});

	it('should handle styles without trailing semicolons', () => {
		expect(styleToString('color: red', 'font-size: 16px')).toBe('color: red; font-size: 16px;');
	});

	it('should ignore unsafe/unsupported properties and warn', () => {
		expect(styleToString('position: absolute; color: red; z-index: 10;')).toBe('color: red;');
		expect(consoleWarnSpy).toHaveBeenCalledWith(
			'[styleToString] Unsupported or unsafe CSS property: "position" will be ignored.'
		);
		expect(consoleWarnSpy).toHaveBeenCalledWith(
			'[styleToString] Unsupported or unsafe CSS property: "z-index" will be ignored.'
		);
	});

	it('should escape potentially dangerous values and warn', () => {
		// Test basic escaping (semicolon removed within value)
		expect(styleToString('color: red; background: blue;')).toBe('color: red; background: blue;');

		// Test removal of expression() and --
		const potentiallyMaliciousStyle =
			'width: expression(alert("XSS")); color: blue; --custom-prop: injection;';
		expect(styleToString(potentiallyMaliciousStyle)).toBe('color: blue;');
		// Check for the new warning about the value, and the existing one for the property
		expect(consoleWarnSpy).toHaveBeenCalledWith(
			'[styleToString] Potentially unsafe value detected (expression): "expression(alert("XSS"))"'
		);
		expect(consoleWarnSpy).toHaveBeenCalledWith(
			'[styleToString] Unsupported or unsafe CSS property: "--custom-prop" will be ignored.'
		);

		// Ensure url() is NOT removed for safe properties like background-image (though background itself might be flagged if complex)
		// Note: `background-image` is not currently in EMAIL_SAFE_PROPERTIES, so this part won't pass yet.
		// expect(styleToString('background-image: url(image.png);')).toBe('background-image: url(image.png);');
	});

	it('should handle invalid declarations and warn', () => {
		expect(styleToString('color red; font-size: 16px', 'invalid-style')).toBe('font-size: 16px;');
		expect(consoleWarnSpy).toHaveBeenCalledWith(
			'[styleToString] Invalid style declaration: "color red"'
		);
		expect(consoleWarnSpy).toHaveBeenCalledWith(
			'[styleToString] Invalid style declaration: "invalid-style"'
		);
	});

	it('should handle outlook specific properties', () => {
		expect(styleToString('mso-padding-alt: 10pt; mso-text-raise: 5pt;')).toBe(
			'mso-padding-alt: 10pt; mso-text-raise: 5pt;'
		);
	});
});
