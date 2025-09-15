import * as ImagePicker from "expo-image-picker";
import { useEvent } from "tamagui";


export type CameraFiles = ImagePicker.ImagePickerAsset[];


export type OnPickCameraType = (param: { nativeFiles: CameraFiles | null }) => void | Promise<void>;


type UseCameraPickerProps = {
  onPick: OnPickCameraType;
};

export function useCameraPicker(props: UseCameraPickerProps) {
  const { onPick } = props;

  const _onOpenNative = useEvent((nativeFiles: CameraFiles | null) => {
    if (onPick) onPick({ nativeFiles });
  });

  const open = useEvent(async () => {
    
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      console.warn("Permiso de cámara denegado");
      _onOpenNative(null);
      return;
    }


    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    const assets: CameraFiles | null = result.canceled ? null : result.assets ?? null;
    _onOpenNative(assets);
  });

  return { open };
}
