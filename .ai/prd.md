# Product Requirements Document: svelte-mail (Comprehensive)

**Version:** 1.1
**Date:** 2024-07-26
**Author:** AI Assistant (Gemini)
**Target Framework:** Svelte 5+

## 1. Introduction & Goal

**1.1. Goal:** To create `svelte-mail`, a comprehensive Svelte 5 library that empowers developers to build responsive, well-designed, and feature-rich email templates using idiomatic Svelte components and syntax. This library aims for feature parity with the core component set and rendering capabilities of `react-email`.

**1.2. Problem:** Crafting HTML emails that render consistently and correctly across a wide array of email clients remains a significant development challenge due to fragmented CSS support, rendering engine quirks, and lack of modern tooling. Developers using Svelte lack a dedicated, high-quality library for this purpose that mirrors the capabilities of solutions in other frameworks.

**1.3. Solution:** `svelte-mail` will offer a complete suite of Svelte 5 components representing standard email elements and layouts. It will provide a robust server-side/build-time rendering engine that converts Svelte component hierarchies into optimized, email-client-compatible HTML, featuring automatic CSS inlining, Tailwind CSS support, and Markdown rendering.

## 2. Scope

**2.1. In Scope:**
    *   A full library of Svelte 5 components mirroring the `react-email` component set (structure, content, utility).
    *   A server-side/build-time rendering function (`render`) to convert Svelte components into a single HTML string.
    *   Mandatory, robust CSS inlining within the `render` function.
    *   Integrated support for using Tailwind CSS utility classes on components, processed during rendering.
    *   A `Markdown` component for rendering Markdown content to HTML within emails.
    *   A structure ensuring the library is tree-shakeable.
    *   Clear documentation, examples, and type definitions (TypeScript).
    *   Utilization of Svelte 5 features (runes for reactivity, snippets for content projection) where appropriate for cleaner component logic.

**2.2. Out of Scope (Non-Goals):**
    *   Email sending functionality.
    *   A graphical user interface (GUI) for email building.
    *   Client-side rendering capabilities (focus is on static HTML generation).
    *   Real-time preview within IDEs without a build/server step.
    *   Advanced email interactivity (AMP for Email, etc.).
    *   A standalone CLI tool like `create-email` (though helper scripts within the package are possible).

## 3. Core Requirements

**3.1. R1: Component-Based Email Authoring:** Developers must define email templates by composing the provided Svelte 5 components. Components should accept props via `$props()` for configuration and use snippets (`{@render children()}` for default content, or named snippets like `{@render header()}`) for content projection.

**3.2. R2: High-Fidelity HTML Rendering:** A `render(Component, options?)` function must be provided.
    *   **R2.1:** Takes the root Svelte email component (e.g., `<Html>`) as input.
    *   **R2.2:** Outputs a single, self-contained HTML string suitable for diverse email clients.
    *   **R2.3:** Performs **robust CSS inlining**, converting all relevant styles (from `<style>`, class attributes, potentially Svelte style directives if feasible pre-render) into inline `style` attributes on HTML elements. Must use a reliable inlining library (e.g., `juice`).
    *   **R2.4:** Handles email-specific doctypes and meta tags appropriately.

**3.3. R3: Tree-Shakeable Architecture:** The library must be structured (individual component files, main `index.ts` export) and built (`svelte-package`) to allow consuming applications to effectively tree-shake unused components via their bundler (Vite/Rollup).

**3.4. R4: Comprehensive Styling:**
    *   **R4.1: Inline Styles:** All components must accept a `style` prop for direct inline styling.
    *   **R4.2: Tailwind CSS Integration:** The library must provide a mechanism (likely integrated into the `render` function) to:
        *   Allow users to apply Tailwind utility classes via the `class` prop on components.
        *   Process these classes during rendering (using Tailwind JIT/PostCSS).
        *   Include the generated Tailwind styles in the CSS inlining process. Configuration guidance for user projects is required.
    *   **R4.3: CSS Classes:** Standard CSS classes should be passable via the `class` prop, primarily for targeting by the Tailwind integration or potentially global `<style>` blocks before inlining.

