import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Tabs } from 'expo-router';
import React from 'react';
import BottomTabs from '../../components/ui/BottomTabs';


export default function TabLayout() {
  return (
    <Tabs
        screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "transparent",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarHidenOnKeyboard: true
      }}
      tabBar={(props: BottomTabBarProps) => <BottomTabs {...props} />}
      >
          <Tabs.Screen name="index" options={{ title: "Overview" }}  />
          <Tabs.Screen name="calendar" options={{ title: "Calendar" }} />
          <Tabs.Screen name="stats" options={{ title: "Stats" }} />
          <Tabs.Screen name="settings" options={{ title: "Settings" }} />
      </Tabs>
  );
}