import { FlatList, Modal, Pressable } from "react-native";
import { YStack, Text } from "tamagui";
import { X } from "@tamagui/lucide-icons";
import SearchBar from "./searchBar";
import ChipItem from "./chip";
import { useGenreHook } from "@/hooks/useGenrePage";
import { Genre } from "@/models/genre.model";
import Button from "@/theme-config/custom-components";
import { Colors } from "@/theme-config/colors";
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useEffect, useMemo, useRef } from "react";

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
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["70%", "90%"], []);

  const toggleGenre = (item: Genre) => {
    const exists = genre.some((g) => g._id === item._id);
    if (exists) {
      setGenre(genre.filter((g) => g._id !== item._id));
    } else {
      setGenre([...genre, item]);
    }
  };

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.dismiss();
    }
  }, [visible]);

  const renderItem = ({ item }: { item: Genre }) => {
    const isSelected = genre.some((g) => g._id === item._id);
    return (
      <Pressable onPress={() => toggleGenre(item)}>
        <ChipItem
          label={item.name}
          backgroundColor={isSelected ? Colors.secondaryButton : Colors.accent}
          size="medium"
        />
      </Pressable>
    );
  };

  const clearSearch = () => setSearch("");

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      onDismiss={onCancel}
    >
      <BottomSheetView>
        <YStack p={20} gap={20}>
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

          <BottomSheetFlatList
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

          <Button onPress={onCancel} backgroundColor={Colors.primaryButton}>
            <Text color={Colors.fontColor} fontSize={16}>
              Save
            </Text>
          </Button>
        </YStack>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default NewGenreModal;
