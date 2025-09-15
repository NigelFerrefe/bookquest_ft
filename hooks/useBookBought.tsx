// hooks/useBookBought.ts
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Books } from "@/models/book.model";
import { useBookService } from "@/services/book.service";

export function useBookBought(book?: Books) {
  const queryClient = useQueryClient();
  const { updateBook } = useBookService();
  const [isBought, setIsBought] = useState<boolean>(!!book?.isBought);

  useEffect(() => {
    if (book) setIsBought(book.isBought);
  }, [book]);

  const mutation = useMutation<Books, Error, boolean, { previousBook?: Books }>({
    mutationFn: async (checked: boolean) => {
      if (!book) throw new Error("Book not defined");

      const formData = new FormData();
      formData.append("isBought", JSON.stringify(checked));

      return updateBook(book._id, formData);
    },
    onMutate: async (checked: boolean) => {
      if (!book) return {};
      setIsBought(checked);

      await queryClient.cancelQueries({ queryKey: ["book", book._id] });

      const previousBook = queryClient.getQueryData<Books>(["book", book._id]);
      return { previousBook };
    },
    onError: (err, checked, context) => {
      console.error(err);
      if (context?.previousBook) setIsBought(context.previousBook.isBought);
    },
    onSettled: () => {
      if (book) queryClient.invalidateQueries({ queryKey: ["book", book._id] });
    },
  });

  const toggleBought = (checked: boolean) => {
    if (!book) return; 
    mutation.mutate(checked);
  };
  return { 
    isBought, 
    toggleBought, 
    isLoading: mutation.status === "pending" 
  }; 
}
