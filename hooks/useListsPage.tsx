import { Books } from "@/models/book.model";
import { InfiniteScrollPagination } from "@/models/pagination.model";
import { useListsService } from "@/services/lists.service";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useWishlistsHook = () => {
  const { getWishlist } = useListsService();
  const [search, setSearch] = useState<string>("");

  const {
    data: wishlistData,
    isError,
    isLoading,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<{
    wishlist: Books[];
    pagination: InfiniteScrollPagination;
  }>({
    queryKey: ["Wishlist", search],
    queryFn: ({ pageParam }) =>
      getWishlist({ search, pageParam: pageParam as string | undefined }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.pagination?.has_more_pages) {
        return undefined;
      }
      return lastPage.pagination.next_page;
    },
  });

  const listWishlist =
    wishlistData?.pages.flatMap((page) => page.wishlist) ?? [];

  return {
    listWishlist,
    search,
    setSearch,
    isError,
    isLoading,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
  };
};

export const useFavoritesHook = () => {
  const { getFavorites } = useListsService();
  const [search, setSearch] = useState<string>("");

  const {
    data: favoritesData,
    isError,
    isLoading,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<{
    favorites: Books[];
    pagination: InfiniteScrollPagination;
  }>({
    queryKey: ["Favorites", search],
    queryFn: ({ pageParam }) =>
      getFavorites({ search, pageParam: pageParam as string | undefined }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.pagination?.has_more_pages) {
        return undefined;
      }
      return lastPage.pagination.next_page;
    },
  });

  const listFavorites =
    favoritesData?.pages.flatMap((page) => page.favorites) ?? [];

  return {
    listFavorites,
    search,
    setSearch,
    isError,
    isLoading,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
  };
};

export const usePurchasedHook = () => {
  const { getPurchased } = useListsService();
  const [search, setSearch] = useState<string>("");

  const {
    data: purchasedData,
    isError,
    isLoading,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<{
    purchased: Books[];
    pagination: InfiniteScrollPagination;
  }>({
    queryKey: ["Purchased", search],
    queryFn: ({ pageParam }) =>
      getPurchased({ search, pageParam: pageParam as string | undefined }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.pagination?.has_more_pages) {
        return undefined;
      }
      return lastPage.pagination.next_page;
    },
  });

  const listPurchased =
    purchasedData?.pages.flatMap((page) => page.purchased) ?? [];

  return {
    listPurchased,
    search,
    setSearch,
    isError,
    isLoading,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
  };
};

export const useFirstWishlistBook = () => {
    const {listWishlist, isError, isLoading } = useWishlistsHook();

    const firstBook = listWishlist.length > 0 ? listWishlist[0] : null;

    return {
        firstBook,
        isError,
        isLoading
    }
}