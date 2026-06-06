import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type NoteFieldCardProps = {
  value: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  maxLength?: number;
  minHeight?: number;
};

export default function NoteFieldCard({
  value,
  onChangeText,
  placeholder = "Add a note...",
  maxLength = 200,
  minHeight = 140,
}: NoteFieldCardProps) {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, { minHeight }]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="rgba(255,255,255,0.35)"
          multiline
          maxLength={maxLength}
          textAlignVertical="top"
          style={styles.input}
        />

        <View style={styles.counterWrap}>
          <Text style={styles.counterText}>
            {value.length}/{maxLength}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
  },
  container: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    backgroundColor: "rgba(255,255,255,0.04)",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 22,
    padding: 0,
  },
  counterWrap: {
    marginTop: 10,
    alignItems: "flex-end",
  },
  counterText: {
    color: "rgba(255,255,255,0.45)",
    fontSize: 14,
    lineHeight: 18,
  },
});