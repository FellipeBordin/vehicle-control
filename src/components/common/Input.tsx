import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

import { Radius } from "@/src/styles/radius";
import { Spacing } from "@/src/styles/spacing";
import { Theme } from "@/src/styles/theme";
import { Typography } from "@/src/styles/typography";

type InputProps = TextInputProps & {
  label: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  error?: string;
};

export function Input({
  label,
  icon,
  error,
  style,
  onFocus,
  onBlur,
  ...inputProps
}: InputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View
        style={[
          styles.inputContainer,
          focused && styles.inputContainerFocused,
          error && styles.inputContainerError,
        ]}
      >
        {icon ? (
          <MaterialIcons
            name={icon}
            size={20}
            color={focused ? Theme.accent : Theme.textMuted}
          />
        ) : null}

        <TextInput
          {...inputProps}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
          placeholderTextColor={Theme.textMuted}
          style={[styles.input, style]}
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.xs,
  },

  label: {
    color: Theme.textPrimary,
    ...Typography.bodyStrong,
  },

  inputContainer: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    backgroundColor: Theme.surfaceMuted,
    borderWidth: 1,
    borderColor: Theme.border,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
  },

  inputContainerFocused: {
    backgroundColor: Theme.surface,
    borderColor: Theme.accent,
  },

  inputContainerError: {
    backgroundColor: Theme.dangerLight,
    borderColor: Theme.danger,
  },

  input: {
    flex: 1,
    color: Theme.textPrimary,
    fontSize: 16,
    paddingVertical: Spacing.md,
  },

  errorText: {
    color: Theme.dangerDark,
    fontSize: 12,
    fontWeight: "600",
  },
});
