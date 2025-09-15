import { Genre, NewGenre, DeletedGenre } from "@/models/genre.model";
import { Books } from "@/models/book.model";
import { InfiniteScrollPagination } from "@/models/pagination.model";
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

export const useCreateGenre = () => {
  const {createGenre} = useGenreService()
  const queryClient = useQueryClient();

  return useMutation<Genre, Error, NewGenre, { previousGenres?: Genre[] }>({
    mutationFn: (newGenre) => createGenre(newGenre),
    // Optimistic update
    onMutate: async (newGenre) => {
      // Cancel any outgoing refetch for this query to avoid overwriting our optimistic update
      await queryClient.cancelQueries({ queryKey: ["Genre"] });

      // Snapshot the current list of genres
      const previousGenres = queryClient.getQueryData<Genre[]>(["Genre"]);

      // Optimistically update the cache with the new genre
      queryClient.setQueryData<Genre[]>(["Genre"], (old = []) => [
        ...old,
        {
          _id: "temp-id",
          name: newGenre.name,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          __v: 0,
        }, // Temporary Genre object until server responds
      ]);

      // Return context so we can rollback if mutation fails
      return { previousGenres: previousGenres };
    },

    // On error, rollback to the previous cache state
    onError: (err, newGenre, context) => {
      if (context?.previousGenres) {
        queryClient.setQueryData(["Genre"], context.previousGenres);
      }
    },

    // On success, replace the optimistic genre with the server's response
    onSuccess: (savedGenre) => {
      queryClient.setQueryData<Genre[]>(["Genre"], (old = []) =>
        old.map((genre) => (genre._id === "temp-id" ? savedGenre : genre))
      );
    },

    // Optional: ensure final sync with server
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["Genre"] });
    },
  });
};

export const useUpdateGenre = () => {
  const {updateGenre} = useGenreService();
    const queryClient = useQueryClient();
  
    return useMutation<
      Genre,
      Error,
      { genreId: string; data: NewGenre },
      { previousGenres?: Genre[] }
    >({
      mutationFn: ({ genreId, data }) => updateGenre(genreId, data),
  
      onMutate: async ({ genreId, data }) => {
        await queryClient.cancelQueries({ queryKey: ["Genre"] });
  
        const previousGenres = queryClient.getQueryData<Genre[]>(["Genre"]);
  
        // Optimistically update the specific genre
        queryClient.setQueryData<Genre[]>(["Genre"], (old = []) =>
          old.map((genre) =>
            genre._id === genreId
              ? {
                  ...genre,
                  ...data,
                  updatedAt: new Date().toISOString(),
                }
              : genre
          )
        );
  
        return { previousGenres: previousGenres };
      },
  
      onError: (err, variables, context) => {
        if (context?.previousGenres) {
          queryClient.setQueryData(["Genre"], context.previousGenres);
        }
      },
  
      onSuccess: (updatedGenre) => {
        queryClient.setQueryData<Genre[]>(["Genre"], (old = []) =>
          old.map((genre) =>
            genre._id === updatedGenre._id ? updatedGenre : genre
          )
        );
      },
  
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["Genre"] });
      },
    });
}

export const useDeleteGenre = () => {
  const { deleteGenre} = useGenreService();
    const queryClient = useQueryClient();
  
    return useMutation<DeletedGenre, Error, string, { previousGenres?: Genre[] }>({
      mutationFn: (genreId) => deleteGenre(genreId),
      onMutate: async (genreId) => {
        // Cancel any ongoing queries for the genre list
        await queryClient.cancelQueries({ queryKey: ["Genre"] });
  
        const previousGenres = queryClient.getQueryData<Genre[]>(["Genre"]);
  
        // Optimistically remove the genre from the cache
        queryClient.setQueryData<Genre[]>(["Genre"], (old = []) =>
          old.filter((genre) => genre._id !== genreId)
        );
  
        return { previousGenres };
      },
  
      onError: (err, genreId, context) => {
        if (context?.previousGenres) {
          queryClient.setQueryData(["Genre"], context.previousGenres);
        }
      },
  
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["Genre"] });
      },
    });
}