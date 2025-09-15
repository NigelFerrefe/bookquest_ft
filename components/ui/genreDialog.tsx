import { Dialog } from "tamagui";
import Button from "@/theme-config/custom-components";
import { FormInput } from "@/components/formInputs/textInput";
import { Colors } from "@/theme-config/colors";

interface GenreDialogProps {
  visible: boolean;
  onCancel: () => void;
  control: any;
  handleSubmit: any;
  errors: any;
  onSubmit: (genres: string[]) => void;
}

const GenreDialog = ({
  visible,
  onCancel,
  control,
  handleSubmit,
  errors,
  onSubmit,
}: GenreDialogProps) => {
  const handleSubmitGenres = (data: any) => {
    const raw = data.genreNames || "";
    const genres = raw
      .split(",")
      .map((g: string) => g.trim())
      .filter((g: string) => g.length > 0);

    if (genres.length > 0) {
      onSubmit(genres);
      onCancel();
    }
  };

  return (
    <Dialog open={visible} onOpenChange={(open) => !open && onCancel()}>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          position="absolute"
          backgroundColor="black"
        />
        <Dialog.Content
          key="content"
          position="absolute"
          width="85%"
          borderRadius={10}
          enterStyle={{ y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ y: 10, opacity: 0, scale: 0.95 }}
          paddingHorizontal={20}
          gap={15}
        >
          <Dialog.Title fontSize={30} textAlign="center">
            Set new genres!
          </Dialog.Title>

          <FormInput
            control={control}
            errors={errors}
            name="genreNames"
            placeholder="Genre..."
            autoCapitalize="words"
          />

          <Button
            size="$sm"
            width="100%"
            onPress={handleSubmit(handleSubmitGenres)}
            backgroundColor={Colors.primaryButton}
            color={"white"}
          >
            Create genres
          </Button>

          <Dialog.Close asChild>
            <Button borderColor={Colors.primaryButton} size="$sm" width="100%">
              Cancel
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export default GenreDialog;
