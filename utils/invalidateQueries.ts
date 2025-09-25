import { QueryClient } from "@tanstack/react-query";

const QUERIES_TO_INVALIDATE = [
  "Wishlist",
  "Purchased",
  "Favorites",
  "booksFromGenre",
  "booksFromAuthor",
  "Author",
  "Genre"
];

export function invalidateBookLists(queryClient: QueryClient) {
  queryClient.invalidateQueries({
    predicate: (query) =>
      QUERIES_TO_INVALIDATE.includes(query.queryKey[0] as string),
  });
}