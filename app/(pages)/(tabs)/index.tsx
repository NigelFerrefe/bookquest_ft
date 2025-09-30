import { SafeAreaView } from "react-native-safe-area-context";
import HomeScreen from "@/pages/tabs/home.screen";

const Page = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}
      edges={["top"]}
    >
      <HomeScreen />
    </SafeAreaView>
  );
};

export default Page;
