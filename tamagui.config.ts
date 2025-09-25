import { config } from "@tamagui/config/v2";
import { createTamagui } from "tamagui";
import { tokens } from "./theme-config/tokens";
import { headingFont, bodyFont, jerseyFont } from "./theme-config/fonts";

const tamaguiConfig = createTamagui({
  ...config,
  tokens: {
    ...config.tokens,
    ...tokens,
  },
  fonts: {
    heading: headingFont,
    body: bodyFont,
    jersey: jerseyFont,
  },
});

type Conf = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}

export default tamaguiConfig;
