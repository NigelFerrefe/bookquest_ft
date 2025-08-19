import { z } from "zod";

export const AuthorSchema = z.object({
  _id: z.string(),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number(),
});

export const CreateAuthor = z.object({
  name: z.string().min(1, "Name is required").max(100, "Author can't be longer than 100 characters")

})

export const DeleteAuthor = z.object({
  message: z.string(),
  author: AuthorSchema
})

export type Author = z.infer<typeof AuthorSchema>;
export type NewAuthor = z.infer<typeof CreateAuthor>;
export type DeletedAuthor = z.infer<typeof DeleteAuthor>