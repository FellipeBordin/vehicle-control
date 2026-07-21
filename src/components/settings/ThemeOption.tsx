import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/src/contexts/ThemeContexte";
import { Radius } from "@/src/styles/radius";
import { Spacing } from "@/src/styles/spacing";

type ThemeOptionProps = {
  title: string;
  description: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  selected: boolean;
  onPress: () => void;
};

export function ThemeOption({
  title,
  description,
  icon,
  selected,
  onPress,
}: ThemeOptionProps) {
  const { theme } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: theme.surface,
          borderColor: selected ? theme.primary : theme.border,
        },
        pressed && styles.pressed,
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: theme.surfaceMuted,
          },
        ]}
      >
        <MaterialIcons name={icon} size={22} color={theme.primary} />
      </View>

      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            {
              color: theme.textPrimary,
            },
          ]}
        >
          {title}
        </Text>

        <Text
          style={[
            styles.description,
            {
              color: theme.textSecondary,
            },
          ]}
        >
          {description}
        </Text>
      </View>

      <MaterialIcons
        name={selected ? "radio-button-checked" : "radio-button-unchecked"}
        size={24}
        color={selected ? theme.primary : theme.textSecondary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },

  pressed: {
    opacity: 0.8,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
  },

  description: {
    fontSize: 13,
    marginTop: 2,
  },
});
