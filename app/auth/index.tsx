import React, { useEffect, useState } from "react";
import { API_URL, useAuth } from "@/provider/AuthProvider";
import { YStack, Image, XStack, Text, Button } from "tamagui";
import { Alert, TextInput } from "react-native";
import { Link, useRouter } from "expo-router";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { onLogin, onRegister } = useAuth();

  const router = useRouter();
  const handleLogin = async () => {
    setLoading(true);
    const result = await onLogin!(email, password);
    setLoading(false);

    if (result.error) {
      Alert.alert("Login failed", result.msg);
      console.error("Login error:", result.msg);
    } else {
      router.replace("/(tabs)/home");
    }
  };

  return (
    <YStack p={20} f={1}>
      <YStack justifyContent="center" alignItems="center">
        <XStack justifyContent="center" alignItems="center">
          <Image
            source={require("@/assets/images/minilogo.png")}
            w={50}
            h={50}
          />
          <Text fontSize={24}>BookQuest</Text>
        </XStack>
      </YStack>
      <Text>Manage your own library</Text>
      <YStack p={20}>
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput
          placeholder="Password"
          value={password}
          secureTextEntry={true}
          onChangeText={setPassword}
        />
        <Button onPress={handleLogin}>Log in</Button>
      </YStack>
      <XStack>
        <Text>Don't have an account? </Text>
        <Link href="/auth/signup">
          <Text color="$blue10">Register here</Text>
        </Link>
      </XStack>
    </YStack>
  );
};

export default Login;
