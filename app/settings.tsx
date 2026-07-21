import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Screen } from "@/src/components/common/Screen";
import { ThemeOption } from "@/src/components/settings/ThemeOption";
import { useAppTheme } from "@/src/contexts/ThemeContexte";
import { Radius } from "@/src/styles/radius";
import { Spacing } from "@/src/styles/spacing";

export default function SettingsScreen() {
  const router = useRouter();

  const { theme, mode, setMode } = useAppTheme();

  return (
    <Screen>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
          style={({ pressed }) => [
            styles.backButton,
            {
              backgroundColor: theme.surfaceMuted,
              borderColor: theme.border,
            },
            pressed && styles.pressed,
          ]}
        >
          <MaterialIcons
            name="arrow-back"
            size={22}
            color={theme.textPrimary}
          />
        </Pressable>

        <View style={styles.headerText}>
          <Text
            style={[
              styles.eyebrow,
              {
                color: theme.accent,
              },
            ]}
          >
            PREFERÊNCIAS
          </Text>

          <Text
            style={[
              styles.title,
              {
                color: theme.textPrimary,
              },
            ]}
          >
            Configurações
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <View>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.textPrimary,
              },
            ]}
          >
            Aparência
          </Text>

          <Text
            style={[
              styles.sectionDescription,
              {
                color: theme.textSecondary,
              },
            ]}
          >
            Escolha como o aplicativo deve exibir as cores.
          </Text>
        </View>

        <View style={styles.options}>
          <ThemeOption
            title="Claro"
            description="Mantém o aplicativo sempre no tema claro."
            icon="light-mode"
            selected={mode === "light"}
            onPress={() => setMode("light")}
          />

          <ThemeOption
            title="Escuro"
            description="Mantém o aplicativo sempre no tema escuro."
            icon="dark-mode"
            selected={mode === "dark"}
            onPress={() => setMode("dark")}
          />

          <ThemeOption
            title="Sistema"
            description="Segue automaticamente o tema configurado no celular."
            icon="settings-brightness"
            selected={mode === "system"}
            onPress={() => setMode("system")}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },

  backButton: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
  },

  pressed: {
    opacity: 0.72,
    transform: [{ scale: 0.97 }],
  },

  headerText: {
    flex: 1,
  },

  eyebrow: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: Spacing.xs,
  },

  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "800",
  },

  section: {
    gap: Spacing.lg,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
  },

  sectionDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: Spacing.xs,
  },

  options: {
    gap: Spacing.md,
  },
});
