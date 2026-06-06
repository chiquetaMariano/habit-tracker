import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export type EntryMode = "add" | "edit";

type EntryActionBarProps = {
  mode: EntryMode;
  onSaveEntry?: () => void;
  onDeleteEntry?: () => void;
  saveDisabled?: boolean;
  deleteDisabled?: boolean;
};

export default function EntryActionBar({
  mode,
  onSaveEntry,
  onDeleteEntry,
  saveDisabled = false,
  deleteDisabled = false,
}: EntryActionBarProps) {
  if (mode === "edit") {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.sectionLabel}>Delete Entry</Text>
        <Pressable
          onPress={onDeleteEntry}
          disabled={deleteDisabled}
          style={[styles.buttonBase, styles.deleteButton, deleteDisabled && styles.buttonDisabled]}
          accessibilityRole="button"
          accessibilityLabel="Delete entry"
        >
          <Ionicons name="trash-outline" size={22} color="#FF5C5C" />
          <Text style={[styles.buttonText, styles.deleteButtonText]}>Delete Entry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={onSaveEntry}
        disabled={saveDisabled}
        style={[styles.buttonBase, styles.saveButton, saveDisabled && styles.buttonDisabled]}
        accessibilityRole="button"
        accessibilityLabel="Save entry"
      >
        <Text style={[styles.buttonText, styles.saveButtonText]}>Save Entry</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 24,
    gap: 10,
  },
  sectionLabel: {
    color: "rgba(255,255,255,0.62)",
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  buttonBase: {
    minHeight: 56,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 18,
  },
  saveButton: {
    backgroundColor: "#4F8F2F",
    borderWidth: 1,
    borderColor: "#6BAF46",
  },
  deleteButton: {
    backgroundColor: "rgba(255,92,92,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,92,92,0.65)",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 22,
  },
  saveButtonText: {
    color: "#FFFFFF",
  },
  deleteButtonText: {
    color: "#FF5C5C",
  },
});