**3.5. R5: Email Client Compatibility:** Generated HTML structure (e.g., using tables for layout) and CSS usage must prioritize compatibility across major email clients (Gmail, Outlook versions, Apple Mail, etc.). Reference [caniemail.com](https://www.caniemail.com/).

**3.6. R6: Markdown Rendering:** A dedicated `<Markdown>` component must be provided to render Markdown syntax (passed as a prop or slot content) into compliant HTML *before* the final rendering and inlining step.

**3.7. R7: Svelte 5 Idioms:** Leverage Svelte 5 features where beneficial. Examples:
    *   Use `let { propName = defaultValue, ...rest } = $props()` for component props (replaces `export let`). Do not use `$$props` or `$$restProps`.
    *   Use `let x = $state(value)` for reactive state.
    *   Use `let derivedValue = $derived(expression)` or `$derived.by(() => { ... })` for computed values.
    *   Use `$effect(() => { ... })` for side effects.
    *   Use `let { children, header, ... } = $props()` and `{@render children()}`, `{@render header()}` etc. for content projection (replaces `<slot>`).
    *   Use standard HTML event attributes like `onclick`, `onchange`, etc. (replaces `on:click`).

## 4. Required Component Library (`src/lib/`)

This list aims for parity with the identified `react-email` components:

*   **Document Structure:**
    *   `Html.svelte`: Root `<html>`. Props via `$props()`: `lang?`, `dir?`.
    *   `Head.svelte`: `<head>`. Manages title, meta tags, potentially pre-inlined styles, font definitions. Accepts children snippet.
    *   `Body.svelte`: `<body>`. Props via `$props()`: `style?`, `class?`. Accepts `children` snippet.
    *   `Font.svelte`: Defines `@font-face` rules within `<Head>`. Props via `$props()`: `fontFamily`, `fallbackFontFamily`, `webFont` (object with url, format), `fontStyle?`, `fontWeight?`.

*   **Layout:**
    *   `Container.svelte`: Centered wrapper. Props via `$props()`: `style?`, `class?`. Accepts `children` snippet.
    *   `Section.svelte`: Content block. Props via `$props()`: `style?`, `class?`. Accepts `children` snippet. (Consider props for padding presets).
    *   `Row.svelte`: Layout row (renders `<tr>`). Props via `$props()`: `style?`, `class?`. Accepts `children` snippet.
    *   `Column.svelte`: Layout column (renders `<td>`). Props via `$props()`: `style?`, `class?`, `width?` (string). Accepts `children` snippet.

*   **Content Elements:**
    *   `Text.svelte`: Text block (`<p>`, `<span>`). Props via `$props()`: `style?`, `class?`. Accepts `children` snippet.
    *   `Heading.svelte`: Headings (`<h1>`-`<h6>`). Props via `$props()`: `level` (1-6), `style?`, `class?`. Accepts `children` snippet.
    *   `Link.svelte`: Hyperlink (`<a>`). Props via `$props()`: `href`, `target?`, `style?`, `class?`. Accepts `children` snippet.
    *   `Button.svelte`: Styled link (`<a>` in table?). Props via `$props()`: `href`, `target?`, `style?`, `class?`. Accepts `children` snippet.
    *   `Img.svelte`: Image (`<img>`). Props via `$props()`: `src`, `alt`, `width?`, `height?`, `style?`, `class?`.
    *   `Hr.svelte`: Horizontal rule (`<hr>`). Props via `$props()`: `style?`, `class?`.
    *   `Preview.svelte`: Hidden preview text. Content via `children` snippet.

*   **Utility/Advanced Content:**
    *   `Markdown.svelte`: Renders Markdown to HTML. Props via `$props()`: `content?` (string). Accepts `children` snippet as alternative to `content` prop. Internal Markdown parser (e.g., `marked`).
    *   `CodeBlock.svelte`: Multi-line code display (`<pre><code>`). Props via `$props()`: `language?` (optional for class), `style?`, `class?`. Accepts `children` snippet or `code` prop.
    *   `CodeInline.svelte`: Inline code snippet (`<code>`). Props via `$props()`: `style?`, `class?`. Accepts `children` snippet.

*   **Internal/Shared (Potential):**
    *   May require internal utility functions or components (not directly exported) within `src/lib/components` or `src/lib/utils` for shared logic (e.g., style merging, email client fixes).

*   **Main Export (`src/lib/index.ts`):**
    *   This file serves as the public API, re-exporting all the user-facing components listed above. It should mirror the convenience of `import { ... } from 'react-email'`.

## 5. Rendering Engine (`src/lib/render.ts`)

**5.1. R8: Function Signature:** `export function render(component: ComponentType, options?: RenderOptions): string;` (Define `RenderOptions` interface).

**5.2. R9: Svelte Component Rendering:** Internally use Svelte's SSR capabilities (`component.render()`) to get initial HTML and CSS.

**5.3. R10: Tailwind CSS Processing:**
    *   If Tailwind classes are detected (requires configuration/integration setup):
        *   Extract classes from the initial SSR output.
        *   Run Tailwind JIT/PostCSS process to generate the required CSS string.
        *   Combine this CSS with any component-emitted CSS.

**5.4. R11: CSS Inlining:** Feed the generated HTML and the *combined* CSS (Svelte SSR CSS + Tailwind CSS) into the CSS inliner (`juice`).

**5.5. R12: Markdown Pre-processing:** Ensure the rendering logic correctly handles the HTML output from the `<Markdown>` component *before* CSS inlining.

**5.6. R13: Options:**
    *   `pretty?: boolean`: Format output HTML.
    *   `plainText?: boolean`: Optionally generate a plain text version (requires traversing content).
    *   `tailwindConfig?`: Path or object for Tailwind configuration.
    *   Options for the underlying CSS inliner.

**5.7. R14: Environment:** Node.js execution environment (server-side or build step).

## 6. Documentation & Examples

**6.1. R15: README:** Comprehensive usage guide, installation, basic example.
**6.2. R16: Component API:** Clear documentation for each component's props (using `$props()` syntax) and snippets.
**6.3. R17: Rendering Guide:** Detailed explanation of the `render` function, options, and CSS inlining.
**6.4. R18: Tailwind Setup:** Explicit instructions on how users configure Tailwind CSS in their project to work with `svelte-mail`.
**6.5. R19: Examples:** Provide several complete email template examples in the `/src/routes` showcase app, using Svelte 5 syntax.
**6.6. R20: TypeScript:** Provide accurate TypeScript definitions for components (using `$props()` interfaces) and the `render` function.

## 7. Success Metrics

*   **Feature Parity:** All listed components corresponding to `react-email` are implemented and functional.
*   **Rendering Accuracy:** Rendered HTML + inlined CSS display correctly and consistently across target email clients (Gmail, Outlook, Apple Mail).
*   **Tailwind Integration:** Users can successfully apply Tailwind classes, and they are correctly converted to inline styles.
*   **Markdown Rendering:** `<Markdown>` component correctly renders Markdown to email-safe HTML.
*   **Developer Adoption:** Positive feedback on ease of use, documentation quality, and Svelte 5 integration (runes, snippets, event attributes).
*   **Tree Shaking Effectiveness:** Bundle size impact remains minimal for consumers using few components.


Svelte 5 docs

New in SvelteKit 5:
# Runes
## Reactivity
Reactivity with
let x = "hello
at compontnt top-level is replaced with
let x: string = $state("hello")
This makes x reactive in the component, and also in any js functions that operate on it.
Don't use $state<T>() to pass the type. Always use let x: Type =
Variables declared with let x  = "hello" are no longer reactive.

## Derived values
Only style:
$: b = a + 1
New style:
let b = $derived(a + 1)
Or
let b = $derived.by( ( ) => {
    ....
    return  a + 1;
} )
for more complex use cases.
$derived() takes and expression. $derived.by() takes a function.

## Effect

let a = $state(1);
let b = $state(2);
let c;

// This will run when the component is mounted, and for every updates to a and b.
$effect(() => { 
    c = a + b;
});

Note: This does not apply to values that are read asynchronously (promises, setTimeout) inside $effect, they are not tracked.
Note: Values inside the objects are not tracked inside $effect:
This will run once, because `state` is never reassigned (only mutated)
$effect(() => {
	state;
});

This will run whenever `state.value` changes...
$effect(() => {
	state.value;
});
An effect only depends on the values that it read the last time it ran.
$effect(() => {
	if (a || b) { ...}
});
If a was true, b was not read, and the effect won't run when b changes.

## Props
Old way to pass props to a component:
export let a = "hello";
export let b;
New way:
let {a = "hello", b, ...everythingElse} = $props()
a and b are reactive.
Types:
let {a = "hello", b}: {a: string, b: number} = $props()
Note: Do NOT use this syntax for types:
let { x = 42 } = $props<{ x?: string }>();

# Slots and snippets
Instead of using <slot /> in a component, you should now do
let { children } = $props()
...
{@render children()} - this replaces <slot />

# Event Handling In Svelte 5 the events do not use on:event syntax, they do onevent syntax
In Svelte 5 on:click syntax is not allowed.
Event handlers have been given a facelift in Svelte 5. Whereas in Svelte 4 we use the on: directive to attach an event listener to an element, in Svelte 5 they are properties like any other (in other words - remove the colon)
<button onclick={() => count++}>
	clicks: {count}
</button>

preventDefault and once is removed in svelte 5 . Normal HTML event management is advised
<script>
	function once(fn) {
		return function (event) {
			if (fn) fn.call(this, event);
			fn = null;
		};
	}

	function preventDefault(fn) {
		return function (event) {
			event.preventDefault();
			fn.call(this, event);
		};
	}
</script>

<button onclick={once(preventDefault(handler))}>...</button>