# Svelte Mail Documentation

A powerful email template builder for Svelte applications, inspired by React Email.

## Installation

```bash
pnpm add svelte-mail
```

## Basic Usage

Here's a basic example of how to create an email template:

```svelte
<script>
	import { Html, Head, Body, Container, Section, Text } from 'svelte-mail';
</script>

<Html>
	<Head>
		<title>Welcome Email</title>
	</Head>
	<Body>
		<Container>
			<Section>
				<Text>Hello from Svelte Mail!</Text>
			</Section>
		</Container>
	</Body>
</Html>
```

## Components

### 1. Html Component

The root component for your email template.

```svelte
<Html lang="en" dir="ltr">
	<!-- Your email content -->
</Html>
```

Props:

- `lang`: Language code (default: "en")
- `dir`: Text direction (default: "ltr")

### 2. Head Component

Contains metadata and styles for your email.

```svelte
<Head>
	<title>Email Title</title>
	<Font fontFamily="Arial" fallbackFontFamily={['Helvetica', 'sans-serif']} />
</Head>
```

The Head component automatically includes:

- UTF-8 charset meta tag
- Apple email client formatting meta tag

### 3. Font Component

Add custom fonts to your email. Can be used in two ways:

1. Web Font:

```svelte
<Font
	fontFamily="Roboto"
	fallbackFontFamily={['Helvetica', 'sans-serif']}
	webFont={{
		url: 'https://fonts.googleapis.com/css2?family=Roboto',
		format: 'woff2'
	}}
/>
```

2. System Font:

```svelte
<Font fontFamily="Arial" fallbackFontFamily="sans-serif" />
```

Props:

- `fontFamily`: Primary font name
- `fallbackFontFamily`: String or array of fallback fonts
- `webFont`: Optional web font configuration
- `fontStyle`: Font style (default: "normal")
- `fontWeight`: Font weight (default: 400)

### 4. Body Component

Container for your email content.

```svelte
<Body style="background-color: #f6f9fc;">
	<!-- Email content -->
</Body>
```

### 5. Container Component

A centered wrapper with a maximum width.

```svelte
<Container style="max-width: 600px;">
	<!-- Contained content -->
</Container>
```

### 6. Section Component

A structural component for grouping content.

```svelte
<Section style="padding: 20px 0;">
	<!-- Section content -->
</Section>
```

### 7. Row & Column Components

Create responsive layouts.

```svelte
<Row>
	<Column style="padding: 10px;">
		<Text>Column 1</Text>
	</Column>
	<Column style="padding: 10px;">
		<Text>Column 2</Text>
	</Column>
</Row>
```

### 8. Button Component

Create email-client compatible buttons.

```svelte
<Button href="https://example.com" style="background-color: #000; color: #fff;" padding="12px 20px">
	Click me
</Button>
```

#### Padding Props

- `padding`: Shorthand for all sides. Accepts CSS units: `px`, `em`, `rem`, `%`, or number (pixels).
- `paddingTop`, `paddingRight`, `paddingBottom`, `paddingLeft`: Individual paddings. Accepts same units as above. These override the corresponding value from `padding` if both are provided.

**Examples:**

```svelte
<!-- Shorthand padding (all sides) -->
<Button padding="16px">All sides 16px</Button>

<!-- Vertical | Horizontal -->
<Button padding="10px 24px">10px top/bottom, 24px left/right</Button>

<!-- Top | Horizontal | Bottom -->
<Button padding="8px 20px 12px">8px top, 20px left/right, 12px bottom</Button>

<!-- Top | Right | Bottom | Left -->
<Button padding="8px 16px 12px 24px">8px top, 16px right, 12px bottom, 24px left</Button>

<!-- Mixed units -->
<Button padding="1em 10%">1em top/bottom, 10% left/right</Button>

<!-- Individual overrides -->
<Button padding="12px" paddingLeft="32px">12px all, but 32px left</Button>

<!-- All individual -->
<Button paddingTop="10px" paddingRight="20px" paddingBottom="10px" paddingLeft="20px"
	>Explicit sides</Button
>
```

#### MSO/Outlook Compatibility

- The Button component uses special hacks to simulate padding in Microsoft Outlook (MSO) using invisible elements and `mso-font-width`.
- All padding values are converted to pixels for email compatibility, including `em`, `rem`, and `%` (relative to 600px width).

#### Other Props

- `href`: Button link URL (required)
- `target`: Link target (default: "\_blank")
- `style`: Inline styles (string or object)
- `class`: CSS class
- Any other anchor (`<a>`) attributes

#### Advanced Example

```svelte
<Button
	href="https://example.com"
	style="background: #0070f3; color: #fff; border-radius: 6px;"
	padding="1em 2em"
	paddingLeft="40px"
	target="_self"
	class="my-button"
	aria-label="Special Button"
>
	Advanced Button
</Button>
```

### 9. Text Component

Renders text content with sensible defaults.

```svelte
<Text style="color: #333; font-size: 16px;" as="span">Your text content</Text>
```

Props:

- `as`: HTML element to render (default: "p")
- `style`: Inline styles (string).
- Any other HTML attributes for the element specified by `as`.

Default styles (merged with the provided `style` prop):

- `font-size: 14px`
- `line-height: 24px`
- `margin: 16px 0`

### 10. Link Component

Create styled links.

