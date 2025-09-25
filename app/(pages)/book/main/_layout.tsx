import { Stack } from "expo-router";
import { Colors } from "@/theme-config/colors";

export default function MainLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerBackTitle: "",
        headerBackButtonDisplayMode: "minimal",
        contentStyle: { backgroundColor: "transparent" },
        headerTitleAlign: "center",
        animation: 'none',
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: "Quest Log",
          headerStyle: { backgroundColor: Colors.background },
          
        }}
      />
      <Stack.Screen
        name="newBook"
        options={{
          headerTitle: "New Quest",
          headerStyle: { backgroundColor: Colors.background },
        }}
      />
    </Stack>
  );
}
