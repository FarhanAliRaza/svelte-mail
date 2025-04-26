<script lang="ts">
	// Remove onMount and direct render call
	// import { onMount } from 'svelte';
	// import { render } from '$lib'; // No longer needed here
	import EmailTemplate from './EmailTemplate.svelte'; // Keep if needed elsewhere, otherwise remove
	// Get the rendered HTML from the load function
	let { data } = $props();
	const emailHtml = data.emailHtml;
	const pricingHtml = data.pricingHtml;
	const githubHtml = data.githubHtml;
	const appleHtml = data.appleHtml;
	const nikeHtml = data.nikeHtml;
	const airbnbHtml = data.airbnbHtml;
	console.log(airbnbHtml);
	// Optional: Log the HTML received from server
	// console.log('Received email HTML from server:', emailHtml);
</script>

<!-- Example Usage -->
<!-- Remove the wrapping div, bind directly to Html component if needed for rendering -->

<!-- Display rendered HTML (optional, for debugging/demonstration) -->
{#if emailHtml}
	<div style="margin-top: 20px; padding: 10px; border: 1px dashed #ccc; background: #eee;">
		<h3 style="margin-top:0;">Rendered HTML Output:</h3>
		<div style="border: 1px solid black; padding: 1em;">
			{@html emailHtml}
		</div>
	</div>
{/if}

{#if 'githubHtml' in data && data.githubHtml}
	<div style="margin-top: 20px; padding: 10px; border: 1px dashed #ccc; background: #eee;">
		<h3 style="margin-top:0;">Rendered HTML Output:</h3>
		<iframe
			style="border: 1px solid black; width: 100%; min-height: 600px; background: white;"
			srcdoc={typeof data.githubHtml === 'string' ? data.githubHtml : data.githubHtml.html}
			title="Github Email Preview"
		></iframe>
	</div>
{/if}

{#if 'appleHtml' in data && data.appleHtml}
	<div style="margin-top: 20px; padding: 10px; border: 1px dashed #ccc; background: #eee;">
		<h3 style="margin-top:0;">Rendered HTML Output:</h3>
		<iframe
			style="border: 1px solid black; width: 100%; min-height: 600px; background: white;"
			srcdoc={typeof data.appleHtml === 'string' ? data.appleHtml : data.appleHtml.html}
			title="Apple Email Preview"
		></iframe>
	</div>
{/if}

{#if 'nikeHtml' in data && data.nikeHtml}
	<div style="margin-top: 20px; padding: 10px; border: 1px dashed #ccc; background: #eee;">
		<h3 style="margin-top:0;">Rendered HTML Output:</h3>
		<iframe
			style="border: 1px solid black; width: 100%; min-height: 600px; background: white;"
			srcdoc={typeof data.nikeHtml === 'string' ? data.nikeHtml : data.nikeHtml.html}
			title="Nike Email Preview"
		></iframe>
	</div>
{/if}

{#if 'airbnbHtml' in data && data.airbnbHtml}
	<div style="margin-top: 20px; padding: 10px; border: 1px dashed #ccc; background: #eee;">
		<h3 style="margin-top:0;">Rendered HTML Output:</h3>
		<iframe
			style="border: 1px solid black; width: 100%; min-height: 600px; background: white;"
			srcdoc={typeof data.airbnbHtml === 'string' ? data.airbnbHtml : data.airbnbHtml.html}
			title="Airbnb Email Preview"
		></iframe>
	</div>
{/if}
