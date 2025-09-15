import { z } from "zod";
import { AuthorSchema, CreateAuthor } from "./author.model";
import { CreateGenre, GenreSchema } from "./genre.model";

export const BookSchema = z.object({
  _id: z.string(),
  title: z.string(),
  author: AuthorSchema,
  genre: z.array(GenreSchema),
  imageUrl: z.string().optional(),
  isBought: z.boolean(),
  isFavorite: z.boolean(),
  owner: z.string(),
  price: z.number().optional(),
  description: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number(),
});

export const CreateBook = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title can't be longer than 100 characters"),
  author: z.string(),     
  genre: z.array(z.string()), 
  imageUrl: z
  .object({
    fileURL: z.string(),
    path: z.string(),
  })
  .optional(),
  isBought: z.boolean().optional(),
  isFavorite: z.boolean().optional(),
  price: z.number().optional(),
  description: z.string().optional()
  
})

export const DeleteBook = z.object({
  message: z.string(),
  book: BookSchema
})

export type Books = z.infer<typeof BookSchema>;
export type NewBook = z.infer<typeof CreateBook>
export type DeletedBook = z.infer<typeof DeleteBook>

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
