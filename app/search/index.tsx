import { CustomHeader } from "@/shared/components/navigation/CustomHeader";
import MaskedView from "@react-native-masked-view/masked-view";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  ArrowRight,
  Bot,
  Clock,
  Dumbbell,
  Flame,
  Search,
  Sparkles,
  Utensils,
  X,
  Zap,
} from "lucide-react-native";
import React, { useMemo, useRef, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Line as SvgLine } from "react-native-svg";

type CategoryFilter = "ALL" | "WORKOUTS" | "MEALS" | "EXERCISES" | "AI PROTOCOLS";

interface ProtocolItem {
  id: string;
  category: "WORKOUTS" | "MEALS" | "EXERCISES" | "AI PROTOCOLS";
  categoryBadge: string;
  title: string;
  desc: string;
  meta: string;
  iconType: "workout" | "meal" | "exercise" | "ai";
  route: string;
}

const CATEGORIES: CategoryFilter[] = [
  "ALL",
  "WORKOUTS",
  "MEALS",
  "EXERCISES",
  "AI PROTOCOLS",
];

const TRENDING_TAGS = [
  "HYPERTROPHY",
  "HIGH PROTEIN",
  "PUSH DAY",
  "HIIT BURN",
  "CREATINE",
  "AI RECOVERY",
  "BENCH PRESS",
  "KETO BOWL",
];

const SEARCH_DATABASE: ProtocolItem[] = [
  {
    id: "p1",
    category: "WORKOUTS",
    categoryBadge: "WORKOUT",
    title: "PUSH POWER HYPERTROPHY",
    desc: "Targeted chest, front deltoids and triceps overload protocol.",
    meta: "55 MIN • 480 KCAL • INTERMEDIATE",
    iconType: "workout",
    route: "/workouts/push",
  },
  {
    id: "p2",
    category: "WORKOUTS",
    categoryBadge: "WORKOUT",
    title: "PULL VELOCITY & BACK",
    desc: "Lats, rhomboids, rear delts and bicep kinetic recruitment.",
    meta: "50 MIN • 440 KCAL • ADVANCED",
    iconType: "workout",
    route: "/workouts/pull",
  },
  {
    id: "p3",
    category: "WORKOUTS",
    categoryBadge: "WORKOUT",
    title: "CHEST MASTERY BENCH & FLYES",
    desc: "Pectoral fiber activation with compound and isolation tempo.",
    meta: "45 MIN • 390 KCAL • INTERMEDIATE",
    iconType: "workout",
    route: "/workouts/chest",
  },
  {
    id: "p4",
    category: "WORKOUTS",
    categoryBadge: "WORKOUT",
    title: "LEG DAY ANABOLIC FORGE",
    desc: "High tension squat variations and posterior chain endurance.",
    meta: "60 MIN • 560 KCAL • PRO",
    iconType: "workout",
    route: "/workouts",
  },
  {
    id: "p5",
    category: "WORKOUTS",
    categoryBadge: "WORKOUT",
    title: "HIIT KINETIC METABOLIC BURN",
    desc: "High intensity cardiovascular conditioning and VO2 max training.",
    meta: "35 MIN • 510 KCAL • ALL LEVELS",
    iconType: "workout",
    route: "/workouts",
  },
  {
    id: "m1",
    category: "MEALS",
    categoryBadge: "NUTRITION",
    title: "AI KETO SALMON & AVOCADO BOWL",
    desc: "Essential omega-3 fats with clean metabolic micronutrients.",
    meta: "620 KCAL • 48G P • 14G C • 42G F",
    iconType: "meal",
    route: "/ai-meal-plan",
  },
  {
    id: "m2",
    category: "MEALS",
    categoryBadge: "NUTRITION",
    title: "POST-WORKOUT ANABOLIC SHAKE",
    desc: "Fast absorbing whey isolate with cyclic dextrin matrix.",
    meta: "450 KCAL • 50G P • 52G C • 4G F",
    iconType: "meal",
    route: "/meal-analysis",
  },
  {
    id: "m3",
    category: "MEALS",
    categoryBadge: "NUTRITION",
    title: "LEAN FLANK STEAK & SWEET POTATO",
    desc: "Bioavailable zinc, iron and complex low-glycemic carbohydrates.",
    meta: "710 KCAL • 54G P • 78G C • 18G F",
    iconType: "meal",
    route: "/meal-history",
  },
  {
    id: "m4",
    category: "MEALS",
    categoryBadge: "NUTRITION",
    title: "CELLULAR HYDRATION & ELECTROLYTES",
    desc: "Sodium, potassium and magnesium blend for cellular osmotic balance.",
    meta: "15 KCAL • 0G P • 3G C • 0G F",
    iconType: "meal",
    route: "/drink-water",
  },
  {
    id: "e1",
    category: "EXERCISES",
    categoryBadge: "EXERCISE",
    title: "BARBELL BACK SQUAT",
    desc: "Fundamental kinetic chain lower body strength exercise.",
    meta: "COMPOUND • 4 SETS × 8-10 REPS",
    iconType: "exercise",
    route: "/workouts",
  },
  {
    id: "e2",
    category: "EXERCISES",
    categoryBadge: "EXERCISE",
    title: "INCLINE DUMBBELL PRESS",
    desc: "Clavicular head pectoral focus with ergonomic hand rotation.",
    meta: "CHEST • 4 SETS × 10-12 REPS",
    iconType: "exercise",
    route: "/workouts/chest",
  },
  {
    id: "e3",
    category: "EXERCISES",
    categoryBadge: "EXERCISE",
    title: "WEIGHTED PULL-UP",
    desc: "Vertical pulling mass builder with progressive overload belt.",
    meta: "LATS/BICEPS • 3 SETS × 6-8 REPS",
    iconType: "exercise",
    route: "/workouts/pull",
  },
  {
    id: "a1",
    category: "AI PROTOCOLS",
    categoryBadge: "AI COACH",
    title: "NEURAL WORKOUT OPTIMIZER",
    desc: "Dynamic set/rep adaptation based on HRV and readiness score.",
    meta: "NEURAL ENGINE • REAL-TIME ADAPTIVE",
    iconType: "ai",
    route: "/coach",
  },
  {
    id: "a2",
    category: "AI PROTOCOLS",
    categoryBadge: "AI COACH",
    title: "AI MACRO ADAPTATION ENGINE",
    desc: "Real-time caloric shifts responding to workout caloric expenditure.",
    meta: "METABOLIC AI • DYNAMIC SHIFTING",
    iconType: "ai",
    route: "/coach",
  },
  {
    id: "a3",
    category: "AI PROTOCOLS",
    categoryBadge: "AI COACH",
    title: "RECOVERY & CIRCADIAN PROTOCOL",
    desc: "Deep nervous system reset routines and sleep quality coaching.",
    meta: "RESTORATION • SLEEP ARCHITECTURE",
    iconType: "ai",
    route: "/coach",
  },
];

