import React, { useEffect } from "react";
import { useAuth } from "@/provider/AuthProvider";
import { YStack, Image, XStack, Text, Button, Spinner } from "tamagui";
import { Alert } from "react-native";
import { Link, useRouter } from "expo-router";
import { RegisterSchema, Register } from "@/models/user.model";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/formInputs/textInput";

const SignupScreen = () => {
  const { onRegister } = useAuth();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<Register>({
    resolver: zodResolver(RegisterSchema),
  });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        clearErrors();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [errors, clearErrors]);

  const handleRegister = async (data: Register) => {
    const { name, email, password } = data;
    const result = await onRegister!(name, email, password);
    if (result.error) {
      Alert.alert("Registration failed", result.msg);
      console.error("Registration error:", result.msg);
    } else {
      router.replace("/(pages)/(tabs)/home");
    }
  };

  return (
    <>
      <YStack p={20} f={1} justifyContent="center" gap={50} position="relative">
        <YStack
          justifyContent="center"
          alignItems="center"
          paddingVertical={10}
        >
          <XStack justifyContent="center" alignItems="center">
            <Image
              source={require("@/assets/images/minilogo.png")}
              w={80}
              h={80}
            />
            <Text fontSize={30}>BookQuest</Text>
          </XStack>
          <Text>Manage your own library</Text>
        </YStack>

        <YStack gap={20}>
          <FormInput
            control={control}
            errors={errors}
            name="name"
            placeholder="Name..."
            autoCapitalize="words"
          />
          <FormInput
            control={control}
            errors={errors}
            name="email"
            placeholder="Email..."
            type="email"
          />
          <FormInput
            control={control}
            errors={errors}
            name="password"
            placeholder="Password..."
            secureTextEntry
          />
          <Button
            disabled={isSubmitting}
            onPress={handleSubmit(handleRegister)}
            width="auto"
            alignSelf="center"
            backgroundColor="#2E3B76"
            color="#fff"
          >
            Sign up
          </Button>
        </YStack>

        <XStack justifyContent="center" alignItems="center" mt={20}>
          <Text>Do you have an account? </Text>
          <Link href="/auth">
            <Text color="#2E3B76" textDecorationLine="underline">
              Log in here
            </Text>
          </Link>
        </XStack>
      </YStack>
      {isSubmitting && (
        <YStack
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(0,0,0,0.4)"
          jc="center"
          ai="center"
          zIndex={999}
        >
          <Spinner size="large" color="#faebe0ff" />
        </YStack>
      )}
    </>
  );
};

export default SignupScreen;
