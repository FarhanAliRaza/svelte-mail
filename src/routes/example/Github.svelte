<script lang="ts">
	import Html from '$lib/components/Html.svelte';
	import Head from '$lib/components/Head.svelte';
	import Body from '$lib/components/Body.svelte';
	import Preview from '$lib/components/Preview.svelte';
	import Container from '$lib/components/Container.svelte';
	import Section from '$lib/components/Section.svelte';
	import Img from '$lib/components/Img.svelte';
	import Text from '$lib/components/Text.svelte';
	import Button from '$lib/components/Button.svelte';
	import Link from '$lib/components/Link.svelte';

	// Props
	let { username = 'alanturing' } = $props<{ username?: string }>();

	// Styles
	const main =
		"background-color: #ffffff; color: #24292e; font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji'";
	const container = 'max-width: 480px; margin: 0 auto; padding: 20px 0 48px;';
	const title = 'font-size: 24px; line-height: 1.25; ';
	const section =
		'padding: 24px; border: solid 1px #dedede; border-radius: 5px; text-align: center;';
	const text = 'margin: 0 0 10px 0; text-align: left; ';
	const button =
		'font-size: 14px; background-color: #28a745; color: #fff; line-height: 1.5; border-radius: 0.5em;';
	const links = 'text-align: center;';
	const link = 'color: #0366d6; font-size: 12px;';
	const footer = 'color: #6a737d; font-size: 12px; text-align: center; margin-top: 60px;';

	// You may want to set this to your actual base URL in production
	const baseUrl = '';
	const githubImg = `${baseUrl}/static/github.png`;
</script>

<Html>
	<Head />
	<Body style={main}>
		<Preview text="A fine-grained personal access token has been added to your account" />
		<Container style={container}>
			<Img src={githubImg} width="32" height="32" alt="Github" />

			<Text style={title}>
				<strong>@{username}</strong>, a personal access was created on your account.
			</Text>

			<Section style={section}>
				<Text style="margin: 0 0 10px 0; text-align: left; ">
					Hey <strong>{username}</strong>!
				</Text>
				<Text style={text}>
					A fine-grained personal access token (<Link href="#">resend</Link>) was recently added to
					your account.
				</Text>
				<Button style={button} href="#" padding="12px 24px">View your token</Button>
			</Section>

			<Text style={links}>
				<Link style={link} href="#">Your security audit log</Link> ・
				<Link style={link} href="#">Contact support</Link>
			</Text>

			<Text style={footer}>
				GitHub, Inc. ・88 Colin P Kelly Jr Street ・San Francisco, CA 94107
			</Text>
		</Container>
	</Body>
</Html>
