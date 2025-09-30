import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
import BookByAuthor from "@/components/pages/author/bookByAuthor";

const AuthorPage = () => {
  const { id, name } = useLocalSearchParams();
    const title = Array.isArray(name) ? name[0] : name;

    return (
    <>
      <Stack.Screen
        options={{
          headerTitle: title ?? "Author", 
          headerBackTitle: "",
          headerBackButtonDisplayMode: "minimal",
          headerShadowVisible: false,
        }}
      />
      <BookByAuthor id={id as string} />
    </>
  );
};

export default AuthorPage;
