import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type EntryDateHeaderProps = {
  date: Date | string;
  iconName?: keyof typeof Ionicons.glyphMap;
};

function formatDate(dateInput: Date | string) {
  const d = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  const month = d.toLocaleDateString("en-US", { month: "long" });
  const day = d.getDate();
  const year = d.getFullYear();
  const weekday = d.toLocaleDateString("en-US", { weekday: "long" });

  return {
    fullDate: `${month} ${day}, ${year}`,
    weekday,
  };
}

export default function EntryDateHeader({
  date,
  iconName = "calendar-clear-outline",
}: EntryDateHeaderProps) {
  const { fullDate, weekday } = formatDate(date);

  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Ionicons name={iconName} size={22} color="#6EDC63" />
      </View>

      <View style={styles.textWrap}>
        <Text style={styles.dateText}>{fullDate}</Text>
        <Text style={styles.weekdayText}>{weekday}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(110,220,99,0.14)",
    borderWidth: 1,
    borderColor: "rgba(110,220,99,0.3)",
  },
  textWrap: {
    flex: 1,
    alignItems: "center",
    marginRight: 56, // optically balances icon width
  },
  dateText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 30,
  },
  weekdayText: {
    marginTop: 2,
    color: "rgba(255,255,255,0.75)",
    fontSize: 16,
    lineHeight: 22,
  },
});