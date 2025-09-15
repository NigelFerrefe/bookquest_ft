import { YStack } from "tamagui";
import { ChevronRight } from "@tamagui/lucide-icons";
import { EditFieldChipItem } from "@/components/ui/editFieldChip";

const EditCostScreen = ({ classes } : { classes: string[] }) => {
  return (
    <YStack>
      <EditFieldChipItem 
      onPress= {() => console.log('open modal')}
      label='Class'
      value={classes.join(", ")} 
      icon={<ChevronRight />}
      />
    </YStack>
  );
};

export default EditCostScreen;
