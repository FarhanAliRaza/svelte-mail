<script lang="ts">
	import Html from '../components/Html.svelte';
	import Head from '../components/Head.svelte';
	import Body from '../components/Body.svelte';
	import Preview from '../components/Preview.svelte';
	import Container from '../components/Container.svelte';
	import Section from '../components/Section.svelte';
	import Img from '../components/Img.svelte';
	import Heading from '../components/Heading.svelte';
	import Text from '../components/Text.svelte';
	import Hr from '../components/Hr.svelte';
	import Link from '../components/Link.svelte';

	// Props - Defaulting to the code used in React example
	let { verificationCode = '596853' } = $props<{ verificationCode?: string }>();

	// Shared font family
	const fontFamily =
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif";

	// Base styles - Match React structure where possible
	const main = 'background-color: #fff; color: #212121;'; // Adjusted background based on react component
	const container = 'padding: 20px; margin: 0 auto; background-color: #eee;'; // React container style
	const coverSection = 'background-color: #fff;'; // React cover section
	const imageSection = `background-color: #252f3d; padding: 20px 0; text-align: center;`; // Use text-align for centering img
	const upperSection = 'padding: 25px 35px;'; // React upper section
	const lowerSection = 'padding: 25px 35px;'; // React lower section

	// Specific element styles - Aligning with React styles
	const logoStyle = 'display: block; margin: 0 auto;'; // For centering the image reliably
	const h1 = `color: #333; font-family: ${fontFamily}; font-size: 20px; font-weight: bold; margin-bottom: 15px;`; // Matched React h1
	const baseText = `color: #333; font-family: ${fontFamily}; font-size: 14px;`; // Base from React 'text'
	const mainText = `${baseText} margin: 24px 0; margin-bottom: 14px;`; // Matched React mainText
	const linkStyle = `color: #2754C5; font-family: ${fontFamily}; font-size: 14px; text-decoration: underline;`; // Matched React link
	const footerText = `${baseText} font-size: 12px; padding: 0 20px; margin: 24px 0;`; // Matched React footerText (added margin from base)

	// Verification code section - Styles based on React's verifyText, codeText, validityText
	const codeSection = 'text-align: center; margin-top: 20px; margin-bottom: 20px;'; // Adjusted margin
	const codeLabel = `${baseText} margin: 0; font-weight: bold; text-align: center;`; // Matched React verifyText
	const codeText = `${baseText} font-weight: bold; font-size: 36px; margin: 10px 0; text-align: center;`; // Matched React codeText
	const codeValidity = `${baseText} margin: 0px; text-align: center;`; // Matched React validityText

	// Disclaimer section - Style based on React's cautionText
	const disclaimerText = `${baseText} margin: 0px;`; // Matched React cautionText

	const logoSrc = 'https://react-email-demo-i1as60qib-resend.vercel.app/static/aws-logo.png';
	const previewText = 'AWS Email Verification';
</script>

<Html>
	<Head>
		<meta content="text/html; charset=UTF-8" http-equiv="content-type" />
		<meta name="x-apple-disable-message-reformatting" />
	</Head>
	<Body style={main}>
		<Preview>{previewText}</Preview>

		<Container style={container}>
			<Section style={coverSection}>
				<Section style={imageSection}>
					<Img src={logoSrc} width="75" height="45" alt="AWS Logo" style={logoStyle} />
				</Section>

				<Section style={upperSection}>
					<Heading style={h1}>Verify your email address</Heading>
					<Text style={mainText}>
						Thanks for starting the new AWS account creation process. We want to make sure it's
						really you. Please enter the following verification code when prompted. If you don't
						want to create an account, you can ignore this message.
					</Text>
					<Section style={codeSection}>
						<Text style={codeLabel}>Verification code</Text>
						<Text style={codeText}>{verificationCode}</Text>
						<Text style={codeValidity}>(This code is valid for 10 minutes)</Text>
					</Section>
				</Section>

				<Hr />

				<Section style={lowerSection}>
					<Text style={disclaimerText}>
						Amazon Web Services will never email you and ask you to disclose or verify your
						password, credit card, or banking account number.
					</Text>
				</Section>
			</Section>

			<Text style={footerText}>
				This message was produced and distributed by Amazon Web Services, Inc., 410 Terry Ave.
				North, Seattle, WA 98109. © 2022, Amazon Web Services, Inc.. All rights reserved. AWS is a
				registered trademark of <Link href="https://amazon.com" target="_blank" style={linkStyle}>
					Amazon.com
				</Link>, Inc. View our <Link href="https://amazon.com" target="_blank" style={linkStyle}>
					privacy policy
				</Link>.
			</Text>
		</Container>
	</Body>
</Html>
