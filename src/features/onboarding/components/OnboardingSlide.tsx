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

export const OnboardingSlide: React.FC<OnboardingSlideProps> = ({ slide }) => {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const bottomOffset = Math.max(insets.bottom + 130, 144);

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

      {/* Top Gradient for Status Bar / Header contrast */}
      <LinearGradient
        colors={["rgba(7, 10, 17, 0.75)", "rgba(7, 10, 17, 0.2)", "transparent"]}
        locations={[0, 0.6, 1]}
        style={styles.topGradient}
      />

      {/* Bottom Cinematic Dark Gradient for Text Contrast */}
      <LinearGradient
        colors={[
          "transparent",
          "rgba(7, 10, 17, 0.4)",
          "rgba(7, 10, 17, 0.85)",
          "rgba(7, 10, 17, 0.98)",
          "#070A11",
        ]}
        locations={[0, 0.35, 0.65, 0.88, 1]}
        style={styles.bottomGradient}
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
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    backgroundColor: "#070A11",
  },
  topGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 180,
    zIndex: 1,
  },
  bottomGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "68%",
    zIndex: 2,
  },
  textContainer: {
    position: "absolute",
    left: 24,
    right: 24,
    alignItems: "center",
    zIndex: 3,
  },
  titleStack: {
    alignItems: "center",
    marginBottom: 14,
  },
  titleLine: {
    color: "#FFFFFF",
    fontSize: 40,
    lineHeight: 45,
    fontWeight: "900",
    letterSpacing: 0.5,
    textAlign: "center",
    textTransform: "uppercase",
  },
  subtitleWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    maxWidth: 320,
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
  },
});
