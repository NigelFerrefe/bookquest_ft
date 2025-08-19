import { SafeAreaView } from "react-native-safe-area-context";
import SignupScreen from "@/pages/auth/signup.screen";

const Page = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#faebe0ff" }}>
      <SignupScreen />
    </SafeAreaView>
  );
};

export default Page;
