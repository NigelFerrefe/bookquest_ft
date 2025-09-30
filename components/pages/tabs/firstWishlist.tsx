import { useFirstWishlistBook } from "@/hooks/useListsPage";
import { YStack, Text, Image, XStack } from "tamagui";
import { ActivityIndicator, Text as AlmendraText, Pressable } from "react-native";
import { useRouter } from "expo-router";
import Button from "@/theme-config/custom-components";
import { useAuth } from "@/provider/AuthProvider";
import ChipItem from "@/components/ui/chip";
import Card from "@/components/ui/card";
import { Colors } from "@/theme-config/colors";
import { ArrowRight } from "@tamagui/lucide-icons";

const FirstWishlist = () => {
  const { firstBook, isError, isLoading } = useFirstWishlistBook();
  const { title, author, genre, imageUrl, isBought, isFavorite } =
    firstBook || {};
  const router = useRouter();

  const bookPlaceholder = require("@/assets/images/BookPlaceholder.png");

  return (
    <YStack gap={20} ai="center" mt={20}>
      <AlmendraText
        style={{
          fontFamily: "AlmendraBold",
          fontSize: 30,
          textAlign: "center",
        }}
      >
        Your last BookQuest
      </AlmendraText>
      {/* Card */}
      {isLoading ? (
        <YStack gap={20}>
        <Text fontSize={16}>Loading your BookQuest...</Text>
        <ActivityIndicator size="large" color={Colors.accent} />
        </YStack>
      ) : isError ? (
        <Text fontSize={16} textAlign="center">
          Oops, something went wrong! Please try again later.
        </Text>
      ) : firstBook ? (
        <Card>
          <Card.Header>
            <Image
              source={imageUrl ? { uri: imageUrl } : bookPlaceholder}
              w={280}
              h={300}
              objectFit="contain"
            />
          </Card.Header>

          <Card.Body gap={20}>
            <YStack gap={10} ai={"center"}>
              <AlmendraText
                style={{
                  fontFamily: "Almendra",
                  fontSize: 28,

                  fontStyle: "italic",
                  color: Colors.accent,
                }}
              >
                {title}
              </AlmendraText>
              <Text fontSize={18}>{author?.name}</Text>
            </YStack>
            <XStack flexWrap="wrap" gap="$2" jc="center">
              {genre?.map((g) => (
                <ChipItem
                  key={g._id}
                  label={g.name}
                  backgroundColor={Colors.accent}
                  size="small"
                />
              ))}
            </XStack>
            <YStack paddingHorizontal={20}>
              <Button
                backgroundColor={Colors.primaryButton}
                onPress={() => {
                  router.navigate({
                    pathname: "/(pages)/book/main/[id]",
                    params: {
                      id: firstBook?._id ?? "",
                    },
                  });
                }}
              >
                <XStack ai={"center"} gap={20}>
                  <Text color={Colors.fontColor} fontSize={16}>
                    Inspect
                  </Text>
                  <ArrowRight color={Colors.fontColor} size={20} />
                </XStack>
              </Button>
            </YStack>
          </Card.Body>
        </Card>
      ) : (
        <Text fontSize={16}>You don't have any active quests</Text>
      )}
    </YStack>
  );
};

export default FirstWishlist;
