import { YStack } from "tamagui";
import { ChevronRight } from "@tamagui/lucide-icons";
import { EditFieldChipItem } from "@/components/ui/editFieldChip";
import { useState } from "react";
import { Genre } from "@/models/genre.model";
import { GenreModal } from "@/components/pages/book/edit/genreModal";

const EditCostScreen = ({ classes, id }: { classes: Genre[]; id: string }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <YStack>
      <EditFieldChipItem
        onPress={() => setModalVisible(true)}
        label="Class"
        value={
          classes.length > 0
            ? classes.map((g) => g.name).join(", ")
            : "Select class"
        }
        icon={<ChevronRight />}
      />
      {modalVisible && (
        <GenreModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          bookId={id}
          initialGenres={classes}
        />
      )}
    </YStack>
  );
};

export default EditCostScreen;
