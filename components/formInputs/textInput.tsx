import { Controller } from "react-hook-form";
import { TextInput, KeyboardTypeOptions } from "react-native";
import { useState } from "react";
import { Text } from "tamagui";

type InputProps = {
  control: any;
  errors: any;
  name: string;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
};

export const FormTextInput = ({
  control,
  errors,
  name,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
}: InputProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
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
  );
};
