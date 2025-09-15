import { Stack } from "expo-router";
import { Colors } from "@/theme-config/colors";

export default function EditLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerBackTitle: "",
        headerBackButtonDisplayMode: "minimal",
        contentStyle: { backgroundColor: "transparent" },
        headerTitleAlign: "center",
        animation: "slide_from_bottom", 
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Edit Book",
          headerStyle: { backgroundColor: Colors.background },
        }}
      />
    </Stack>
  );
}
