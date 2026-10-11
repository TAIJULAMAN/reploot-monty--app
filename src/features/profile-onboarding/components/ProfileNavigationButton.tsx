import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowRight } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ProfileNavigationButtonProps {
  title?: string;
  onPress: () => void;
  disabled?: boolean;
  showArrow?: boolean;
  subtext?: string;
}

export function ProfileNavigationButton({
  title = "CONTINUE",
  onPress,
  disabled = false,
  showArrow = true,
  subtext,
}: ProfileNavigationButtonProps) {
  const handlePress = () => {
    if (disabled) return;
    onPress();
    requestAnimationFrame(() => {
      try {
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } catch {
        // ignore
      }
    });
  };

  return (
    <View style={styles.wrapper}>
      <Pressable
        accessibilityRole="button"
        disabled={disabled}
        onPress={handlePress}
        unstable_pressDelay={0}
        hitSlop={6}
        style={({ pressed }) => [
          styles.buttonPressable,
          disabled && styles.buttonDisabled,
          pressed && !disabled && styles.buttonPressed,
        ]}
      >
        <LinearGradient
          colors={
            disabled
              ? ["rgba(0, 242, 254, 0.2)", "rgba(79, 172, 254, 0.2)"]
              : ["#00f2fe", "#4facfe"]
          }
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.gradientPill}
        >
          <Text style={[styles.text, disabled && styles.textDisabled]}>
            {title}
          </Text>
          {showArrow && (
            <ArrowRight
              size={20}
              color={disabled ? "rgba(255, 255, 255, 0.4)" : "#070A12"}
              strokeWidth={2.8}
              style={styles.arrow}
            />
          )}
        </LinearGradient>
      </Pressable>

      {subtext && <Text style={styles.subtext}>{subtext}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignSelf: "stretch",
    marginTop: 6,
    marginBottom: 4,
  },
  buttonPressable: {
    width: "100%",
    alignSelf: "stretch",
    height: 54,
    borderRadius: 27,
    shadowColor: "#00f2fe",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.985 }],
  },
  gradientPill: {
    width: "100%",
    alignSelf: "stretch",
    height: 54,
    borderRadius: 27,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  text: {
    color: "#070A12",
    fontSize: 15,
    lineHeight: 22,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 2.2,
    textTransform: "uppercase",
  },
  textDisabled: {
    color: "rgba(255, 255, 255, 0.4)",
  },
  arrow: {
    marginLeft: 10,
  },
  subtext: {
    color: "#64748B",
    fontSize: 10,
    lineHeight: 13,
    fontFamily: "monospace",
    fontWeight: "500",
    letterSpacing: 1.4,
    textTransform: "uppercase",
    textAlign: "center",
    marginTop: 8,
  },
});
