import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

export interface AuthHeroProps {
  line1?: string;
  line2?: string;
}

export function AuthHero({ line1 = "WELCOME", line2 = "BACK" }: AuthHeroProps) {
  return (
    <View style={styles.heroSection}>
      <View style={styles.sparklePosition}>
        <Image
          source={require("../../../../assets/signInIcon/spark.svg")}
          style={{ width: 36, height: 36 }}
          contentFit="contain"
        />
      </View>

      <Text style={styles.heroTitle}>{line1}</Text>
      <Text style={styles.heroTitle}>{line2}</Text>

      <View style={styles.dumbbellPosition}>
        <Image
          source={require("../../../../assets/signInIcon/dumble.svg")}
          style={{ width: 32, height: 32 }}
          contentFit="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroSection: {
    position: "relative",
    marginBottom: 6,
    paddingLeft: 2,
  },
  sparklePosition: {
    position: "absolute",
    top: -24,
    left: -2,
    zIndex: 2,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 38,
    lineHeight: 40,
    fontWeight: "800",
    letterSpacing: 1,
    textTransform: "uppercase",
    textShadowColor: "rgba(255, 255, 255, 0.35)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
    marginTop: 12,
  },
  dumbbellPosition: {
    position: "absolute",
    right: 22,
    top: 60,
    zIndex: 1,
  },
});
