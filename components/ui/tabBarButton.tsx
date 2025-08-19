import { Pressable, GestureResponderEvent, AccessibilityState } from 'react-native';

type TabBarButtonProps = {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  accessibilityState?: AccessibilityState;
};

export function TabBarButton({ children, onPress, accessibilityState }: TabBarButtonProps) {
  const focused = accessibilityState?.selected;

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: 'transparent' }}
      style={({ pressed }) => ({
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      })}
    >
      {children}
    </Pressable>
  );
}
