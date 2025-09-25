import { YStack } from "tamagui";
import { ChevronRight } from "@tamagui/lucide-icons";
import { EditFieldChipItem } from "@/components/ui/editFieldChip";
import { useState } from "react";
import { CostModal } from "@/components/pages/book/edit/costModal";

const EditCostScreen = ({ price, id }: { price: number; id: string }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <YStack>
      <EditFieldChipItem
        onPress={() => setModalVisible(true)}
        label="Cost"
        value={`${price} €`}
        icon={<ChevronRight />}
      />
      {modalVisible && (
        <CostModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          bookId={id}
          initialPrice={price}
        />
      )}
    </YStack>
  );
};

export default EditCostScreen;
