import { Colors } from "@/theme-config/colors";
import Button from "@/theme-config/custom-components";
import { Dialog, Text, XStack } from "tamagui";
import { useAuth } from "@/provider/AuthProvider";
import { X } from "@tamagui/lucide-icons";
import { Pressable } from "react-native";

interface SettingsDialogProps {
  visible: boolean;
  onCancel: () => void;
}

export const SettingsDialog = ({ visible, onCancel }: SettingsDialogProps) => {
  const { onLogout } = useAuth();

  return (
    <Dialog open={visible} onOpenChange={(open) => !open && onCancel()}>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          position="absolute"
          backgroundColor="black"
        />
        <Dialog.Content
          key="content"
          position="absolute"
          width="85%"
          borderRadius={10}
          enterStyle={{ y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ y: 10, opacity: 0, scale: 0.95 }}
          paddingHorizontal={20}
          paddingTop={60}
          gap={15}
        >
          <Button
            backgroundColor={Colors.primaryButton}
            onPress={onLogout}
            pressStyle={{
              backgroundColor: Colors.secondaryButton,
              borderColor: Colors.background,
            }}
          >
            <Text color={Colors.fontColor} fontSize={16}>
              Sign out
            </Text>
          </Button>
          <Dialog.Close asChild>
            <Pressable
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                padding: 6,
              }}
            >
              <X size={24} />
            </Pressable>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};
