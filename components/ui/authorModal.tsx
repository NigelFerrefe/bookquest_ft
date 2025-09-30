import React, { useRef, useMemo, useEffect } from "react";
import { FlatList, Keyboard, Pressable } from "react-native";
import { YStack, Text } from "tamagui";
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { X } from "@tamagui/lucide-icons";
import SearchBar from "./searchBar";
import ChipItem from "./chip";
import { Author } from "@/models/author.model";
import { useAuthorHook } from "@/hooks/useAuthorPage";
import { Colors } from "@/theme-config/colors";

interface NewAuthorProps {
  visible: boolean;
  onCancel: () => void;
  author: Author | null;
  setAuthor: (a: Author) => void;
}

const NewAuthorModal = ({
  visible,
  onCancel,
  author,
  setAuthor,
}: NewAuthorProps) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["50%", "90%"], []);

  const {
    listAuthor,
    search,
    setSearch,
    hasNextPage,
    fetchNextPage,
    isLoadingSearchedAuthor,
  } = useAuthorHook();

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.dismiss();
    }
  }, [visible]);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => {
      bottomSheetRef.current?.snapToIndex(2);
    });
    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      bottomSheetRef.current?.snapToIndex(1);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const renderItem = ({ item }: { item: Author }) => (
    <Pressable
      onPress={() => {
        setAuthor(item);
        onCancel();
      }}
    >
      <ChipItem
        label={item.name}
        backgroundColor={
          author?._id === item._id ? Colors.secondaryButton : Colors.accent
        }
        size="medium"
      />
    </Pressable>
  );

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
              placeholder="Search an author"
              value={search}
              onChangeText={setSearch}
              onSubmitEditing={() => {}}
              searchQuery={search}
              clearSearch={clearSearch}
            />
          </YStack>

          <BottomSheetFlatList
            data={listAuthor}
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
              isLoadingSearchedAuthor ? (
                <Text>Loading more genres...</Text>
              ) : null
            }
          />
        </YStack>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default NewAuthorModal;
