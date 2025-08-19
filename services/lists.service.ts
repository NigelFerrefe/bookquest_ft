import { del, get, getPagination, post, put } from "@/managers/api";
import { Books } from "@/models/book.model";
import { InfiniteScrollPagination } from "@/models/pagination.model";

export const useListsService = () => {
  const getWishlist = async ({
    search,
    pageParam,
  }: {
    search: string;
    pageParam?: string;
  }): Promise<{ wishlist: Books[]; pagination: InfiniteScrollPagination }> => {
    const { data: wishlist, pagination } = await getPagination<
      Books[],
      InfiniteScrollPagination
    >(`api/book/wishlist?search=${search}&page=${pageParam}`);

    if (!wishlist) {
      console.error("Invalid wishlist data: ", wishlist);
    }
    return { wishlist: wishlist ?? [], pagination: pagination! };
  };

  const getFavorites = async ({
    search,
    pageParam,
  }: {
    search: string;
    pageParam?: string;
  }): Promise<{ favorites: Books[]; pagination: InfiniteScrollPagination }> => {
    const { data: favorites, pagination } = await getPagination<
      Books[],
      InfiniteScrollPagination
    >(`api/book/favorites?search=${search}&page=${pageParam}`);

    if (!favorites) {
      console.error("Invalid wishlist data: ", favorites);
    }
    return { favorites: favorites ?? [], pagination: pagination! };
  };

  const getPurchased = async ({
    search,
    pageParam,
  }: {
    search: string;
    pageParam?: string;
  }): Promise<{ purchased: Books[]; pagination: InfiniteScrollPagination }> => {
    const { data: purchased, pagination } = await getPagination<
      Books[],
      InfiniteScrollPagination
    >(`api/book/purchased?search=${search}&page=${pageParam}`);

    if (!purchased) {
      console.error("Invalid wishlist data: ", purchased);
    }
    return { purchased: purchased ?? [], pagination: pagination! };
  };

  return {
    getWishlist,
    getFavorites,
    getPurchased,
  };
};
