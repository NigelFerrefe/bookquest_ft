import { Controller } from "react-hook-form";
import { Text, YStack } from "tamagui";
import { ImagePickerComponent } from "@/components/ui/ImagePickerComponent";

type FormImageProps = {
  control: any;
  errors: any;
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  value?: { fileURL: string; path: string } | undefined; 
};

export const FormImage = ({
  control,
  errors,
  name,
  label,
  required = false,
  disabled = false,
  value,
}: FormImageProps) => {
  return (
    <YStack gap={5}>
      {label && (
        <Text fontWeight="700">
          {label}
          {required && <Text fontSize={12} color="#a70117a4"> *</Text>}
        </Text>
      )}

      <Controller
        control={control}
        name={name}
        rules={{
          required: required ? "This field is required" : false,
        }}
        render={({ field: { onChange, value: fieldValue } }) => (
          <ImagePickerComponent
            value={fieldValue ?? value} 
            onChangeText={(picked: { fileURL: string; path: string }) => {
              onChange(picked); 
            }}
            onBlur={() => {}}
            disabled={disabled}
            order={0}
          />
        )}
      />

      {errors[name] && (
        <Text color="#a70117a4" fontSize={10}>
          {errors[name]?.message}
        </Text>
      )}
    </YStack>
  );
};
