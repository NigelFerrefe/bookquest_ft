import React, { useState } from "react";
import { useAuth } from "@/provider/AuthProvider";
import { YStack, Image, XStack, Text } from "tamagui";
import Button from "@/theme-config/custom-components";
import { Alert, TextInput } from "react-native";
import { Link, useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, Login } from "@/models/user.model";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  const { onLogin } = useAuth();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Login>({
    resolver: zodResolver(LoginSchema),
  });

  // Estados para controlar foco en inputs
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleLogin = async (data: Login) => {
    const { email, password } = data;

    const result = await onLogin!(email, password);

    if (result.error) {
      Alert.alert("Login failed", result.msg);
      console.error("Login error:", result.msg);
    } else {
      router.replace("/(tabs)/home");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#faebe0ff" }}>
      <YStack p={20} f={1} justifyContent="center" gap={50}>
        <YStack justifyContent="center" alignItems="center" paddingVertical={10}>
          <XStack justifyContent="center" alignItems="center">
            <Image source={require("@/assets/images/minilogo.png")} w={50} h={50} />
            <Text fontSize={24}>BookQuest</Text>
          </XStack>
          <Text fontSize={12}>Manage your own library</Text>
        </YStack>

        <YStack gap={20}>
          {/* Email Input */}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onBlur={() => {
                    onBlur();
                    setEmailFocused(false);
                  }}
                  onFocus={() => setEmailFocused(true)}
                  onChangeText={onChange}
                  value={value}
                  style={{
                    borderColor: errors.email
                      ? "red"
                      : emailFocused
                      ? "#2E3B76"
                      : "#ccc",
                    borderWidth: 1,
                    padding: 10,
                    marginBottom: 5,
                    borderRadius: 5,
                  }}
                />
                {errors.email && (
                  <Text color="red" mb={10}>
                    {errors.email.message}
                  </Text>
                )}
              </>
            )}
          />

          {/* Password Input */}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  placeholder="Password"
                  secureTextEntry
                  onBlur={() => {
                    onBlur();
                    setPasswordFocused(false);
                  }}
                  onFocus={() => setPasswordFocused(true)}
                  onChangeText={onChange}
                  value={value}
                  style={{
                    borderColor: errors.password
                      ? "red"
                      : passwordFocused
                      ? "#2E3B76"
                      : "#ccc",
                    borderWidth: 1,
                    padding: 10,
                    marginBottom: 5,
                    borderRadius: 5,
                  }}
                />
                {errors.password && (
                  <Text color="red" mb={10}>
                    {errors.password.message}
                  </Text>
                )}
              </>
            )}
          />

          <Button
            disabled={isSubmitting}
            onPress={handleSubmit(handleLogin)}
            width="auto"
            alignSelf="center"
            backgroundColor="#2E3B76"
            color="#fff"
          >
            Log in
          </Button>
        </YStack>

        <XStack justifyContent="center" alignItems="center" mt={20}>
          <Text>Don't have an account? </Text>
          <Link href="/auth/signup">
            <Text color="#2E3B76" textDecorationLine="underline">
              Register here
            </Text>
          </Link>
        </XStack>
      </YStack>
    </SafeAreaView>
  );
};

export default LoginScreen;
