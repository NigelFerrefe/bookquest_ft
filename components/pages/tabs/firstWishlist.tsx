import React from "react";
import { useFirstWishlistBook } from "@/hooks/useListsPage";
import { YStack, Text, Image, XStack } from "tamagui";
import { Text as AlmendraText } from "react-native";
import Button from "@/theme-config/custom-components";
import { useAuth } from "@/provider/AuthProvider";
import ChipItem from "@/components/ui/chip";
import Card from "@/components/ui/card";

const FirstWishlist = () => {
  const { firstBook } = useFirstWishlistBook();
  const { title, author, genre, imageUrl, isBought, isFavorite } = firstBook || {};

  const { onLogout } = useAuth();

  return (
    <YStack gap={20} ai="center" mt={20}>
      <AlmendraText
        style={{
          fontFamily: "AlmendraBold",
          fontSize: 36,
          textAlign: "center"
        }}
      >
        Your last BookQuest
      </AlmendraText>
      {/* Card */}
      <Card>
        <Card.Header>
          <AlmendraText
            style={{
              fontFamily: "Almendra",
              fontSize: 36,
              textAlign: "center",
              fontStyle: "italic",
              color: "#2E3B76",
            }}
          >
            {title}
          </AlmendraText>
          <Text fontSize={18}>{author?.name}</Text>
        </Card.Header>

        <Card.Body>
          <Image
            source={imageUrl ? { uri: imageUrl } : undefined}
            w={280}
            h={300}
            objectFit="contain"
          />
          <XStack flexWrap="wrap" gap="$2" jc="center" paddingVertical={20}>
            {genre?.map((g) => (
              <ChipItem
                key={g._id}
                label={g.name}
                backgroundColor="#008BBE"
                size="small"
                
              />
            ))}
          </XStack>
        </Card.Body>
      </Card>
      <Button onPress={onLogout}>Sign Out</Button>
    </YStack>
  );
};

export default FirstWishlist;

{/*       <Button onPress={onLogout}>Sign Out</Button>
  #008BBE
  #00C2E8
 */}