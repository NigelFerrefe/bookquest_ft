import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { YStack, Text, Button, XStack } from 'tamagui'
import { Colors } from "@/theme-config/colors";

export default function AuthLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: Colors.background}
      }}
      
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="signup" />

    </Stack>
  );
}
