import React from "react";
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";

type LabeledSectionProps = {
  label: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

export default function LabeledSection({
  label,
  children,
  style,
  contentStyle,
}: LabeledSectionProps) {
  return (
    <View style={[styles.section, style]}>
      <Text style={styles.label}>{label}</Text>
      <View style={contentStyle}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 16,
    gap: 10,
  },
  label: {
    color: "rgba(255,255,255,0.62)",
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
});