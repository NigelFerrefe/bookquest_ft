import BooksListScreen from "@/components/ui/bookList";
import { Colors } from "@/theme-config/colors";
import { useBooksFromGenre } from "@/hooks/useGenrePage";
import React from "react";
import { YStack, Text } from "tamagui";
import { useBooksFromAuthor } from "@/hooks/useAuthorPage";

type BookByAuthorProps = {
  id: string;
};

const BookByAuthor = ({ id }: BookByAuthorProps) => {
  const {
    listBooksFromAuthor,
    isErrorBooksFromAuthorData,
    isLoadingBooksFromAuthorData,
    isRefetchingBooksFromAuthorData,
    refetchBooksFromAuthorData,
    hasNextPage,
    fetchNextPage,
  } = useBooksFromAuthor({ authorId: id, search: "" });

   return (
    <YStack f={1} gap={20} backgroundColor={Colors.background}>
      <BooksListScreen
        data={listBooksFromAuthor}
        isLoading={isLoadingBooksFromAuthorData}
        isError={isErrorBooksFromAuthorData}
        isRefetching={isRefetchingBooksFromAuthorData}
        refetch={refetchBooksFromAuthorData}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        emptyMessage="No books found for this genre."
      />
    </YStack>
  );
};

export default BookByAuthor