// Re-export your entry components here

// Document Structure Components
export { default as Html } from './components/Html.svelte';
export { default as Head } from './components/Head.svelte';
export { default as Body } from './components/Body.svelte';
export { default as Font } from './components/Font.svelte';

// Layout Components
export { default as Container } from './components/Container.svelte';
export { default as Section } from './components/Section.svelte';
export { default as Row } from './components/Row.svelte';
export { default as Column } from './components/Column.svelte';

// Content Elements
export { default as Text } from './components/Text.svelte';
export { default as Heading } from './components/Heading.svelte';
export { default as Link } from './components/Link.svelte';
export { default as Button } from './components/Button.svelte';
export { default as Img } from './components/Img.svelte';
export { default as Hr } from './components/Hr.svelte';
export { default as Preview } from './components/Preview.svelte';

// Utility/Advanced Content
export { default as Markdown } from './components/Markdown.svelte';
// export { default as CodeBlock } from './components/CodeBlock.svelte';
// export { default as CodeInline } from './components/CodeInline.svelte';

// Re-export render function
export { render, type RenderOptions } from './render.js';
