import { render } from '../../lib/render.js'; // Add .js extension
import awsVerifyEmail from '$lib/__tests__/aws-verify-email.svelte';
import Pricing from './Pricing.svelte';
import Github from './Github.svelte';
import Apple from './Apple.svelte';
import Nike from './Nike.svelte';
import Airbnb from './Airbnb.svelte';
// eslint-disable-next-line import/extensions -- SvelteKit $types
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async () => {
	// Render the email template server-side
	// You might want to pass props here if EmailTemplate needs them
	const renderedHtml = await render(awsVerifyEmail as any); // Cast to any to bypass type mismatch
	const pricingHtml = await render(Pricing as any); // Cast to any to bypass type mismatch
	const githubHtml = await render(Github as any); // Cast to any to bypass type mismatch
	const appleHtml = await render(Apple as any); // Cast to any to bypass type mismatch
	const nikeHtml = await render(Nike as any); // Cast to any to bypass type mismatch
	const airbnbHtml = await render(Airbnb as any, { pretty: true }); // Cast to any to bypass type mismatch
	// Pass the rendered HTML to the page component
	return {
		emailHtml: renderedHtml,
		pricingHtml: pricingHtml,
		githubHtml: githubHtml,
		appleHtml: appleHtml,
		nikeHtml: nikeHtml,
		airbnbHtml: airbnbHtml
	};
};
