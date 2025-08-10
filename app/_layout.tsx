import { AuthProvider, useAuth } from "@/provider/AuthProvider";
import tamaguiConfig from "@/tamagui.config";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { Button, TamaguiProvider } from "tamagui";

SplashScreen.preventAutoHideAsync();

const Routes = () => {
  const { authState, loading } = useAuth();

if (loading) {
  return null; 
}

  return (
    <Stack>
      {authState?.authenticated ? (
        <Stack.Screen name="(tabs)/home" />
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
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </TamaguiProvider>
  );
};
