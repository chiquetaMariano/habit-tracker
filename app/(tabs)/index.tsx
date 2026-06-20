import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import HeatMap from "../../components/charts/HeatMap";
import GlassCard from "../../components/ui/GlassCard";
import HeaderBar from "../../components/ui/HeaderBar";
import IconButton from "../../components/ui/IconButton";
import ScreenShell from "../../components/ui/ScreenShell";
import { getHeatmapWeeks, loadHeatmapWeeks } from "../../features/habits/entryStore";

export default function HomeScreen() {
  const router = useRouter();
  const [weeks, setWeeks] = useState(() => getHeatmapWeeks());

  const refreshHeatmap = useCallback(() => {
    let isActive = true;

    loadHeatmapWeeks()
      .then((nextWeeks) => {
        if (isActive) {
          setWeeks(nextWeeks);
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

  return (
    <ScreenShell>
      <HeaderBar
        title="Habit Tracker"
        subtitle="Build visible consistency"
        right={
          <IconButton
            variant="success"
            size="md"
            onPress={() => router.push("/entry")}
            icon={<Ionicons name="add" size={22} color="#6EDC63" />}
          />
        }
      />

      <GlassCard>
        <HeatMap weeks={weeks} />
      </GlassCard>
    </ScreenShell>
  );
}
