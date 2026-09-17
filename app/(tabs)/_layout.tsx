import React from "react";
import { Tabs } from "expo-router";
import { CustomBottomTabBar } from "@/shared/components/navigation/CustomBottomTabBar";

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomBottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="nutrition"
        options={{
          title: "Nutrition",
        }}
      />
      <Tabs.Screen
        name="action"
        options={{
          title: "Workout",
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: "Progress",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
}
