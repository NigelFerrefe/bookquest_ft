import { FormInput } from "@/components/formInputs/textInput";
import ChipItem from "@/components/ui/chip";
import SearchBar from "@/components/ui/searchBar";
import { useGenreHook } from "@/hooks/useGenrePage";
import { Genre } from "@/models/genre.model";
import { useBookService } from "@/services/book.service";
import { useGenreService } from "@/services/genre.service";
import Button from "@/theme-config/custom-components";
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Keyboard, Pressable } from "react-native";
import { YStack, Text } from "tamagui";
import { Colors } from "@/theme-config/colors";
import { invalidateBookLists } from "@/utils/invalidateQueries";
type GenreModalProps = {
  visible: boolean;
  onClose: () => void;
  bookId: string;
  initialGenres: Genre[];
};

type FormValues = {
  name: string;
};

export const GenreModal = ({
  visible,
  onClose,
  bookId,
  initialGenres,
}: GenreModalProps) => {
  const modalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["70%", "90%"], []);
  const queryClient = useQueryClient();
  const { updateGenre } = useGenreService();
  const { updateBook } = useBookService();
  const {
    listGenre,
    search,
    setSearch,
    hasNextPage,
    fetchNextPage,
    isLoadingSearchedGenre,
  } = useGenreHook();

  const [genre, setGenre] = useState<Genre[]>(initialGenres ?? []);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { name: initialGenres?.map((g) => g.name).join(", ") || "" },
  });

  const handleClose = useCallback(() => {
    modalRef.current?.dismiss();
    onClose();
  }, [onClose]);

  const toggleGenre = (item: Genre) => {
    let newGenres: Genre[];
    if (genre.some((g) => g._id === item._id)) {
      newGenres = genre.filter((g) => g._id !== item._id);
    } else {
      newGenres = [...genre, item];
    }
    setGenre(newGenres);
    setValue("name", newGenres.map((g) => g.name).join(", "));
  };

  const onSubmit = async (data: FormValues) => {
    try {
      // Case 1
      if (
        genre.length &&
        JSON.stringify(genre.map((g) => g._id)) !==
          JSON.stringify(initialGenres.map((g) => g._id))
      ) {
        const formData = new FormData();
        genre.forEach((g) => formData.append("genre", g._id));

        await updateBook(bookId, formData);

        queryClient.setQueryData(["book", bookId], (old: any) => ({
          ...(old ?? {}),
          genre,
        }));
      }

      // Case 2
      if (data.name && genre.length === 1) {
        const target = genre[0];
        if (target && data.name !== target.name) {
          const updatedGenre = await updateGenre(target._id, {
            name: data.name,
          });

          queryClient.setQueryData(["genre", updatedGenre._id], updatedGenre);

          queryClient.setQueryData(["book", bookId], (old: any) => ({
            ...(old ?? {}),
            genre: (old?.genre ?? []).map((g: Genre) =>
              g._id === updatedGenre._id ? updatedGenre : g
            ),
          }));
        }
      }

      invalidateBookLists(queryClient);

      handleClose();
    } catch (error) {
      console.error("Error updating genres:", error);
    }
  };

  const renderItem = ({ item }: { item: Genre }) => {
    const isSelected = genre.some((g) => g._id === item._id);
    return (
      <Pressable onPress={() => toggleGenre(item)}>
        <ChipItem
          label={item.name}
          backgroundColor={isSelected ? "#008BBE" : "#e4ba7aff"}
          size="medium"
        />
      </Pressable>
    );
  };

  const clearSearch = () => setSearch("");

  useEffect(() => {
    if (visible) {
      modalRef.current?.present();
      setValue("name", genre.map((g) => g.name).join(", "));
    } else {
      modalRef.current?.dismiss();
    }
  }, [visible, genre, setValue]);

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
            placeholder="Set new genre"
            label="Genre"
            required
            type="text"
          />
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
