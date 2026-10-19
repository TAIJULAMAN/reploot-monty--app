import { CustomHeader } from "@/shared/components/navigation/CustomHeader";
import MaskedView from "@react-native-masked-view/masked-view";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
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
import Svg, { Line as SvgLine } from "react-native-svg";
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
  subtitle = "Browse all available gym routines & exercise protocols.",
}) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] =
    useState<WorkoutCategoryItem | null>(null);

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
    return (
      <WorkoutLibraryDetailScreen onBack={() => setSelectedCategory(null)} />
    );
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
      <StatusBar style="light" />

      <CustomHeader
        transparent={true}
        showBackButton={true}
        onPressBack={handleBack}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: Math.max(insets.bottom + 32, 50),
          },
        ]}
      >
        {/* Standardized Title Section with Masked Gradient Title (progress.tsx / GenericWorkoutDetailScreen pattern) */}
        <View style={styles.titleSection}>
          <Text style={styles.categoryBadge}>EXERCISE DATABASE</Text>
          <View style={styles.maskedTitleWrapper}>
            <MaskedView
              style={styles.maskedTitleView}
              maskElement={
                <View style={styles.maskWrapper}>
                  <Text
                    style={styles.mainTitle}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                  >
                    WORKOUT LIBRARY
                  </Text>
                </View>
              }
            >
              <LinearGradient
                colors={["#00f2fe", "#4facfe"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
              />
            </MaskedView>
          </View>
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
    paddingTop: 10,
  },
  titleSection: {
    marginBottom: 22,
    marginTop: 4,
  },
  categoryBadge: {
    color: "#44EAC3",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.5,
    fontFamily: "monospace",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  maskedTitleWrapper: {
    height: 44,
    width: "100%",
    marginBottom: 6,
  },
  maskedTitleView: {
    flex: 1,
    width: "100%",
  },
  maskWrapper: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
  },
  gradient: {
    flex: 1,
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "900",
    fontFamily: "monospace",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "monospace",
    fontWeight: "600",
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
