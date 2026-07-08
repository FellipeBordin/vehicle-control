import { Alert, Platform } from "react-native";

type ConfirmOptions = {
  title: string;
  message: string;
  onConfirm: () => void;
};

export function confirmAction({
  title,
  message,
  onConfirm,
}: ConfirmOptions) {
  if (Platform.OS === "web") {
    if (window.confirm(message)) {
      onConfirm();
    }
    return;
  }

  Alert.alert(title, message, [
    { text: "Cancelar", style: "cancel" },
    {
      text: "Excluir",
      style: "destructive",
      onPress: onConfirm,
    },
  ]);
}