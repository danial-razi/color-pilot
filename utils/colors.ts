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

