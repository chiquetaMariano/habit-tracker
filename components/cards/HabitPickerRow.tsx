import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type HabitPickerRowProps = {
  title: string;
  subtitle?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
};

export default function HabitPickerRow({
  title,
  subtitle,
  iconName = "barbell-outline",
  onPress,
}: HabitPickerRowProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`Select habit: ${title}`}
    >
      <View style={styles.iconWrap}>
        <Ionicons name={iconName} size={24} color="#7ED957" />
      </View>

      <View style={styles.textWrap}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      <View style={styles.chevronWrap}>
        <Ionicons name="chevron-forward" size={22} color="rgba(255,255,255,0.45)" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 88,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    backgroundColor: "rgba(255,255,255,0.04)",
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 14,
  },
  pressed: {
    opacity: 0.92,
    borderColor: "rgba(126,217,87,0.22)",
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(126,217,87,0.12)",
  },
  textWrap: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 22,
  },
  subtitle: {
    marginTop: 4,
    color: "rgba(255,255,255,0.62)",
    fontSize: 14,
    lineHeight: 18,
  },
  chevronWrap: {
    width: 24,
    alignItems: "flex-end",
  },
});