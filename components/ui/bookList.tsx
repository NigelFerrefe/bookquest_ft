// components/BooksListScreen.tsx
import { Image, Text, YStack, XStack, Spinner } from "tamagui";
import { FlashList } from "@shopify/flash-list";
import { Books } from "@/models/book.model";
import ChipItem from "@/components/ui/chip";
import Card from "@/components/ui/card";
import Button from "@/theme-config/custom-components";
import { Text as AlmendraText } from "react-native";

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
    return (
      <YStack ai="center">
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
              {item.title}
            </AlmendraText>
            <Text fontSize={18}>{item?.author.name}</Text>
          </Card.Header>

          <Card.Body>
            <Image
              source={item.imageUrl ? { uri: item.imageUrl } : undefined}
              w={280}
              h={300}
              objectFit="contain"
            />
            <XStack flexWrap="wrap" gap="$2" jc="center" paddingVertical={20}>
              {item.genre?.map((g) => (
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
