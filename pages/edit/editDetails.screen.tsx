import Button from "@/theme-config/custom-components";
import { YStack, Text, XStack } from "tamagui";
import { ChevronRight } from "@tamagui/lucide-icons";
import { EditFieldChipItem } from "@/components/ui/editFieldChip";
import { useState } from "react";
import { DetailsModal } from "@/components/pages/book/edit/detailsModal";

const EditDetailsScreen = ({
  description,
  id,
}: {
  description: string;
  id: string;
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <YStack>
      <EditFieldChipItem
        onPress={() => setModalVisible(true)}
        label="Details"
        value={description}
        icon={<ChevronRight />}
      />
      {modalVisible && (
        <DetailsModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          bookId={id}
          initialDescription={description}
        />
      )}
    </YStack>
  );
};

export default EditDetailsScreen;
