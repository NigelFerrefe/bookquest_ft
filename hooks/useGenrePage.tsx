import { Genre, NewGenre, DeletedGenre } from "@/models/genre.model";
import { Books } from "@/models/book.model";
import { InfiniteScrollPagination } from "@/models/pagination.model";
import { useAuthorService } from "@/services/author.service";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useGenreService } from "@/services/genre.service";
import { useState } from "react";

export const useGenreHook = () => {
  const { getAllGenres } = useGenreService();
const [search, setSearch] = useState<string>("");

  const {
    data: genreData,
    isError: isErrorSearchedGenre,
    isLoading: isLoadingSearchedGenre,
    refetch: refetchSearchedGenre,
    isRefetching: isRefetchingSearchedGenre,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<{
    genres: Genre[];
    pagination: InfiniteScrollPagination;
  }>({
    queryKey: ["Genre", search],
    queryFn: ({ pageParam }) =>
      getAllGenres({ search, pageParam: pageParam as string | undefined }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.pagination?.has_more_pages) {
        return undefined;
      }
      return lastPage.pagination.next_page;
    },
  });

  const listGenre = genreData?.pages.flatMap((page) => page.genres) ?? [];

  return {
    listGenre,
    search,
    setSearch,
    isErrorSearchedGenre,
    isLoadingSearchedGenre,
    refetchSearchedGenre,
    isRefetchingSearchedGenre,
    fetchNextPage,
    hasNextPage,
  };
};

export const useBooksFromGenre = ({
  genreId,
  search,
}: {
  genreId: string;
  search: string;
}) => {
   const { booksFromGenre } = useGenreService();

  const {
    data: booksFromGenreData,
    isError: isErrorBooksFromGenreData,
    isLoading: isLoadingBooksFromGenreData,
    refetch: refetchBooksFromGenreData,
    isRefetching: isRefetchingBooksFromGenreData,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<{
    books: Books[];
    pagination: InfiniteScrollPagination;
  }>({
    queryKey: ["booksFromGenre", genreId, search],
    queryFn: async ({ pageParam }) => {
      const response = await booksFromGenre({
        genreId,
        search,
        pageParam: pageParam as string | undefined,
      });
      return {
        books: response.data,
        pagination: response.pagination,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.pagination?.has_more_pages) {
        return undefined;
      }
      return lastPage.pagination.next_page;
    },
  });

  const listBooksFromGenre =
    booksFromGenreData?.pages.flatMap((page) => page.books) ?? [];

  return {
    listBooksFromGenre,
    isErrorBooksFromGenreData,
    isLoadingBooksFromGenreData,
    refetchBooksFromGenreData,
    isRefetchingBooksFromGenreData,
    fetchNextPage,
    hasNextPage,
  };
};
