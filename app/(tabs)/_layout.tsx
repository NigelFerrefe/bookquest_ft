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

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#00000099",
        tabBarButton: (props) => <TabBarButton {...props} />,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            backgroundColor: "#faebe0ff",
            borderTopWidth: 0,
            height: 70,
            paddingTop: 10,
          },
          default: {
            backgroundColor: "#faebe0ff",
            height: 70,
            paddingTop: 10,
            borderTopWidth: 0,
            elevation: 0,
          },
        }),
        sceneStyle: {
          backgroundColor: "#faebe0ff",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: "Wishlist",
          tabBarIcon: ({ color }) => <ShoppingBag size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: "Library",
          tabBarIcon: ({ color }) => <LibraryBig size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => <Heart size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => <Search size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
