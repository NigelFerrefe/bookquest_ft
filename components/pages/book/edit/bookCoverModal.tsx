import { YStack, Text } from "tamagui";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import {
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
  SetStateAction,
} from "react";
import Button from "@/theme-config/custom-components";
import { useBookService } from "@/services/book.service";
import { useQueryClient } from "@tanstack/react-query";
import { ImagePickerComponent } from "@/components/ui/ImagePickerComponent";
import { Colors } from "@/theme-config/colors";
import { invalidateBookLists } from "@/utils/invalidateQueries";

type BookCoverModalProps = {
  visible: boolean;
  onClose: () => void;
  bookId: string;
  initialBookCover: string | null;
};

const BookCoverModal = ({
  visible,
  onClose,
  bookId,
  initialBookCover,
}: BookCoverModalProps) => {
  const { updateBookCover } = useBookService();
  const queryClient = useQueryClient();

  const modalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["60%"], []);

  const [image, setImage] = useState<{ fileURL: string; path: string } | null>(
    null
  );

  const handleClose = useCallback(() => {
    modalRef.current?.dismiss();
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (visible) modalRef.current?.present();
    else modalRef.current?.dismiss();
  }, [visible]);

  const handleSave = async () => {
    if (!image) return handleClose();

    try {
      await updateBookCover(bookId, image);
      queryClient.invalidateQueries({ queryKey: ["book", bookId] });
            invalidateBookLists(queryClient);
      
      handleClose();
    } catch (err) {
      console.error("Error updating image:", err);
    }
  };

  return (
    <BottomSheetModal
      ref={modalRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      onDismiss={onClose}
    >
      <BottomSheetView>
        <YStack p={20} gap={20} ai="center" mb={80}>
          <ImagePickerComponent
            disabled={false}
            order={0}
            value={
              image
                ? image
                : initialBookCover
                ? { fileURL: initialBookCover, path: initialBookCover }
                : undefined
            }
            onChangeText={(
              img: SetStateAction<{ fileURL: string; path: string } | null>
            ) => setImage(img)}
            onBlur={() => {}}
          />

          <Button onPress={handleSave} backgroundColor={Colors.primaryButton}>
            <Text color={Colors.fontColor} fontSize={16}>Save</Text>
          </Button>
        </YStack>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default BookCoverModal;
