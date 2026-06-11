import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Platform } from "react-native";
import "react-native-reanimated";

const APP_BACKGROUND_COLOR = "#0B1118";

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync(APP_BACKGROUND_COLOR);
      NavigationBar.setButtonStyleAsync("light");
      NavigationBar.setVisibilityAsync("visible");
    }
  }, []);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="light" translucent />
    </>
  );
}
