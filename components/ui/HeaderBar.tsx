import React from "react";
import { StyleSheet, Text, View } from "react-native";

type HeaderBarProps = {
  title?: string;
  subtitle?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  centeredTitle?: boolean;
};

export default function HeaderBar({
  title,
  subtitle,
  left,
  right,
  centeredTitle = false,
}: HeaderBarProps) {
  const showLeftSlot = centeredTitle || !!left;

  return (
    <View style={styles.container}>
      {showLeftSlot ? <View style={styles.sideLeft}>{left}</View> : null}

      <View
        style={[
          styles.center,
          centeredTitle ? styles.centerAligned : styles.leftAligned,
        ]}
      >
        {title ? <Text style={styles.title}>{title}</Text> : null}
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      <View style={styles.sideRight}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  sideLeft: {
    width: 44,
    minHeight: 44,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
  },
  leftAligned: {
    alignItems: "flex-start",
  },
  centerAligned: {
    alignItems: "center",
  },
  sideRight: {
    width: 44,
    minHeight: 44,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "700",
    lineHeight: 40,
  },
  subtitle: {
    marginTop: 2,
    color: "rgba(255,255,255,0.75)",
    fontSize: 18,
    lineHeight: 24,
  },
});