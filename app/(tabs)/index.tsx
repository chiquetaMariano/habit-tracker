import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import HeatMap from "../../components/charts/HeatMap";
import GlassCard from "../../components/ui/GlassCard";
import HeaderBar from "../../components/ui/HeaderBar";
import IconButton from "../../components/ui/IconButton";
import ScreenShell from "../../components/ui/ScreenShell";
import {
  clearSelectedDateKey,
  getHeatmapWeeks,
  getSelectedDateKey,
  loadHeatmapWeeks,
  setSelectedDateKey,
} from "../../features/habits/entryStore";

export default function HomeScreen() {
  const router = useRouter();
  const [weeks, setWeeks] = useState(() => getHeatmapWeeks());
  const [selectedDateKey, setSelectedDateKeyState] = useState<string | null>(
    () => getSelectedDateKey()
  );

  const refreshHeatmap = useCallback(() => {
    let isActive = true;

    loadHeatmapWeeks()
      .then((nextWeeks) => {
        if (isActive) {
          setWeeks(nextWeeks);
          setSelectedDateKeyState(getSelectedDateKey());
        }
      })
      .catch((error) => {
        console.error("Failed to load heatmap entries", error);
      });

    return () => {
      isActive = false;
    };
  }, []);

  useFocusEffect(refreshHeatmap);

  const handleSelectDate = (date: string) => {
    const nextSelectedDateKey = date.slice(0, 10);

    setSelectedDateKey(nextSelectedDateKey);
    setSelectedDateKeyState(nextSelectedDateKey);
  };

  const handleCreateTodayEntry = () => {
    clearSelectedDateKey();
    setSelectedDateKeyState(null);
    router.push("/entry");
  };

  const handleEditSelectedEntry = () => {
    if (!selectedDateKey) {
      return;
    }

    router.push("/entry");
  };

  return (
    <ScreenShell>
      <HeaderBar
        title="Habit Tracker"
        subtitle="Build visible consistency"
        right={
          <IconButton
            variant="success"
            size="md"
            onPress={handleCreateTodayEntry}
            icon={<Ionicons name="add" size={22} color="#6EDC63" />}
          />
        }
      />

      <GlassCard>
        <HeatMap
          weeks={weeks}
          selectedDateKey={selectedDateKey}
          onSelectDate={handleSelectDate}
        />
      </GlassCard>

      {selectedDateKey ? (
        <View style={styles.actionWrap}>
          <Text style={styles.actionLabel}>Selected date</Text>
          <Pressable
            onPress={handleEditSelectedEntry}
            style={styles.editButton}
            accessibilityRole="button"
            accessibilityLabel={`Edit entry for ${selectedDateKey}`}
          >
            <Ionicons name="create-outline" size={20} color="#FFFFFF" />
            <Text style={styles.editButtonText}>Edit entry</Text>
          </Pressable>
        </View>
      ) : null}
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  actionWrap: {
    marginTop: "auto",
    paddingTop: 20,
    paddingBottom: 12,
    gap: 10,
  },
  actionLabel: {
    color: "rgba(255,255,255,0.62)",
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  editButton: {
    minHeight: 56,
    borderRadius: 18,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#4F8F2F",
    borderWidth: 1,
    borderColor: "#6BAF46",
  },
  editButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 22,
  },
});
