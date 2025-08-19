import { Author, NewAuthor, DeletedAuthor } from "@/models/author.model";
import { Books } from "@/models/book.model";
import { InfiniteScrollPagination } from "@/models/pagination.model";
import { useAuthorService } from "@/services/author.service";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
export const useAuthorHook = () => {
  const { getAllAuthors } = useAuthorService();
const [search, setSearch] = useState<string>("");
  const {
    data: authorData,
    isError: isErrorSearchedAuthor,
    isLoading: isLoadingSearchedAuthor,
    refetch: refetchSearchedAuthor,
    isRefetching: isRefetchingSearchedAuthor,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<{
    authors: Author[];
    pagination: InfiniteScrollPagination;
  }>({
    queryKey: ["Author", search],
    queryFn: ({ pageParam }) =>
      getAllAuthors({ search, pageParam: pageParam as string | undefined }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.pagination?.has_more_pages) {
        return undefined;
      }
      return lastPage.pagination.next_page;
    },
  });

  const listAuthor = authorData?.pages.flatMap((page) => page.authors) ?? [];

  return {
    listAuthor,
    search,
    setSearch,
    isErrorSearchedAuthor,
    isLoadingSearchedAuthor,
    refetchSearchedAuthor,
    isRefetchingSearchedAuthor,
    fetchNextPage,
    hasNextPage,
  };
};

export const useBooksFromAuthor = ({
  authorId,
  search,
}: {
  authorId: string;
  search: string;
}) => {
  const { booksFromAuthor } = useAuthorService();

  const {
    data: booksFromAuthorData,
    isError: isErrorBooksFromAuthorData,
    isLoading: isLoadingBooksFromAuthorData,
    refetch: refetchBooksFromAuthorData,
    isRefetching: isRefetchingBooksFromAuthorData,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<{
    books: Books[];
    pagination: InfiniteScrollPagination;
  }>({
    queryKey: ["booksFromAuthor", authorId, search],
    queryFn: ({ pageParam }) =>
      booksFromAuthor({
        authorId,
        search,
        pageParam: pageParam as string | undefined,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.pagination?.has_more_pages) {
        return undefined;
      }
      return lastPage.pagination.next_page;
    },
  });

  const listBooksFromAuthor =
    booksFromAuthorData?.pages.flatMap((page) => page.books) ?? [];

  return {
    listBooksFromAuthor,
    isErrorBooksFromAuthorData,
    isLoadingBooksFromAuthorData,
    refetchBooksFromAuthorData,
    isRefetchingBooksFromAuthorData,
    fetchNextPage,
    hasNextPage,
  };
};

export const useCreateAuthor = () => {
  const { createAuthor } = useAuthorService();
  const queryClient = useQueryClient();

  return useMutation<Author, Error, NewAuthor, { previousAuthors?: Author[] }>({
    mutationFn: (newAuthor) => createAuthor(newAuthor),
    // Optimistic update
    onMutate: async (newAuthor) => {
      // Cancel any outgoing refetch for this query to avoid overwriting our optimistic update
      await queryClient.cancelQueries({ queryKey: ["Author"] });

      // Snapshot the current list of authors
      const previousAuthors = queryClient.getQueryData<Author[]>(["Author"]);

      // Optimistically update the cache with the new author
      queryClient.setQueryData<Author[]>(["Author"], (old = []) => [
        ...old,
        {
          _id: "temp-id",
          name: newAuthor.name,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          __v: 0,
        }, // Temporary Author object until server responds
      ]);

      // Return context so we can rollback if mutation fails
      return { previousAuthors };
    },

    // On error, rollback to the previous cache state
    onError: (err, newAuthor, context) => {
      if (context?.previousAuthors) {
        queryClient.setQueryData(["Author"], context.previousAuthors);
      }
    },

    // On success, replace the optimistic author with the server's response
    onSuccess: (savedAuthor) => {
      queryClient.setQueryData<Author[]>(["Author"], (old = []) =>
        old.map((author) => (author._id === "temp-id" ? savedAuthor : author))
      );
    },

    // Optional: ensure final sync with server
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["Author"] });
    },
  });
};

export const useUpdateAuthor = () => {
  const { updateAuthor } = useAuthorService();
  const queryClient = useQueryClient();

  return useMutation<
    Author,
    Error,
    { authorId: string; data: NewAuthor },
    { previousAuthors?: Author[] }
  >({
    mutationFn: ({ authorId, data }) => updateAuthor(authorId, data),

    onMutate: async ({ authorId, data }) => {
      await queryClient.cancelQueries({ queryKey: ["Author"] });

      const previousAuthors = queryClient.getQueryData<Author[]>(["Author"]);

      // Optimistically update the specific author
      queryClient.setQueryData<Author[]>(["Author"], (old = []) =>
        old.map((author) =>
          author._id === authorId
            ? {
                ...author,
                ...data,
                updatedAt: new Date().toISOString(),
              }
            : author
        )
      );

      return { previousAuthors };
    },

    onError: (err, variables, context) => {
      if (context?.previousAuthors) {
        queryClient.setQueryData(["Author"], context.previousAuthors);
      }
    },

    onSuccess: (updatedAuthor) => {
      queryClient.setQueryData<Author[]>(["Author"], (old = []) =>
        old.map((author) =>
          author._id === updatedAuthor._id ? updatedAuthor : author
        )
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["Author"] });
    },
  });
};


export const useDeleteAuthor = () => {
  const { deleteAuthor } = useAuthorService();
  const queryClient = useQueryClient();

  return useMutation<DeletedAuthor, Error, string, { previousAuthors?: Author[] }>({
    mutationFn: (authorId) => deleteAuthor(authorId),
    onMutate: async (authorId) => {
      // Cancel any ongoing queries for the author list
      await queryClient.cancelQueries({ queryKey: ["Author"] });

      const previousAuthors = queryClient.getQueryData<Author[]>(["Author"]);

      // Optimistically remove the author from the cache
      queryClient.setQueryData<Author[]>(["Author"], (old = []) =>
        old.filter((author) => author._id !== authorId)
      );

      return { previousAuthors };
    },

    onError: (err, authorId, context) => {
      if (context?.previousAuthors) {
        queryClient.setQueryData(["Author"], context.previousAuthors);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["Author"] });
    },
  });
};