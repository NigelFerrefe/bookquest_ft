import { del, get, getPagination, post, put } from "@/managers/api";
import { InfiniteScrollPagination } from "@/models/pagination.model";
import { Author, DeletedAuthor, NewAuthor } from "@/models/author.model";
import { Books } from "@/models/book.model";
import axios from "axios";

export const useAuthorService = () => {
  const getAllAuthors = async ({
    search,
    pageParam,
  }: {
    search: string;
    pageParam?: string;
  }): Promise<{ authors: Author[]; pagination: InfiniteScrollPagination }> => {
    console.log("Llamando a /api/author con headers:", axios.defaults.headers.common);
    const { data: authors, pagination } = await getPagination<
      Author[],
      InfiniteScrollPagination
    >(`api/author?search=${search}&page=${pageParam}`);

    if (!authors) {
      console.error("Invalid authors data: ", authors);
      throw new Error(
        "[AuthorService: GetAllAuthors: API response is missing or invalid"
      );
    }

    return { authors, pagination: pagination! };
  };

  const booksFromAuthor = async ({
    authorId,
    search,
    pageParam,
  }: {
    authorId: string;
    search: string;
    pageParam?: string;
  }): Promise<{ books: Books[]; pagination: InfiniteScrollPagination }> => {
    const { data: books, pagination } = await getPagination<
      Books[],
      InfiniteScrollPagination
    >(`api/author/${authorId}/books?search=${search}&page=${pageParam}`);

    if (!books) {
      console.error("Invalid authors data: ", books);
      throw new Error(
        "[AuthorService: booksFromAuthor: API response is missing or invalid"
      );
    }

    return { books: books ?? [], pagination: pagination! };
  };

  const createAuthor = async (postData: NewAuthor): Promise<Author> => {
    try {
      const response = await post<Author>(`api/author`, postData);
      return response;
    } catch (error) {
      console.error("Error creating author:", error);
      throw new Error();
    }
  };

    const updateAuthor = async (
        authorId: string,
        postData: NewAuthor
    ): Promise<Author> => {
    try {
      const response = await put<Author>(`api/author/${authorId}`, postData);
      return response;
    } catch (error) {
      console.error("Error updating author:", error);
      throw new Error();
    }
  };

  const deleteAuthor = async (authorId: string): Promise<DeletedAuthor> => {
    try {
      const response = await del<DeletedAuthor>(`api/author/${authorId}`);
      return response;
    } catch (error) {
      console.error("Error deleting author:", error);
      throw new Error();
    }
  };

  return {
    getAllAuthors,
    booksFromAuthor,
    createAuthor,
    updateAuthor,
    deleteAuthor,
  };
};
