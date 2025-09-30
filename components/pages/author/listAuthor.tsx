import { SafeAreaView } from "react-native-safe-area-context";
import { useGenreHook } from "@/hooks/useGenrePage";
import { FlatList, Modal, Pressable } from "react-native";
import { YStack, Text, XStack } from "tamagui";
import { X } from "@tamagui/lucide-icons";

import { Genre } from "@/models/genre.model";
import Button from "@/theme-config/custom-components";
import { Colors } from "@/theme-config/colors";
import SearchBar from "@/components/ui/searchBar";
import ChipItem from "@/components/ui/chip";
import { useRouter } from "expo-router";
import { useAuthorHook } from "@/hooks/useAuthorPage";
import { Author } from "@/models/author.model";
import { FlashList } from "@shopify/flash-list";

const ListAuthor = () => {
  const {
    listAuthor,
    search,
    setSearch,
    isErrorSearchedAuthor,
    isLoadingSearchedAuthor,
    refetchSearchedAuthor,
    isRefetchingSearchedAuthor,
    fetchNextPage,
    hasNextPage,
  } = useAuthorHook();
  const router = useRouter();

  const renderItem = ({ item }: { item: Author }) => {
    return (
      <XStack f={1} jc="center" mb={10} paddingHorizontal={10}>
        <Pressable
          onPress={() => {
            router.navigate({
              pathname: "/(pages)/author/[id]",
              params: {
                id: item?._id ?? "",
                name: item.name ?? ''
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
    <YStack  p={20} gap={20}>
      <YStack>
        <SearchBar
          placeholder="Search an author"
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={() => {}}
          searchQuery={search}
          clearSearch={clearSearch}
        />
      </YStack>

      <FlashList
        data={listAuthor}
        keyExtractor={(item) => item._id}
        estimatedItemSize={200}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 20 }}
        //columnWrapperStyle={{ justifyContent: "center", gap: 10 }}
        keyboardShouldPersistTaps="handled"
        onEndReached={() => {
          if (hasNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoadingSearchedAuthor ? <Text>Loading more genres...</Text> : null
        }
        scrollEnabled={false}
      />
    </YStack>
  );
};

export default ListAuthor;
