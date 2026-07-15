import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { Spacing } from "@/src/styles/spacing";
import { Theme } from "@/src/styles/theme";
import { Typography } from "@/src/styles/typography";

type LoadingStateProps = {
  message?: string;
  description?: string;
};

export function LoadingState({
  message = "Carregando...",
  description = "Aguarde alguns instantes.",
}: LoadingStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.indicatorContainer}>
        <ActivityIndicator size="large" color={Theme.accent} />
      </View>

      <Text style={styles.message}>{message}</Text>

      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.xxl,
    gap: Spacing.md,
  },

  indicatorContainer: {
    width: 86,
    height: 86,
    borderRadius: 999,
    backgroundColor: Theme.accentLight,
    alignItems: "center",
    justifyContent: "center",
  },

  message: {
    color: Theme.textPrimary,
    ...Typography.sectionTitle,
    textAlign: "center",
  },

  description: {
    maxWidth: 280,
    color: Theme.textSecondary,
    ...Typography.body,
    textAlign: "center",
  },
});
