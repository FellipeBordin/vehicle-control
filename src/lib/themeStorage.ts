import AsyncStorage from "@react-native-async-storage/async-storage";

const THEME_STORAGE_KEY = "@vehicle-control:theme-mode";

export type ThemeMode = "light" | "dark" | "system";

export async function saveThemeMode(mode: ThemeMode): Promise<void> {
  try {
    await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch (error) {
    console.error("Erro ao salvar tema:", error);
  }
}

export async function loadThemeMode(): Promise<ThemeMode> {
  try {
    const savedMode = await AsyncStorage.getItem(THEME_STORAGE_KEY);

    if (
      savedMode === "light" ||
      savedMode === "dark" ||
      savedMode === "system"
    ) {
      return savedMode;
    }

    return "system";
  } catch (error) {
    console.error("Erro ao carregar tema:", error);

    return "system";
  }
}
