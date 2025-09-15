import { useEffect } from "react";
import { useAuth } from "@/provider/AuthProvider";
import { YStack, Image, XStack, Text, Spinner } from "tamagui";
import Button from "@/theme-config/custom-components";
import { Alert } from "react-native";
import { Link, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, Login } from "@/models/user.model";
import axios from "axios";
import { FormInput } from "@/components/formInputs/textInput";

const LoginScreen = () => {
  const { onLogin } = useAuth();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<Login>({
    resolver: zodResolver(LoginSchema),
  });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        clearErrors();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [errors, clearErrors]);

  const handleLogin = async (data: Login) => {
    const { email, password } = data;

    const result = await onLogin!(email, password);

    if (result.error) {
      Alert.alert("Login failed", result.msg);
      console.error("Login error:", result.msg);
      return;
    }



    router.replace("/(pages)/(tabs)/home");
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
            onPress={handleSubmit(handleLogin)}
            //width="auto"
            //alignSelf="center"
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

export default LoginScreen;
