import * as Haptics from "expo-haptics";
import { Image, ImageSource } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import {
  Clock,
  Flame,
  Play,
  SlidersHorizontal,
  Star,
} from "lucide-react-native";
import React from "react";
import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import Svg, { Path } from "react-native-svg";

export interface UpperBodySessionHeroCardProps {
  image?: ImageSource | number | string;
  apexBadge?: string;
  xpBadge?: string;
  subtitle?: string;
  title?: string;
  duration?: string;
  calories?: string;
  exerciseCount?: string;
  style?: StyleProp<ViewStyle>;
}

export const UpperBodySessionHeroCard: React.FC<
  UpperBodySessionHeroCardProps
> = ({
  image,
  apexBadge = "UPPER BODY APEX",
  xpBadge = "+500 XP",
  subtitle = "HYPERTROPHY & POWER",
  title = "UPPER BODY\nSESSION",
  duration = "60 MINS",
  calories = "480 KCAL",
  exerciseCount = "7 EXERCISES",
  style,
}) => {
  return (
    <View style={[styles.cardContainer, style]}>
      {/* Background Hero Image */}
      {image && (
        <Image
          source={image}
          style={styles.heroImage}
          contentFit="cover"
          priority="high"
        />
      )}

      {/* Cyber Ambient Atmosphere / Vignette */}
      <LinearGradient
        colors={[
          "rgba(7, 10, 17, 0.4)",
          "rgba(7, 10, 17, 0.15)",
          "rgba(7, 10, 17, 0.72)",
          "rgba(7, 10, 17, 0.98)",
        ]}
        locations={[0, 0.35, 0.72, 1]}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      {/* Top Header Row with Badges */}
      <View style={styles.topRow}>
        {/* Left Badge: +500 XP (or right badge if only one) */}
        <View style={styles.xpBadge}>
          <View style={styles.xpStarCircle}>
            <Star size={11} color="#FFFFFF" fill="#FFFFFF" />
          </View>
          <Text style={styles.xpBadgeText}>{xpBadge}</Text>
        </View>
      </View>

      {/* Bottom Content Area */}
      <View style={styles.bottomContent}>
        {/* Title & Subtitle inside card (if provided) */}
        {subtitle && <Text style={styles.subtitleText}>{subtitle}</Text>}
        {title && <Text style={styles.titleText}>{title}</Text>}

        {/* Stat Pills Row */}
        <View style={styles.statsRow}>
          {/* Duration */}
          <View style={styles.statPill}>
            <Clock size={13} color="#44EAC3" strokeWidth={2.4} />
            <Text style={styles.statPillText}>{duration}</Text>
          </View>

          {/* Calories */}
          <View style={styles.statPill}>
            <Flame size={13} color="#FF6B4A" fill="#FF6B4A" />
            <Text style={styles.statPillText}>{calories}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    height: 380,
    borderRadius: 24,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#0C101A",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  heroImage: {
    ...StyleSheet.absoluteFill,
  },
  topRow: {
    position: "absolute",
    top: 18,
    left: 18,
    right: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 10,
  },
  apexBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 16,
    backgroundColor: "rgba(11, 23, 26, 0.8)",
    borderWidth: 1,
    borderColor: "rgba(68, 234, 195, 0.35)",
  },
  apexBadgeText: {
    color: "#44EAC3",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.1,
    fontFamily: "monospace",
    textTransform: "uppercase",
  },
  xpBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#6366F1",
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  xpStarCircle: {
    width: 17,
    height: 17,
    borderRadius: 8.5,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  xpBadgeText: {
    color: "#FFFFFF",
    fontSize: 11.5,
    fontWeight: "800",
    letterSpacing: 0.6,
    fontFamily: "monospace",
  },
  bottomContent: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 10,
  },
  subtitleText: {
    color: "#94A3B8",
    fontSize: 11.5,
    fontWeight: "800",
    letterSpacing: 1.2,
    fontFamily: "monospace",
    textTransform: "uppercase",
    marginBottom: 6,
  },
  titleText: {
    color: "#FFFFFF",
    fontSize: 27,
    lineHeight: 31,
    fontWeight: "900",
    letterSpacing: 0.5,
    fontFamily: "monospace",
    textTransform: "uppercase",
    marginBottom: 14,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
  },
  statPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(10, 13, 20, 0.72)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6.5,
  },
  statPillText: {
    color: "#FFFFFF",
    fontSize: 11.5,
    fontWeight: "800",
    letterSpacing: 0.8,
    fontFamily: "monospace",
    textTransform: "uppercase",
  },
});
