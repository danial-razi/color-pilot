/**
 * Converts an RGB color value to a HEX string.
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (c: number) => `0${c.toString(16)}`.slice(-2);
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 * Determines if text should be light or dark based on background hex color.
 */
export const getTextColorForBackground = (hexColor: string): 'text-white' | 'text-black' => {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? 'text-black' : 'text-white';
};

/**
 * Extracts all unique colors from a CSS string.
 */
export const extractColorsFromCss = (cssText: string): string[] => {
  const colorRegex = /(#[0-9a-fA-F]{3,6}|rgba?\([\d\s,.]+\)|hsla?\([\d\s%,.]+\))/g;
  const matches = cssText.match(colorRegex) || [];
  return [...new Set(matches)];
};

/**
 * Parses a HEX color string into its RGB components.
 */
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  if (!hex || hex.length < 4) return null;
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

/**
 * Calculates the relative luminance of a color.
 * https://www.w3.org/TR/WCAG20/#relativeluminancedef
 */
const getLuminance = (r: number, g: number, b: number): number => {
    const a = [r, g, b].map((v) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

/**
 * Calculates the contrast ratio between two hex colors.
 * https://www.w3.org/TR/WCAG20/#contrast-ratiodef
 */
export const getContrastRatio = (color1: string, color2: string): number => {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    if (!rgb1 || !rgb2) {
        return 1;
    }

    const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

    return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
};