```svelte
<Link href="https://example.com" style="color: #067df7;">Click here</Link>
```

Props:

- `href`: Required URL
- `target`: Link target (default: "\_blank")
- Default styles:
  - color: "#067df7"
  - textDecorationLine: "none"

### 11. Image Component

Add images with proper email client support.

```svelte
<Img
	src="https://example.com/image.jpg"
	alt="Description"
	width="600"
	height="400"
	style="border-radius: 4px;"
/>
```

Props:

- `src`: Image URL
- `alt`: Alt text
- `width`: Image width
- `height`: Image height
- Default styles:
  - display: "block"
  - outline: "none"
  - border: "none"
  - textDecoration: "none"

**Note on Centering:** Because the `Img` component defaults to `display: block;`, using `text-align: center;` on a parent element (like `<Column>`) will _not_ center the image. To center an image, apply `margin: 0 auto;` directly to the `Img` component's `style` prop:

```svelte
<Img src="..." alt="..." width="100" style="margin: 0 auto;" />
```

**Note on Right Alignment:** If you want to right-align a block-level element (such as a button or a link with `display: block`) inside a `Column`, setting `text-align: right;` on the parent will **not** work. Instead, add `margin-left: auto; margin-right: 0;` to the element's `style` prop:

```svelte
<Link href="#" style="display: block; width: 220px; margin-left: auto; margin-right: 0;">
	Track Package
</Link>
```

### 12. Hr Component

Add horizontal rules.

```svelte
<Hr style="border-color: #e6e6e6;" />
```

Default styles:

- width: "100%"
- border: "none"
- borderTop: "1px solid #eaeaea"

### 13. Heading Component

Create headings with proper styling.

```svelte
<Heading as="h1" style="font-size: 24px;" m="0" mb="20px">Your Heading</Heading>
```

Props:

- `as`: Heading level (h1-h6)
- Margin props: `m`, `mx`, `my`, `mt`, `mr`, `mb`, `ml`

### 14. Preview Component

Adds preview text (preheader) to your email, which appears in the inbox list view of most email clients.

```svelte
<script>
	import { Preview } from 'svelte-mail';
</script>

<Preview text="This text appears in the inbox preview, but not the email body." />
```

Props:

- `text`: The preview text string (required).
- `style`: Optional inline styles (string or object) for the hidden `div` element.

Details:

- The component renders the provided `text` inside a hidden `div`.
- The text is truncated to a maximum of 150 characters (`PREVIEW_MAX_LENGTH`).
- To prevent email clients from showing subsequent email body content in the preview, the component automatically appends invisible whitespace characters (like `&nbsp;`, `&zwnj;`, etc.) to fill the remaining space up to the 150-character limit.

## Complete Example

Here's a complete example of a welcome email:

```svelte
<script>
	import {
		Html,
		Head,
		Font,
		Preview,
		Body,
		Container,
		Section,
		Row,
		Column,
		Heading,
		Text,
		Button,
		Img,
		Hr,
		Link
	} from 'svelte-mail';
</script>

<Html>
	<Head>
		<title>Welcome to Our Service</title>
		<Font
			fontFamily="Roboto"
			fallbackFontFamily={['Helvetica', 'Arial', 'sans-serif']}
			webFont={{
				url: 'https://fonts.googleapis.com/css2?family=Roboto',
				format: 'woff2'
			}}
		/>
	</Head>
	<Preview>Welcome to our platform! We're excited to have you on board.</Preview>
	<Body style="background-color: #f6f9fc; font-family: 'Roboto', Helvetica, Arial, sans-serif;">
		<Container style="max-width: 600px; margin: 0 auto; padding: 20px 0;">
			<Section style="background-color: #ffffff; padding: 40px; border-radius: 4px;">
				<Img
					src="https://example.com/logo.png"
					alt="Company Logo"
					width="150"
					height="50"
					style="margin-bottom: 30px;"
				/>
				<Heading as="h1" style="color: #1a1a1a; font-size: 24px;" mb="20px">
					Welcome aboard!
				</Heading>
				<Text style="color: #4a4a4a; font-size: 16px; line-height: 1.5;" mb="20px">
					We're thrilled to have you as a new member of our community.
				</Text>
				<Button
					href="https://example.com/get-started"
					style="background-color: #0070f3; color: #ffffff; border-radius: 4px;"
					padding="12px 32px"
				>
					Get Started
				</Button>
				<Hr style="margin: 30px 0;" />
				<Row>
					<Column style="padding: 10px;">
						<Text style="color: #666666; font-size: 14px;">
							Need help? <Link href="https://example.com/support">Contact Support</Link>
						</Text>
					</Column>
				</Row>
			</Section>
		</Container>
	</Body>
</Html>
```

## Best Practices

1. Always include fallback fonts for better email client compatibility
2. Use inline styles for maximum email client support
3. Keep images under 600px width for better mobile viewing
4. Test your emails across different email clients
5. Use padding instead of margin when possible
6. Include a text version for every image (alt text)
7. Keep the total email width under 600px
8. Use web-safe colors

## Email Client Compatibility

The components are built with email client compatibility in mind and include specific optimizations for:

- Gmail
- Apple Mail
- Outlook
- Yahoo Mail
- Other major email clients

The components automatically handle:

- MSO (Microsoft Outlook) conditional comments
- Email-safe CSS properties
- Responsive design considerations
- Font fallbacks
- Image handling
