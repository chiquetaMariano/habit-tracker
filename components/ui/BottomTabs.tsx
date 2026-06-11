import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const APP_BACKGROUND_COLOR = "#0B1118";

const TAB_ICON: Record<string, keyof typeof Ionicons.glyphMap> = {
  index: "home-outline",
  calendar: "calendar-outline",
  stats: "bar-chart-outline",
  settings: "settings-outline",
};

const ACTIVE_TAB_ICON: Record<string, keyof typeof Ionicons.glyphMap> = {
  index: "home",
  calendar: "calendar",
  stats: "bar-chart",
  settings: "settings",
};

export default function BottomTabs({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 10), paddingHorizontal: 12, paddingTop: 6 }]}>
      <View style={styles.container}>
        {state.routes.map((route: (typeof state.routes)[number], index: number) => {
          const focused = state.index === index;
          const { options } = descriptors[route.key];

          const label =
            typeof options.tabBarLabel === "string"
              ? options.tabBarLabel
              : typeof options.title === "string"
              ? options.title
              : route.name;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({ type: "tabLongPress", target: route.key });
          };

          const iconName = focused
            ? ACTIVE_TAB_ICON[route.name] ?? "ellipse"
            : TAB_ICON[route.name] ?? "ellipse-outline";

          return (
            <Pressable
              key={route.key}
              style={[styles.tab, focused && styles.tabActive]}
              onPress={onPress}
              onLongPress={onLongPress}
              accessibilityRole="button"
              accessibilityState={focused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
            >
              <Ionicons
                name={iconName}
                color={focused ? "#6EDC63" : "rgba(255,255,255,0.82)"}
                size={22}
              />
              <Text style={[styles.label, focused && styles.labelActive]}>{label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: APP_BACKGROUND_COLOR,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(255,255,255,0.06)",
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  tab: {
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    minWidth: 68,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  tabActive: {
    backgroundColor: "rgba(110,220,99,0.14)",
    borderWidth: 1,
    borderColor: "rgba(110,220,99,0.35)",
  },
  label: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
  },
  labelActive: {
    color: "#6EDC63",
    fontWeight: "600",
  },
});
