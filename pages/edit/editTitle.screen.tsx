import Button from "@/theme-config/custom-components";
import { YStack, Text, XStack } from "tamagui";
import { ChevronRight } from "@tamagui/lucide-icons";
import { EditFieldChipItem } from "@/components/ui/editFieldChip";
import { useState } from "react";
import { TitleModal } from "@/components/pages/book/edit/titleModal";

const EditTittleScreen = ({ title, id }: { title: string; id: string }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  return (
    <YStack>
      <EditFieldChipItem
        onPress={() => setModalVisible(true)}
        label="Title"
        value={title}
        icon={<ChevronRight />}
      />
      {modalVisible && (
        <TitleModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          bookId={id} 
          initialTitle={title}
        />
      )}
    </YStack>
  );
};

export default EditTittleScreen;
