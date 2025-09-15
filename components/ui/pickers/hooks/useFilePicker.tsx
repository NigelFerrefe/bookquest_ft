import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useEvent } from "tamagui";

// Supported media types
export type MediaTypeOptions = "Images" | "Documents";

// Separate types for picked files
export type ImageFiles = ImagePicker.ImagePickerAsset[]; // Image assets from Expo ImagePicker
export type DocumentFiles = DocumentPicker.DocumentPickerAsset[]; // Document assets from Expo DocumentPicker

// Callback type when files are picked
export type OnPickType = (param: {
  nativeFiles: ImageFiles | DocumentFiles | null;
}) => void | Promise<void>;

// Hook props
type UseFilePickerProps =
  | {
      typeOfPicker: "image";
      onPick: (param: { nativeFiles: ImageFiles | null }) => void | Promise<void>;
    }
  | {
      typeOfPicker: "file";
      onPick: (param: { nativeFiles: DocumentFiles | null }) => void | Promise<void>;
    };

// Main hook
export function useFilePicker(props: UseFilePickerProps) {
  const { onPick, typeOfPicker } = props;

  // Unified internal callback to trigger onPick
  const _onOpenNative = useEvent((nativeFiles: ImageFiles | DocumentFiles | null) => {
    if (onPick) onPick({ nativeFiles } as any); // TypeScript will infer correct type per typeOfPicker
  });

  // Function to open picker
  const open = useEvent(async () => {
    if (typeOfPicker === "image") {
      
      // Launch the image library for React Native
      const result = await ImagePicker.launchImageLibraryAsync({
        quality: 1,
        allowsMultipleSelection: false, // Only single image selection
      });

      // Pass picked images or null if cancelled
      const assets: ImageFiles | null = result.assets ?? null;
      _onOpenNative(assets);
    } else {
      // Launch the document picker
      const result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true, // Ensure the file can be accessed later
      });

      // Wrap assets in array if exists, else null
      const docs: DocumentFiles | null = result.assets ?? null;
      _onOpenNative(docs);
    }
  });

  // Return only the open function
  return { open };
}
