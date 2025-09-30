import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/theme-config/colors";
import { useAuth } from "@/provider/AuthProvider";
import { useEffect } from "react";
const PagesLayout = () => {
  const { authState, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authState?.authenticated) {
      router.replace("/auth");
    }
  }, [authState, loading]);

  if (loading) return null;
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerBackTitle: "",
        headerBackButtonDisplayMode: "minimal",
        contentStyle: { backgroundColor: "transparent" },
        headerTitleAlign: "center",
        animation: "none",
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen
        name="genre/[id]"
        options={{
          headerShown: true,
          headerTitle: "Genre",
          headerStyle: { backgroundColor: Colors.background },
        }}
      />
      <Stack.Screen
        name="author/[id]"
        options={{
          headerShown: true,
          headerTitle: "Author",
          headerStyle: { backgroundColor: Colors.background },
        }}
      />
    </Stack>
  );
};

export default PagesLayout;
