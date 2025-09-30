import { Text as AlmendraText, Platform } from "react-native";
import ListGenre from "@/components/pages/genre/listGenre";
import ListAuthor from "@/components/pages/author/listAuthor";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ExploreScreen = () => {
  return (
    <KeyboardAwareScrollView
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      enableOnAndroid={true}
      extraScrollHeight={Platform.OS === "ios" ? 60 : 80}
      keyboardOpeningTime={0}
    >
      <AlmendraText
        style={{
          fontFamily: "AlmendraBold",
          fontSize: 30,
          textAlign: "center",
        }}
      >
        Explorer's Guild
      </AlmendraText>
      <ListGenre />
      <ListAuthor />
    </KeyboardAwareScrollView>
  );
};

export default ExploreScreen;
