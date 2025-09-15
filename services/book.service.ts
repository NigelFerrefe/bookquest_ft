import { del, get, getPagination, post, put } from "@/managers/api";
import { BooksModel, Books, NewBook, DeletedBook } from "@/models/book.model";

export const useBookService = () => {
  const getBookDetails = async ({
    bookId,
  }: {
    bookId: string;
  }): Promise<Books> => {
    const book = await get<Books>(`api/book/${bookId}`);

    if (!book) {
      console.error("Invalid book data: ", book);
      throw new Error(
        "[BookService: GetBookDetails: API response is missing or invalid"
      );
    }
    //console.log("book from service", book)
    return book;
  };


  const createBook = async (postData: FormData): Promise<Books> => {
    try {
      const response = await post<Books>("api/book", postData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response;
    } catch (error) {
      console.error("Error creating book:", error);
      throw new Error();
    }
  };

  const updateBook = async (bookId: string, postData: FormData): Promise<Books> => {
    try {
      const response = await put<Books>(`api/book/${bookId}`, postData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response;
    } catch (error) {
      console.error("Error updating book:", error);
      throw new Error();
    }
  };

  const deleteBook = async (bookId: string): Promise<DeletedBook> => {
    try {
      const response = await del<DeletedBook>(`api/book/${bookId}`);
      return response;
    } catch (error) {
      console.error("Error deleting book:", error);
      throw new Error();
    }
  };

  return {
    getBookDetails,
    createBook,
    updateBook,
    deleteBook,
  };
};


