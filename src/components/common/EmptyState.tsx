import { Pressable, Text, View } from "react-native";

type EmptyStateProps = {
  message: string;
  buttonTitle?: string;
  onPress?: () => void;
};

export function EmptyState({
  message,
  buttonTitle,
  onPress,
}: EmptyStateProps) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "700" }}>{message}</Text>

      {buttonTitle && onPress && (
        <Pressable
          onPress={onPress}
          style={{
            marginTop: 16,
            backgroundColor: "#111",
            paddingHorizontal: 18,
            paddingVertical: 12,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "800" }}>
            {buttonTitle}
          </Text>
        </Pressable>
      )}
    </View>
  );
}