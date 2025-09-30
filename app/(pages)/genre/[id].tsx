import { View, Text } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import BookByGenre from "@/components/pages/genre/bookByGenre";

const GenrePage = () => {
  const { id, name } = useLocalSearchParams();
  const title = Array.isArray(name) ? name[0] : name;

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: title ?? "Genre",
        }}
      />
      <BookByGenre id={id as string} />
    </>
  );
};

export default GenrePage;
