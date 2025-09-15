import { ImageBackground } from "react-native";
import React, { useState } from "react";
import { YStack, Text } from "tamagui";
import Button from "@/theme-config/custom-components";
import { Text as AlmendraText } from "react-native";
import NewAuthor from "@/components/ui/authorModal";
import { useRouter } from "expo-router";

const HeroImage = () => {
  const router = useRouter();
  return (
    <YStack gap={20} alignItems="center">
      <AlmendraText
        style={{
          fontFamily: "AlmendraBold",
          fontSize: 36,
          textAlign: "center"
        }}
      >
        What's your new BookQuest?
      </AlmendraText>
      <ImageBackground
        source={require("@/assets/images/HeroImage.png")}
        resizeMode="cover"
        style={{
          width: "100%",
          height: 250,
          borderRadius: 10,
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          backgroundColor="#2E3B76"
          color="#fff"
          borderRadius={8}
          paddingHorizontal="$4"
          paddingVertical="$2"
          pressStyle={{
            backgroundColor: "#34281eff",
          }}
          onPress={() => router.navigate("/(pages)/book/main/newBook")}
        >
          Add book
        </Button>
      </ImageBackground>
    </YStack>
  );
};

export default HeroImage;
