import "react-native-gesture-handler";
import "react-native-reanimated";
import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";


export default function App() {
  return <ExpoRoot />;
}

registerRootComponent(App);
