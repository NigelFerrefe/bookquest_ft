import BooksListScreen from "@/components/ui/bookList";
import { Colors } from "@/theme-config/colors";
import { useBooksFromGenre } from "@/hooks/useGenrePage";
import React from "react";
import { YStack, Text } from "tamagui";

type BookByGenreProps = {
  id: string;
};

const BookByGenre = ({ id }: BookByGenreProps) => {
  const {
    listBooksFromGenre,
    isErrorBooksFromGenreData,
    isLoadingBooksFromGenreData,
    isRefetchingBooksFromGenreData,
    refetchBooksFromGenreData,
    hasNextPage,
    fetchNextPage,
  } = useBooksFromGenre({ genreId: id, search: "" });

  return (
    <YStack f={1} gap={20} backgroundColor={Colors.background}>
      <BooksListScreen
        data={listBooksFromGenre}
        isLoading={isLoadingBooksFromGenreData}
        isError={isErrorBooksFromGenreData}
        isRefetching={isRefetchingBooksFromGenreData}
        refetch={refetchBooksFromGenreData}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        emptyMessage="No books found for this genre."
      />
    </YStack>
  );
};

export default BookByGenre;
