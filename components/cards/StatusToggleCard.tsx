import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type StatusValue = "completed" | "not-completed";

type StatusToggleCardProps = {
  value: StatusValue;
  onChange?: (value: StatusValue) => void;
};

type StatusOptionProps = {
  label: string;
  selected: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
};

function StatusOption({ label, selected, icon, onPress }: StatusOptionProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.option, selected && styles.optionSelected]}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
    >
      <Ionicons
        name={icon}
        size={20}
        color={selected ? "#7ED957" : "rgba(255,255,255,0.45)"}
      />
      <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}

export default function StatusToggleCard({
  value,
  onChange,
}: StatusToggleCardProps) {
  return (
    <View style={styles.container}>
      <StatusOption
        label="Completed"
        icon="checkmark-circle"
        selected={value === "completed"}
        onPress={() => onChange?.("completed")}
      />
      <StatusOption
        label="Not completed"
        icon="ellipse-outline"
        selected={value === "not-completed"}
        onPress={() => onChange?.("not-completed")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 4,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    backgroundColor: "rgba(255,255,255,0.04)",
    padding: 6,
  },
  option: {
    flex: 1,
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "transparent",
    backgroundColor: "transparent",
  },
  optionSelected: {
    borderColor: "rgba(126,217,87,0.35)",
    backgroundColor: "rgba(126,217,87,0.12)",
  },
  optionText: {
    color: "rgba(255,255,255,0.62)",
    fontSize: 16,
    fontWeight: "500",
  },
  optionTextSelected: {
    color: "#7ED957",
    fontWeight: "600",
  },
});