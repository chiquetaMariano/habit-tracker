import React from "react";
import { StyleSheet, Text, View } from "react-native";

export type StatItemData = {
  key: string;
  value: string;
  label: string;
  caption?: string;
  highlight?: boolean;
};

type StatItemProps = StatItemData & {
  withDivider?: boolean;
};

export default function StatItem({
  value,
  label,
  caption,
  highlight = false,
  withDivider = false,
}: StatItemProps) {
  return (
    <View style={[styles.item, withDivider && styles.itemDivider]}>
      <Text style={[styles.value, highlight && styles.valueHighlight]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      {caption ? <Text style={styles.caption}>{caption}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  itemDivider: {
    borderRightWidth: 1,
    borderRightColor: "rgba(255,255,255,0.12)",
  },
  value: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "700",
    lineHeight: 38,
  },
  valueHighlight: {
    color: "#6EDC63",
  },
  label: {
    marginTop: 6,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 18,
  },
  caption: {
    marginTop: 6,
    color: "rgba(255,255,255,0.65)",
    fontSize: 14,
    lineHeight: 18,
  },
});