import { ReactNode } from "react";
import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";

import { Radius } from "@/src/styles/radius";
import { Spacing } from "@/src/styles/spacing";
import { Theme } from "@/src/styles/theme";

type CardProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function Card({ children, style }: CardProps) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.surface,

    borderRadius: Radius.xl,

    padding: Spacing.lg,

    gap: Spacing.md,

    borderWidth: 1,
    borderColor: Theme.border,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.06,
    shadowRadius: 18,

    elevation: 4,
  },
});
