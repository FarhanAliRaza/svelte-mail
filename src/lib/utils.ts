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
export function styleToString(...styles: (string | undefined | null | false)[]): string {
  const styleMap: Record<string, string> = {};

  for (const style of styles) {
    if (!style || typeof style !== 'string') continue;
    // Split by semicolon, filter out empty
    const declarations = style.split(';').map(s => s.trim()).filter(Boolean);
    for (const decl of declarations) {
      const [rawKey, ...rest] = decl.split(':');
      if (!rawKey || rest.length === 0) continue;
      let key = rawKey.trim();
      let value = rest.join(':').trim();

      // Normalize property: convert camelCase to kebab-case
      if (!key.includes('-')) {
        key = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      }
      styleMap[key] = value;
    }
  }

  return Object.entries(styleMap)
    .map(([key, value]) => `${key}: ${value};`)
    .join(' ');
}



