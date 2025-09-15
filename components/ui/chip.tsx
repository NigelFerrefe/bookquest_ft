import { Text, XStack, YStack } from "tamagui";
import { Theme } from "@tamagui/core";
import React from "react";

type ChipItemProps = {
  label: string;
  time?: string;
  icon?: React.ReactNode;
  size?: "small" | "medium" | "large";
  backgroundColor?: string;
  textColor?: string;
  children?: React.ReactNode;
  style?: object;
};

const ChipItem = ({
  label,
  time,
  icon,
  size = "medium",
  backgroundColor,
  textColor,
  children,
  style = {},
}: ChipItemProps) => {
  //* Size styling
  let paddingHorizontal = 20;
  let paddingVertical = 10;
  let borderRadius = 25;
  let gap = 10;
  let fontSize = 14;

  switch (size) {
    case "small":
      paddingHorizontal = 10;
      paddingVertical = 5;
      borderRadius = 15;
      gap = 5;
      fontSize = 12;
      break;
    case "large":
      paddingHorizontal = 30;
      paddingVertical = 15;
      borderRadius = 30;
      gap = 15;
      fontSize = 16;
      break;
  }

  return (
    <Theme>
      <XStack
        paddingHorizontal={paddingHorizontal}
        paddingVertical={paddingVertical}
        borderRadius={borderRadius}
        backgroundColor={backgroundColor}
        alignItems="center"
        justifyContent="center"
        gap={gap}
        {...style}
      >
        {icon}
        {time ? (
          <YStack gap={5} minWidth={40}>
            <Text fontSize={fontSize} color={textColor}>
              {label}
            </Text>
            <Text fontSize={8} color={textColor}>
              {time}
            </Text>
          </YStack>
        ) : (
          <Text fontSize={fontSize} color={textColor} textAlign="center">
            {label}
          </Text>
        )}
        {children}
      </XStack>
    </Theme>
  );
};

export default ChipItem;
