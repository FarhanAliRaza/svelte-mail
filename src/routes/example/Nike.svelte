<script>
	import Body from '$lib/components/Body.svelte';
	import Column from '$lib/components/Column.svelte';
	import Container from '$lib/components/Container.svelte';
	import Head from '$lib/components/Head.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import Hr from '$lib/components/Hr.svelte';
	import Html from '$lib/components/Html.svelte';
	import Img from '$lib/components/Img.svelte';
	import Link from '$lib/components/Link.svelte';
	import Preview from '$lib/components/Preview.svelte';
	import Row from '$lib/components/Row.svelte';
	import Section from '$lib/components/Section.svelte';
	import Text from '$lib/components/Text.svelte';

	const baseUrl = 'https://demo.react.email';
</script>

<Html>
	<Head />
	<Body
		style="background-color: #ffffff; font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif;"
	>
		<Preview text="Get your order summary, estimated delivery date and more" />
		<Container style="margin: 10px auto; width: 600px; max-width: 100%; border: 1px solid #E5E5E5;">
			<Section style="padding: 22px 40px; background-color: #F7F7F7;">
				<Row>
					<Column>
						<Text style="margin: 0; line-height: 2; font-weight: bold;">Tracking Number</Text>
						<Text style="margin: 12px 0 0 0; font-weight: 500; line-height: 1.4; color: #6F6F6F;"
							>1ZV218970300071628</Text
						>
					</Column>
					<Column>
						<Link
							href="#"
							style="border: 1px solid #929292; font-size: 16px; text-decoration: none; padding: 10px 0px; width: 220px; display: block; text-align: center; font-weight: 500; color: #000; margin-left: auto; margin-right: 0;"
							>Track Package</Link
						>
					</Column>
				</Row>
			</Section>
			<Hr style="border-color: #E5E5E5; margin: 0;" />
			<Section style="padding: 40px 74px; text-align: center;">
				<Img
					src="{baseUrl}/static/nike-logo.png"
					width="66"
					height="22"
					alt="Nike"
					style="margin: auto;"
				/>
				<Heading
					as="h1"
					style="font-size: 32px; line-height: 1.3; font-weight: 700; text-align: center; letter-spacing: -1px; margin: 20px 0 20px 0;"
					>It's On Its Way.</Heading
				>
				<Text style="margin: 0; line-height: 2; color: #747474; font-weight: 500;"
					>You order's is on its way. Use the link above to track its progress.</Text
				>
				<Text style="margin: 0 0 0 0; line-height: 2; color: #747474; font-weight: 500;"
					>We´ve also charged your payment method for the cost of your order and will be removing
					any authorization holds. For payment details, please visit your Orders page on Nike.com or
					in the Nike app.</Text
				>
			</Section>
			<Hr style="border-color: #E5E5E5; margin: 0;" />
			<Section style="padding: 22px 40px;">
				<Text style="margin: 0; font-size: 15px; font-weight: bold;">Shipping to: Alan Turing</Text>
				<Text style="margin: 0; font-size: 14px; color: #747474; font-weight: 500;"
					>2125 Chestnut St, San Francisco, CA 94123</Text
				>
			</Section>
			<Hr style="border-color: #E5E5E5; margin: 0;" />
			<Section
				style="padding-left: 40px; padding-right: 40px; padding-top: 40px; padding-bottom: 40px;"
			>
				<Row>
					<Column>
						<Img
							src="{baseUrl}/static/nike-product.png"
							alt="Brazil 2022/23 Stadium Away Women's Nike Dri-FIT Soccer Jersey"
							style="float: left;"
							width="260"
						/>
					</Column>
					<Column style="vertical-align: top; padding-left: 12px;">
						<Text style="margin: 0; line-height: 2; font-weight: 500;"
							>Brazil 2022/23 Stadium Away Women's Nike Dri-FIT Soccer Jersey</Text
						>
						<Text style="margin: 0; line-height: 2; color: #747474; font-weight: 500;"
							>Size L (12–14)</Text
						>
					</Column>
				</Row>
			</Section>
			<Hr style="border-color: #E5E5E5; margin: 0; " />
			<Section style="padding: 22px 40px; ">
				<Row style="display: inline-flex; margin-bottom: 40px; ">
					<Column style="width: 170px;">
						<Text style="margin: 0; line-height: 2; font-weight: bold;">Order Number</Text>
						<Text style="margin: 12px 0 0 0; font-weight: 500; line-height: 1.4; color: #6F6F6F;"
							>C0106373851</Text
						>
					</Column>
					<Column>
						<Text style="margin: 0; line-height: 2; font-weight: bold;">Order Date</Text>
						<Text style="margin: 12px 0 0 0; font-weight: 500; line-height: 1.4; color: #6F6F6F;"
							>Sep 22, 2022</Text
						>
					</Column>
				</Row>
				<Row>
					<Column style="text-align: center;">
						<Link
							href="#"
							style="border: 1px solid #929292; font-size: 16px; text-decoration: none; padding: 10px 0px; width: 220px; display: block; text-align: center; font-weight: 500; color: #000;"
							>Order Status</Link
						>
					</Column>
				</Row>
			</Section>
			<Hr style="border-color: #E5E5E5; margin: 0;" />
			<Section style="padding-top: 22px; padding-bottom: 22px;">
				<Row>
					<Text
						style="font-size: 32px; line-height: 1.3; font-weight: 700; text-align: center; letter-spacing: -1px;"
						>Top Picks For You</Text
					>
				</Row>
				<Row style="padding: 20px 0;">
					<Column
						style="vertical-align: top; text-align: left; padding-left: 4px; text-align: center;"
					>
						<Img
							src="{baseUrl}/static/nike-recomendation-1.png"
							alt="USWNT 2022/23 Stadium Home"
							width="100%"
						/>
						<Text
							style="margin: 0; font-size: 15px; line-height: 1; padding-left: 10px; padding-right: 10px; padding-top: 12px; font-weight: 500;"
							>USWNT 2022/23 Stadium Home</Text
						>
						<Text
							style="margin: 0; font-size: 15px; line-height: 1; padding-left: 10px; padding-right: 10px; padding-top: 4px; color: #747474;"
							>Women's Nike Dri-FIT Soccer Jersey</Text
						>
					</Column>
					<Column style="vertical-align: top; text-align: left; text-align: center;">
						<Img
							src="{baseUrl}/static/nike-recomendation-2.png"
							alt="Brazil 2022/23 Stadium Goalkeeper"
							width="100%"
						/>
						<Text
							style="margin: 0; font-size: 15px; line-height: 1; padding-left: 10px; padding-right: 10px; padding-top: 12px; font-weight: 500;"
							>Brazil 2022/23 Stadium Goalkeeper</Text
						>
						<Text
							style="margin: 0; font-size: 15px; line-height: 1; padding-left: 10px; padding-right: 10px; padding-top: 4px; color: #747474;"
							>Men's Nike Dri-FIT Short-Sleeve Football Shirt</Text
						>
					</Column>
					<Column style="vertical-align: top; text-align: left; text-align: center;">
						<Img src="{baseUrl}/static/nike-recomendation-4.png" alt="FFF" width="100%" />
						<Text
							style="margin: 0; font-size: 15px; line-height: 1; padding-left: 10px; padding-right: 10px; padding-top: 12px; font-weight: 500;"
							>FFF</Text
						>
						<Text
							style="margin: 0; font-size: 15px; line-height: 1; padding-left: 10px; padding-right: 10px; padding-top: 4px; color: #747474;"
							>Women's Soccer Jacket</Text
						>
					</Column>
					<Column
						style="vertical-align: top; text-align: left; padding-right: 4px; text-align: center;"
					>
						<Img src="{baseUrl}/static/nike-recomendation-4.png" alt="FFF" width="100%" />
						<Text
							style="margin: 0; font-size: 15px; line-height: 1; padding-left: 10px; padding-right: 10px; padding-top: 12px; font-weight: 500;"
							>FFF</Text
						>
						<Text
							style="margin: 0; font-size: 15px; line-height: 1; padding-left: 10px; padding-right: 10px; padding-top: 4px; color: #747474;"
							>Women's Nike Pre-Match Football Top</Text
						>
					</Column>
				</Row>
			</Section>
			<Hr style="border-color: #E5E5E5; margin: 0;" />
			<Section
				style="padding-left: 20px; padding-right: 20px; padding-top: 20px; background-color: #F7F7F7;"
			>
				<Row>
					<Text style="padding-left: 20px; padding-right: 20px; font-weight: bold;">Get Help</Text>
				</Row>
				<Row
					style="padding-top: 22px; padding-bottom: 22px; padding-left: 20px; padding-right: 20px;"
				>
					<Column style="width: 33%;">
						<Link
							href="https://www.nike.com/"
							style="font-size: 13.5px; margin-top: 0; font-weight: 500; color: #000;"
							>Shipping Status</Link
						>
					</Column>
					<Column style="width: 33%;">
						<Link
							href="https://www.nike.com/"
							style="font-size: 13.5px; margin-top: 0; font-weight: 500; color: #000;"
							>Shipping & Delivery</Link
						>
					</Column>
					<Column style="width: 33%;">
						<Link
							href="https://www.nike.com/"
							style="font-size: 13.5px; margin-top: 0; font-weight: 500; color: #000;"
							>Returns & Exchanges</Link
						>
					</Column>
				</Row>
				<Row style="padding-top: 0; padding-bottom: 22px; padding-left: 20px; padding-right: 20px;">
					<Column style="width: 33%;">
						<Link
							href="https://www.nike.com/"
							style="font-size: 13.5px; margin-top: 0; font-weight: 500; color: #000;"
							>How to Return</Link
						>
					</Column>
					<Column style="width: 66%;">
						<Link
							href="https://www.nike.com/"
							style="font-size: 13.5px; margin-top: 0; font-weight: 500; color: #000;"
							>Contact Options</Link
						>
					</Column>
				</Row>
				<Hr style="border-color: #E5E5E5; margin: 0;" />
				<Row
					style="padding-left: 20px; padding-right: 20px; padding-top: 32px; padding-bottom: 22px;"
				>
					<Column style="width: 16px;">
						<Img
							src="{baseUrl}/static/nike-phone.png"
							alt="Nike Phone"
							width="16"
							height="26"
							style="padding-right: 14px;"
						/>
					</Column>
					<Column>
						<Text
							style="font-size: 13.5px; margin-top: 0; font-weight: 500; color: #000; margin-bottom: 0;"
							>1-800-806-6453</Text
						>
					</Column>
					<Column>
						<Text
							style="font-size: 13.5px; margin-top: 0; font-weight: 500; color: #000; margin-bottom: 0;"
							>4 am - 11 pm PT</Text
						>
					</Column>
				</Row>
			</Section>
			<Hr style="border-color: #E5E5E5; margin: 0;" />
			<Section style="padding-top: 22px; padding-bottom: 22px;">
				<Row>
					<Text
						style="font-size: 32px; line-height: 1.3; font-weight: 700; text-align: center; letter-spacing: -1px;"
						>Nike.com</Text
					>
				</Row>
				<Row style="width: 370px; margin: auto; padding-top: 12px;">
					<Column style="text-align: center;"
						><Link href="https://www.nike.com/" style="font-weight: 500; color: #000;">Men</Link
						></Column
					>
					<Column style="text-align: center;"
						><Link href="https://www.nike.com/" style="font-weight: 500; color: #000;">Women</Link
						></Column
					>
					<Column style="text-align: center;"
						><Link href="https://www.nike.com/" style="font-weight: 500; color: #000;">Kids</Link
						></Column
					>
					<Column style="text-align: center;"
						><Link href="https://www.nike.com/" style="font-weight: 500; color: #000;"
							>Customize</Link
						></Column
					>
				</Row>
			</Section>
			<Hr style="border-color: #E5E5E5; margin: 12px 0 0 0;" />
			<Section style="padding-top: 22px; padding-bottom: 22px;">
				<Row style="width: 166px; margin: auto;">
					<Column
						><Text style="margin: 0; color: #AFAFAF; font-size: 13px; text-align: center;"
							>Web Version</Text
						></Column
					>
					<Column
						><Text style="margin: 0; color: #AFAFAF; font-size: 13px; text-align: center;"
							>Privacy Policy</Text
						></Column
					>
				</Row>
				<Row>
					<Text
						style="margin: 0; color: #AFAFAF; font-size: 13px; text-align: center; padding-top: 30px; padding-bottom: 30px;"
						>Please contact us if you have any questions. (If you reply to this email, we won't be
						able to see it.)</Text
					>
				</Row>
				<Row>
					<Text style="margin: 0; color: #AFAFAF; font-size: 13px; text-align: center;"
						>© 2022 Nike, Inc. All Rights Reserved.</Text
					>
				</Row>
				<Row>
					<Text style="margin: 0; color: #AFAFAF; font-size: 13px; text-align: center;"
						>NIKE, INC. One Bowerman Drive, Beaverton, Oregon 97005, USA.</Text
					>
				</Row>
			</Section>
		</Container>
	</Body>
</Html>
