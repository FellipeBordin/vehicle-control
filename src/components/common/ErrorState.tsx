import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "./Button";

import { Radius } from "@/src/styles/radius";
import { Spacing } from "@/src/styles/spacing";
import { Theme } from "@/src/styles/theme";
import { Typography } from "@/src/styles/typography";

type ErrorStateProps = {
  title?: string;
  message: string;
  buttonTitle?: string;
  onRetry?: () => void;
};

export function ErrorState({
  title = "Algo deu errado",
  message,
  buttonTitle,
  onRetry,
}: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialIcons name="error-outline" size={42} color={Theme.danger} />
      </View>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.message}>{message}</Text>

      {buttonTitle && onRetry ? (
        <Button
          title={buttonTitle}
          icon="refresh"
          variant="secondary"
          onPress={onRetry}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: Spacing.xxl,
    gap: Spacing.md,
  },

  iconContainer: {
    width: 86,
    height: 86,
    borderRadius: Radius.full,
    backgroundColor: Theme.dangerLight,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: Theme.textPrimary,
    ...Typography.sectionTitle,
  },

  message: {
    color: Theme.textSecondary,
    ...Typography.body,
    textAlign: "center",
    maxWidth: 300,
  },
});
