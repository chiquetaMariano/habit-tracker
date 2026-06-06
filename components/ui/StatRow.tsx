import React from "react";
import { StyleSheet, View } from "react-native";
import StatItem, { type StatItemData } from "./StatItem";

type StatRowProps = {
  items: StatItemData[];
};

export default function StatRow({ items }: StatRowProps) {
  return (
    <View style={styles.row}>
      {items.map((item, index) => (
        <StatItem
          {...item}
          withDivider={index < items.length - 1}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "stretch"
  },
});