import { XStack, YStack, Text, Spinner, Image, Switch } from "tamagui";
import { useQuery } from "@tanstack/react-query";
import { useBookService } from "@/services/book.service";
import { Colors } from "@/theme-config/colors";
import ChipItem from "@/components/ui/chip";
import { Heart, Pen, X } from "@tamagui/lucide-icons";
import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { Text as AlmendraText } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Books } from "@/models/book.model";
import { useBookBought } from "@/hooks/useBookBought";
import { useBookFav } from "@/hooks/useBookFav";
import Button from "@/theme-config/custom-components";
import EditBookBtn from "@/components/ui/editBtnProfile";
import { useRouter } from "expo-router";

const BookScreen = ({ id }: { id: string }) => {
  const { getBookDetails, updateBook } = useBookService();
  const queryClient = useQueryClient();
  const router = useRouter();
  const bookPlaceholder = require("@/assets/images/BookPlaceholder.png");
  const {
    data: book,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: () => getBookDetails({ bookId: id }),
    enabled: !!id,
  });
  const { isFav, toggleFav } = useBookFav(book);
  const { isBought, toggleBought } = useBookBought(book);

  if (isLoading) {
    return (
      <YStack f={1} ai="center" jc="center" backgroundColor={Colors.background}>
        <Spinner size="large" />
      </YStack>
    );
  }

  if (isError) {
    return (
      <YStack f={1} ai="center" jc="center" backgroundColor={Colors.background}>
        <Text>Error loading book...</Text>
        <Text>go back or try again later</Text>
      </YStack>
    );
  }
  if (!book) return null;

  return (
    <YStack f={1} backgroundColor={Colors.background} p={20} gap={20}>
      <XStack alignItems="center" gap={10} jc="center">
        <YStack>
          <Image
            source={book.imageUrl ? { uri: book?.imageUrl } : bookPlaceholder}
            w={160}
            h={230}
            objectFit="contain"
          />
          <Button
            icon={<Pen size={14} />}
            themeInverse
            borderRadius={15}
            padding={0}
            width={20}
            height={20}
            alignSelf="center"
            position="absolute"
            top={0}
            right={0}
            transform={[{ translateX: 5 }, { translateY: -5 }]}
          />
        </YStack>
        <YStack f={1} gap={15}>
          {/* Info */}

          <XStack ai="baseline" gap={5}>
            <AlmendraText
              style={{
                fontFamily: "AlmendraBold",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              Title:
            </AlmendraText>
            <Text>{book?.title}</Text>
          </XStack>
          <XStack ai="baseline" gap={5}>
            <AlmendraText
              style={{
                fontFamily: "AlmendraBold",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              Author:
            </AlmendraText>
            <Text>{book?.author.name}</Text>
          </XStack>

          <XStack ai="baseline" gap={5}>
            <AlmendraText
              style={{
                fontFamily: "AlmendraBold",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              Cost:
            </AlmendraText>
            <Text>{book?.price ? `${book.price} €` : "Unknown"} </Text>
          </XStack>
          <XStack ai="baseline" gap={5}>
            <AlmendraText
              style={{
                fontFamily: "AlmendraBold",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              Class:
            </AlmendraText>
            <XStack flexWrap="wrap">
              {book.genre?.map((g) => (
                <ChipItem
                  key={g._id}
                  label={g.name}
                  backgroundColor="#008BBE"
                  size="small"
                />
              ))}
            </XStack>
          </XStack>

          {/*status */}
          <XStack ai="center" gap={5}>
            <AlmendraText
              style={{
                fontFamily: "AlmendraBold",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              Status quest:
            </AlmendraText>

            <Switch
              checked={isBought}
              onCheckedChange={toggleBought}
              size="$3"
              backgroundColor={"#131313ff"}
              borderColor={"#131313ff"}
            >
              <Switch.Thumb
                animation="slow"
                backgroundColor={isBought ? "#008BBE" : "#af3838ff"}
              />
            </Switch>
          </XStack>
          <XStack ai="center" gap={5}>
            <AlmendraText
              style={{
                fontFamily: "AlmendraBold",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              Favorites:
            </AlmendraText>
            <Pressable onPress={() => toggleFav(!isFav)}>
              <Heart fill={isFav ? "#af3838ff" : "transparent"} />
            </Pressable>
          </XStack>
        </YStack>
      </XStack>
      <YStack gap={5} ai="flex-start">
        <AlmendraText
          style={{
            fontFamily: "AlmendraBold",
            fontSize: 16,
            textAlign: "center",
          }}
        >
          Details
        </AlmendraText>
        {book.description && <Text>{book?.description}</Text>}
      </YStack>
      <EditBookBtn
        onPress={() =>
          router.navigate({
            pathname: "/book/edit",
            params: { id: book._id ?? "" },
          })
        }
      />
    </YStack>
  );
};

export default BookScreen;
