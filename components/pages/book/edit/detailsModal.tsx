import { X } from "@tamagui/lucide-icons";
import { Keyboard, Pressable } from "react-native";
import { YStack, Text } from "tamagui";
import { useForm } from "react-hook-form";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef, useEffect } from "react";
import Button from "@/theme-config/custom-components";
import { useBookService } from "@/services/book.service";
import { FormInput } from "@/components/formInputs/textInput";
import { useQueryClient } from "@tanstack/react-query";
import { FormTextArea } from "@/components/formInputs/textAreaInput";
import { Colors } from "@/theme-config/colors";
import { invalidateBookLists } from "@/utils/invalidateQueries";

type DetailsModalProps = {
  visible: boolean;
  onClose: () => void;
  bookId: string;
  initialDescription: string;
};

export const DetailsModal = ({
  visible,
  onClose,
  bookId,
  initialDescription,
}: DetailsModalProps) => {
  const { updateBook } = useBookService();
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { description: initialDescription },
  });

  const modalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["60%", "90%"], []);

  const handleClose = useCallback(() => {
    modalRef.current?.dismiss();
    onClose();
  }, [onClose]);

  const onSubmit = async (data: { description: string }) => {
    try {
      const formData = new FormData();
      formData.append("description", data.description);
      await updateBook(bookId, formData);
      queryClient.setQueryData(["book", bookId], (oldData: any) => ({
        ...oldData,
        description: data.description,
      }));
      invalidateBookLists(queryClient);

      handleClose();
    } catch (error) {
      console.error("Error updating description:", error);
    }
  };

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
      modalRef.current?.snapToIndex(0);
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
        <YStack p={20} gap={20} mb={80}>
          <YStack gap={15} ai={"center"} f={1} justifyContent="center">
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
              onPress={handleSubmit(onSubmit)}
            >
              <Text color={Colors.fontColor} fontSize={16}>
                Save
              </Text>
            </Button>
          </YStack>
        </YStack>
      </BottomSheetView>
    </BottomSheetModal>
  );
};
