import { Pressable, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Radius } from "@/src/styles/radius";
import { Spacing } from "@/src/styles/spacing";
import { Theme } from "@/src/styles/theme";
import { Typography } from "@/src/styles/typography";

type ButtonVariant = "primary" | "success" | "danger" | "secondary" | "ghost";

type ButtonProps = {
  title: string;
  loadingTitle?: string;
  loading?: boolean;
  disabled?: boolean;
  onPress: () => void;
  variant?: ButtonVariant;
  icon?: keyof typeof MaterialIcons.glyphMap;
};

const backgroundColors: Record<ButtonVariant, string> = {
  primary: Theme.primary,
  success: Theme.success,
  danger: Theme.danger,
  secondary: Theme.surface,
  ghost: "transparent",
};

const textColors: Record<ButtonVariant, string> = {
  primary: Theme.textInverse,
  success: Theme.textInverse,
  danger: Theme.textInverse,
  secondary: Theme.textPrimary,
  ghost: Theme.textPrimary,
};

const borderColors: Record<ButtonVariant, string> = {
  primary: Theme.primary,
  success: Theme.success,
  danger: Theme.danger,
  secondary: Theme.border,
  ghost: "transparent",
};

export function Button({
  title,
  loadingTitle,
  loading = false,
  disabled = false,
  onPress,
  variant = "primary",
  icon,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        variant === "ghost" && styles.ghostButton,
        {
          backgroundColor: backgroundColors[variant],
          borderColor: borderColors[variant],
          opacity: isDisabled ? 0.55 : pressed ? 0.8 : 1,
          transform: [
            {
              scale: pressed && !isDisabled ? 0.98 : 1,
            },
          ],
        },
      ]}
    >
      <>
        {icon && !loading ? (
          <MaterialIcons name={icon} size={18} color={textColors[variant]} />
        ) : null}

        <Text
          style={[
            styles.text,
            {
              color: textColors[variant],
            },
          ]}
        >
          {loading ? (loadingTitle ?? "Carregando...") : title}
        </Text>
      </>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 46,
    marginTop: Spacing.xs,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  ghostButton: {
    minHeight: 40,
    paddingVertical: Spacing.sm,
  },

  text: {
    ...Typography.button,
  },
});