const getCategoryColor = (badge: string) => {
  switch (badge) {
    case "WORKOUT":
      return {
        bg: "rgba(99, 102, 241, 0.15)",
        border: "rgba(99, 102, 241, 0.35)",
        text: "#818CF8",
      };
    case "NUTRITION":
      return {
        bg: "rgba(247, 156, 66, 0.15)",
        border: "rgba(247, 156, 66, 0.35)",
        text: "#F79C42",
      };
    case "EXERCISE":
      return {
        bg: "rgba(56, 189, 248, 0.15)",
        border: "rgba(56, 189, 248, 0.35)",
        text: "#38BDF8",
      };
    case "AI COACH":
      return {
        bg: "rgba(56, 237, 216, 0.15)",
        border: "rgba(56, 237, 216, 0.35)",
        text: "#38EDD8",
      };
    default:
      return {
        bg: "rgba(255, 255, 255, 0.08)",
        border: "rgba(255, 255, 255, 0.2)",
        text: "#E2E8F0",
      };
  }
};

const renderIcon = (type: ProtocolItem["iconType"], color: string) => {
  switch (type) {
    case "workout":
      return <Dumbbell size={20} color={color} />;
    case "meal":
      return <Utensils size={20} color={color} />;
    case "exercise":
      return <Flame size={20} color={color} />;
    case "ai":
      return <Bot size={20} color={color} />;
  }
};

