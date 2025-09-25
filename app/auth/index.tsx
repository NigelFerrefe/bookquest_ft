import LoginScreen from "@/pages/auth/login.screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/theme-config/colors";

const Page = () => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoginScreen />
    </SafeAreaView>
  );
};

export default Page;
