import { XStack, YStack, Text } from "tamagui";
import Button from "@/theme-config/custom-components";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Genre } from "@/models/genre.model";
import GenreDialog from "@/components/ui/genreDialog";
import NewGenreModal from "@/components/ui/genreModal";
import { useGenreService } from "@/services/genre.service";
import { Colors } from "@/theme-config/colors";
import { Trash2 } from "@tamagui/lucide-icons";
import { Pressable } from "react-native";
type FormValues = {
  genreNames: string;
};

type GenreFormProps = {
  genre: Genre[];
  setGenre: (genres: Genre[]) => void;
};

const GenreForm = ({ genre, setGenre }: GenreFormProps) => {
  const [showGenreModal, setShowGenreModal] = useState(false);
  const [showGenreDialog, setShowGenreDialog] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { genreNames: "" },
  });

  const { createGenre } = useGenreService();

  const onSubmitGenre = async (names: string[]) => {
    if (!names.length) return;

    try {
      const savedGenres: Genre[] = [];

      for (const name of names) {
        const saved = await createGenre({ name });
        savedGenres.push(saved);
      }

      setGenre([...genre, ...savedGenres]);
      reset({ genreNames: "" });
      setShowGenreDialog(false);
    } catch (error) {
      console.error("Error creating genres:", error);
    }
  };

  return (
    <YStack gap={20}>
      <XStack gap={20}>
        <XStack alignItems="center">
          <Text fontWeight="700">Genres </Text>
          <Text fontSize={12} color="#a70117a4">
            *
          </Text>
        </XStack>
        <YStack
          borderWidth={1}
          borderColor={
            genre.length ? Colors.primaryButton : Colors.inactiveTintColor
          }
          paddingHorizontal={10}
          paddingVertical={12}
          borderRadius={5}
          flex={1}
          justifyContent="center"
        >
          <Text color={genre.length > 0 ? "#000" : "#999"}>
            {genre.length > 0
              ? genre.map((g) => g.name).join(", ")
              : "Set genres"}
          </Text>
        </YStack>
      </XStack>

      <XStack gap={20} justifyContent="center" ai="center">
        <Button
          onPress={() => setShowGenreDialog(true)}
          backgroundColor={Colors.secondaryButton}
          borderColor={Colors.primaryButton}
          size={"$sm"}
        >
          New genre
        </Button>
        <Button
          onPress={() => setShowGenreModal(true)}
          backgroundColor={Colors.secondaryButton}
          borderColor={Colors.primaryButton}
          size={"$sm"}
        >
          Select from list
        </Button>
        {genre.length > 0 && (
          <Pressable onPress={() => setGenre([])}>
            <Trash2 color={Colors.danger} />
          </Pressable>
        )}
      </XStack>
      {showGenreDialog && (
        <GenreDialog
          visible={showGenreDialog}
          onCancel={() => setShowGenreDialog(false)}
          control={control}
          handleSubmit={handleSubmit}
          errors={errors}
          onSubmit={onSubmitGenre}
        />
      )}
      {showGenreModal && (
        <NewGenreModal
          visible={showGenreModal}
          onCancel={() => {
            setShowGenreModal(false);
          }}
          genre={genre}
          setGenre={setGenre}
        />
      )}
    </YStack>
  );
};

export default GenreForm;
