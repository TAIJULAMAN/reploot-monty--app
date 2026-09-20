import React from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Zap } from "lucide-react-native";
import { OnboardingSlideItem } from "../data/onboardingData";

interface OnboardingSlideProps {
  slide: OnboardingSlideItem;
}

export const OnboardingSlide: React.FC<OnboardingSlideProps> = React.memo(({ slide }) => {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const bottomInset = insets.bottom > 0 ? Math.max(insets.bottom + 32, 64) : 64;
  const bottomOffset = bottomInset + 164;

  return (
    <View style={[styles.container, { width, height }]}>
      {/* Background Image */}
      <Image
        source={slide.image}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        transition={250}
        priority="high"
      />

      {/* Atmospheric Amber Embers & Cyber Line matching Figma reference */}
      {slide.id === "trainer" && (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          {/* Subtle Angled Cyber HUD Grid Line */}
          <View style={styles.cyberLine} />

          {/* Ember 1: Warm glowing particle at top-right */}
          <View style={[styles.emberGlow, { top: "18%", right: "32%" }]}>
            <View style={styles.emberCore} />
          </View>

          {/* Ember 2: Warm glowing particle at mid-left */}
          <View style={[styles.emberGlow, { top: "34%", left: "11%" }]}>
            <View style={styles.emberCore} />
          </View>

          {/* Ember 3: Warm glowing particle at bottom-right */}
          <View style={[styles.emberGlow, { top: "84%", right: "18%" }]}>
            <View style={styles.emberCore} />
          </View>
        </View>
      )}

      {/* Top subtle gradient for status bar / header readability */}
      <LinearGradient
        colors={["rgba(17, 19, 30, 0.45)", "rgba(17, 19, 30, 0)"]}
        locations={[0, 1]}
        style={styles.topGradient}
        pointerEvents="none"
      />

      {/* Onboarding Overlay - Matching exact Figma specification:
          linear-gradient(180deg, rgba(17, 19, 30, 0) 0%, rgba(17, 19, 30, 0.5) 50%, #11131E 100%) */}
      <LinearGradient
        colors={["rgba(17, 19, 30, 0)", "rgba(17, 19, 30, 0.5)", "#11131E"]}
        locations={[0, 0.5, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      {/* Slide Typography & Highlights */}
      <View style={[styles.textContainer, { bottom: bottomOffset }]}>
        {/* Title Stack */}
        <View style={styles.titleStack}>
          {slide.titleLines.map((line, index) => (
            <Text key={index} style={styles.titleLine}>
              {line}
            </Text>
          ))}
        </View>

        {/* Subtitle with Badges and Colored Highlights */}
        <View style={styles.subtitleWrapper}>
          {slide.badgeIcon === "lightning" && (
            <View style={styles.badgeIcon}>
              <Zap size={16} color="#A855F7" fill="#A855F7" />
            </View>
          )}
          <Text style={styles.subtitle}>
            {slide.subtitleParts.map((part, index) => (
              <Text
                key={index}
                style={[
                  styles.subtitlePartDefault,
                  part.color ? { color: part.color } : null,
                  part.isBold ? { fontWeight: "700" } : null,
                ]}
              >
                {part.text}
              </Text>
            ))}
          </Text>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    backgroundColor: "#11131E",
  },
  cyberLine: {
    position: "absolute",
    top: "14%",
    left: "-15%",
    width: "70%",
    height: 1,
    backgroundColor: "rgba(45, 212, 191, 0.22)",
    transform: [{ rotate: "-15deg" }],
  },
  emberGlow: {
    position: "absolute",
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "rgba(249, 115, 22, 0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  emberCore: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#FDBA74",
    shadowColor: "#F97316",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
  },
  topGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 140,
    zIndex: 1,
  },
  textContainer: {
    position: "absolute",
    left: 20,
    right: 20,
    alignItems: "center",
    zIndex: 3,
  },
  titleStack: {
    alignItems: "center",
    marginBottom: 12,
  },
  titleLine: {
    color: "#FFFFFF",
    fontSize: 44,
    lineHeight: 46,
    fontWeight: "900",
    letterSpacing: -0.6,
    textAlign: "center",
    textTransform: "uppercase",
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  subtitleWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    maxWidth: 340,
    paddingHorizontal: 8,
  },
  badgeIcon: {
    marginRight: 6,
    marginTop: 3,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 15,
    lineHeight: 22,
  },
  subtitlePartDefault: {
    color: "#E2E8F0",
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "400",
    textShadowColor: "rgba(0, 0, 0, 0.85)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
});
