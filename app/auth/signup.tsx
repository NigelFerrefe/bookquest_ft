import React, { useEffect, useState } from "react";
import { API_URL, useAuth } from "@/provider/AuthProvider";
import { YStack, Image, XStack, Text, Button } from "tamagui";
import { Alert, TextInput } from "react-native";
import { Link, useRouter } from "expo-router";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { onLogin, onRegister } = useAuth();
  const router = useRouter();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    const result = await onRegister?.(name, email, password);
    setLoading(false);

    if (result?.error) {
      let errorMsg = result.msg || "Unknown error";
      try {
        const parsed = JSON.parse(result.msg);

        if (
          parsed.errors &&
          Array.isArray(parsed.errors) &&
          parsed.errors.length > 0
        ) {
          // Buscamos errores específicos en password y email
          const passwordError = parsed.errors.find((e: any) =>
            e.path?.includes("password")
          );
          const emailError = parsed.errors.find((e: any) =>
            e.path?.includes("email")
          );

          if (passwordError) {
            errorMsg = "Password must be at least 8 characters";
          } else if (emailError) {
            errorMsg = "Email is not a valid format";
          } else {
            errorMsg = parsed.errors[0].message || errorMsg;
          }
        }
      } catch (e) {
      }

      Alert.alert("Register error", errorMsg);
    } else {
      router.replace("/(tabs)/home")
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
        <TextInput placeholder="Name" value={name} onChangeText={setName} />

        <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput
          placeholder="Password"
          value={password}
          secureTextEntry={true}
          onChangeText={setPassword}
        />
        <Button onPress={handleRegister}>Sign up</Button>
      </YStack>
      <XStack>
        <Text>Already have an account? </Text>
        <Link href="/auth">
          <Text color="$blue10">Log in here</Text>
        </Link>
      </XStack>
    </YStack>
  );
};

export default Signup;
