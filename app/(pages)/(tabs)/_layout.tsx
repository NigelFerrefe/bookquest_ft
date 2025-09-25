import { Tabs } from "expo-router";
import { Platform } from "react-native";
import {
  Heart,
  Home,
  LibraryBig,
  Search,
  ShoppingBag,
} from "@tamagui/lucide-icons";
import { TabBarButton } from "@/components/ui/tabBarButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/theme-config/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Colors.activeTintColor,
        tabBarInactiveTintColor: Colors.inactiveTintColor,
        tabBarButton: (props) => <TabBarButton {...props} />,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            backgroundColor: Colors.background,
            borderTopWidth: 0,
            height: 70,
            paddingTop: 10,
          },
          default: {
            backgroundColor: Colors.primaryButton,
            height: 80,
            paddingTop: 20,
            borderTopWidth: 0,
            elevation: 0,
          },
        }),
        sceneStyle: {
          backgroundColor: Colors.background,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <ShoppingBag size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <LibraryBig size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <Heart size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <Search size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
