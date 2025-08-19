import { AuthProvider, useAuth } from "@/provider/AuthProvider";
import tamaguiConfig from "@/tamagui.config";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import {  TamaguiProvider } from "tamagui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Almendra_400Regular } from '@expo-google-fonts/almendra/400Regular';
import { Almendra_700Bold } from '@expo-google-fonts/almendra/700Bold';
SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();
const Routes = () => {
  const { authState, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <Stack>
      {authState?.authenticated ? (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="auth" options={{ headerShown: false }} />
      )}
    </Stack>
  );
};

export default () => {
  const [fontsLoaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    Almendra: Almendra_400Regular,
    AlmendraBold: Almendra_700Bold
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
    <TamaguiProvider config={tamaguiConfig}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </QueryClientProvider>
    </TamaguiProvider>
  );
};
