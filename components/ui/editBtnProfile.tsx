import Button from "@/theme-config/custom-components";
import { AlertCircle, Pen } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, useThemeName, XStack, YStack } from "tamagui";

type EditBookBtnProps = {
  onPress: () => void;
}

const EditBookBtn = ({onPress}: EditBookBtnProps) => {
  const insets = useSafeAreaInsets();
  const themeName = useThemeName();
  return (
    <YStack
      position="absolute"
      bottom={insets.bottom}
      right={10}
      zIndex={10}
      p={20}
      
    >
      <Button
        icon={<Pen size={20} />}
        themeInverse
        width={50}
        height={50}
        borderRadius={80}
        onPress={onPress}
      />
    </YStack>
  );
};

export default EditBookBtn;
