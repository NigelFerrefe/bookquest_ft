/* import { Plus, Undo2 } from "@tamagui/lucide-icons";
import * as ImageManipulator from "expo-image-manipulator";
import { forwardRef, useCallback, useEffect, useState } from "react";
import { Button, Image, View } from "tamagui";
import { useFilePicker, ImageFiles } from "./pickers/hooks/useFilePicker";

export const ImagePickerComponent = forwardRef<
  HTMLInputElement,
  {
    disabled: boolean;
    order: number;
    value: { fileURL: string; path: string } | undefined;
    onChangeText: (imageSource: { fileURL: string; path: string }) => void;
    onBlur: () => void;
    placeholder?: string;
    [key: string]: any;
  }
>((props, ref) => {
  const { disabled, value, onChangeText } = props;

  const [image, setImage] = useState<string>(""); // current image URI
  const [containerSize, setContainerSize] = useState(0);

  // Calculate container size for dynamic icon sizing
  const onLayout = useCallback((event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setContainerSize(Math.min(width, height));
  }, []);

  // Setup file picker for mobile only
  const { open } = useFilePicker({
    typeOfPicker: "image",
    onPick: async ({ nativeFiles }) => {
      if (!nativeFiles?.length) return;

      const file: ImageFiles[0] = nativeFiles[0]; // guaranteed to be ImagePickerAsset

      try {
        // Resize and compress image before using
        const result = await ImageManipulator.manipulateAsync(
          file.uri,
          [{ resize: { width: 1080 } }],
          { compress: 0.6, format: ImageManipulator.SaveFormat.JPEG }
        );

        const pickedImage = {
          fileURL: result.uri,
          path: result.uri,
        };

        onChangeText(pickedImage);
        setImage(result.uri);
      } catch (error) {
        console.warn("Error manipulating image:", error);

        // Fallback if manipulation fails
        const pickedImage = {
          fileURL: file.uri,
          path: file.uri,
        };
        onChangeText(pickedImage);
        setImage(file.uri);
      }
    },
  });

  // Update displayed image if `value` prop changes
  useEffect(() => {
    if (value && typeof value === "object" && value.fileURL) {
      setImage(value.fileURL);
    } else if (typeof value === "string") {
      setImage(value);
    }
  }, [value]);

  return (
    <View
      flexDirection="column"
      borderStyle="dashed"
      alignSelf="center"
      width="90%"
      height={200}
      justifyContent="center"
      backgroundColor="rgba(22, 22, 22, 0.89)"
      alignItems="center"
      borderRadius="$true"
      onLayout={onLayout}
    >
      {image ? (
        <View width="100%" height="100%" justifyContent="center" alignItems="center">
          <Image
            borderRadius={8}
            width="100%"
            height="100%"
            objectFit="cover"
            source={{ uri: image }}
          />
          <Button
            onPress={() => {
              setImage("");
              onChangeText({ fileURL: "", path: "" });
            }}
            right={-5}
            top={-5}
            size="$1"
            circular
            position="absolute"
            themeInverse
          >
            <Undo2 size={12} />
          </Button>
        </View>
      ) : (
        <Button height="100%" width="100%" onPress={open} backgroundColor="transparent">
          <View width="100%" height="100%" justifyContent="center" alignItems="center">
            <Plus color="white" size={containerSize * 0.3} />
          </View>
        </Button>
      )}
    </View>
  );
});
 */


import { Plus, Undo2 } from "@tamagui/lucide-icons";
import * as ImageManipulator from "expo-image-manipulator";
import { forwardRef, useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { Button, Image, View } from "tamagui";
import { useFilePicker, ImageFiles } from "./pickers/hooks/useFilePicker";
import { useCameraPicker, CameraFiles } from "./pickers/hooks/useCameraPicker";

export const ImagePickerComponent = forwardRef<
  HTMLInputElement,
  {
    disabled: boolean;
    order: number;
    value: { fileURL: string; path: string } | undefined;
    onChangeText: (imageSource: { fileURL: string; path: string }) => void;
    onBlur: () => void;
    placeholder?: string;
    [key: string]: any;
  }
>((props, ref) => {
  const { disabled, value, onChangeText } = props;

  const [image, setImage] = useState<string>(""); // current image URI
  const [containerSize, setContainerSize] = useState(0);

  // calcular tamaño del contenedor (para escalar el icono +)
  const onLayout = useCallback((event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setContainerSize(Math.min(width, height));
  }, []);

  // 🔹 Handler común para imagen seleccionada o tomada
  const handlePickedImage = async ({
    nativeFiles,
  }: {
    nativeFiles: ImageFiles | CameraFiles | null;
  }) => {
    if (!nativeFiles?.length) return;

    const file = nativeFiles[0];

    try {
      // Redimensionar y comprimir antes de usar
      const result = await ImageManipulator.manipulateAsync(
        file.uri,
        [{ resize: { width: 1080 } }],
        { compress: 0.6, format: ImageManipulator.SaveFormat.JPEG }
      );

      const pickedImage = {
        fileURL: result.uri,
        path: result.uri,
      };

      onChangeText(pickedImage);
      setImage(result.uri);
    } catch (error) {
      console.warn("Error manipulando imagen:", error);

      // fallback con la uri original
      const pickedImage = {
        fileURL: file.uri,
        path: file.uri,
      };
      onChangeText(pickedImage);
      setImage(file.uri);
    }
  };

  // 🔹 Hook para galería
  const filePicker = useFilePicker({
    typeOfPicker: "image",
    onPick: handlePickedImage,
  });

  // 🔹 Hook para cámara
  const cameraPicker = useCameraPicker({
    onPick: handlePickedImage,
  });

  // 🔹 Mostrar opciones al pulsar "+"
  const handleOpenOptions = () => {
    if (disabled) return;

    Alert.alert("Seleccionar imagen", "¿De dónde quieres elegir la foto?", [
      { text: "Cámara", onPress: cameraPicker.open },
      { text: "Galería", onPress: filePicker.open },
      { text: "Cancelar", style: "cancel" },
    ]);
  };

  // 🔹 Sync con prop externa `value`
  useEffect(() => {
    if (value && typeof value === "object" && value.fileURL) {
      setImage(value.fileURL);
    } else if (typeof value === "string") {
      setImage(value);
    }
  }, [value]);

  return (
    <View
      flexDirection="column"
      borderStyle="dashed"
      alignSelf="center"
      width="90%"
      height={200}
      justifyContent="center"
      backgroundColor="rgba(22, 22, 22, 0.89)"
      alignItems="center"
      borderRadius="$true"
      onLayout={onLayout}
    >
      {image ? (
        <View width="100%" height="100%" justifyContent="center" alignItems="center">
          <Image
            borderRadius={8}
            width="100%"
            height="100%"
            objectFit="cover"
            source={{ uri: image }}
          />
          <Button
            onPress={() => {
              setImage("");
              onChangeText({ fileURL: "", path: "" });
            }}
            right={-5}
            top={-5}
            size="$1"
            circular
            position="absolute"
            themeInverse
          >
            <Undo2 size={12} />
          </Button>
        </View>
      ) : (
        <Button
          height="100%"
          width="100%"
          onPress={handleOpenOptions}
          backgroundColor="transparent"
        >
          <View width="100%" height="100%" justifyContent="center" alignItems="center">
            <Plus color="white" size={containerSize * 0.3} />
          </View>
        </Button>
      )}
    </View>
  );
});
