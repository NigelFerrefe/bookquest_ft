import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import BookByAuthor from "@/components/pages/author/bookByAuthor";

const AuthorPage = () => {
  const { id } = useLocalSearchParams();
  return <BookByAuthor id={id as string} />;
};

export default AuthorPage;
