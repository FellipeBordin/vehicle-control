import {Text, View} from "react-native";

type LoadingStateProps = {
  message?: string;
};

export function LoadingState({ message = "Carregando..." }: LoadingStateProps) {
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
    <Text>{message}</Text> 
    </View>
  );
} 