import { CustomHeader } from "@/shared/components/navigation/CustomHeader";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  LayoutChangeEvent,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  WORKOUT_LIBRARY_CATEGORIES,
  WorkoutCategoryItem,
} from "../data/workoutLibraryData";
import { WorkoutLibraryCard } from "./WorkoutLibraryCard";
import { WorkoutLibraryDetailScreen } from "./WorkoutLibraryDetailScreen";

export interface WorkoutLibraryScreenProps {
  onBack?: () => void;
  onSelectCategory?: (category: WorkoutCategoryItem) => void;
  subtitle?: string;
}

export const WorkoutLibraryScreen: React.FC<WorkoutLibraryScreenProps> = ({
  onBack,
  onSelectCategory,
  subtitle = "Browse all available gym routines.",
}) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<WorkoutCategoryItem | null>(null);

  const handleBack = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    if (onBack) {
      onBack();
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/workouts");
    }
  };

  const handleCategoryPress = (category: WorkoutCategoryItem) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    }
    if (onSelectCategory) {
      onSelectCategory(category);
      return;
    }
    if (category.targetRoute) {
      router.push(category.targetRoute as any);
      return;
    }
    if (category.id === "chest") {
      setSelectedCategory(category);
    }
  };

  if (selectedCategory?.id === "chest") {
    return <WorkoutLibraryDetailScreen onBack={() => setSelectedCategory(null)} />;
  }

  const onLayoutContainer = (e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width;
    if (width > 0 && Math.abs(width - containerWidth) > 2) {
      setContainerWidth(width);
    }
  };

  // Gap between columns is 14px
  const cardWidth =
    containerWidth > 0 ? (containerWidth - 14) / 2 : ("48%" as any);

  return (
    <View style={styles.screen}>
      <CustomHeader showBackButton onPressBack={handleBack} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: Math.max(insets.bottom + 24, 40),
          },
        ]}
      >
        {/* Glowing Hero Title */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>{"WORKOUT\nLIBRARY"}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        {/* 2-Column Categories Grid */}
        <View style={styles.gridContainer} onLayout={onLayoutContainer}>
          {WORKOUT_LIBRARY_CATEGORIES.map((category) => (
            <View
              key={category.id}
              style={[styles.cardWrapper, { width: cardWidth }]}
            >
              <WorkoutLibraryCard
                item={category}
                onPress={() => handleCategoryPress(category)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#070A11",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  heroSection: {
    marginBottom: 26,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 42,
    lineHeight: 46,
    fontWeight: "900",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    textShadowColor: "rgba(68, 234, 195, 0.55)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
    ...(Platform.OS === "web"
      ? ({
          filter: "drop-shadow(0 0 16px rgba(68, 234, 195, 0.5))",
        } as any)
      : {}),
  },
  subtitle: {
    color: "#8E95A5",
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "400",
    marginTop: 8,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 16,
  },
  cardWrapper: {
    minWidth: 140,
  },
});
