import { Controller } from "react-hook-form";
import { TextInput, KeyboardTypeOptions } from "react-native";
import { useState } from "react";
import { Text, YStack, XStack } from "tamagui";

type TextAreaProps = {
  control: any;
  errors: any;
  name: string;
  placeholder: string;
  label?: string;
  required?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  numberOfLines?: number; // altura inicial
};

export const FormTextArea = ({
  control,
  errors,
  name,
  placeholder,
  label,
  required = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  numberOfLines = 4,
}: TextAreaProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <YStack gap={4}>
      {label && (
        <XStack gap={2} alignItems="center">
          <Text fontWeight="700">{label}</Text>
          {required && <Text fontSize={12} color="#a70117a4">*</Text>}
        </XStack>
      )}

      <Controller
        control={control}
        name={name}
        rules={{ required: required ? "This field is required" : false }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              placeholder={placeholder}
              multiline
              numberOfLines={numberOfLines}
              keyboardType={keyboardType}
              autoCapitalize={autoCapitalize}
              onBlur={() => {
                onBlur();
                setFocused(false);
              }}
              onFocus={() => setFocused(true)}
              onChangeText={onChange}
              value={value}
              style={{
                borderColor: errors[name]
                  ? '#a70117a4'
                  : focused
                  ? '#2E3B76'
                  : '#ccc',
                borderWidth: 1,
                padding: 10,
                borderRadius: 5,
                textAlignVertical: 'top', // para que el texto empiece arriba
                minHeight: numberOfLines * 20, // altura mínima aproximada
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
    </YStack>
  );
};
