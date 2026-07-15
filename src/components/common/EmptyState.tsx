import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "./Button";

import { Radius } from "@/src/styles/radius";
import { Spacing } from "@/src/styles/spacing";
import { Theme } from "@/src/styles/theme";
import { Typography } from "@/src/styles/typography";

type EmptyStateProps = {
  title: string;
  message: string;
  buttonTitle?: string;
  onPress?: () => void;
};

export function EmptyState({
  title,
  message,
  buttonTitle,
  onPress,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialIcons name="directions-car" size={42} color={Theme.accent} />
      </View>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.message}>{message}</Text>

      {buttonTitle && onPress ? (
        <Button
          title={buttonTitle}
          icon="add-circle-outline"
          onPress={onPress}
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

    backgroundColor: Theme.accentLight,

    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    color: Theme.textPrimary,

    ...Typography.sectionTitle,
  },

  message: {
    maxWidth: 280,

    color: Theme.textSecondary,

    ...Typography.body,

    textAlign: "center",
  },
});
