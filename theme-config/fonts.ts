import { createInterFont } from "@tamagui/font-inter";
import { getVariableValue } from "tamagui";

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
