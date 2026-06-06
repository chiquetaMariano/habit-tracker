import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export type EntryMode = "add" | "edit";

type EntryTopBarProps = {
  mode: EntryMode;
  onClose?: () => void;
  onSave?: () => void;
  saveDisabled?: boolean;
};

export default function EntryTopBar({
  mode,
  onClose,
  onSave,
  saveDisabled = false,
}: EntryTopBarProps) {
  const title = mode === "edit" ? "Edit Entry" : "Add Entry";

  return (
    <View style={styles.container}>
      <Pressable
        onPress={onClose}
        hitSlop={8}
        style={styles.iconButton}
        accessibilityRole="button"
        accessibilityLabel="Close"
      >
        <Ionicons name="close" size={24} color="#FFFFFF" />
      </Pressable>

      <Text style={styles.title}>{title}</Text>

      <Pressable
        onPress={onSave}
        disabled={saveDisabled}
        hitSlop={8}
        style={styles.saveButton}
        accessibilityRole="button"
        accessibilityLabel="Save entry"
      >
        <Text style={[styles.saveText, saveDisabled && styles.saveTextDisabled]}>Save</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
    paddingBottom: 10,
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "700",
    lineHeight: 40,
  },
  saveButton: {
    width: 44,
    height: 44,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  saveText: {
    color: "#6EDC63",
    fontSize: 16,
    fontWeight: "600",
  },
  saveTextDisabled: {
    color: "rgba(110,220,99,0.45)",
  },
});