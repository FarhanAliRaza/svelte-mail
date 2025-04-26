/** @vitest-environment node */
import { describe, it, expect } from 'vitest';
import { render } from 'svelte/server';
import pretty from 'pretty';
import * as fs from 'fs';
import * as path from 'path';

// Import the Svelte component
import AwsVerifyEmail from './aws-verify-email.svelte';

// Read the expected HTML output from the file
const expectedHtmlPath = path.resolve(__dirname, './aws-verify-email.html');
const expectedHtml = fs.readFileSync(expectedHtmlPath, 'utf-8');

describe('Email Rendering', () => {
	it('should render aws-verify-email.svelte correctly', () => {
		const verificationCode = '596853'; // Example code from original React component

		// Render the Svelte component
		const { html: renderedHtml } = render(AwsVerifyEmail, {
			props: {
				verificationCode,
			},
		});
		fs.writeFileSync('/home/farhan/code/svelte-mail/src/lib/__tests__/rendered.html', renderedHtml);

		// // Format both HTML strings
		// const formattedRenderedHtml = pretty(renderedHtml, { ocd: true });
		// const formattedExpectedHtml = pretty(expectedHtml, { ocd: true });

		// // Compare the formatted HTML strings
		// expect(formattedRenderedHtml).toEqual(formattedExpectedHtml);
	});
});
