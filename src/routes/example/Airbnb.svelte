<script>
	import Body from '$lib/components/Body.svelte';
	import Button from '$lib/components/Button.svelte';
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

	// Example props (replace with your data or use Svelte props)
	const baseUrl = 'https://demo.react.email';
	const authorName = 'Alex';
	const authorImage = `${baseUrl}/static/airbnb-review-user.jpg`;
	const reviewText = `“Alan was a great guest! Easy communication, the apartment was left
      in great condition, very polite, and respectful of all house rules.
      He’s welcome back anytime and would easily recommend him to any
      host!”`;
	const previewText = `Read ${authorName}'s review`;
</script>

<Html>
	<Head />
	<Body
		style="background-color: #ffffff; font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif;"
	>
		<Preview text={previewText} />
		<Container style="margin: 0 auto; padding: 20px 0 48px; width: 580px; max-width: 100%;">
			<Section>
				<Img src="{baseUrl}/static/airbnb-logo.png" width="96" height="30" alt="Airbnb" />
			</Section>
			<Section>
				<Img
					src={authorImage}
					width="96"
					height="96"
					alt={authorName}
					style="margin: 0 auto 16px auto; border-radius: 50%;"
				/>
			</Section>
			<Section style="padding-bottom: 20px;">
				<Row>
					<Text style="font-size: 32px; line-height: 1.3; font-weight: 700; color: #484848;">
						Here's what {authorName} wrote
					</Text>
					<Text
						style="font-size: 18px; line-height: 1.4; color: #484848; padding: 24px; background-color: #f2f3f3; border-radius: 4px;"
					>
						{reviewText}
					</Text>
					<Text style="font-size: 18px; line-height: 1.4; color: #484848;">
						Now that the review period is over, we’ve posted {authorName}’s review to your Airbnb
						profile.
					</Text>
					<Text style="font-size: 18px; line-height: 1.4; color: #484848; padding-bottom: 16px;">
						While it’s too late to write a review of your own, you can send your feedback to {authorName}
						using your Airbnb message thread.
					</Text>
					<Button
						href="https://www.airbnb.com"
						style="background-color: #ff5a5f; border-radius: 3px; color: #fff; font-size: 18px; padding: 19px 30px; text-decoration: none; text-align: center; display: block;"
					>
						Send My Feedback
					</Button>
				</Row>
			</Section>
			<Hr style="border-color: #cccccc; margin: 20px 0;" />
			<Section>
				<Row>
					<Text style="font-size: 18px; line-height: 1.4; color: #484848; font-weight: 700;">
						Common questions
					</Text>
					<Text>
						<Link
							href="https://www.airbnb.com"
							style="font-size: 18px; line-height: 1.4; color: #ff5a5f; display: block;"
						>
							How do reviews work?
						</Link>
					</Text>
					<Text>
						<Link
							href="https://www.airbnb.com"
							style="font-size: 18px; line-height: 1.4; color: #ff5a5f; display: block;"
						>
							How do star ratings work?
						</Link>
					</Text>
					<Text>
						<Link
							href="https://www.airbnb.com"
							style="font-size: 18px; line-height: 1.4; color: #ff5a5f; display: block;"
						>
							Can I leave a review after 14 days?
						</Link>
					</Text>
					<Hr style="border-color: #cccccc; margin: 20px 0;" />
					<Text style="color: #9ca299; font-size: 14px; margin-bottom: 10px;">
						Airbnb, Inc., 888 Brannan St, San Francisco, CA 94103
					</Text>
					<Link
						href="https://www.airbnb.com"
						style="font-size: 14px; color: #9ca299; text-decoration: underline;"
					>
						Report unsafe behavior
					</Link>
				</Row>
			</Section>
		</Container>
	</Body>
</Html>
