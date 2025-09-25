import { YStack, YStackProps } from "tamagui";
import { Colors } from "@/theme-config/colors";

type CardProps = YStackProps & {
  children: React.ReactNode;
};
type CardSectionProps = YStackProps & {
  children: React.ReactNode;
};

const Card = ({ children, ...props }: CardProps) => {
  return (
    <YStack
      mb="$3"
      br={10}
      backgroundColor={Colors.activeTintColor}
      shadowColor="#000"
      shadowOffset={{ width: 0, height: 7 }}
      shadowOpacity={0.45}
      shadowRadius={10}
      elevation={15}
      {...props}
    >
      {children}
    </YStack>
  );
};

const CardHeader = ({ children, ...props }: CardSectionProps) => (
  <YStack paddingBottom={10} paddingTop={20} gap={10} {...props}>
    {children}
  </YStack>
);

const CardBody = ({ children, ...props }: CardSectionProps) => (
  <YStack paddingBottom={20} {...props}>
    {children}
  </YStack>
);

Card.Header = CardHeader;
Card.Body = CardBody;

export default Card;
