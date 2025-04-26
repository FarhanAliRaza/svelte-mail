/**
 * Media query breakpoint definitions
 */
export const breakpoints = {
  mobile: 480,
  tablet: 768,
  desktop: 992
};

/**
 * CSS properties interface for type safety
 */
export interface CSSProperties {
  [key: string]: string | number;
}

/**
 * Media query options for different screen sizes
 */
export interface MediaQueryOptions {
  mobile?: CSSProperties;
  tablet?: CSSProperties;
  desktop?: CSSProperties;
  darkMode?: CSSProperties;
}

/**
 * Convert CSS object to string
 * @param css CSS properties object
 * @returns CSS string
 */
export function convertToCss(css?: CSSProperties): string {
  if (!css) return '';
  
  return Object.entries(css)
    .map(([property, value]) => {
      // Convert camelCase to kebab-case
      const kebabProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${kebabProperty}: ${value};`;
    })
    .join('\n');
}

/**
 * Generate media queries for responsive emails
 * @param selector CSS selector to target
 * @param options Media query options for different screen sizes
 * @returns Complete media query CSS string
 */
export function generateMediaQueries(selector: string, options: MediaQueryOptions): string {
  let mediaQueries = '';
  
  if (options.mobile) {
    mediaQueries += `
@media (max-width: ${breakpoints.mobile}px) {
  ${selector} {
    ${convertToCss(options.mobile)}
  }
}
`;
  }
  
  if (options.tablet) {
    mediaQueries += `
@media (min-width: ${breakpoints.mobile + 1}px) and (max-width: ${breakpoints.tablet}px) {
  ${selector} {
    ${convertToCss(options.tablet)}
  }
}
`;
  }
  
  if (options.desktop) {
    mediaQueries += `
@media (min-width: ${breakpoints.tablet + 1}px) {
  ${selector} {
    ${convertToCss(options.desktop)}
  }
}
`;
  }

  if (options.darkMode) {
    mediaQueries += `
@media (prefers-color-scheme: dark) {
  ${selector} {
    ${convertToCss(options.darkMode)}
  }
}
`;
  }
  
  return mediaQueries;
}

/**
 * Extract custom media queries from inline styles
 * Format: data-mq-mobile="width: 100%;" or data-mq-dark="background-color: #000000;"
 * 
 * @param element HTML element with data-mq attributes
 * @returns Media queries CSS string
 */
export function extractMediaQueriesFromElement(element: Element, uniqueId: string): string {
  const selector = `#${uniqueId}`;
  const options: MediaQueryOptions = {};
  
  // Extract mobile styles
  const mobileStyles = element.getAttribute('data-mq-mobile');
  if (mobileStyles) {
    options.mobile = parseCssString(mobileStyles);
    element.removeAttribute('data-mq-mobile');
  }
  
  // Extract tablet styles
  const tabletStyles = element.getAttribute('data-mq-tablet');
  if (tabletStyles) {
    options.tablet = parseCssString(tabletStyles);
    element.removeAttribute('data-mq-tablet');
  }
  
  // Extract desktop styles
  const desktopStyles = element.getAttribute('data-mq-desktop');
  if (desktopStyles) {
    options.desktop = parseCssString(desktopStyles);
    element.removeAttribute('data-mq-desktop');
  }
  
  // Extract dark mode styles
  const darkModeStyles = element.getAttribute('data-mq-dark');
  if (darkModeStyles) {
    options.darkMode = parseCssString(darkModeStyles);
    element.removeAttribute('data-mq-dark');
  }
  
  return generateMediaQueries(selector, options);
}

/**
 * Parse CSS string to CSS properties object
 * @param cssString CSS string (e.g. "width: 100%; color: red;")
 * @returns CSS properties object
 */
export function parseCssString(cssString: string): CSSProperties {
  const result: CSSProperties = {};
  
  // Split the string by semicolons and process each declaration
  const declarations = cssString.split(';').filter(Boolean);
  
  for (const declaration of declarations) {
    // Split the declaration into property and value
    const [property, value] = declaration.split(':').map(part => part.trim());
    
    if (property && value) {
      // Convert kebab-case to camelCase
      const camelProperty = property.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
      result[camelProperty] = value;
    }
  }
  
  return result;
} 