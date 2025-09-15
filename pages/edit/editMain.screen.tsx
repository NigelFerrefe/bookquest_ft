import { useBookService } from "@/services/book.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { ScrollView, YStack } from "tamagui";
import { Colors } from "@/theme-config/colors";
import EditTittleScreen from "./editTitle.screen";
import EditAuthorScreen from "./editAuthor.screen";
import EditCostScreen from "./editCost.screen";
import EditClassScreen from "./editClass.screen";
import EditDetailsScreen from "./editDetails.screen";
const EditMainScreen = ({ id }: { id: string }) => {
  const { getBookDetails, updateBook } = useBookService();
  const queryClient = useQueryClient();
  const router = useRouter();
  const bookPlaceholder = require("@/assets/images/BookPlaceholder.png");
  const {
    data: book,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: () => getBookDetails({ bookId: id }),
    enabled: !!id,
  });
  return (
      <YStack p={20} f={1} gap={20} backgroundColor={Colors.background}>
        <EditTittleScreen title={book?.title || ""} />
        <EditAuthorScreen author={book?.author?.name || ""} />
        <EditCostScreen price={book?.price || 0} />
        <EditClassScreen classes={book?.genre?.map((g) => g.name) || []} />
        <EditDetailsScreen description={book?.description || ""} />
      </YStack>
  );
};

export default EditMainScreen;
