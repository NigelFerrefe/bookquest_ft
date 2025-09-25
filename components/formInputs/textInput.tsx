import { Controller } from "react-hook-form";
import { TextInput, KeyboardTypeOptions } from "react-native";
import { useState } from "react";
import { Text, XStack } from "tamagui";
import { Colors } from "@/theme-config/colors";

type InputProps = {
  control: any;
  errors: any;
  name: string;
  placeholder: string;
  label?: string;
  required?: boolean;
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  type?: "text" | "number" | "price" | "email";
  min?: number;
  max?: number;
  style?: any;
};

export const FormInput = ({
  control,
  errors,
  name,
  placeholder,
  label,
  required = false,
  secureTextEntry = false,
  autoCapitalize = "none",
  type = "text",
  min,
  max,
  style,
}: InputProps) => {
  const [focused, setFocused] = useState(false);

  let keyboardType: KeyboardTypeOptions = "default";
  if (type === "number" || type === "price") keyboardType = "numeric";
  if (type === "email") keyboardType = "email-address";

  const processText = (text: string) => {
    if (type === "number") {
      return text.replace(/[^0-9]/g, "");
    }
    if (type === "price") {
      let numericValue = text.replace(/[^0-9.]/g, "");
      const parts = numericValue.split(".");
      if (parts.length > 2) numericValue = parts[0] + "." + parts[1];
      if (parts[1]?.length > 2)
        numericValue = parts[0] + "." + parts[1].slice(0, 2);
      return numericValue;
    }
    return text;
  };

  const inputWidthStyle = type === "text" || type === 'email' ? { flex: 1 } : { width: 120 };

  return (
    <XStack gap={10} alignItems="center">
      {label && (
        <Text fontWeight="700">
          {label}
          {required && (
            <Text fontSize={12} color="#a70117a4">
              {" "}
              *
            </Text>
          )}
        </Text>
      )}

      <Controller
        control={control}
        name={name}
        rules={{
          required: required ? "This field is required" : false,
          validate: (value: string) => {
            if (!value) return true;
            if (
              (type === "number" || type === "price") &&
              isNaN(Number(value))
            ) {
              return "Must be a valid number";
            }
            if (min !== undefined && Number(value) < min)
              return `Min ${min}`;
            if (max !== undefined && Number(value) > max)
              return `Max ${max}`;
            return true;
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              autoCapitalize={autoCapitalize}
              onBlur={() => {
                onBlur();
                setFocused(false);
              }}
              onFocus={() => setFocused(true)}
              onChangeText={(text) => onChange(processText(text))}
              value={value}
              style={{
                borderColor: errors[name]
                  ? "#a70117a4"
                  : focused
                  ? Colors.primaryButton
                  : Colors.inactiveTintColor,
                borderWidth: 1,
                padding: 10,
                borderRadius: 5,
                ...inputWidthStyle,
                ...style,
              }}
            />
            {errors[name] && (
              <Text color="#a70117a4" fontSize={10}>
                {errors[name]?.message}
              </Text>
            )}
          </>
        )}
      />
    </XStack>
  );
};
