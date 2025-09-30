import { SafeAreaView } from "react-native-safe-area-context";
import { useGenreHook } from "@/hooks/useGenrePage";
import { FlatList, Modal, Pressable } from "react-native";
import { YStack, Text, ScrollView, XStack } from "tamagui";
import { X } from "@tamagui/lucide-icons";

import { Genre } from "@/models/genre.model";
import Button from "@/theme-config/custom-components";
import { Colors } from "@/theme-config/colors";
import SearchBar from "@/components/ui/searchBar";
import ChipItem from "@/components/ui/chip";
import { useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";

const ListGenre = () => {
  const {
    listGenre,
    search,
    setSearch,
    isErrorSearchedGenre,
    isLoadingSearchedGenre,
    refetchSearchedGenre,
    isRefetchingSearchedGenre,
    fetchNextPage,
    hasNextPage,
  } = useGenreHook();
  const router = useRouter();

  const renderItem = ({ item }: { item: Genre }) => {
    return (
      <XStack f={1} jc="center" mb={10} paddingHorizontal={10}>
        <Pressable
          onPress={() => {
            router.navigate({
              pathname: "/(pages)/genre/[id]",
              params: {
                id: item?._id ?? "",
                name: item.name ?? "",
              },
            });
          }}
          style={{ flex: 1 }}
        >
          <ChipItem
            label={item.name}
            backgroundColor={"#008BBE"}
            size="medium"
          />
        </Pressable>
      </XStack>
    );
  };

  const clearSearch = () => setSearch("");
  return (
    <YStack p={20} gap={20}>
      <YStack>
        <SearchBar
          placeholder="Search a genre"
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={() => {}}
          searchQuery={search}
          clearSearch={clearSearch}
        />
      </YStack>

      <FlashList
        data={listGenre}
        keyExtractor={(item) => item._id}
        estimatedItemSize={200}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 20 }}
        //columnWrapperStyle={{ justifyContent: "center", gap: 10 }}
        onEndReached={() => {
          if (hasNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoadingSearchedGenre ? <Text>Loading more genres...</Text> : null
        }
        scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
      />
    </YStack>
  );
};

export default ListGenre;
