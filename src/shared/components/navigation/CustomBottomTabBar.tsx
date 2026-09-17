import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import Svg, { Path, Circle, Rect, G } from "react-native-svg";
import type { BottomTabBarProps } from "expo-router/build/react-navigation/bottom-tabs";

export function CustomBottomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  const handleTabPress = (route: (typeof state.routes)[number], isFocused: boolean) => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch {
        // ignore
      }
      navigation.navigate(route.name);
    }
  };

  // Safe bottom padding for navigation bar/gesture pill
  const bottomInset = Math.max(insets.bottom, Platform.OS === "android" ? 10 : 14);

  return (
    <View style={[styles.container, { paddingBottom: bottomInset }]}>
      {/* Subtle Top Glow Highlight */}
      <View style={styles.topHighlightLine} />

      <View style={styles.tabsRow}>
        {state.routes.map((route, index) => {
          // Hide internal or hidden routes if any
          const { options } = descriptors[route.key];
          if ((options.tabBarItemStyle as any)?.display === "none" || (options as any).href === null) {
            return null;
          }

          const isFocused = state.index === index;
          const isCenterAction = route.name === "action";

          if (isCenterAction) {
            return (
              <View key={route.key} style={styles.centerButtonOuterContainer}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Start Workout"
                  onPress={() => handleTabPress(route, isFocused)}
                  style={({ pressed }) => [
                    styles.centerButtonPressable,
                    pressed && styles.centerButtonPressed,
                  ]}
                >
                  {/* Concentric Dark Rim Bezel */}
                  <View style={styles.centerBezelRing}>
                    {/* Vibrant Luminous Multi-Stop Linear Gradient */}
                    <LinearGradient
                      colors={["#6366F1", "#38BDF8", "#2DD4BF"]}
                      start={{ x: 0.15, y: 0.05 }}
                      end={{ x: 0.85, y: 0.95 }}
                      style={styles.centerGradientCircle}
                    >
                      {/* Solid White Dumbbell Silhouette tilted at 45° */}
                      <CenterDumbbellIcon />
                    </LinearGradient>
                  </View>
                </Pressable>
              </View>
            );
          }

          const activeColor = "#2DD4BF";
          const inactiveColor = "#64748B";
          const tintColor = isFocused ? activeColor : inactiveColor;

          const renderIcon = () => {
            switch (route.name) {
              case "home":
                return <HomeTabIcon color={tintColor} isFocused={isFocused} />;
              case "nutrition":
                return <NutritionTabIcon color={tintColor} isFocused={isFocused} />;
              case "progress":
                return <ProgressTabIcon color={tintColor} isFocused={isFocused} />;
              case "profile":
                return <ProfileTabIcon color={tintColor} isFocused={isFocused} />;
              default:
                return <HomeTabIcon color={tintColor} isFocused={isFocused} />;
            }
          };

          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name.charAt(0).toUpperCase() + route.name.slice(1);

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={String(label)}
              onPress={() => handleTabPress(route, isFocused)}
              style={styles.tabItem}
            >
              <View style={styles.iconContainer}>
                {isFocused && <View style={styles.activeGlowAura} />}
                {renderIcon()}
              </View>
              <Text
                style={[
                  styles.tabLabel,
                  { color: tintColor },
                  isFocused && styles.activeTabLabel,
                ]}
              >
                {String(label)}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

// --- TAB ICONS MATCHING FIGMA SPECIFICATION ---

/** Home tab icon with peaked roof, flat walls and doorway cutout */
function HomeTabIcon({ color, isFocused }: { color: string; isFocused: boolean }) {
  return (
    <View style={styles.iconWrapper}>
      <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H15C14.4477 21 14 20.5523 13 20V15C13 14.4477 12.5523 14 11 14H9C8.44772 14 8 14.4477 8 15V20C8 20.5523 7.55228 21 7 21H4C3.44772 21 3 20.5523 3 20V10.5Z" />
      </Svg>
    </View>
  );
}

/** Nutrition tab icon: fork with 3 tines on left, knife with curved blade on right */
function NutritionTabIcon({ color }: { color: string; isFocused: boolean }) {
  return (
    <View style={styles.iconWrapper}>
      <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Knife on the right */}
        <Path d="M18 2V22" />
        <Path d="M18 2C16 2 15 4 15 7V13H18" />
        {/* Fork on the left */}
        <Path d="M6 2V7C6 8.65685 7.34315 10 9 10C10.6569 10 12 8.65685 12 7V2" />
        <Path d="M9 2V7" />
        <Path d="M9 10V22" />
      </Svg>
    </View>
  );
}

/** Center Elevated Dumbbell Icon: tilted at 45° with solid white plates */
function CenterDumbbellIcon() {
  return (
    <Svg width={30} height={30} viewBox="0 0 28 28" fill="none">
      <G transform="rotate(-45 14 14)">
        {/* Center Handle Bar */}
        <Rect x={12.5} y={5} width={3} height={18} rx={1.5} fill="#FFFFFF" />
        {/* Top Weight Plates */}
        <Rect x={7.5} y={7.2} width={13} height={3.4} rx={1.4} fill="#FFFFFF" />
        <Rect x={9.2} y={4.2} width={9.6} height={2.6} rx={1.2} fill="#FFFFFF" />
        {/* Bottom Weight Plates */}
        <Rect x={7.5} y={17.4} width={13} height={3.4} rx={1.4} fill="#FFFFFF" />
        <Rect x={9.2} y={21.2} width={9.6} height={2.6} rx={1.2} fill="#FFFFFF" />
      </G>
    </Svg>
  );
}

/** Progress tab icon: zigzag node trend line with sparkles above */
function ProgressTabIcon({ color }: { color: string; isFocused: boolean }) {
  return (
    <View style={styles.iconWrapper}>
      <Svg
        width={25}
        height={25}
        viewBox="0 0 26 26"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Left Sparkle (4-point star) */}
        <Path
          d="M7 4C7 5 7.5 5.5 8.5 5.5C7.5 5.5 7 6 7 7C7 6 6.5 5.5 5.5 5.5C6.5 5.5 7 5 7 4Z"
          fill={color}
        />
        {/* Upper Right Sparkle (slightly larger) */}
        <Path
          d="M17 1C17 2.3 17.7 3 19 3C17.7 3 17 3.7 17 5C17 3.7 16.3 3 15 3C16.3 3 17 2.3 17 1Z"
          fill={color}
        />
        {/* Zigzag Trend Line */}
        <Path
          d="M4 17L9.5 9.5L15 15L21.5 7"
          stroke={color}
          strokeWidth={2.2}
        />
        {/* Trend Nodes */}
        <Circle cx={4} cy={17} r={2.2} fill={color} />
        <Circle cx={9.5} cy={9.5} r={2.2} fill={color} />
        <Circle cx={15} cy={15} r={2.2} fill={color} />
        <Circle cx={21.5} cy={7} r={2.2} fill={color} />
      </Svg>
    </View>
  );
}

/** Profile tab icon: user outline silhouette */
function ProfileTabIcon({ color }: { color: string; isFocused: boolean }) {
  return (
    <View style={styles.iconWrapper}>
      <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Circle cx={12} cy={8} r={4.5} />
        <Path d="M4 20.5C4 17 7.5 15 12 15C16.5 15 20 17 20 20.5" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#0B0E14",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.08)",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 20,
  },
  topHighlightLine: {
    position: "absolute",
    top: 0,
    left: 32,
    right: 32,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
  },
  tabsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 8,
    paddingHorizontal: 6,
    height: 62,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },
  iconContainer: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 4,
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  activeGlowAura: {
    position: "absolute",
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(45, 212, 191, 0.15)",
    shadowColor: "#2DD4BF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  activeTabLabel: {
    fontWeight: "700",
    textShadowColor: "rgba(45, 212, 191, 0.6)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  centerButtonOuterContainer: {
    width: 68,
    alignItems: "center",
    justifyContent: "center",
  },
  centerButtonPressable: {
    top: -20,
    width: 66,
    height: 66,
    alignItems: "center",
    justifyContent: "center",
  },
  centerButtonPressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.92,
  },
  centerBezelRing: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: "#0B0E14",
    borderWidth: 4.5,
    borderColor: "#0B0E14",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.65,
    shadowRadius: 14,
    elevation: 12,
  },
  centerGradientCircle: {
    width: 53,
    height: 53,
    borderRadius: 26.5,
    alignItems: "center",
    justifyContent: "center",
  },
});
