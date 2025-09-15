import { FlatList, Modal, Pressable } from "react-native";
import { YStack, Text } from "tamagui";
import { X } from "@tamagui/lucide-icons";
import SearchBar from "./searchBar";
import ChipItem from "./chip";
import { useGenreHook } from "@/hooks/useGenrePage";
import { Genre } from "@/models/genre.model";
import Button from "@/theme-config/custom-components";
import { Colors } from "@/theme-config/colors";

interface NewGenreProps {
  visible: boolean;
  onCancel: () => void;
  genre: Genre[];
  setGenre: (g: Genre[]) => void;
}

const NewGenreModal = ({
  visible,
  onCancel,
  genre,
  setGenre,
}: NewGenreProps) => {
  const {
    listGenre,
    search,
    setSearch,
    isErrorSearchedGenre,
    isLoadingSearchedGenre,
    refetchSearchedGenre,
    isRefetchingSearchedGenre,
    fetchNextPage,
    hasNextPage,
  } = useGenreHook();

  const toggleGenre = (item: Genre) => {
    const exists = genre.some((g) => g._id === item._id);
    if (exists) {
      setGenre(genre.filter((g) => g._id !== item._id));
    } else {
      setGenre([...genre, item]);
    }
  };

  const renderItem = ({ item }: { item: Genre }) => {
    const isSelected = genre.some((g) => g._id === item._id);
    return (
      <Pressable onPress={() => toggleGenre(item)} >
        <ChipItem
          label={item.name}
          backgroundColor={isSelected ? "#008BBE" : "#e4ba7aff"}
          size="medium"
        />
      </Pressable>
    );
  };

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
            placeholder="Search a genre"
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={() => {}}
            searchQuery={search}
            clearSearch={clearSearch}
          />
        </YStack>

        <FlatList
          data={listGenre}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={{ gap: 10, paddingBottom: 20 }}
          columnWrapperStyle={{ justifyContent: "center", gap: 10 }}
          onEndReached={() => {
            if (hasNextPage) fetchNextPage();
          }}
          onEndReachedThreshold={0.5} 
          ListFooterComponent={
            isLoadingSearchedGenre ? (
              <Text>Loading more genres...</Text>
            ) : null
          }
        />

        <Button onPress={onCancel} backgroundColor={Colors.primaryButton} color={'#fff'} >
          Confirmar selección
        </Button>
      </YStack>
    </Modal>
  );
};

export default NewGenreModal;
