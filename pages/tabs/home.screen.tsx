import FirstWishlist from "@/components/pages/tabs/firstWishlist";
import HeroImage from "@/components/pages/tabs/heroImage";
import { SettingsDialog } from "@/components/settings/settings";

import { Settings } from "@tamagui/lucide-icons";
import { useState } from "react";
import { Pressable } from "react-native";
import { ScrollView, YStack } from "tamagui";

const HomeScreen = () => {
  const [openSettings, setOpenSettings] = useState<boolean>(false);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <YStack ai="flex-end" paddingHorizontal={10} paddingVertical={5}>
        <Pressable onPress={() => setOpenSettings(true)}>
          <Settings size={24} />
        </Pressable>
      </YStack>
      <YStack paddingHorizontal={20}>
        <HeroImage />
        <FirstWishlist />
      </YStack>
      <SettingsDialog
        visible={openSettings}
        onCancel={() => setOpenSettings(false)}
      />
    </ScrollView>
  );
};

export default HomeScreen;
