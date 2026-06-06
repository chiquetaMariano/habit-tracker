import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type CompletionStepperCardProps = {
  value: number;
  onDecrement?: () => void;
  onIncrement?: () => void;
  min?: number;
  max?: number;
  helperText?: string;
};

type StepButtonProps = {
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  disabled?: boolean;
  variant?: "default" | "accent";
};

function StepButton({
  icon,
  onPress,
  disabled = false,
  variant = "default",
}: StepButtonProps) {
  const accent = variant === "accent";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.stepButton,
        accent ? styles.stepButtonAccent : styles.stepButtonDefault,
        disabled && styles.stepButtonDisabled,
      ]}
      accessibilityRole="button"
    >
      <Ionicons
        name={icon}
        size={24}
        color={
          disabled
            ? "rgba(255,255,255,0.22)"
            : accent
            ? "#7ED957"
            : "rgba(255,255,255,0.72)"
        }
      />
    </Pressable>
  );
}

export default function CompletionStepperCard({
  value,
  onDecrement,
  onIncrement,
  min = 0,
  max,
  helperText = "How many times did you complete it today?",
}: CompletionStepperCardProps) {
  const decrementDisabled = value <= min;
  const incrementDisabled = typeof max === "number" ? value >= max : false;

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <StepButton
          icon="remove"
          onPress={onDecrement}
          disabled={decrementDisabled}
        />

        <View style={styles.valueWrap}>
          <Text style={styles.valueText}>{value}</Text>
        </View>

        <StepButton
          icon="add"
          onPress={onIncrement}
          disabled={incrementDisabled}
          variant="accent"
        />
      </View>

      <Text style={styles.helperText}>{helperText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 10,
  },
  container: {
    minHeight: 72,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    backgroundColor: "rgba(255,255,255,0.04)",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  valueWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  valueText: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "700",
    lineHeight: 40,
  },
  stepButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  stepButtonDefault: {
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  stepButtonAccent: {
    backgroundColor: "rgba(126,217,87,0.14)",
  },
  stepButtonDisabled: {
    opacity: 0.55,
  },
  helperText: {
    textAlign: "center",
    color: "rgba(255,255,255,0.55)",
    fontSize: 14,
    lineHeight: 18,
  },
});