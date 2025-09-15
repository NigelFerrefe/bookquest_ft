import { YStack } from "tamagui";
import { ChevronRight } from "@tamagui/lucide-icons";
import { EditFieldChipItem } from "@/components/ui/editFieldChip";

const EditCostScreen = ({ price }: { price: number }) => {
  return (
    <YStack>
      <EditFieldChipItem 
      onPress= {() => console.log('open modal')}
      label='Author'
      value={`${price} €`}
      icon={<ChevronRight />}
      />
    </YStack>
  );
};

export default EditCostScreen;
