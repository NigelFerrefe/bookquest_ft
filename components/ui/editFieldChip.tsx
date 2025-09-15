import { YStack, XStack, Text } from "tamagui";
import Button from "@/theme-config/custom-components";

type EditFieldChipItemProps = {
  label: string;
  value: string | number;
  onPress: () => void;
  icon?: React.ReactNode;
};

export const EditFieldChipItem = ({
  label,
  value,
  onPress,
  icon,
}: EditFieldChipItemProps) => {
  return (
    <YStack
      borderRadius={10}
      borderWidth={1}
      borderColor={"#282828"}
      overflow={"hidden"}
    >
      <XStack alignItems="center" padding={10} gap={10}>
        <Button
          onPress={onPress}
          pressStyle={{
            backgroundColor: "transparent",
            borderColor: "transparent",
          }}
          hoverStyle={{
            backgroundColor: "transparent",
            borderColor: "transparent",
          }}
          focusStyle={{
            backgroundColor: "transparent",
            borderColor: "transparent",
          }}
          backgroundColor={"transparent"}
          paddingHorizontal={0}
        >
          <XStack justifyContent="space-between" alignItems="center" width="100%">
            <YStack gap={2} flex={1}>
              <Text fontWeight={"700"}>{label}</Text>
              <Text
                color={"#6F6F6F"}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {value}
              </Text>
            </YStack>
            {icon}
          </XStack>
        </Button>
      </XStack>
    </YStack>
  );
};
