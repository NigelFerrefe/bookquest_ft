import React from "react";
import { YStack, YStackProps } from "tamagui";


type CardProps = YStackProps & {
  children: React.ReactNode;
};
type CardSectionProps = YStackProps & {
  children: React.ReactNode;
};

const Card = ({ children, ...props }: CardProps) => {
  return (
    <YStack
      w={320}
      backgroundColor="#fff"
      borderWidth={2}
      borderColor="#008BBE"
      mb="$6"
      br={5}
      {...props} 
    >
      {children}
    </YStack>
  );
};

const CardHeader = ({ children, ...props }: CardSectionProps) => (
  <YStack
    w="100%"
    h={140}
    borderBottomWidth={2}
    borderColor="#008BBE"
    jc="center"
    ai="center"
    {...props}  
  >
    {children}
  </YStack>
);

const CardBody = ({ children, ...props }: CardSectionProps) => (
  <YStack
    ai="center"
    backgroundColor="#faebe0ff"
    paddingTop={20}
    {...props} 
  >
    {children}
  </YStack>
);

Card.Header = CardHeader;
Card.Body = CardBody;

export default Card;
