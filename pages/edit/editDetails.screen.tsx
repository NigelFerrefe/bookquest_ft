import Button from "@/theme-config/custom-components";
import { YStack, Text, XStack } from "tamagui";
import { ChevronRight } from "@tamagui/lucide-icons";
import { EditFieldChipItem } from "@/components/ui/editFieldChip";

const EditDetailsScreen = ({ description }: { description: string }) => {
  return (
    <YStack>
      <EditFieldChipItem 
      onPress= {() => console.log('open modal')}
      label='Author'
      value={description}
      icon={<ChevronRight />}
      />
    </YStack>
  );
};

export default EditDetailsScreen;
