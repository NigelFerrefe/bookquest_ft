import { Image, Text, YStack, XStack } from "tamagui";
import { useFavoritesHook } from "@/hooks/useListsPage";
import { FlashList } from "@shopify/flash-list";
import { Books } from "@/models/book.model";
import ChipItem from "@/components/ui/chip";
import Card from "@/components/ui/card";
import { Text as AlmendraText } from "react-native";
import BooksListScreen from "@/components/ui/bookList";
import SearchBar from "@/components/ui/searchBar";
import { useState } from "react";

const Favorites = () => {
  const {
    listFavorites,
    search,
    setSearch,
    refetch,
    isError,
    isLoading,
    isRefetching,
    fetchNextPage,
    hasNextPage,
  } = useFavoritesHook();
  const [inputValue, setInputValue] = useState<string>("");

  const handleSearchSubmit = () => {
    setSearch(inputValue);
  };

  const clearSearch = () => {
    setInputValue("");
    setSearch("");
  };
  return (
    <YStack f={1} gap={20}>
      <AlmendraText
        style={{
          fontFamily: "AlmendraBold",
          fontSize: 36,
          textAlign: "center",
        }}
      >
        Library
      </AlmendraText>
      <YStack paddingHorizontal={20}>
        <SearchBar
          placeholder="Search favorites..."
          value={inputValue}
          onChangeText={setInputValue}
          onSubmitEditing={handleSearchSubmit}
          searchQuery={search}
          clearSearch={clearSearch}
        />
      </YStack>
      <BooksListScreen
        data={listFavorites}
        emptyMessage="This book does not exist or it is not favorite."
        isError={isError}
        isLoading={isLoading}
        refetch={refetch}
        isRefetching={isRefetching}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      />
    </YStack>
  );
};

export default Favorites;
