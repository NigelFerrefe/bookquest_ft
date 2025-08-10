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
  const router = useRouter()
  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Por favor, rellena todos los campos");
      return;
    }

    setLoading(true);
    const result = await onRegister?.(name, email, password);
    console.log("Respuesta del registro:", result);
    setLoading(false);

    if (result?.error) {
      Alert.alert("Error al registrar", result.msg || "Error desconocido");
    } else {
      Alert.alert(
        "Éxito",
        "Usuario creado correctamente. Por favor, inicia sesión."
      );
 
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
        <Button onPress={handleRegister}>Sign in</Button>
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
