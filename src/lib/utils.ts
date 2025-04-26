/**
 * Convert pixels to points for MSO (Outlook) email clients.
 * The conversion ratio is approximately 0.75pt = 1px.
 */
export function pxToPt(px: string | number): string | number {
  const value = typeof px === 'string' ? parseInt(px, 10) : px;
  return Math.floor(value * 0.75);
}

/**
 * Convert a style object to a style string.
 * This is useful for applying styles to HTML elements in email templates.
 */
/**
 * Takes any number of style strings (CSS style attribute format), removes duplicate properties (last one wins),
 * and returns a normalized style string. Supports both camelCase and kebab-case property names.
 * Similar to `clsx`/`cn` but for inline styles.
 *
 * Example:
 *   styleToString('color: red; font-size: 12px;', 'color: blue; margin: 0;')
 *   => 'font-size: 12px; color: blue; margin: 0;'
 */
/**
 * Converts style strings to a normalized, deduplicated, and email-safe style string.
 * - Deduplicates properties (last one wins)
 * - Normalizes property names to kebab-case
 * - Filters out properties known to be unsafe or unsupported in email clients
 * - Escapes values to prevent style injection
 */
export function styleToString(...styles: (string | undefined | null | false)[]): string {
  // List of CSS properties that are generally safe and supported in email clients
  // (This is not exhaustive, but covers most common email-safe properties)
  const EMAIL_SAFE_PROPERTIES = new Set([
    // Box model
    'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
    'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
    'width', 'height', 'min-width', 'min-height', 'max-width', 'max-height',
    // Typography
    'font', 'font-family', 'font-size', 'font-style', 'font-weight', 'line-height', 'letter-spacing', 'text-align', 'text-decoration', 'text-transform', 'color',
    // Background
    'background', 'background-color',
    // Border
    'border', 'border-top', 'border-right', 'border-bottom', 'border-left',
    'border-width', 'border-style', 'border-color', 'border-radius',
    // Table
    'border-collapse', 'border-spacing',
    // Misc
    'display', 'vertical-align', 'overflow', 'white-space', 'direction',
    // Outlook-specific
    'mso-padding-alt', 'mso-text-raise', 'mso-font-width'
  ]);

  // Escape style values to prevent style injection
  function escapeStyleValue(val: string): string {
    // If dangerous patterns are found, maybe return empty or handle differently?
    if (/expression\s*\(/gi.test(val)) {
      console.warn(`[styleToString] Potentially unsafe value detected (expression): "${val}"`);
      return ''; // Return empty string to effectively discard the rule
    }
    // Basic escaping: remove semicolons, CSS variables, and newlines
    return val
      .replace(/;/g, '') // Remove semicolons within values
      .replace(/--/g, '') // Remove CSS variable syntax
      .replace(/[\r\n]/g, '') // Remove newlines
      .replace(/\\/g, ''); // Remove backslashes
  }

  const styleMap: Record<string, string> = {};

  for (const style of styles) {
    if (!style || typeof style !== 'string') continue;
    const declarations = style.split(';').map(s => s.trim()).filter(Boolean);
    for (const decl of declarations) {
      const colonIndex = decl.indexOf(':');
      if (colonIndex === -1) {
        if (decl.length > 0) {
          console.warn(`[styleToString] Invalid style declaration: "${decl}"`);
        }
        continue;
      }

      let key = decl.substring(0, colonIndex).trim();
      let value = decl.substring(colonIndex + 1).trim();

      // Escape value first
      const escapedValue = escapeStyleValue(value);

      // If escaping resulted in an empty string (due to detecting unsafe pattern), skip this rule
      if (escapedValue === '' && value !== '') {
        continue;
      }

      // Normalize property key
      if (!key.startsWith('mso-') && !key.includes('-')) {
        key = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      }

      // Check if the *normalized* key is safe
      if (!EMAIL_SAFE_PROPERTIES.has(key)) {
        // Check if the *original* key was unsafe (e.g., --custom-prop)
        if (key !== decl.substring(0, colonIndex).trim() || !EMAIL_SAFE_PROPERTIES.has(decl.substring(0, colonIndex).trim())) {
          console.warn(`[styleToString] Unsupported or unsafe CSS property: "${key}" will be ignored.`);
          continue;
        }
      }

      styleMap[key] = escapedValue;
    }
  }

  // Join properties and trim trailing space
  return Object.entries(styleMap)
    .map(([key, value]) => `${key}: ${value};`)
    .join(' ')
    .trim();
}



