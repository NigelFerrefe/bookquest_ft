import { FlatList, Modal, Pressable } from "react-native";
import { YStack, Text } from "tamagui";
import { useAuthorHook } from "@/hooks/useAuthorPage";
import { X } from "@tamagui/lucide-icons";
import SearchBar from "./searchBar";
import { Author } from "@/models/author.model";
import ChipItem from "./chip";

interface NewAuthorProps {
  visible: boolean;
  onCancel: () => void;
  author: Author | null;
  setAuthor: (a: Author) => void;
}

const NewAuthorModal = ({ visible, onCancel, author, setAuthor }: NewAuthorProps) => {
  const {
    listAuthor,
    search,
    setSearch,
    isLoadingSearchedAuthor,
    hasNextPage,
    fetchNextPage,
  } = useAuthorHook();

  const renderItem = ({ item }: { item: Author }) => (
    <Pressable onPress={() => {
      setAuthor(item);
      onCancel(); 
    }}>
      <ChipItem
        label={item.name}
        backgroundColor={author?._id === item._id ? "#008BBE" : "#e4ba7aff"}
        size="medium"
      />
    </Pressable>
  );

  const clearSearch = () => setSearch("");

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <YStack p={20} gap={20}>
        <YStack ai="flex-end">
          <Pressable onPress={onCancel}>
            <X />
          </Pressable>
        </YStack>

        <YStack borderWidth={1} borderColor="black" borderRadius={15}>
          <SearchBar
            placeholder="Search an author"
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={() => {}} 
            searchQuery={search}
            clearSearch={clearSearch}
          />
        </YStack>

        <FlatList
          data={listAuthor}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={{ gap: 10, paddingBottom: 20 }}
          columnWrapperStyle={{ justifyContent: "center", gap: 10 }}
        />
      </YStack>
    </Modal>
  );
};

export default NewAuthorModal;
