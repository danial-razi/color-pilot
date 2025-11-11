/**
 * Converts a HEX color string to a normalized RGB object.
 * @param hex - The hex color string (e.g., "#RRGGBB").
 * @returns An object with r, g, b properties (0-1).
 */
const hexToRgbNormalized = (hex: string): { r: number; g: number; b: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255,
  };
};

/**
 * Triggers a browser download for a given Blob.
 * @param blob - The Blob to download.
 * @param filename - The desired filename for the download.
 */
const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Exports a color palette as a JSON file.
 * The exported JSON includes the palette name.
 * @param colors - An array of hex color strings.
 * @param paletteName - The name of the palette, used for the filename and data.
 */
export const exportAsJson = (colors: string[], paletteName: string) => {
  const exportData = {
    name: paletteName,
    colors,
  };
  const jsonString = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  downloadBlob(blob, `${paletteName}.json`);
};

/**
 * Exports a color palette as an Adobe Swatch Exchange (.ase) file.
 * Color names within the file are set to their hex codes.
 * @param colors - An array of hex color strings.
 * @param name - The name for the file.
 */
export const exportAsAse = (colors: string[], name: string) => {
  const buffer = new ArrayBuffer(8192); // 8KB buffer, should be plenty
  const view = new DataView(buffer);
  let offset = 0;

  // ASE Header
  const FILE_SIGNATURE = 'ASEF';
  for (let i = 0; i < FILE_SIGNATURE.length; i++) {
    view.setUint8(offset++, FILE_SIGNATURE.charCodeAt(i));
  }
  view.setUint16(offset, 1, false); offset += 2; // Major version
  view.setUint16(offset, 0, false); offset += 2; // Minor version
  view.setUint32(offset, colors.length, false); offset += 4; // Number of blocks

  // Color Blocks
  colors.forEach(colorHex => {
    // Block header
    view.setUint16(offset, 0x0001, false); offset += 2; // Block type: Color

    // As requested, the color name in the ASE file is derived from its hex code.
    const colorName = colorHex.toUpperCase();
    const nameLengthWithNull = colorName.length + 1;
    
    // Data for the block: nameLen(2) + name(len*2) + model(4) + values(12) + type(2)
    const blockDataLength = 2 + (nameLengthWithNull * 2) + 4 + (3 * 4) + 2;
    view.setUint32(offset, blockDataLength, false); offset += 4; // Block length

    // Block data: Name
    view.setUint16(offset, nameLengthWithNull, false); offset += 2;
    for (let i = 0; i < colorName.length; i++) {
        view.setUint16(offset, colorName.charCodeAt(i), false); offset += 2;
    }
    view.setUint16(offset, 0, false); offset += 2; // Null terminator

    // Block data: Color Model
    const COLOR_MODEL_RGB = 'RGB ';
    for (let i = 0; i < COLOR_MODEL_RGB.length; i++) {
      view.setUint8(offset++, COLOR_MODEL_RGB.charCodeAt(i));
    }

    // Block data: Color Values
    const { r, g, b } = hexToRgbNormalized(colorHex);
    view.setFloat32(offset, r, false); offset += 4;
    view.setFloat32(offset, g, false); offset += 4;
    view.setFloat32(offset, b, false); offset += 4;

    // Block data: Color Type
    view.setUint16(offset, 0, false); offset += 2; // 0: Global
  });

  const finalBuffer = buffer.slice(0, offset);
  const blob = new Blob([finalBuffer], { type: 'application/vnd.adobe.swatch-exchange' });
  downloadBlob(blob, `${name}.ase`);
};