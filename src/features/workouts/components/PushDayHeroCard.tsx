import { Image, ImageSource } from "expo-image";
import { Clock, Flame, Zap } from "lucide-react-native";
import React from "react";
import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { PUSH_DAY_DATA } from "../data/pushDayData";

export interface PushDayHeroCardProps {
  image?: ImageSource | number | string;
  xpText?: string;
  durationText?: string;
  caloriesText?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export const PushDayHeroCard: React.FC<PushDayHeroCardProps> = ({
  image = PUSH_DAY_DATA.heroImage,
  xpText = PUSH_DAY_DATA.xpText,
  durationText = PUSH_DAY_DATA.durationText,
  caloriesText = PUSH_DAY_DATA.caloriesText,
  style,
  testID,
}) => {
  return (
    <View
      style={[styles.heroCardContainer, style]}
      testID={testID}
      accessibilityRole="image"
      accessibilityLabel={`Push Day routine, ${durationText}, ${caloriesText}, reward ${xpText}`}
    >
      <Image
        source={image}
        style={styles.heroImage}
        contentFit="cover"
        priority="high"
      />
      {xpText && (
        <View style={styles.xpBadge}>
          <Zap size={13} color="#070A11" fill="#070A11" />
          <Text style={styles.xpBadgeText}>{xpText}</Text>
        </View>
      )}
      <View style={styles.heroBottomBadgesRow}>
        {durationText && (
          <View style={styles.statPill}>
            <Clock size={13} color="#44EAC3" />
            <Text style={styles.statPillText}>{durationText}</Text>
          </View>
        )}
        {caloriesText && (
          <View style={styles.statPill}>
            <Flame size={13} color="#FF6B4A" fill="#FF6B4A" />
            <Text style={styles.statPillText}>{caloriesText}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heroCardContainer: {
    width: "100%",
    aspectRatio: 1.08,
    position: "relative",
    marginBottom: 16,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#161821",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    transform: [{ scale: 1.18 }],
  },
  xpBadge: {
    position: "absolute",
    top: 18,
    left: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#44EAC3",
    borderRadius: 16,
    paddingHorizontal: 11,
    paddingVertical: 6,
    zIndex: 2,
  },
  xpBadgeText: {
    fontFamily: Platform.select({
      web: "'JetBrains Mono', monospace",
      default: "JetBrainsMono_700Bold",
    }),
    color: "#070A11",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.6,
  },
  heroBottomBadgesRow: {
    position: "absolute",
    bottom: 18,
    left: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    zIndex: 2,
  },
  statPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(10, 13, 20, 0.7)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  statPillText: {
    fontFamily: Platform.select({
      web: "'JetBrains Mono', monospace",
      default: "JetBrainsMono_700Bold",
    }),
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.6,
  },
});
