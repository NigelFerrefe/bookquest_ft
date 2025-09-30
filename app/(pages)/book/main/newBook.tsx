import { YStack, ScrollView, Text } from "tamagui";
import { Colors } from "@/theme-config/colors";
import React, { useState } from "react";
import Button from "@/theme-config/custom-components";
import { Author } from "@/models/author.model";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/formInputs/textInput";
import AuthorForm from "@/components/pages/book/authorForm";
import { Genre } from "@/models/genre.model";
import GenreForm from "@/components/pages/book/genreForm";
import { FormTextArea } from "@/components/formInputs/textAreaInput";
import { NewBook } from "@/models/book.model";
import { useBookService } from "@/services/book.service";
import { FormImage } from "@/components/formInputs/imageInput";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Page = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [author, setAuthor] = useState<Author | null>(null);
  const [genre, setGenre] = useState<Genre[]>([]);

  const { createBook } = useBookService();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewBook>({
    defaultValues: {
      title: "",
      author: "",
      genre: [],
      imageUrl: undefined,
      isBought: false,
      isFavorite: false,
      price: undefined,
      description: "",
    },
  });

  const handleSubmitBook = async (data: NewBook) => {
    if (!author || genre.length === 0) {
      console.warn("Required fields missing");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("author", author._id);
      genre.forEach((g) => formData.append("genre", g._id));
      if (data.description) formData.append("description", data.description);
      if (data.price !== undefined)
        formData.append("price", String(data.price));
      formData.append("isBought", "false");
      formData.append("isFavorite", "false");

      if (data.imageUrl) {
        formData.append("imageUrl", {
          uri: data.imageUrl.fileURL.startsWith("file://")
            ? data.imageUrl.fileURL
            : `file://${data.imageUrl.fileURL}`,
          type: "image/jpeg",
          name: data.imageUrl.path.split("/").pop() || "book.jpg",
        } as any);
      }

      const newBook = await createBook(formData);
      console.log("Book created successfully:", newBook);

      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "Wishlist",
      });

      reset();
      setAuthor(null);
      setGenre([]);

      router.back();
    } catch (err) {
      console.error("Error creating book:", err);
    }
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: Colors.background,
        paddingBottom: 40
      }}
    >
      <YStack f={1} p={20} gap={20}>
        <FormInput
          control={control}
          errors={errors}
          name="title"
          placeholder="Title..."
          autoCapitalize="words"
          label="Title"
          required={true}
        />

        <AuthorForm author={author} setAuthor={setAuthor} />
        <GenreForm genre={genre} setGenre={setGenre} />
        <FormImage
          control={control}
          errors={errors}
          name="imageUrl"
          label="Book Cover"
        />
        <FormInput
          control={control}
          errors={errors}
          name="price"
          placeholder="00.00"
          autoCapitalize="words"
          label="Price"
          type="price"
        />
        <FormTextArea
          control={control}
          errors={errors}
          name="description"
          placeholder="Description..."
          autoCapitalize="sentences"
          label="Description"
          
        />

        <Button
          backgroundColor={Colors.primaryButton}
          onPress={handleSubmit(handleSubmitBook)}
        >
          <Text fontSize={20} color={Colors.fontColor}>
            Add book
          </Text>
        </Button>
      </YStack>
    </KeyboardAwareScrollView>
  );
};

export default Page;
