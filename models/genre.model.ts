import { z } from "zod";

export const GenreSchema = z.object({
    _id: z.string(),
    name: z.string(),
      createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number(),
})

export const CreateGenre = z.object({
  name: z.string().min(1, "Name is required").max(100, "Author can't be longer than 100 characters")
})

export const DeleteGenre = z.object({
  message: z.string(),
  genre: GenreSchema
})

export type Genre = z.infer<typeof GenreSchema>;
export type NewGenre = z.infer<typeof CreateGenre>;
export type DeletedGenre = z.infer<typeof DeleteGenre>;