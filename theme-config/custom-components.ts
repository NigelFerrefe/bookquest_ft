//import { tokens } from "./tokens";
import { styled } from "@tamagui/core";
import { getSpace } from "@tamagui/get-token";
import { Button as TamaguiButton } from "tamagui";
import { headingFont } from "./fonts";


const Button = styled(TamaguiButton, {
  variants: {
    size: {
      "...size": (name, { tokens }) => {
        return {
          height: tokens.size[name as keyof typeof tokens.size],
          borderRadius: tokens.radius[name as keyof typeof tokens.radius],

          gap:
            (tokens.space[name as keyof typeof tokens.space] as { val: number })
              .val * 0.2,
          paddingHorizontal: getSpace(name as keyof typeof tokens.space, {
            shift: 1, //it was -1 but it was too much padding on the right
          }),
          fontSize: headingFont.size[name as keyof typeof headingFont.size],
        };
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
      },
    },
    fullWidth: {
      true: {
        width: "90%",
      },
    },
  } as const,

  defaultVariants: {
    size: "$md",
  },
});

export default Button;

//TODO: Add more components