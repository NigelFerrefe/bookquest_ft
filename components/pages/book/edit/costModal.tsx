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
import { Colors } from "@/theme-config/colors";
import { invalidateBookLists } from "@/utils/invalidateQueries";

type CostModalProps = {
  visible: boolean;
  onClose: () => void;
  bookId: string;
  initialPrice: number;
};
type FormValues = { price: string };

export const CostModal = ({
  visible,
  onClose,
  bookId,
  initialPrice,
}: CostModalProps) => {
  const { updateBook } = useBookService();
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { price: initialPrice.toString() },
  });

  const modalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["30%", "60%"], []);

  const handleClose = useCallback(() => {
    modalRef.current?.dismiss();
    onClose();
  }, [onClose]);

  const onSubmit = async (data: FormValues) => {
    try {
      const numericPrice = Number(data.price);
      if (isNaN(numericPrice)) return;

      const formData = new FormData();
      formData.append("price", String(numericPrice));
      await updateBook(bookId, formData);
      queryClient.setQueryData(["book", bookId], (oldData: any) => ({
        ...oldData,
        price: numericPrice,
      }));
      invalidateBookLists(queryClient);

      handleClose();
    } catch (error) {
      console.error("Error updating price:", error);
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
      modalRef.current?.snapToIndex(1);
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
            <FormInput
              control={control}
              errors={errors}
              name="price"
              placeholder="00.00"
              autoCapitalize="words"
              label="Price"
              type="price"
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
