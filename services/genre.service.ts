import { del, get, getPagination, post, put } from "@/managers/api";
import { Books } from "@/models/book.model";
import { DeletedGenre, Genre, NewGenre } from "@/models/genre.model";
import { InfiniteScrollPagination } from "@/models/pagination.model";

export const useGenreService = () => {
  const getAllGenres = async ({
    search,
    pageParam,
  }: {
    search: string;
    pageParam?: string;
  }): Promise<{ genres: Genre[]; pagination: InfiniteScrollPagination }> => {
    const { data: genres, pagination } = await getPagination<
      Genre[],
      InfiniteScrollPagination
    >(`api/genre?search=${search}&page=${pageParam}`);

    if (!genres) {
      console.error("Invalid genres data: ", genres);
      throw new Error(
        "[GenreService: GetAllGenres: API response is missing or invalid"
      );
    }
    return { genres, pagination: pagination! };
  };

  const booksFromGenre = async ({
    genreId,
    search,
    pageParam,
  }: {
    genreId: string;
    search: string;
    pageParam?: string;
  }): Promise<{ data: Books[]; pagination: InfiniteScrollPagination }> => {
    const { data: books, pagination } = await getPagination<
      Books[],
      InfiniteScrollPagination
    >(`api/genre/${genreId}/books?search=${search}&page=${pageParam}`);

    if (!books) {
      console.error("Invalid genre data: ", books);
      throw new Error(
        "[AuthorService: booksFromGenre: API response is missing or invalid"
      );
    }

    return { data: books ?? [], pagination: pagination! };
  };

  const createGenre = async (postData: NewGenre): Promise<Genre> => {
    try {
      const response = await post<Genre>("api/genre", postData);
      return response;
    } catch (error) {
      console.error("Error creating genre:", error);
      throw new Error();
    }
  };

  const updateGenre = async (
    genreId: string,
    postData: NewGenre
  ): Promise<Genre> => {
    try {
      const response = await put<Genre>(`api/genre/${genreId}`, postData);
      return response;
    } catch (error) {
      console.error("Error updating genre:", error);
      throw new Error();
    }
  };

  const deleteGenre = async (genreId: string): Promise<DeletedGenre> => {
    try {
      const response = await del<DeletedGenre>(`api/genre/${genreId}`);
      return response;
    } catch (error) {
      console.error("Error deleting genre:", error);
      throw new Error();
    }
  };

  return {
    getAllGenres,
    booksFromGenre,
    createGenre,
    updateGenre,
    deleteGenre,
  };
};
