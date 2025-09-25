import { SafeAreaView } from "react-native-safe-area-context";
import { useGenreHook } from "@/hooks/useGenrePage";
import { FlatList, Modal, Pressable, Text as AlmendraText } from "react-native";
import { YStack, Text, ScrollView } from "tamagui";
import { X } from "@tamagui/lucide-icons";

import { Genre } from "@/models/genre.model";
import Button from "@/theme-config/custom-components";
import { Colors } from "@/theme-config/colors";
import SearchBar from "@/components/ui/searchBar";
import ChipItem from "@/components/ui/chip";
import { useRouter } from "expo-router";
import ListGenre from "@/components/pages/genre/listGenre";
import ListAuthor from "@/components/pages/author/listAuthor";

const ExploreScreen = () => {
  return (
    <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
      <AlmendraText
        style={{
          fontFamily: "AlmendraBold",
          fontSize: 30,
          textAlign: "center",
        }}
      >
        Explorer's Guild
      </AlmendraText>
      <ListGenre />
      <ListAuthor />
    </ScrollView>
  );
};

export default ExploreScreen;
