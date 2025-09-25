import { ImageBackground } from "react-native";
import { YStack, Text } from "tamagui";
import Button from "@/theme-config/custom-components";
import { Text as AlmendraText } from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/theme-config/colors";
import { useState } from "react";

const HeroImage = () => {
  const router = useRouter();
  const [pressed, setPressed] = useState<boolean>(false);
  return (
    <YStack gap={20} alignItems="center" >
      <AlmendraText
        style={{
          fontFamily: "AlmendraBold",
          fontSize: 30,
          textAlign: "center",
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
          backgroundColor={Colors.primaryButton}
          
          onPress={() => router.navigate("/(pages)/book/main/newBook")}
          pressStyle={{
            backgroundColor: Colors.secondaryButton,
            borderColor: Colors.background,
          }}
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
        >
          <Text color={Colors.fontColor} fontSize={16}>Add book</Text>
        </Button>
      </ImageBackground>
    </YStack>
  );
};

export default HeroImage;