export default function SearchRoute() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("ALL");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const handleSelectCategory = (cat: CategoryFilter) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    setSelectedCategory(cat);
  };

  const handleSelectTag = (tag: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    setQuery(tag);
  };

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SEARCH_DATABASE.filter((item) => {
      const matchCategory =
        selectedCategory === "ALL" || item.category === selectedCategory;
      if (!matchCategory) return false;

      if (!q) return true;

      return (
        item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.meta.toLowerCase().includes(q) ||
        item.categoryBadge.toLowerCase().includes(q)
      );
    });
  }, [query, selectedCategory]);

  const handleItemPress = (item: ProtocolItem) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    }
    router.push(item.route as any);
  };

  return (
    <View style={styles.container}>
      {/* Background Gradient & Cyber Accent Lines */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <LinearGradient
          colors={["#1B182E", "#2A244A", "#151321", "#0B0B11"]}
          locations={[0, 0.25, 0.65, 1]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
          <SvgLine
            x1="420"
            y1="-20"
            x2="-40"
            y2="440"
            stroke="rgba(255, 255, 255, 0.035)"
            strokeWidth="1"
          />
          <SvgLine
            x1="460"
            y1="260"
            x2="-40"
            y2="760"
            stroke="rgba(56, 189, 248, 0.04)"
            strokeWidth="1"
          />
          <SvgLine
            x1="480"
            y1="560"
            x2="-40"
            y2="1080"
            stroke="rgba(56, 237, 216, 0.04)"
            strokeWidth="1"
          />
        </Svg>
      </View>

      <CustomHeader
        title="SEARCH"
        titleVariant="text"
        showBackButton={true}
        showSearch={false}
        showNotifications={true}
        showAvatar={true}
        transparent={true}
      />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom + 24, 40) },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Title Section with Masked Gradient Title & Subtitle */}
        <View style={styles.titleSection}>
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
                    SEARCH PROTOCOLS
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
          <Text style={styles.subtitle}>
            Query training routines, nutrition targets, exercises & AI systems
          </Text>
        </View>

        {/* Search Bar Input */}
        <View style={styles.searchBarWrapper}>
          <View style={styles.searchBarContainer}>
            <Search
              size={18}
              color={isFocused ? "#38BDF8" : "#94A3B8"}
              style={styles.searchIcon}
            />
            <TextInput
              ref={inputRef}
              style={[
                styles.input,
                Platform.OS === "web" &&
                  ({ outlineStyle: "none", outlineWidth: 0 } as any),
              ]}
              placeholder="SEARCH PROTOCOLS, MEALS, EXERCISES..."
              placeholderTextColor="#64748B"
              value={query}
              onChangeText={setQuery}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="search"
            />
            {query.length > 0 && (
              <Pressable
                onPress={handleClear}
                style={({ pressed }) => [
                  styles.clearButton,
                  pressed && { opacity: 0.6 },
                ]}
                accessibilityRole="button"
                accessibilityLabel="Clear search"
              >
                <X size={16} color="#94A3B8" />
              </Pressable>
            )}
          </View>
        </View>

        {/* Horizontal Category Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
          style={styles.categoryContainer}
        >
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <Pressable
                key={cat}
                onPress={() => handleSelectCategory(cat)}
                style={({ pressed }) => [
                  styles.categoryPill,
                  isActive && styles.categoryPillActive,
                  pressed && { opacity: 0.8 },
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    isActive && styles.categoryTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Quick Trending Tags */}
        <View style={styles.trendingSection}>
          <View style={styles.trendingHeaderRow}>
            <Sparkles size={14} color="#38BDF8" />
            <Text style={styles.trendingHeader}>TRENDING TAGS</Text>
          </View>
          <View style={styles.tagChipsWrap}>
            {TRENDING_TAGS.map((tag) => {
              const isSelected = query.toLowerCase() === tag.toLowerCase();
              return (
                <Pressable
                  key={tag}
                  onPress={() => handleSelectTag(tag)}
                  style={({ pressed }) => [
                    styles.tagChip,
                    isSelected && styles.tagChipActive,
                    pressed && { opacity: 0.75 },
                  ]}
                >
                  <Text
                    style={[
                      styles.tagChipText,
                      isSelected && styles.tagChipTextActive,
                    ]}
                  >
                    #{tag}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Results Header */}
        <View style={styles.resultsHeaderRow}>
          <Text style={styles.resultsCount}>
            {filteredItems.length}{" "}
            {filteredItems.length === 1 ? "PROTOCOL MATCH" : "PROTOCOLS MATCHED"}
          </Text>
          <View style={styles.sectionLine} />
        </View>

        {/* Results List */}
        {filteredItems.length > 0 ? (
          <View style={styles.resultsList}>
            {filteredItems.map((item) => {
              const colorConfig = getCategoryColor(item.categoryBadge);
              return (
                <Pressable
                  key={item.id}
                  onPress={() => handleItemPress(item)}
                  style={({ pressed }) => [
                    styles.itemCard,
                    pressed && styles.itemCardPressed,
                  ]}
                >
                  {/* Left Icon Container */}
                  <View
                    style={[
                      styles.itemIconContainer,
                      {
                        backgroundColor: colorConfig.bg,
                        borderColor: colorConfig.border,
                      },
                    ]}
                  >
                    {renderIcon(item.iconType, colorConfig.text)}
                  </View>

                  {/* Middle Details */}
                  <View style={styles.itemDetails}>
                    <View style={styles.badgeRow}>
                      <View
                        style={[
                          styles.categoryBadge,
                          {
                            backgroundColor: colorConfig.bg,
                            borderColor: colorConfig.border,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.categoryBadgeText,
                            { color: colorConfig.text },
                          ]}
                        >
                          {item.categoryBadge}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemDesc}>{item.desc}</Text>
                    <Text style={styles.itemMeta}>{item.meta}</Text>
                  </View>

                  {/* Right Arrow Action */}
                  <View style={styles.itemArrowContainer}>
                    <ArrowRight size={18} color="#64748B" />
                  </View>
                </Pressable>
              );
            })}
          </View>
        ) : (
          /* Empty State */
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Search size={32} color="#64748B" />
            </View>
            <Text style={styles.emptyTitle}>NO PROTOCOLS FOUND</Text>
            <Text style={styles.emptyDesc}>
              No routines or metrics match &quot;{query}&quot;. Try exploring the trending tags above or reset the filter.
            </Text>
            <Pressable
              onPress={() => {
                setQuery("");
                setSelectedCategory("ALL");
              }}
              style={({ pressed }) => [
                styles.resetButton,
                pressed && { opacity: 0.8 },
              ]}
            >
              <Text style={styles.resetButtonText}>RESET SEARCH FILTERS</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#090A10",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  titleSection: {
    paddingHorizontal: 20,
    marginTop: 4,
    marginBottom: 16,
  },
  maskedTitleWrapper: {
    height: 48,
    width: "100%",
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
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "900",
    fontFamily: "monospace",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "monospace",
    fontWeight: "600",
    marginTop: 4,
  },
  searchBarWrapper: {
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#11141C",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    paddingHorizontal: 14,
    height: 50,
    ...(Platform.OS === "web"
      ? ({ outlineStyle: "none", outlineWidth: 0 } as any)
      : {}),
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "monospace",
    fontWeight: "700",
    letterSpacing: 0.5,
    paddingVertical: 0,
    ...(Platform.OS === "web"
      ? ({ outlineStyle: "none", outlineWidth: 0 } as any)
      : {}),
  },
  clearButton: {
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
    ...(Platform.OS === "web"
      ? ({ outlineStyle: "none", outlineWidth: 0 } as any)
      : {}),
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryScroll: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryPill: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    ...(Platform.OS === "web"
      ? ({ outlineStyle: "none", outlineWidth: 0 } as any)
      : {}),
  },
  categoryPillActive: {
    backgroundColor: "rgba(56, 189, 248, 0.16)",
    borderColor: "#38BDF8",
  },
  categoryText: {
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "700",
    fontFamily: "monospace",
    letterSpacing: 1,
  },
  categoryTextActive: {
    color: "#38BDF8",
    fontWeight: "800",
  },
  trendingSection: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  trendingHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 10,
  },
  trendingHeader: {
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "700",
    fontFamily: "monospace",
    letterSpacing: 1.2,
  },
  tagChipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tagChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "#11141C",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    ...(Platform.OS === "web"
      ? ({ outlineStyle: "none", outlineWidth: 0 } as any)
      : {}),
  },
  tagChipActive: {
    backgroundColor: "rgba(56, 189, 248, 0.14)",
    borderColor: "rgba(56, 189, 248, 0.4)",
  },
  tagChipText: {
    color: "#CBD5E1",
    fontSize: 11,
    fontWeight: "600",
    fontFamily: "monospace",
    letterSpacing: 0.6,
  },
  tagChipTextActive: {
    color: "#38BDF8",
    fontWeight: "700",
  },
  resultsHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 6,
    marginBottom: 14,
  },
  resultsCount: {
    color: "#64748B",
    fontSize: 11,
    fontWeight: "700",
    fontFamily: "monospace",
    letterSpacing: 1.2,
    marginRight: 12,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  resultsList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#11141C",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    ...(Platform.OS === "web"
      ? ({ outlineStyle: "none", outlineWidth: 0 } as any)
      : {}),
  },
  itemCardPressed: {
    backgroundColor: "#161B28",
    borderColor: "rgba(56, 189, 248, 0.28)",
  },
  itemIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  itemDetails: {
    flex: 1,
    marginRight: 8,
  },
  badgeRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  categoryBadge: {
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderRadius: 6,
    borderWidth: 1,
  },
  categoryBadgeText: {
    fontSize: 9,
    fontWeight: "800",
    fontFamily: "monospace",
    letterSpacing: 0.8,
  },
  itemTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    fontFamily: "monospace",
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  itemDesc: {
    color: "#94A3B8",
    fontSize: 11,
    lineHeight: 15,
    fontFamily: "monospace",
    marginBottom: 4,
  },
  itemMeta: {
    color: "#64748B",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  itemArrowContainer: {
    paddingLeft: 4,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
  emptyIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    fontFamily: "monospace",
    letterSpacing: 1,
    marginBottom: 8,
  },
  emptyDesc: {
    color: "#64748B",
    fontSize: 12,
    fontFamily: "monospace",
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 20,
  },
  resetButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 14,
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.35)",
    ...(Platform.OS === "web"
      ? ({ outlineStyle: "none", outlineWidth: 0 } as any)
      : {}),
  },
  resetButtonText: {
    color: "#38BDF8",
    fontSize: 11,
    fontWeight: "800",
    fontFamily: "monospace",
    letterSpacing: 1,
  },
});
