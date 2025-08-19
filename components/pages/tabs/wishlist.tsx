import { YStack } from "tamagui";
import { useWishlistsHook } from "@/hooks/useListsPage";
import { Text as AlmendraText } from "react-native";
import BooksListScreen from "@/components/ui/bookList";
import SearchBar from "@/components/ui/searchBar";
import { useState } from "react";

const Wishlist = () => {
  const {
    listWishlist,
    search,
    setSearch,
    refetch,
    isError,
    isLoading,
    isRefetching,
    fetchNextPage,
    hasNextPage,
  } = useWishlistsHook();
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
        Wishlist
      </AlmendraText>
      <YStack paddingHorizontal={20}>
        <SearchBar
          placeholder="Search your quest..."
          value={inputValue}
          onChangeText={setInputValue}
          onSubmitEditing={handleSearchSubmit}
          searchQuery={search}
          clearSearch={clearSearch}
        />
      </YStack>
      <BooksListScreen
        data={listWishlist}
        emptyMessage="This book does not exist."
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

export default Wishlist;
