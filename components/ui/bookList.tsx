// components/BooksListScreen.tsx
import { Image, Text, YStack, XStack, Spinner } from "tamagui";
import { FlashList } from "@shopify/flash-list";
import { Books } from "@/models/book.model";
import ChipItem from "@/components/ui/chip";
import Card from "@/components/ui/card";
import Button from "@/theme-config/custom-components";
import { Text as AlmendraText, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/theme-config/colors";
import { ArrowRight } from "@tamagui/lucide-icons";

type BooksListScreenProps = {
  data: Books[];
  emptyMessage?: string;
  isLoading?: boolean;
  isError?: boolean;
  refetch?: () => void;
  isRefetching?: boolean;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
};

const BooksListScreen = ({
  data,
  emptyMessage,
  isLoading,
  isError,
  refetch,
  isRefetching,
  fetchNextPage,
  hasNextPage,
}: BooksListScreenProps) => {
  const renderItem = ({ item }: { item: Books }) => {
    const router = useRouter();
    const bookPlaceholder = require("@/assets/images/BookPlaceholder.png");

    return (
      <YStack ai="center">
        <Card>
          <Card.Header>
            <Image
              source={item.imageUrl ? { uri: item.imageUrl } : bookPlaceholder}
              w={280}
              h={300}
              objectFit="contain"
            />
          </Card.Header>

          <Card.Body>
            <YStack gap={10} ai={"center"}>
              <AlmendraText
                style={{
                  fontFamily: "Almendra",
                  fontSize: 28,
                  textAlign: "center",
                  fontStyle: "italic",
                  color: Colors.accent,
                }}
              >
                {item.title}
              </AlmendraText>
              <Text fontSize={18}>{item?.author.name}</Text>
            </YStack>
            <XStack flexWrap="wrap" gap="$2" jc="center" paddingVertical={20}>
              {item.genre?.map((g) => (
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
                      id: item?._id ?? "",
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
      </YStack>
    );
  };

  let content;

  if (isLoading) {
    content = (
      <YStack ai="center" mt={40}>
        <Spinner size="large" />
      </YStack>
    );
  } else if (isError) {
    content = (
      <YStack ai="center" mt={40} gap="$3">
        <Text fontSize={18} color="red">
          Something went wrong.
        </Text>
        {refetch && (
          <Button
            onPress={refetch}
            backgroundColor="#2E3B76"
            color="#fff"
            borderRadius={8}
            paddingHorizontal="$4"
            paddingVertical="$2"
          >
            Try again
          </Button>
        )}
      </YStack>
    );
  } else {
    content = (
      <FlashList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        estimatedItemSize={200}
        showsVerticalScrollIndicator={false}
        refreshing={isRefetching}
        onRefresh={refetch}
        onEndReached={() => {
          if (hasNextPage && fetchNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          emptyMessage ? (
            <YStack ai="center" mt={40}>
              <Text fontSize={18} color="#999" textAlign="center">
                {emptyMessage}
              </Text>
            </YStack>
          ) : null
        }
        ListFooterComponent={
          hasNextPage ? (
            <YStack ai="center" py={20}>
              <Spinner size="small" />
            </YStack>
          ) : null
        }
      />
    );
  }

  return (
    <YStack f={1} gap={20}>
      {content}
    </YStack>
  );
};

export default BooksListScreen;

{
  /**
  

  


  */
}
