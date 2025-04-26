<script>
	import Body from '$lib/components/Body.svelte';
	import Column from '$lib/components/Column.svelte';
	import Container from '$lib/components/Container.svelte';
	import Head from '$lib/components/Head.svelte';
	import Hr from '$lib/components/Hr.svelte';
	import Html from '$lib/components/Html.svelte';
	import Img from '$lib/components/Img.svelte';
	import Link from '$lib/components/Link.svelte';
	import Preview from '$lib/components/Preview.svelte';
	import Row from '$lib/components/Row.svelte';
	import Section from '$lib/components/Section.svelte';
	import Text from '$lib/components/Text.svelte';

	// Using a placeholder for the base URL. Replace with your actual static asset path.
	const baseUrl = 'https://demo.react.email/static';

	// Helper function to convert style objects to strings (optional, but can keep code cleaner)
	// For simplicity in this conversion, we'll embed styles directly as strings.
</script>

<Html>
	<Head />
	<Preview text="Apple Receipt" />

	<Body
		style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; background-color: #ffffff;"
	>
		<Container style="margin: 0 auto; padding: 20px 0 48px; width: 660px; max-width: 100%;">
			<Section>
				<Row>
					<Column>
						<Img src="{baseUrl}/apple-logo.png" width="42" height="42" alt="Apple Logo" />
					</Column>

					<Column style="display: table-cell; text-align: right;">
						<Text style="font-size: 32px; font-weight: 300; color: #888888;">Receipt</Text>
					</Column>
				</Row>
			</Section>
			<Section>
				<Text
					style="text-align: center; margin: 36px 0 40px 0; font-size: 14px; font-weight: 500; color: #111111;"
				>
					Save 3% on all your Apple purchases with Apple Card.
					<sup style="font-weight: 300;">1</sup>{' '}
					<Link href="https://www.apple.com/apple-card/" style="color: rgb(0,112,201);">
						Apply and use in minutes
					</Link>
					<sup style="font-weight: 300;">2</sup>
				</Text>
			</Section>
			<Section
				style="border-collapse: collapse; border-spacing: 0px; color: rgb(51,51,51); background-color: rgb(250,250,250); border-radius: 3px; font-size: 12px;"
			>
				<Row style="min-height: 46px;">
					<Column>
						<Section>
							<Row>
								<Column
									style="padding-left: 20px; border-style: solid; border-color: white; border-width: 0px 1px 1px 0px; min-height: 44px;"
								>
									<Text
										style="margin: 0; padding: 0; line-height: 1.4; color: rgb(102,102,102); font-size: 10px;"
										>APPLE ID</Text
									>
									<Link
										href="mailto:alan.turing@gmail.com"
										style="font-size: 12px; margin: 0; padding: 0; line-height: 1.4; color: #15c; text-decoration: underline;"
									>
										alan.turing@gmail.com
									</Link>
								</Column>
							</Row>

							<Row>
								<Column
									style="padding-left: 20px; border-style: solid; border-color: white; border-width: 0px 1px 1px 0px; min-height: 44px;"
								>
									<Text
										style="margin: 0; padding: 0; line-height: 1.4; color: rgb(102,102,102); font-size: 10px;"
										>INVOICE DATE</Text
									>
									<Text style="font-size: 12px; margin: 0; padding: 0; line-height: 1.4;"
										>18 Jan 2023</Text
									>
								</Column>
							</Row>

							<Row>
								<Column
									style="padding-left: 20px; border-style: solid; border-color: white; border-width: 0px 1px 1px 0px; min-height: 44px;"
								>
									<Text
										style="margin: 0; padding: 0; line-height: 1.4; color: rgb(102,102,102); font-size: 10px;"
										>ORDER ID</Text
									>
									<Link
										href="https://example.com/order/ML4F5L8522"
										style="font-size: 12px; margin: 0; padding: 0; line-height: 1.4; color: #15c; text-decoration: underline;"
									>
										ML4F5L8522
									</Link>
								</Column>
								<Column
									style="padding-left: 20px; border-style: solid; border-color: white; border-width: 0px 1px 1px 0px; min-height: 44px;"
								>
									<Text
										style="margin: 0; padding: 0; line-height: 1.4; color: rgb(102,102,102); font-size: 10px;"
										>DOCUMENT NO.</Text
									>
									<Text style="font-size: 12px; margin: 0; padding: 0; line-height: 1.4;"
										>186623754793</Text
									>
								</Column>
							</Row>
						</Section>
					</Column>
					<Column
						style="padding-left: 20px; border-style: solid; border-color: white; border-width: 0px 1px 1px 0px; min-height: 44px;"
					>
						<Text
							style="margin: 0; padding: 0; line-height: 1.4; color: rgb(102,102,102); font-size: 10px;"
							>BILLED TO</Text
						>
						<Text style="font-size: 12px; margin: 0; padding: 0; line-height: 1.4;">
							Visa .... 7461 (Apple Pay)
						</Text>
						<Text style="font-size: 12px; margin: 0; padding: 0; line-height: 1.4;"
							>Alan Turing</Text
						>
						<Text style="font-size: 12px; margin: 0; padding: 0; line-height: 1.4;"
							>2125 Chestnut St</Text
						>
						<Text style="font-size: 12px; margin: 0; padding: 0; line-height: 1.4;"
							>San Francisco, CA 94123</Text
						>
						<Text style="font-size: 12px; margin: 0; padding: 0; line-height: 1.4;">USA</Text>
					</Column>
				</Row>
			</Section>
			<Section
				style="border-collapse: collapse; border-spacing: 0px; color: rgb(51,51,51); background-color: rgb(250,250,250); border-radius: 3px; font-size: 12px; margin: 30px 0 15px 0; min-height: 24px;"
			>
				<Text
					style="background: #fafafa; padding-left: 10px; font-size: 14px; font-weight: 500; margin: 0;"
					>App Store</Text
				>
			</Section>
			<Section>
				<Row>
					<Column style="width: 64px;">
						<Img
							src="{baseUrl}/apple-hbo-max-icon.jpeg"
							width="64"
							height="64"
							alt="HBO Max"
							style="margin: 0 0 0 20px; border-radius: 14px; border: 1px solid rgb(242,242,242);"
						/>
					</Column>
					<Column style="padding-left: 22px;">
						<Text
							style="font-size: 12px; font-weight: 600; margin: 0; padding: 0; line-height: 1.4;"
							>HBO Max: Stream TV &amp; Movies</Text
						>
						<Text
							style="font-size: 12px; color: rgb(102,102,102); margin: 0; padding: 0; line-height: 1.4;"
							>HBO Max Ad-Free (Monthly)</Text
						>
						<Text
							style="font-size: 12px; color: rgb(102,102,102); margin: 0; padding: 0; line-height: 1.4;"
							>Renews Aug 20, 2023</Text
						>
						<Link
							href="https://www.apple.com/"
							style="font-size: 12px; color: rgb(0,112,201); text-decoration: none;"
						>
							Write a Review
						</Link>
						<span
							style="margin-left: 4px; margin-right: 4px; color: rgb(51,51,51); font-weight: 200;"
							>|</span
						>
						<Link
							href="https://www.apple.com/"
							style="font-size: 12px; color: rgb(0,112,201); text-decoration: none;"
						>
							Report a Problem
						</Link>
					</Column>

					<Column
						style="display: table-cell; padding: 0px 20px 0px 0px; width: 100px; vertical-align: top; text-align: right;"
					>
						<Text style="font-size: 12px; font-weight: 600; margin: 0;">$14.99</Text>
					</Column>
				</Row>
			</Section>
			<Hr style="margin: 30px 0 0 0; width: 100%; border: none; border-top: 1px solid #eaeaea;" />
			<Section style="text-align: right;">
				<Row>
					<Column style="display: table-cell; text-align: right;">
						<Text
							style="margin: 0; color: rgb(102,102,102); font-size: 10px; font-weight: 600; padding: 0px 30px 0px 0px; text-align: right;"
							>TOTAL</Text
						>
					</Column>
					<Column style="min-height: 48px; border-left: 1px solid rgb(238,238,238);">{''}</Column>
					<Column style="display: table-cell; width: 90px;">
						<Text
							style="margin: 0px 20px 0px 0px; font-size: 16px; font-weight: 600; white-space: nowrap; text-align: right;"
							>$14.99</Text
						>
					</Column>
				</Row>
			</Section>
			<Hr style="margin: 0 0 75px 0; width: 100%; border: none; border-top: 1px solid #eaeaea;" />
			<Section>
				<Row>
					<Column style="text-align: center;">
						<Img
							src="{baseUrl}/apple-card-icon.png"
							width="60"
							height="17"
							alt="Apple Card"
							style="margin: 0 auto;"
						/>
					</Column>
				</Row>
			</Section>
			<Section>
				<Row>
					<Column style="display: block; margin: 15px 0 0 0; text-align: center;">
						<Text style="font-size: 24px; font-weight: 500;"
							>Save 3% on all your Apple purchases.</Text
						>
					</Column>
				</Row>
			</Section>
			<Section>
				<Row>
					<Column style="display: table-cell; margin: 10px 0 0 0; text-align: center;">
						<Link
							href="https://www.apple.com/"
							style="color: rgb(0,126,255); text-decoration: none;"
						>
							<Img
								src="{baseUrl}/apple-wallet.png"
								width="28"
								height="28"
								alt="Apple Wallet"
								style="display: inline-block; padding-right: 8px; vertical-align: middle;"
							/>
							<span
								style="font-size: 14px; font-weight: 400; text-decoration: none; vertical-align: middle;"
								>Apply and use in minutes</span
							>
						</Link>
					</Column>
				</Row>
			</Section>
			<Hr
				style="margin: 65px 0 20px 0; width: 100%; border: none; border-top: 1px solid #eaeaea;"
			/>
			<Text style="font-size: 12px; color: rgb(102,102,102); margin: 0; line-height: 1.2;">
				1. 3% savings is earned as Daily Cash and is transferred to your Apple Cash card when
				transactions post to your Apple Card account. If you do not have an Apple Cash card, Daily
				Cash can be applied by you as a credit on your statement balance. 3% is the total amount of
				Daily Cash earned for these purchases. See the Apple Card Customer Agreement for more
				details on Daily Cash and qualifying transactions.
			</Text>
			<Text style="font-size: 12px; color: rgb(102,102,102); margin: 0; line-height: 1.2;"
				>2. Subject to credit approval.</Text
			>
			<Text style="font-size: 12px; color: rgb(102,102,102); margin: 0; line-height: 1.2;">
				To access and use all the features of Apple Card, you must add Apple Card to Wallet on an
				iPhone or iPad with iOS or iPadOS 13.2 or later. Update to the latest version of iOS or
				iPadOS by going to Settings &gt; General &gt; Software Update. Tap Download and Install.
			</Text>
			<Text style="font-size: 12px; color: rgb(102,102,102); margin: 0; line-height: 1.2;">
				Available for qualifying applicants in the United States.
			</Text>
			<Text style="font-size: 12px; color: rgb(102,102,102); margin: 0; line-height: 1.2;">
				Apple Card is issued by Goldman Sachs Bank USA, Salt Lake City Branch.
			</Text>
			<Text style="font-size: 12px; color: rgb(102,102,102); margin: 0; line-height: 1.2;">
				If you reside in the US territories, please call Goldman Sachs at 877-255-5923 with
				questions about Apple Card.
			</Text>
			<Text
				style="font-size: 12px; color: rgb(102,102,102); margin: 20px 0; line-height: 1.2; text-align: center;"
			>
				Privacy: We use a
				<Link href="https://www.apple.com/" style="color: rgb(0,115,255);">
					{' '}
					Subscriber ID{' '}
				</Link>
				to provide reports to developers.
			</Text>
			<Text
				style="font-size: 12px; color: rgb(102,102,102); margin: 20px 0; line-height: 1.2; text-align: center;"
			>
				Get help with subscriptions and purchases.
				<Link href="https://www.apple.com/" style="color: rgb(0,115,255);">
					Visit Apple Support.
				</Link>
			</Text>
			<Text
				style="font-size: 12px; color: rgb(102,102,102); margin: 20px 0; line-height: 1.2; text-align: center;"
			>
				Learn how to{' '}
				<Link href="https://www.apple.com/" style="color: rgb(0,115,255);">
					manage your password preferences
				</Link>{' '}
				for iTunes, Apple Books, and App Store purchases.
			</Text>

			<Text
				style="font-size: 12px; color: rgb(102,102,102); margin: 20px 0; line-height: 1.2; text-align: center;"
			>
				{' '}
				You have the option to stop receiving email receipts for your subscription renewals. If you have
				opted out, you can still view your receipts in your account under Purchase History. To manage
				receipts or to opt in again, go to{' '}
				<Link href="https://www.apple.com/" style="color: rgb(0,115,255);">Account Settings.</Link>
			</Text>
			<Section>
				<Row>
					<Column style="display: block; margin: 40px 0 0 0;">
						<Img
							src="{baseUrl}/apple-logo.png"
							width="26"
							height="26"
							alt="Apple Card"
							style="margin: 0 auto;"
						/>
					</Column>
				</Row>
			</Section>
			<Text
				style="margin: 8px 0 0 0; text-align: center; font-size: 12px; color: rgb(102,102,102);"
			>
				<Link href="https://www.apple.com/">Account Settings</Link>
				•{' '}
				<Link href="https://www.apple.com/">Terms of Sale</Link> •{' '}
				<Link href="https://www.apple.com/legal/privacy/">
					Privacy Policy{' '}
				</Link>
			</Text>
			<Text
				style="margin: 25px 0 0 0; text-align: center; font-size: 12px; color: rgb(102,102,102);"
			>
				Copyright © 2023 Apple Inc. <br />{' '}
				<Link href="https://www.apple.com/legal/">All rights reserved</Link>
			</Text>
		</Container>
	</Body>
</Html>
