import LibraryScreen from "@/pages/tabs/library.screen";
import { SafeAreaView } from "react-native-safe-area-context";


const Page = () => {

  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}
      edges={["top"]}
    >      
    <LibraryScreen />
    </SafeAreaView>
  );
};

export default Page;
