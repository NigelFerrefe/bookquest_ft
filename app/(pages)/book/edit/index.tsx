import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { Colors } from "@/theme-config/colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useBookService } from "@/services/book.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import EditMainScreen from "@/pages/edit/editMain.screen";

const EditPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <EditMainScreen id={id} />
  );
};

export default EditPage;
