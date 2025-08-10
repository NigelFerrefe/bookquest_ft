import React, { useEffect } from "react";
import { View } from "react-native";
import { YStack, Text, Button } from "tamagui";
import axios from "axios";
import { API_URL, useAuth } from "@/provider/AuthProvider";

const Home = () => {
  const { authState, onLogout } = useAuth();

  const fetchData = async () => {
    try {
      const token = authState?.token;
      if (!token) {
        console.warn("No token found, user not authenticated");
        return;
      }

      const result = await axios.get(`${API_URL}/api/genre`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("API call result:", result.data);
      return result.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      <Text>Home</Text>
      <Button onPress={onLogout}>Sign out</Button>
    </View>
  );
};

export default Home;
