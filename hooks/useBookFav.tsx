import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Books } from "@/models/book.model";
import { useBookService } from "@/services/book.service";

export function useBookFav(book?: Books) {
  const queryClient = useQueryClient();
  const { updateBook } = useBookService();
  const [isFav, setIsFav] = useState<boolean>(!!book?.isFavorite);

  useEffect(() => {
    if (book) setIsFav(book.isFavorite);
  }, [book]);

  const mutation = useMutation<Books, Error, boolean, { previousBook?: Books }>(
    {
      mutationFn: async (checked: boolean) => {
        if (!book) throw new Error("Book not defined");
        const formData = new FormData();
        formData.append("isFavorite", JSON.stringify(checked));
        return updateBook(book._id, formData);
      },
      onMutate: async (checked: boolean) => {
        if (!book) return {};
        setIsFav(checked);

        await queryClient.cancelQueries({ queryKey: ["book", book._id] });

        const previousBook = queryClient.getQueryData<Books>([
          "book",
          book._id,
        ]);
        return { previousBook };
      },
      onError: (err, checked, context) => {
        console.error(err);
        if (context?.previousBook) setIsFav(context.previousBook.isFavorite);
      },
      onSettled: () => {
        if (book)
          queryClient.invalidateQueries({ queryKey: ["book", book._id] });
      },
    }
  );

  const toggleFav = (checked: boolean) => {
    if (!book) return;
    mutation.mutate(checked);
  };
  return {
    isFav,
    toggleFav,
    isLoading: mutation.status === "pending",
  };
}
