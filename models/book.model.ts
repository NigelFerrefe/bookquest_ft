import { z } from "zod";
import { AuthorSchema } from "./author.model";
import { GenreSchema } from "./genre.model";

export const BookSchema = z.object({
  _id: z.string(),
  title: z.string(),
  author: AuthorSchema,
  genre: z.array(GenreSchema),
  imageUrl: z.string().optional(),
  isBought: z.boolean(),
  isFavorite: z.boolean(),
  owner: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number(),
});

export type Books = z.infer<typeof BookSchema>;

export class BooksModel {
  constructor(readonly books: Books) {
    this.books = books;
  }

  static fromApi(books: unknown): BooksModel {
    try {
      const parsedBooks = BookSchema.parse(books);
      return new BooksModel(parsedBooks);
    } catch (error) {
      console.log("Invalid books data: ", error);
      throw new Error("Invalid books");
    }
  }
}
