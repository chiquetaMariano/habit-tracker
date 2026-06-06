import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import HeatMap from "../../components/charts/HeatMap";
import GlassCard from "../../components/ui/GlassCard";
import HeaderBar from "../../components/ui/HeaderBar";
import IconButton from "../../components/ui/IconButton";
import ScreenShell from "../../components/ui/ScreenShell";
import { MOCK_HEATMAP_WEEKS } from "../../data/mockHeatmap";

export default function HomeScreen() {
  const router = useRouter();

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
        <HeatMap weeks={MOCK_HEATMAP_WEEKS}/>
      </GlassCard>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  tall: {
    minHeight: 420,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  caption: {
    color: "rgba(255,255,255,0.75)",
    marginTop: 6,
    fontSize: 14,
  },
});
