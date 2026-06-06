import React from "react";
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

type IconButtonProps = {
  icon: React.ReactNode;
  onPress?: () => void;
  variant?: "default" | "success" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

const SIZE_MAP = {
  sm: 36,
  md: 44,
  lg: 52,
} as const;

export default function IconButton({
  icon,
  onPress,
  variant = "default",
  size = "md",
  disabled = false,
  style,
}: IconButtonProps) {
  const dim = SIZE_MAP[size];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      hitSlop={8}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        { width: dim, height: dim, borderRadius: dim / 2 },
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <View pointerEvents="none">{icon}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  default: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderColor: "rgba(255,255,255,0.14)",
  },
  success: {
    backgroundColor: "rgba(110,220,99,0.16)",
    borderColor: "rgba(110,220,99,0.45)",
  },
  ghost: {
    backgroundColor: "transparent",
    borderColor: "rgba(255,255,255,0.18)",
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.97 }],
  },
  disabled: {
    opacity: 0.45,
  },
});