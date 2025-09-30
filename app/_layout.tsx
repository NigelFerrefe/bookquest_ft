import { AuthProvider, useAuth } from "@/provider/AuthProvider";
import tamaguiConfig from "@/tamagui.config";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { TamaguiProvider, PortalProvider } from "tamagui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Almendra_400Regular } from "@expo-google-fonts/almendra/400Regular";
import { Almendra_700Bold } from "@expo-google-fonts/almendra/700Bold";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

export default () => {
  const [fontsLoaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    Almendra: Almendra_400Regular,
    AlmendraBold: Almendra_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TamaguiProvider config={tamaguiConfig}>
        <PortalProvider>
          <BottomSheetModalProvider>
            <QueryClientProvider client={queryClient}>
              <AuthProvider>
                <Stack
                  screenOptions={{ headerShown: false, animation: "none" }}
                >
                  <Stack.Screen name="(pages)" />
                </Stack>
              </AuthProvider>
            </QueryClientProvider>
          </BottomSheetModalProvider>
        </PortalProvider>
      </TamaguiProvider>
    </GestureHandlerRootView>
  );
};
