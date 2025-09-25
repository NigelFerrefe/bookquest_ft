import { Dialog, Text } from "tamagui";
import Button from "@/theme-config/custom-components";
import { FormInput } from "@/components/formInputs/textInput";
import { Colors } from "@/theme-config/colors";

interface AuthorDialogProps {
  visible: boolean;
  onCancel: () => void;
  control: any;
  errors: any;
  onSubmit: () => void;
}

const AuthorDialog = ({
  visible,
  onCancel,
  control,
  errors,
  onSubmit,
}: AuthorDialogProps) => {
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
            Set a new author!
          </Dialog.Title>

          <FormInput
            control={control}
            errors={errors}
            name="authorName"
            placeholder="Author..."
            autoCapitalize="words"
          />

          <Button
            size="$sm"
            width="100%"
            onPress={onSubmit}
            backgroundColor={Colors.primaryButton}
          >
            <Text color={Colors.fontColor} fontSize={16}>
              Create author
            </Text>
          </Button>

          <Dialog.Close asChild>
            <Button
              backgroundColor={Colors.danger}
              borderColor={Colors.primaryButton}
              size="$sm"
              width="100%"
            >
              <Text color={Colors.fontColor} fontSize={16}>
                Cancel
              </Text>
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export default AuthorDialog;
