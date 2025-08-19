import { createInterFont } from "@tamagui/font-inter";
import { getVariableValue, createFont } from "tamagui";
const headingSize = {
  1: 11,
  2: 12,
  3: 13,
  4: 14,
  true: 14,
  5: 16,
  6: 18,
  7: 20,
  8: 23,
  9: 30,
  10: 46,
  11: 55,
  12: 62,
  13: 72,
  14: 92,
  15: 114,
  16: 134,
  sm: 12,
  md: 14,
  lg: 16,
};

export const headingFont = createInterFont(
  {
    transform: {
      6: "uppercase",
      7: "none",
    },
    weight: {
      3: "500",
      4: "700",
    },
    face: {
      700: { normal: "InterBold" },
    },
    size: Object.fromEntries(
      Object.entries(headingSize).map(([k, v]) => [k, getVariableValue(v)])
    ),
    lineHeight: Object.fromEntries(
      Object.entries(headingSize).map(([k, v]) => [k, getVariableValue(v) + 4])
    ),
  }
  /*{
    sizeSize: (size) => size,
    sizeLineHeight: (fontSize) => fontSize + 4,
  }*/
);

const bodySize = {
  1: 11,
  2: 12,
  3: 13,
  4: 14,
  5: 16,
  6: 18,
  7: 20,
  8: 23,
  9: 30,
  10: 46,
  11: 55,
  12: 62,
  13: 72,
  14: 92,
  15: 114,
  16: 134,

};

export const bodyFont = createInterFont(
  {
    face: {
      700: { normal: "InterBold" },
    },
    size: Object.fromEntries(
      Object.entries(bodySize).map(([k, v]) => [k, getVariableValue(v) * 1.2])
    ),
    lineHeight: Object.fromEntries(
      Object.entries(headingSize).map(([k, v]) => [k, getVariableValue(v) + 5])
    ),
  }
  /*{
    sizeSize: (size) => Math.round(size * 1.1),
    sizeLineHeight: (size) => size + 5,
  }*/
);




// Jersey font

const pixelSizes = {
  11: 11,
  12: 12,
  13: 13,
  14: 14,
  15: 15,
  16: 16,
  18: 18,
  20: 20,
  23: 23,
  30: 30,
  46: 46,
  55: 55,
  62: 62,
  72: 72,
  92: 92,
  114: 114,
  134: 134,
};

export const jerseyFont = createFont({
  family: "Jersey", // debe coincidir con lo cargado en loadFonts
  weight: { 400: "400" },
  size: Object.fromEntries(
    Object.entries(pixelSizes).map(([k, v]) => [k, getVariableValue(v)])
  ),
  lineHeight: Object.fromEntries(
    Object.entries(pixelSizes).map(([k, v]) => [k, getVariableValue(v + 4)])
  ),
});