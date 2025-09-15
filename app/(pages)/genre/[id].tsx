import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import BookByGenre from "@/components/pages/genre/bookByGenre";

const GenrePage = () => {
  const { id } = useLocalSearchParams();
  return <BookByGenre id={id as string} />;
};

export default GenrePage;
