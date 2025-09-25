import Button from "@/theme-config/custom-components";
import { YStack, Text, XStack } from "tamagui";
import { ChevronRight } from "@tamagui/lucide-icons";
import { EditFieldChipItem } from "@/components/ui/editFieldChip";
import { useState } from "react";
import { AuthorModal } from "@/components/pages/book/edit/authorModal";
import { Author } from "@/models/author.model";

const EditAuthorScreen = ({ author, id }: { author: Author | null; id: string }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <YStack>
      <EditFieldChipItem
        onPress={() => setModalVisible(true)}
        label="Author"
        value={author?.name || 'Select author'}
        icon={<ChevronRight />}
      />
      {modalVisible && (
        <AuthorModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          bookId={id}
          initialAuthor={author}
        />
      )}
    </YStack>
  );
};

export default EditAuthorScreen;
