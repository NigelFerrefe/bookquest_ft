import { YStack } from "tamagui";
import { usePurchasedHook } from "@/hooks/useListsPage";
import { Text as AlmendraText } from "react-native";
import BooksListScreen from "@/components/ui/bookList";
import SearchBar from "@/components/ui/searchBar";
import { useState } from "react";

const Library = () => {
  const {
    listPurchased,
    search,
    setSearch,
    refetch,
    isError,
    isLoading,
    isRefetching,
    fetchNextPage,
    hasNextPage,
  } = usePurchasedHook();

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
          fontSize: 30,
          textAlign: "center",
        }}
      >
        Library
      </AlmendraText>
      <YStack paddingHorizontal={20}>
        <SearchBar
          placeholder="Search in your library..."
          value={inputValue}
          onChangeText={setInputValue}
          onSubmitEditing={handleSearchSubmit}
          searchQuery={search}
          clearSearch={clearSearch}
        />
      </YStack>
      <BooksListScreen
        data={listPurchased}
        emptyMessage="This book is not in your library."
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

export default Library;
