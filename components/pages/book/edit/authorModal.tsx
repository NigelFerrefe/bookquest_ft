import { YStack, Text } from "tamagui";
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/theme-config/custom-components";
import { FormInput } from "@/components/formInputs/textInput";
import { useAuthorService } from "@/services/author.service";
import { useQueryClient } from "@tanstack/react-query";
import { Author } from "@/models/author.model";
import { useAuthorHook } from "@/hooks/useAuthorPage";
import SearchBar from "@/components/ui/searchBar";
import { Keyboard, Pressable } from "react-native";
import ChipItem from "@/components/ui/chip";
import { useBookService } from "@/services/book.service";
import { Colors } from "@/theme-config/colors";
import { invalidateBookLists } from "@/utils/invalidateQueries";

type AuthorModalProps = {
  visible: boolean;
  onClose: () => void;
  bookId: string;
  initialAuthor: Author | null;
};

type AuthorUpdatePayload = { _id: string; name: string };

export const AuthorModal = ({
  visible,
  onClose,
  bookId,
  initialAuthor,
}: AuthorModalProps) => {
  const modalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["70%", "90%"], []);
  const queryClient = useQueryClient();
  const { updateAuthor } = useAuthorService();
  const { updateBook } = useBookService();
  const {
    listAuthor,
    search,
    setSearch,
    hasNextPage,
    fetchNextPage,
    isLoadingSearchedAuthor,
  } = useAuthorHook();

  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(
    initialAuthor
  );

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { name: initialAuthor?.name ?? "" },
  });

  const handleClose = useCallback(() => {
    modalRef.current?.dismiss();
    onClose();
  }, [onClose]);

  const onSubmit = async (data: { name: string }) => {
    try {
      if (!selectedAuthor && !data.name) return;

      // Case 1: select another created author -> update book
      if (selectedAuthor && selectedAuthor._id !== initialAuthor?._id) {
        const formData = new FormData();
        formData.append("author", selectedAuthor._id);

        await updateBook(bookId, formData);

        queryClient.setQueryData(["book", bookId], (oldData: any) => ({
          ...oldData,
          author: selectedAuthor,
        }));
      }
      // Case 2: edited current author -> update author
      else if (data.name && initialAuthor) {
        const updatedAuthor = await updateAuthor(initialAuthor._id, {
          name: data.name,
        });

        queryClient.setQueryData(["author", updatedAuthor._id], updatedAuthor);
        queryClient.setQueryData(["book", bookId], (oldData: any) => ({
          ...(oldData ?? {}),
          author: updatedAuthor,
        }));
      }
      invalidateBookLists(queryClient);
      handleClose();
    } catch (error) {
      console.error("Error updating author:", error);
    }
  };

  const renderItem = ({ item }: { item: Author }) => (
    <Pressable
      onPress={() => {
        setSelectedAuthor(item);
        setValue("name", item.name);
      }}
    >
      <ChipItem
        label={item.name}
        backgroundColor={
          selectedAuthor?._id === item._id
            ? Colors.accent
            : Colors.secondaryButton
        }
        size="medium"
      />
    </Pressable>
  );

  const clearSearch = () => setSearch("");

  useEffect(() => {
    if (visible) {
      modalRef.current?.present();
    } else {
      modalRef.current?.dismiss();
    }
  }, [visible]);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => {
      modalRef.current?.snapToIndex(2);
    });
    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      modalRef.current?.snapToIndex(1);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <BottomSheetModal
      ref={modalRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      onDismiss={onClose}
    >
      <BottomSheetView>
        <YStack p={20} gap={20}>
          <FormInput
            control={control}
            errors={errors}
            name="name"
            placeholder="Set new author"
            label="Author"
            required
            type="text"
          />

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

          <Button
            backgroundColor={Colors.primaryButton}
            onPress={handleSubmit(onSubmit)}
          >
            <Text color={Colors.fontColor} fontSize={16}>
              Save
            </Text>
          </Button>
        </YStack>
      </BottomSheetView>
    </BottomSheetModal>
  );
};
