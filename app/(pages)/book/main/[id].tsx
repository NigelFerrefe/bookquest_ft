import { useLocalSearchParams } from "expo-router";
import BookScreen from "@/pages/book/book.screen";


const BookId = () => {
  const { id } = useLocalSearchParams();

  if (!id) return null;
  
  return <BookScreen id={id as string}/>;
};

export default BookId;
