import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Tabs } from 'expo-router';
import React from 'react';
import BottomTabs from '../../components/ui/BottomTabs';

const APP_BACKGROUND_COLOR = "#0B1118";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: APP_BACKGROUND_COLOR,
        },
        tabBarStyle: {
          position: "absolute",
          backgroundColor: APP_BACKGROUND_COLOR,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarHideOnKeyboard: true,
      }}
      tabBar={(props: BottomTabBarProps) => <BottomTabs {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: "Overview" }} />
      <Tabs.Screen name="calendar" options={{ title: "Calendar" }} />
      <Tabs.Screen name="stats" options={{ title: "Stats" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
    </Tabs>
  );
}
