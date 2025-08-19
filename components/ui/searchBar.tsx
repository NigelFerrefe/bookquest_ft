import { Search, X } from "@tamagui/lucide-icons";
import { Pressable } from "react-native";
import { Input, XStack, Text } from "tamagui";

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onSubmitEditing: () => void;
  searchQuery?: string;
  clearSearch?: () => void;
  flex?: number;
}

const SearchBar = ({
  placeholder,
  value,
  onChangeText,
  onSubmitEditing,
  searchQuery,
  clearSearch,
  flex,
}: SearchBarProps) => {
  return (
    <XStack
      alignItems="center"
      flex={flex}
      width="100%"
      borderRadius={25}
      backgroundColor="white"
      paddingHorizontal={12}
      height={40}
      position="relative"
    >
      {/* Search icon */}
      <Pressable onPress={onSubmitEditing} hitSlop={8}>
        <Search size={20} color="#7C7C7C" />
      </Pressable>

      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        onSubmitEditing={onSubmitEditing}
        backgroundColor="transparent"
        borderWidth={0}
        flex={1}
        color="black"
        marginLeft={8}
        height={40}
      />

      {/* Search tag */}
      {searchQuery && (
        <XStack
          position="absolute"
          left={40}
          top={8}
          backgroundColor="#444"
          borderRadius={16}
          paddingHorizontal={12}
          height={24}
          alignItems="center"
          gap={8}
          zIndex={10}
        >
          <Text color="white" fontWeight="700" fontSize={14}>
            {searchQuery}
          </Text>
          <Pressable onPressIn={clearSearch} hitSlop={5}>
            <X size={16} color="white" />
          </Pressable>
        </XStack>
      )}
    </XStack>
  );
};

export default SearchBar;
